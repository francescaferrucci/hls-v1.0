# Corporate SSO Setup — Plan Confirmed Pro, Azure AD/Entra ID Setup In Progress

## Status

- **Plan:** Confirmed on Supabase's side — the Hannah Pet Hospital organization (`amqplulxutlifvpnmxjj`) is now on **Pro**.
- **IdP:** Confirmed — Microsoft/Office 365, i.e. **Microsoft Entra ID (Azure AD)**.
- **Database-side groundwork:** already built and live (SSO claim sync logic in `profiles`) — see `docs/DATABASE_FOUNDATION.md`.
- **Remaining steps below require either dashboard/Azure-admin access I don't have, or a decision on how to run one CLI command.**

## Supabase's service-provider (SP) details — give these to whoever manages Azure/Entra

Supabase project: `yadypyjoflpxbkkrhmot` (Hannah Learning System).

| Field | Value |
|---|---|
| Entity ID / Metadata URL | `https://yadypyjoflpxbkkrhmot.supabase.co/auth/v1/sso/saml/metadata` |
| ACS URL (Reply URL) | `https://yadypyjoflpxbkkrhmot.supabase.co/auth/v1/sso/saml/acs` |
| NameID format | `persistent` (recommended) or `emailAddress` |

## Step 1 (manual, needs your dashboard access): enable SAML 2.0 on the project

SAML support is off by default per-project, even on Pro. Go to the [Auth Providers page](https://supabase.com/dashboard/project/yadypyjoflpxbkkrhmot/auth/providers) for this project and toggle SAML 2.0 on. This is a simple dashboard toggle — not exposed through any tool I have access to.

## Step 2 (needs your Microsoft/Entra admin): create the Enterprise Application

Whoever administers your Microsoft 365 tenant (Entra admin center) needs to:

1. Go to **Entra admin center → Enterprise Applications → New application → Create your own application → "Non-gallery application."**
2. Name it something like "Hannah Learning System."
3. Under **Single sign-on**, choose **SAML**.
4. Set **Identifier (Entity ID)** to the Metadata URL above.
5. Set **Reply URL (ACS URL)** to the ACS URL above.
6. Under the SAML Signing Certificate section, copy the **App Federation Metadata URL** — that's what Supabase needs next.
7. Assign the Hannah Pet Hospital users/groups who should have access to this app.
8. (Optional) Under attribute mapping, confirm the email claim is included — Supabase needs an email address in the assertion.

## Step 3: register the identity provider with Supabase

Once Step 1 and Step 2 are done and you have the App Federation Metadata URL from Azure, the actual registration is one command:

```bash
supabase sso add --type saml --project-ref yadypyjoflpxbkkrhmot \
  --metadata-url '<azure-app-federation-metadata-url>' \
  --domains hannahpethospital.com
```

This requires the Supabase CLI logged in with a personal access token (`supabase login`) that has write access to the project — I don't currently hold one. Two ways to get this done once you have the Azure metadata URL:

- **You run it** — from your own machine, after `supabase login`, using the command above (swap in the real metadata URL).
- **I run it for you** — you'd generate a personal access token in the Supabase dashboard (Account → Access Tokens) and share it with me through the secure credential form (never pasted in chat), and I'll run the registration command in the sandbox.

Either way, let me know if `hannahpethospital.com` is the right domain to bind SSO sign-in to, or if there's a different/additional domain your team logs in with.

## Update — Supabase side confirmed ready

Verified directly against the Management API: **SAML 2.0 is already enabled** on the `yadypyjoflpxbkkrhmot` project (no dashboard toggle needed after all), and **no SSO provider is registered yet**. The only remaining step on the Supabase side is registering the Azure connection once we have the App Federation Metadata URL from your Entra admin — no CLI or personal token handoff needed beyond what's already in place for this session.

## Attribute mapping (optional, do after basic sign-in works)

I've already built the database side to accept `employee_id`, `job_title`, and `location_code` claims (see `supabase/migrations/20260906010400_sso_profile_provisioning.sql`). Your Entra admin can tell us what these fields are called in your tenant's claim configuration (e.g. a custom `employeeId` or `department` attribute) so we can map them correctly with `supabase sso update ... --attribute-mapping-file`. Not required to get SSO login working — a good follow-up once the basic flow is tested.

## Rollout tip

Start with IdP-initiated login (the default, no domain config needed) and test with one real account before enabling SP-initiated or wider rollout.

## What's already done on the database side (live)

- `handle_new_user()` now detects an SSO-originated sign-up (`auth.identities.provider like 'sso:%'`) and seeds `employee_id`, `job_title`, and `location_id` (resolved from a `location_code` claim against the new `locations` table) into the profile automatically.
- A trigger keeps those fields in sync on later logins, but **only** for profiles that were originally created via SSO — manually created or manually edited profiles are never silently overwritten.
- Role is **never** taken from the IdP. Every SSO-provisioned account still starts as `learner`; role changes remain administrator-only, exactly like manually created accounts (`prevent_role_self_escalation` still applies).

This part is already applied to the live project as part of the migration set described in `docs/DATABASE_FOUNDATION.md`.
