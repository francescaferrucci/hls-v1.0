// record-completion
//
// Trusted write boundary for checklist items, case exercises, and self-attestation --
// the three lesson_progress.detail fields (`checklist`, `casesCompleted`, `attested`) that
// docs/DATABASE_FOUNDATION.md flagged as "entirely client-reported" after the quiz-scoring
// redesign. The client sends only { lesson_id, kind, item_key, checked?, decisions? } -- it
// never gets to assert the resulting checklist/casesCompleted/attested value directly. This
// function validates the claim against the lesson's live content, writes an immutable row to
// completion_events (service-role-write-only, see 20260906030000), and is the only place that
// derives the aggregate value written into lesson_progress.detail for these three fields.
//
// Per-kind rules:
//  - checklist_item: item_key must be a valid index into lesson.content.checklistItems.
//    Checking/unchecking is otherwise self-reported by design -- there's no "correct" state to
//    verify, just an existence check so bogus indices can't corrupt the record.
//  - case: item_key must match a real case id in lesson.content.cases, AND the client must
//    supply a chosen option index for every decision point defined on that case (`decisions`
//    keyed by hostId). A case can no longer be marked complete without having answered every
//    decision point -- mirrors the quiz "all questions answered" rule in submit-assessment-attempt.
//  - attestation: checking (not unchecking) is rejected unless the server's own trusted records
//    show the same prerequisites the UI used to only check client-side: every module in
//    moduleProgress complete, the scored-module average >= 85, and every *critical* checklist
//    item confirmed via this same ledger. Unchecking (retracting an attestation) is always
//    allowed with no prerequisite check.
//
// Scope note: this does not touch lesson_progress.status/completed_at (still client-computed
// from these now-trusted fields, same boundary the quiz redesign drew), and does not change the
// lesson_progress RLS policy that still permits direct table writes by the row owner -- that
// remains the same separately-flagged, not-yet-closed gap noted in the quiz ledger migration.
//
// Deploy: verify_jwt = true. Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (both provided
// automatically in the Edge Function runtime).

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

type Kind = "checklist_item" | "case" | "attestation";

interface RecordPayload {
  lesson_id: string;
  kind: Kind;
  item_key: string;
  checked?: boolean;
  decisions?: Record<string, number>;
}

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
interface CaseDecision {
  opts?: unknown[];
  correct?: number;
  exp?: string;
}
interface LessonCase {
  id: number | string;
  decisions?: Record<string, CaseDecision>;
}
interface ChecklistItem {
  t?: string;
  critical?: boolean;
}

function hasAnswerKey(q: QuizQuestion | undefined): boolean {
  return (
    Number.isInteger(q?.correct) ||
    (Array.isArray(q?.correct) && (q!.correct as unknown[]).every((n) => Number.isInteger(n)))
  );
}
// Mirrors assets/app.js moduleUsesScoring() / submit-assessment-attempt's copy of the same rule.
function moduleUsesScoring(m: LessonModule): boolean {
  const quiz = Array.isArray(m.quiz) ? m.quiz : [];
  return m.mode !== "manual" && m.mode !== "review" && quiz.length > 0 && quiz.every(hasAnswerKey);
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return jsonResponse({ error: "Missing Authorization header" }, 401);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const userClient = createClient(supabaseUrl, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: userData, error: userErr } = await userClient.auth.getUser();
  if (userErr || !userData?.user) {
    return jsonResponse({ error: "Invalid or expired session" }, 401);
  }
  const userId = userData.user.id;

  let payload: RecordPayload;
  try {
    payload = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, 400);
  }
  const { lesson_id, kind, item_key } = payload;
  if (!lesson_id || !kind || item_key === undefined || item_key === null) {
    return jsonResponse({ error: "lesson_id, kind, and item_key are required" }, 400);
  }
  if (!["checklist_item", "case", "attestation"].includes(kind)) {
    return jsonResponse({ error: "Invalid kind" }, 400);
  }
  const itemKeyStr = String(item_key);
  const checked = payload.checked !== false; // default true

  // Service-role client bypasses RLS -- this function IS the trusted boundary.
  const admin = createClient(supabaseUrl, serviceRoleKey);

  const { data: lesson, error: lessonErr } = await admin
    .from("lessons")
    .select("id, content, updated_at")
    .eq("id", lesson_id)
    .single();
  if (lessonErr || !lesson) {
    return jsonResponse({ error: "Lesson not found" }, 404);
  }

  const content = (lesson.content ?? {}) as Record<string, unknown>;
  const modules: LessonModule[] = Array.isArray(content.modules) ? (content.modules as LessonModule[]) : [];
  const cases: LessonCase[] = Array.isArray(content.cases) ? (content.cases as LessonCase[]) : [];
  const checklistItems: ChecklistItem[] = Array.isArray(content.checklistItems)
    ? (content.checklistItems as ChecklistItem[])
    : [];

  const { data: currentProgress } = await admin
    .from("lesson_progress")
    .select("detail")
    .eq("user_id", userId)
    .eq("lesson_id", lesson_id)
    .maybeSingle();
  const currentDetail = (currentProgress?.detail ?? {}) as Record<string, unknown>;

  let eventPayload: Record<string, unknown> = {};
  let eventChecked = checked;

  if (kind === "checklist_item") {
    const idx = Number(itemKeyStr);
    if (!Number.isInteger(idx) || idx < 0 || idx >= checklistItems.length) {
      return jsonResponse({ error: "Unknown checklist item for this lesson" }, 404);
    }
  } else if (kind === "case") {
    const matchedCase = cases.find((c) => String(c.id) === itemKeyStr);
    if (!matchedCase) {
      return jsonResponse({ error: "Unknown case for this lesson" }, 404);
    }
    const decisionHostIds = Object.keys(matchedCase.decisions ?? {});
    const submitted = payload.decisions ?? {};
    const missing = decisionHostIds.filter((hostId) => {
      const chosen = submitted[hostId];
      const opts = matchedCase.decisions?.[hostId]?.opts;
      return (
        !Number.isInteger(chosen) ||
        (Array.isArray(opts) && ((chosen as number) < 0 || (chosen as number) >= opts.length))
      );
    });
    if (missing.length > 0) {
      return jsonResponse(
        { error: "All decision points in this case must be answered before it can be marked complete", missing },
        409,
      );
    }
    eventChecked = true; // a case completion has no "uncomplete" action today
    eventPayload = { decisions: submitted };
  } else if (kind === "attestation") {
    if (itemKeyStr !== "attestation") {
      return jsonResponse({ error: "Invalid item_key for attestation" }, 400);
    }
    if (checked) {
      const moduleProgress = (currentDetail.moduleProgress ?? {}) as Record<string, boolean>;
      const moduleScores = (currentDetail.moduleScores ?? {}) as Record<string, number>;
      const modulesComplete = modules.length === 0 || modules.every((m) => !!moduleProgress[String(m.id)]);

      // Mirrors assets/app.js's existing "Request sign-off" gate exactly (modScores.length &&
      // avg>=85): a lesson with zero recorded scored-module scores fails this check even if it
      // has no scored modules at all -- that's the pre-existing client behavior, not something
      // this redesign should loosen or tighten on its own.
      const scoredModuleIds = modules.filter(moduleUsesScoring).map((m) => String(m.id));
      const knownScores = scoredModuleIds
        .map((id) => moduleScores[id])
        .filter((v): v is number => typeof v === "number" && !Number.isNaN(v));
      const modAvgSatisfied =
        knownScores.length > 0 &&
        Math.round(knownScores.reduce((a, b) => a + b, 0) / knownScores.length) >= 85;

      const { data: checklistEvents } = await admin
        .from("completion_events")
        .select("item_key, checked")
        .eq("user_id", userId)
        .eq("lesson_id", lesson_id)
        .eq("kind", "checklist_item");
      const checkedIndexes = new Set(
        (checklistEvents ?? []).filter((r) => r.checked).map((r) => r.item_key),
      );
      const criticalItems = checklistItems
        .map((item, i) => ({ item, i }))
        .filter(({ item }) => !!item.critical);
      const criticalDone = criticalItems.every(({ i }) => checkedIndexes.has(String(i)));

      const failures: string[] = [];
      if (!modulesComplete) failures.push("all knowledge-check modules must be completed");
      if (!modAvgSatisfied) failures.push("scored modules must average 85% or higher");
      if (!criticalDone) failures.push("every critical checklist item must be confirmed complete");

      if (failures.length > 0) {
        return jsonResponse(
          { error: `Attestation prerequisites not met: ${failures.join("; ")}.`, failures },
          409,
        );
      }
      eventPayload = {
        text: (content.certification as Record<string, unknown> | undefined)?.attestation ?? null,
        lesson_updated_at: lesson.updated_at,
      };
    }
    eventChecked = checked;
  }

  const nowIso = new Date().toISOString();
  const { error: eventErr } = await admin.from("completion_events").upsert(
    {
      user_id: userId,
      lesson_id,
      kind,
      item_key: itemKeyStr,
      checked: eventChecked,
      payload: eventPayload,
      updated_at: nowIso,
    },
    { onConflict: "user_id,lesson_id,kind,item_key" },
  );
  if (eventErr) {
    return jsonResponse({ error: "Failed to record completion event", detail: eventErr.message }, 500);
  }

  // Recompute only the one aggregate field this kind owns, preserving every other detail key.
  const nextDetail = { ...currentDetail } as Record<string, unknown>;

  if (kind === "checklist_item") {
    const { data: rows } = await admin
      .from("completion_events")
      .select("item_key, checked")
      .eq("user_id", userId)
      .eq("lesson_id", lesson_id)
      .eq("kind", "checklist_item");
    const checklist: Record<string, boolean> = {};
    (rows ?? []).forEach((r) => {
      checklist[r.item_key] = !!r.checked;
    });
    nextDetail.checklist = checklist;
  } else if (kind === "case") {
    const { data: rows } = await admin
      .from("completion_events")
      .select("item_key, checked")
      .eq("user_id", userId)
      .eq("lesson_id", lesson_id)
      .eq("kind", "case")
      .eq("checked", true);
    const casesCompleted = (rows ?? []).map((r) => {
      const matched = cases.find((c) => String(c.id) === r.item_key);
      return matched ? matched.id : r.item_key;
    });
    nextDetail.casesCompleted = casesCompleted;
  } else if (kind === "attestation") {
    nextDetail.attested = eventChecked;
  }

  const { error: progressErr } = await admin.from("lesson_progress").upsert(
    {
      user_id: userId,
      lesson_id,
      detail: nextDetail,
      updated_at: nowIso,
    },
    { onConflict: "user_id,lesson_id" },
  );
  if (progressErr) {
    return jsonResponse({ error: "Failed to update progress", detail: progressErr.message }, 500);
  }

  return jsonResponse({
    ok: true,
    checklist: nextDetail.checklist ?? null,
    casesCompleted: nextDetail.casesCompleted ?? null,
    attested: typeof nextDetail.attested === "boolean" ? nextDetail.attested : null,
  });
});
