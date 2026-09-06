import { createClient } from "jsr:@supabase/supabase-js@2";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: CORS_HEADERS });
  }
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
  const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
  const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  const authHeader = req.headers.get("Authorization") ?? "";

  // Client scoped to the caller's own JWT -- respects RLS, used only to confirm
  // the caller is an administrator before doing anything privileged.
  const callerClient = createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
  });

  const { data: callerUser, error: callerErr } = await callerClient.auth.getUser();
  if (callerErr || !callerUser?.user) {
    return jsonResponse({ error: "Not authenticated." }, 401);
  }

  const { data: isAdmin, error: adminCheckErr } = await callerClient.rpc("is_admin");
  if (adminCheckErr || !isAdmin) {
    return jsonResponse({ error: "Only administrators can invite team members." }, 403);
  }

  let body: {
    email?: string;
    full_name?: string;
    role?: string;
    employee_id?: string;
    job_title?: string;
    location_code?: string;
  };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  const email = (body.email || "").trim().toLowerCase();
  const fullName = (body.full_name || "").trim();
  const role = (body.role || "learner").trim();
  const allowedRoles = ["learner", "facilitator", "manager", "administrator"];

  if (!email || !email.includes("@")) {
    return jsonResponse({ error: "Enter a valid email address." }, 400);
  }
  if (!allowedRoles.includes(role)) {
    return jsonResponse({ error: "Invalid role." }, 400);
  }

  // Service-role client -- key comes from the Edge Function's managed runtime
  // environment, never hardcoded or passed in from the caller.
  const adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  const redirectTo = "https://francescaferrucci.github.io/hls-v1.0/";

  const { data: inviteData, error: inviteErr } = await adminClient.auth.admin.inviteUserByEmail(
    email,
    {
      redirectTo,
      data: {
        full_name: fullName || undefined,
        employee_id: body.employee_id || undefined,
        job_title: body.job_title || undefined,
        location_code: body.location_code || undefined,
      },
    },
  );

  if (inviteErr || !inviteData?.user) {
    return jsonResponse({ error: inviteErr?.message || "Couldn't send the invite." }, 400);
  }

  // handle_new_user() has already created a matching profiles row with role='learner'.
  // If the admin chose a different starting role, apply it now.
  if (role !== "learner") {
    const { error: roleErr } = await adminClient
      .from("profiles")
      .update({ role })
      .eq("id", inviteData.user.id);
    if (roleErr) {
      return jsonResponse({
        warning: `Invite sent, but couldn't set the initial role: ${roleErr.message}`,
        user_id: inviteData.user.id,
      }, 200);
    }
  }

  return jsonResponse({ success: true, user_id: inviteData.user.id });
});
