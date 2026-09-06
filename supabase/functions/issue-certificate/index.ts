// issue-certificate
//
// Trusted issuance boundary. The certificates_insert_staff RLS policy (tightened in migration
// 20260906010300) now only allows staff to insert directly -- this function is the intended
// integration point going forward: it verifies eligibility server-side (every published lesson
// in the course is completed, and every requires_signoff lesson has an approved sign-off) before
// writing the row, using the service role, so a certificate can never be issued for incomplete
// work even if the calling client is compromised or buggy.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

interface IssuePayload {
  user_id: string;
  course_id: string;
}

function generateCertificateNumber(): string {
  const rand = crypto.getRandomValues(new Uint32Array(2));
  return `HLS-${new Date().getFullYear()}-${rand[0].toString(36).toUpperCase()}${rand[1].toString(36).toUpperCase()}`;
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
  const callerId = userData.user.id;

  let payload: IssuePayload;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), { status: 400 });
  }
  if (!payload.user_id || !payload.course_id) {
    return new Response(JSON.stringify({ error: "user_id and course_id are required" }), { status: 400 });
  }

  const admin = createClient(supabaseUrl, serviceRoleKey);

  // A learner may only request their own certificate; staff may issue for anyone.
  const { data: caller } = await admin.from("profiles").select("role").eq("id", callerId).single();
  const isStaff = !!caller && ["facilitator", "manager", "administrator"].includes(caller.role);
  if (!isStaff && callerId !== payload.user_id) {
    return new Response(JSON.stringify({ error: "Cannot request a certificate for another user" }), {
      status: 403,
    });
  }

  const { data: existing } = await admin
    .from("certificates")
    .select("id, certificate_number, issued_at")
    .eq("user_id", payload.user_id)
    .eq("course_id", payload.course_id)
    .maybeSingle();
  if (existing) {
    return new Response(JSON.stringify(existing), { headers: { "Content-Type": "application/json" } });
  }

  const { data: lessons, error: lessonsErr } = await admin
    .from("lessons")
    .select("id, requires_signoff")
    .eq("course_id", payload.course_id)
    .eq("status", "published");
  if (lessonsErr || !lessons || lessons.length === 0) {
    return new Response(JSON.stringify({ error: "Course has no published lessons" }), { status: 404 });
  }

  const { data: progress } = await admin
    .from("lesson_progress")
    .select("lesson_id, status")
    .eq("user_id", payload.user_id)
    .in("lesson_id", lessons.map((l) => l.id));

  const completedLessonIds = new Set((progress ?? []).filter((p) => p.status === "completed").map((p) => p.lesson_id));
  const incomplete = lessons.filter((l) => !completedLessonIds.has(l.id));
  if (incomplete.length > 0) {
    return new Response(
      JSON.stringify({ error: "Not all lessons are completed", incomplete_lesson_ids: incomplete.map((l) => l.id) }),
      { status: 409 },
    );
  }

  const signoffLessonIds = lessons.filter((l) => l.requires_signoff).map((l) => l.id);
  if (signoffLessonIds.length > 0) {
    const { data: signOffs } = await admin
      .from("sign_offs")
      .select("lesson_id, status")
      .eq("user_id", payload.user_id)
      .in("lesson_id", signoffLessonIds)
      .eq("status", "approved");
    const approvedLessonIds = new Set((signOffs ?? []).map((s) => s.lesson_id));
    const missingSignoffs = signoffLessonIds.filter((id) => !approvedLessonIds.has(id));
    if (missingSignoffs.length > 0) {
      return new Response(
        JSON.stringify({ error: "Required sign-offs are not approved", missing_signoff_lesson_ids: missingSignoffs }),
        { status: 409 },
      );
    }
  }

  const { data: certificate, error: insertErr } = await admin
    .from("certificates")
    .insert({
      user_id: payload.user_id,
      course_id: payload.course_id,
      certificate_number: generateCertificateNumber(),
    })
    .select()
    .single();

  if (insertErr) {
    return new Response(JSON.stringify({ error: "Failed to issue certificate", detail: insertErr.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(certificate), { headers: { "Content-Type": "application/json" } });
});
