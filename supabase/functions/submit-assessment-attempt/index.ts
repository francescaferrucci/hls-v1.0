// submit-assessment-attempt
//
// Trusted server-side scoring boundary. The client currently writes lesson_progress.quiz_score
// directly, which means a learner's own browser is the source of truth for whether they passed --
// this function replaces that path. The client sends only { lesson_id, answers }; this function
// looks up the lesson's quiz (answer key) and pass_threshold with the service role, scores the
// submission itself, records an immutable row in assessment_attempts, and updates the
// lesson_progress rollup. It never trusts a score value sent by the client.
//
// Deploy: verify_jwt = true (learner must be authenticated). Requires SUPABASE_URL and
// SUPABASE_SERVICE_ROLE_KEY, both provided automatically in the Edge Function runtime.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

interface QuizQuestion {
  id: string;
  correct_option: string; // or correct_options: string[] for multi-select -- see scoreQuiz
  points?: number;
}

interface SubmitPayload {
  lesson_id: string;
  answers: Record<string, string | string[]>;
}

function scoreQuiz(quiz: QuizQuestion[], answers: Record<string, string | string[]>) {
  let earned = 0;
  let max = 0;
  for (const q of quiz) {
    const pts = q.points ?? 1;
    max += pts;
    const given = answers[q.id];
    if (given !== undefined && given === q.correct_option) {
      earned += pts;
    }
  }
  const score = max > 0 ? (earned / max) * 100 : 0;
  return { score, maxScore: max };
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

  // Client used only to resolve who the caller is, from their own JWT.
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
  if (!payload.lesson_id || typeof payload.answers !== "object") {
    return new Response(JSON.stringify({ error: "lesson_id and answers are required" }), { status: 400 });
  }

  // Service-role client bypasses RLS -- this function IS the trusted boundary.
  const admin = createClient(supabaseUrl, serviceRoleKey);

  const { data: lesson, error: lessonErr } = await admin
    .from("lessons")
    .select("id, quiz, pass_threshold, course_id")
    .eq("id", payload.lesson_id)
    .single();

  if (lessonErr || !lesson) {
    return new Response(JSON.stringify({ error: "Lesson not found" }), { status: 404 });
  }

  const quiz = (lesson.quiz ?? []) as QuizQuestion[];
  const { score, maxScore } = scoreQuiz(quiz, payload.answers);
  const passed = score >= (lesson.pass_threshold ?? 80);

  const { data: priorAttempts } = await admin
    .from("assessment_attempts")
    .select("attempt_number")
    .eq("user_id", userId)
    .eq("lesson_id", payload.lesson_id)
    .order("attempt_number", { ascending: false })
    .limit(1);

  const nextAttemptNumber = (priorAttempts?.[0]?.attempt_number ?? 0) + 1;

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
    attempt_number: nextAttemptNumber,
    answers: payload.answers,
    score,
    max_score: maxScore,
    passed,
    submitted_at: new Date().toISOString(),
  });

  if (attemptErr) {
    return new Response(JSON.stringify({ error: "Failed to record attempt", detail: attemptErr.message }), {
      status: 500,
    });
  }

  const { error: progressErr } = await admin.from("lesson_progress").upsert(
    {
      user_id: userId,
      lesson_id: payload.lesson_id,
      status: passed ? "completed" : "in_progress",
      quiz_score: score,
      quiz_attempts: nextAttemptNumber,
      completed_at: passed ? new Date().toISOString() : null,
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
    JSON.stringify({ score, max_score: maxScore, passed, attempt_number: nextAttemptNumber }),
    { headers: { "Content-Type": "application/json" } },
  );
});
