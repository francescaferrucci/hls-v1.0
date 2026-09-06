// submit-quiz-answer
//
// Trusted per-question scoring boundary for lesson.content.modules[].quiz[] questions. The
// browser no longer receives a question's `correct` answer or `exp` explanation until it submits
// a selection for that specific question -- this function is the only thing that ever reads the
// real answer key (via the service role, straight from the base `lessons` table) and it returns a
// verdict only after scoring the learner's submitted selection against it. It never trusts a
// `correct` value sent by the client, and it never reveals the key for a question that hasn't
// been answered yet.
//
// Deploy: verify_jwt = true (caller must be authenticated). Requires SUPABASE_URL and
// SUPABASE_SERVICE_ROLE_KEY, both provided automatically in the Edge Function runtime.
//
// Scope: only the DB-backed lesson.content.modules[].quiz[] system used for lesson_progress /
// certificate scoring. Content Studio case-decision points (content.cases[].stages[].decision)
// have the same answer-key shape but gate only boolean case completion, not scoring, and are
// intentionally out of scope for this pass.
//
// No status check is applied on purpose: Content Studio's "Preview" also plays draft lessons
// through the same quiz UI (matching submit-assessment-attempt, which has never restricted by
// status either), so staff can test-answer a draft's quiz before it is published. Learners only
// ever reach a lesson_id via the redacted, published-only lessons_public view, so this does not
// expose the existence or content of drafts to them in practice.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

interface SubmitPayload {
  lesson_id: string;
  module_id: number | string;
  question_index: number;
  selected: number | number[];
}

interface QuizQuestion {
  correct?: number | number[];
  exp?: string;
  type?: string;
}

function hasAnswerKey(q: QuizQuestion | undefined): boolean {
  return (
    Number.isInteger(q?.correct) ||
    (Array.isArray(q?.correct) && (q!.correct as unknown[]).every((n) => Number.isInteger(n)))
  );
}

function selectionsMatch(selected: number[], correct: number[]): boolean {
  if (!Array.isArray(selected) || !Array.isArray(correct)) return false;
  if (selected.length !== correct.length) return false;
  const a = [...selected].sort((x, y) => x - y);
  const b = [...correct].sort((x, y) => x - y);
  return a.every((v, i) => v === b[i]);
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

  let payload: SubmitPayload;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
  }
  if (
    !payload.lesson_id ||
    payload.module_id === undefined ||
    payload.module_id === null ||
    !Number.isInteger(payload.question_index) ||
    payload.question_index < 0 ||
    (typeof payload.selected !== "number" && !Array.isArray(payload.selected))
  ) {
    return new Response(
      JSON.stringify({ error: "lesson_id, module_id, question_index and selected are required" }),
      { status: 400 },
    );
  }

  // Service-role client bypasses RLS -- this function IS the trusted boundary that may read the
  // unredacted answer key. It never returns the raw row to the caller, only a per-question verdict.
  const admin = createClient(supabaseUrl, serviceRoleKey);

  const { data: lesson, error: lessonErr } = await admin
    .from("lessons")
    .select("id, content")
    .eq("id", payload.lesson_id)
    .single();

  if (lessonErr || !lesson) {
    return new Response(JSON.stringify({ error: "Lesson not found" }), { status: 404 });
  }

  const modules = Array.isArray(lesson.content?.modules) ? lesson.content.modules : [];
  const module = modules.find((m: { id: unknown }) => String(m?.id) === String(payload.module_id));
  if (!module || !Array.isArray(module.quiz)) {
    return new Response(JSON.stringify({ error: "Module or quiz not found" }), { status: 404 });
  }
  const question: QuizQuestion | undefined = module.quiz[payload.question_index];
  if (!question) {
    return new Response(JSON.stringify({ error: "Question not found" }), { status: 404 });
  }

  const keyed = hasAnswerKey(question);
  if (!keyed) {
    return new Response(
      JSON.stringify({ has_key: false, correct: null, correct_answer: null, explanation: question.exp ?? null }),
      { headers: { "Content-Type": "application/json" } },
    );
  }

  const multi = question.type === "multi_select";
  let isCorrect: boolean;
  if (multi) {
    const selected = Array.isArray(payload.selected) ? payload.selected.map(Number) : [];
    isCorrect = selectionsMatch(selected, question.correct as number[]);
  } else {
    const selected = typeof payload.selected === "number" ? payload.selected : Number(payload.selected);
    isCorrect = selected === question.correct;
  }

  // Record this verdict in the quiz_responses ledger so a later trusted aggregate step
  // (submit-assessment-attempt's finalize-module-attempt path) has something authoritative to
  // read instead of trusting a client-side tally. Upsert on (user_id, lesson_id, module_id,
  // question_index) so retakes overwrite the prior verdict for that question rather than
  // accumulating duplicates.
  const { error: ledgerErr } = await admin.from("quiz_responses").upsert(
    {
      user_id: userData.user.id,
      lesson_id: payload.lesson_id,
      module_id: String(payload.module_id),
      question_index: payload.question_index,
      selected: payload.selected,
      is_correct: isCorrect,
      answered_at: new Date().toISOString(),
    },
    { onConflict: "user_id,lesson_id,module_id,question_index" },
  );
  if (ledgerErr) {
    // Don't fail the learner's answer submission over a ledger write hiccup -- they already
    // have their verdict. Surface it in the response so it's visible in function logs/monitoring.
    console.error("quiz_responses ledger write failed", ledgerErr);
  }

  return new Response(
    JSON.stringify({
      has_key: true,
      correct: isCorrect,
      correct_answer: question.correct,
      explanation: question.exp ?? null,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
});
