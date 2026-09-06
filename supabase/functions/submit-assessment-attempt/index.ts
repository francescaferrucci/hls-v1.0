// submit-assessment-attempt (finalize-module-attempt)
//
// Trusted aggregate-scoring boundary for a lesson module's quiz. The client sends only
// { lesson_id, module_id } -- no answers, no claimed score. This function reads the
// quiz_responses ledger (written exclusively by submit-quiz-answer as each question is
// verified server-side) to see what this learner has actually gotten right, computes the
// module's score itself, records an immutable assessment_attempts row, and updates the
// module's score/progress inside lesson_progress.detail plus the lesson-level quiz_score/
// quiz_attempts rollup. It never trusts a score, answer, or correctness flag sent by the client.
//
// Scope: only the quiz-scoring portion of a lesson's completion. Case exercises, checklist
// items, and self-attestation have no secret answer key to protect and continue to be
// self-reported by the client via saveProgress() in assets/app.js, which is expected to omit
// quiz_score/quiz_attempts from its own upsert for lessons with scored modules so it never
// clobbers what this function writes.
//
// Deploy: verify_jwt = true (learner must be authenticated). Requires SUPABASE_URL and
// SUPABASE_SERVICE_ROLE_KEY, both provided automatically in the Edge Function runtime.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

interface QuizQuestion {
  correct?: number | number[];
  exp?: string;
  type?: string;
}

interface LessonModule {
  id: number | string;
  mode?: string;
  passThreshold?: number;
  quiz?: QuizQuestion[];
}

interface SubmitPayload {
  lesson_id: string;
  module_id: number | string;
}

function hasAnswerKey(q: QuizQuestion | undefined): boolean {
  return (
    Number.isInteger(q?.correct) ||
    (Array.isArray(q?.correct) && (q!.correct as unknown[]).every((n) => Number.isInteger(n)))
  );
}

// Mirrors assets/app.js moduleUsesScoring(): not manual, not review-mode, and every quiz
// question in the module carries an answer key.
function moduleUsesScoring(m: LessonModule): boolean {
  const quiz = Array.isArray(m.quiz) ? m.quiz : [];
  return m.mode !== "manual" && m.mode !== "review" && quiz.length > 0 && quiz.every(hasAnswerKey);
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "Missing Authorization header" }), { status: 401 });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: userData, error: userErr } = await userClient.auth.getUser();
  if (userErr || !userData?.user) {
    return new Response(JSON.stringify({ error: "Invalid or expired session" }), { status: 401 });
  }
  const userId = userData.user.id;

  let payload: SubmitPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
  }
  if (!payload.lesson_id || payload.module_id === undefined || payload.module_id === null) {
    return new Response(JSON.stringify({ error: "lesson_id and module_id are required" }), { status: 400 });
  }
  const moduleIdStr = String(payload.module_id);

  // Service-role client bypasses RLS -- this function IS the trusted boundary.
  const admin = createClient(supabaseUrl, serviceRoleKey);

  const { data: lesson, error: lessonErr } = await admin
    .from("lessons")
    .select("id, course_id, content")
    .eq("id", payload.lesson_id)
    .single();
  if (lessonErr || !lesson) {
    return new Response(JSON.stringify({ error: "Lesson not found" }), { status: 404 });
  }

  const modules: LessonModule[] = Array.isArray(lesson.content?.modules) ? lesson.content.modules : [];
  const module = modules.find((m) => String(m?.id) === moduleIdStr);
  if (!module) {
    return new Response(JSON.stringify({ error: "Module not found" }), { status: 404 });
  }
  if (!moduleUsesScoring(module)) {
    return new Response(JSON.stringify({ error: "This module is not a scored quiz module" }), { status: 400 });
  }

  const quiz = module.quiz ?? [];
  const totalQuestions = quiz.length;

  // Read the ledger written by submit-quiz-answer -- this is the ONLY source of truth for
  // correctness. The client never gets to assert its own answers or score here.
  const { data: responses, error: responsesErr } = await admin
    .from("quiz_responses")
    .select("question_index, is_correct")
    .eq("user_id", userId)
    .eq("lesson_id", payload.lesson_id)
    .eq("module_id", moduleIdStr);
  if (responsesErr) {
    return new Response(
      JSON.stringify({ error: "Failed to read quiz response ledger", detail: responsesErr.message }),
      { status: 500 },
    );
  }

  const answeredIndexes = new Set((responses ?? []).map((r) => r.question_index));
  const allAnswered = totalQuestions > 0 && Array.from({ length: totalQuestions }, (_, i) => i).every((i) =>
    answeredIndexes.has(i)
  );
  if (!allAnswered) {
    return new Response(
      JSON.stringify({ error: "Not all questions in this module have been answered yet" }),
      { status: 409 },
    );
  }

  const correctCount = (responses ?? []).filter((r: { is_correct: boolean }) => r.is_correct).length;
  const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const threshold = Number.isFinite(Number(module.passThreshold)) ? Number(module.passThreshold) : 75;
  const passed = score >= threshold;

  const priorAttemptsRes = (await admin
    .from("assessment_attempts")
    .select("id")
    .eq("user_id", userId)
    .eq("lesson_id", payload.lesson_id)
    .contains("answers", { module_id: moduleIdStr })) as { data: { id: string }[] | null };
  const attemptNumber = (priorAttemptsRes.data?.length ?? 0) + 1;

  const { data: publishedVersion } = await admin
    .from("course_versions")
    .select("id")
    .eq("course_id", lesson.course_id)
    .eq("status", "published")
    .order("version_number", { ascending: false })
    .limit(1)
    .maybeSingle();

  const { error: attemptErr } = await admin.from("assessment_attempts").insert({
    user_id: userId,
    lesson_id: payload.lesson_id,
    course_version_id: publishedVersion?.id ?? null,
    attempt_number: attemptNumber,
    answers: { module_id: moduleIdStr, question_count: totalQuestions, correct_count: correctCount },
    score,
    max_score: 100,
    passed,
    submitted_at: new Date().toISOString(),
    scoring_source: "server",
  });
  if (attemptErr) {
    return new Response(JSON.stringify({ error: "Failed to record attempt", detail: attemptErr.message }), {
      status: 500,
    });
  }

  // Merge into lesson_progress: only touch this module's score/progress inside `detail`, plus
  // the lesson-level quiz_score/quiz_attempts rollup. Never touch status/completed_at here --
  // those depend on non-quiz completion (cases, checklist, attestation) that this function has
  // no visibility into and no business deciding.
  const { data: currentProgress } = await admin
    .from("lesson_progress")
    .select("detail, quiz_attempts")
    .eq("user_id", userId)
    .eq("lesson_id", payload.lesson_id)
    .maybeSingle();

  const currentDetail = (currentProgress?.detail ?? {}) as Record<string, unknown>;
  const currentModuleScores = (currentDetail.moduleScores ?? {}) as Record<string, number>;
  const currentModuleProgress = (currentDetail.moduleProgress ?? {}) as Record<string, boolean>;

  const nextModuleScores = { ...currentModuleScores, [moduleIdStr]: score };
  const nextModuleProgress = { ...currentModuleProgress, [moduleIdStr]: passed || !!currentModuleProgress[moduleIdStr] };
  const nextDetail = { ...currentDetail, moduleScores: nextModuleScores, moduleProgress: nextModuleProgress };

  const scoredModuleIds = modules.filter(moduleUsesScoring).map((m) => String(m.id));
  const knownScores = scoredModuleIds
    .map((id) => nextModuleScores[id])
    .filter((v): v is number => typeof v === "number" && !Number.isNaN(v));
  const aggregateQuizScore = knownScores.length
    ? Math.round(knownScores.reduce((a, b) => a + b, 0) / knownScores.length)
    : null;

  const { error: progressErr } = await admin.from("lesson_progress").upsert(
    {
      user_id: userId,
      lesson_id: payload.lesson_id,
      quiz_score: aggregateQuizScore,
      quiz_attempts: (currentProgress?.quiz_attempts ?? 0) + 1,
      detail: nextDetail,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,lesson_id" },
  );
  if (progressErr) {
    return new Response(JSON.stringify({ error: "Failed to update progress", detail: progressErr.message }), {
      status: 500,
    });
  }

  return new Response(
    JSON.stringify({ score, threshold, passed, attempt_number: attemptNumber, correct_count: correctCount, total_questions: totalQuestions }),
    { headers: { "Content-Type": "application/json" } },
  );
});
