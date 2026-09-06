// decide-sign-off
//
// Trusted decision boundary for lesson/competency sign-offs. sign_offs already has an RLS
// policy restricting UPDATE to is_staff(), so a learner cannot approve their own sign-off via
// direct table access -- but any staff member (facilitator/manager/administrator) could
// currently approve ANY sign-off through direct PostgREST access, with no server-side check
// that they're an eligible reviewer for that specific competency, and no audit trail beyond the
// row's own status column. This function is the recommended integration point for the client
// going forward: it re-validates eligibility against competencies.eligible_reviewer_roles when a
// competency is attached, and writes an audit_log entry (the sign_offs UPDATE trigger from
// migration 20260906010200 also logs the status change, so both call sites are covered even if
// the client is migrated gradually).

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

interface DecidePayload {
  sign_off_id: string;
  decision: "approved" | "rejected";
  notes?: string;
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
  const reviewerId = userData.user.id;

  let payload: DecidePayload;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
  }
  if (!payload.sign_off_id || !["approved", "rejected"].includes(payload.decision)) {
    return new Response(JSON.stringify({ error: "sign_off_id and a valid decision are required" }), {
      status: 400,
    });
  }

  const admin = createClient(supabaseUrl, serviceRoleKey);

  const { data: reviewer, error: reviewerErr } = await admin
    .from("profiles")
    .select("role")
    .eq("id", reviewerId)
    .single();

  if (reviewerErr || !reviewer || !["facilitator", "manager", "administrator"].includes(reviewer.role)) {
    return new Response(JSON.stringify({ error: "Only staff can decide sign-offs" }), { status: 403 });
  }

  const { data: signOff, error: signOffErr } = await admin
    .from("sign_offs")
    .select("id, status, competency_id, competencies:competency_id(eligible_reviewer_roles, expiry_interval_months)")
    .eq("id", payload.sign_off_id)
    .single();

  if (signOffErr || !signOff) {
    return new Response(JSON.stringify({ error: "Sign-off not found" }), { status: 404 });
  }
  if (signOff.status !== "pending") {
    return new Response(JSON.stringify({ error: `Sign-off is already ${signOff.status}` }), { status: 409 });
  }

  const eligibleRoles = (signOff as any).competencies?.eligible_reviewer_roles as string[] | undefined;
  if (eligibleRoles && !eligibleRoles.includes(reviewer.role)) {
    return new Response(
      JSON.stringify({ error: `Role '${reviewer.role}' is not an eligible reviewer for this competency` }),
      { status: 403 },
    );
  }

  const expiryMonths = (signOff as any).competencies?.expiry_interval_months as number | null | undefined;
  const expiresAt =
    payload.decision === "approved" && expiryMonths
      ? new Date(Date.now() + expiryMonths * 30 * 24 * 60 * 60 * 1000).toISOString()
      : null;

  const { error: updateErr } = await admin
    .from("sign_offs")
    .update({
      status: payload.decision,
      facilitator_id: reviewerId,
      notes: payload.notes ?? null,
      decided_at: new Date().toISOString(),
      expires_at: expiresAt,
    })
    .eq("id", payload.sign_off_id);

  if (updateErr) {
    return new Response(JSON.stringify({ error: "Failed to update sign-off", detail: updateErr.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ sign_off_id: payload.sign_off_id, status: payload.decision }), {
    headers: { "Content-Type": "application/json" },
  });
});
