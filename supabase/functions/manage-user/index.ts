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

// Ban duration used for "Deactivate" -- effectively indefinite (10 years),
// fully reversible by setting ban_duration back to "none" on reactivate.
const DEACTIVATE_BAN_DURATION = "87600h";

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
    return jsonResponse({ error: "Only administrators can manage team members." }, 403);
  }

  let body: {
    action?: string;
    user_id?: string;
    full_name?: string;
    email?: string;
    employee_id?: string;
    job_title?: string;
    location_code?: string;
    active?: boolean;
  };
  try {
    body = await req.json();
  } catch {
    return jsonResponse({ error: "Invalid request body." }, 400);
  }

  const action = (body.action || "").trim();
  const userId = (body.user_id || "").trim();
  if (!userId) {
    return jsonResponse({ error: "Missing user_id." }, 400);
  }

  // Service-role client -- key comes from the Edge Function's managed runtime
  // environment, never hardcoded or passed in from the caller.
  const adminClient = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  const { data: targetProfile, error: targetErr } = await adminClient
    .from("profiles")
    .select("id,email,role,active")
    .eq("id", userId)
    .maybeSingle();
  if (targetErr || !targetProfile) {
    return jsonResponse({ error: "Team member not found." }, 404);
  }

  const isSelf = userId === callerUser.user.id;

  async function otherActiveAdminExists() {
    const { count } = await adminClient
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .neq("id", userId)
      .eq("role", "administrator")
      .eq("active", true);
    return (count ?? 0) > 0;
  }

  if (action === "update") {
    const fullName = (body.full_name || "").trim();
    const newEmail = (body.email || "").trim().toLowerCase();
    const employeeId = (body.employee_id || "").trim();
    const jobTitle = (body.job_title || "").trim();
    const locationCode = (body.location_code || "").trim();

    if (!newEmail || !newEmail.includes("@")) {
      return jsonResponse({ error: "Enter a valid email address." }, 400);
    }

    let resolvedLocationId: string | null = null;
    if (locationCode) {
      const { data: loc } = await adminClient
        .from("locations")
        .select("id")
        .eq("code", locationCode)
        .maybeSingle();
      resolvedLocationId = loc?.id ?? null;
    }

    // If the email changed, update the actual login credential first --
    // profiles.email is a display copy and must stay in sync with auth.users.
    if (newEmail !== targetProfile.email) {
      const { error: emailErr } = await adminClient.auth.admin.updateUserById(userId, {
        email: newEmail,
        email_confirm: true,
      });
      if (emailErr) {
        return jsonResponse({ error: `Couldn't update the sign-in email: ${emailErr.message}` }, 400);
      }
    }

    const { error: updateErr } = await adminClient
      .from("profiles")
      .update({
        full_name: fullName || null,
        email: newEmail,
        employee_id: employeeId || null,
        job_title: jobTitle || null,
        location_id: resolvedLocationId,
        location: locationCode || null,
      })
      .eq("id", userId);
    if (updateErr) {
      return jsonResponse({ error: `Couldn't save changes: ${updateErr.message}` }, 400);
    }

    return jsonResponse({ success: true });
  }

  if (action === "set_active") {
    const nextActive = body.active !== false; // default true unless explicitly false

    if (!nextActive) {
      if (isSelf) {
        return jsonResponse({ error: "You can't deactivate your own account." }, 400);
      }
      if (targetProfile.role === "administrator" && !(await otherActiveAdminExists())) {
        return jsonResponse({ error: "Can't deactivate the last active administrator." }, 400);
      }
    }

    const { error: banErr } = await adminClient.auth.admin.updateUserById(userId, {
      ban_duration: nextActive ? "none" : DEACTIVATE_BAN_DURATION,
    });
    if (banErr) {
      return jsonResponse({ error: `Couldn't update account access: ${banErr.message}` }, 400);
    }

    const { error: activeErr } = await adminClient
      .from("profiles")
      .update({ active: nextActive })
      .eq("id", userId);
    if (activeErr) {
      return jsonResponse({ error: `Couldn't update the profile: ${activeErr.message}` }, 400);
    }

    return jsonResponse({ success: true });
  }

  if (action === "delete") {
    if (isSelf) {
      return jsonResponse({ error: "You can't delete your own account." }, 400);
    }
    if (targetProfile.role === "administrator" && !(await otherActiveAdminExists())) {
      return jsonResponse({ error: "Can't delete the last active administrator." }, 400);
    }

    const { error: deleteErr } = await adminClient.auth.admin.deleteUser(userId);
    if (deleteErr) {
      return jsonResponse({ error: `Couldn't delete the account: ${deleteErr.message}` }, 400);
    }

    return jsonResponse({ success: true });
  }

  return jsonResponse({ error: "Unknown action." }, 400);
});
