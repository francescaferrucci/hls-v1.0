# Database Foundation — Applied to Production

Status: **applied.** All 7 migrations below and all 3 Edge Functions are live on `yadypyjoflpxbkkrhmot` (Hannah Learning System), applied with your explicit sign-off. All tables had 0 rows at the time, so this carried no data-migration risk. Repo files are still uncommitted/unpushed pending a separate approval for the `git push`.

## What already exists (built earlier, already live)

The Supabase project is not a blank slate — it already has a real, reasonably solid first-generation schema: 8 tables (`profiles`, `academies`, `courses`, `lessons`, `assignments`, `lesson_progress`, `sign_offs`, `certificates`), 7 applied migrations, RLS enabled on every table, and a clean `is_admin()` / `is_staff()` / `is_content_manager()` helper-function pattern used throughout the policies. All tables currently have 0 rows — there is no live learner data at risk yet, which is exactly the right time to do this hardening.

## What this migration set adds

Seven new migration files in `supabase/migrations/`, all additive (no existing column or row is altered destructively) and all now applied to the live project:

| File | Purpose |
|---|---|
| `20260906010000_security_definer_hardening.sql` | Closes a real finding from the security advisor: `is_admin()`, `is_staff()`, `is_content_manager()`, and two trigger functions were callable directly by anonymous users via the auto-generated REST API. Revokes that, keeps them working inside RLS policies for authenticated users. |
| `20260906010100_locations_and_manager_hierarchy.sql` | Adds a `locations` table and `manager_id` / `location_id` / `employee_id` / `sso_subject` / `provisioned_via` columns on `profiles`, laying the groundwork for manager-scoped reporting (roadmap decision D-06) and SSO/HRIS provisioning. Also fixes a real gap: the existing self-update policy let any learner change their own `active`, `location`, or `job_title` fields — closed with a new trigger that requires admin rights for those fields. |
| `20260906010200_course_versions_and_audit_trail.sql` | Adds `course_versions` (immutable content snapshots), `assessment_attempts` (per-attempt, server-write-only audit trail), `competencies` (reusable clinical sign-off definitions, linked from `sign_offs`), and a general-purpose `audit_log` table with triggers on role/status changes, sign-off decisions, and certificate issuance. Also adds `lessons.pass_threshold` so pass/fail is a server-enforced number instead of implicit client logic. |
| `20260906010300_close_certificate_self_issuance_gap.sql` | Fixes a real bug: the existing policy let a learner insert their **own** certificate row directly, with any certificate number and issue date. Restricts insert to staff (or, going forward, the `issue-certificate` function below). |
| `20260906010400_sso_profile_provisioning.sql` | Extends `handle_new_user()` to read SAML-mapped claims (`employee_id`, `job_title`, `location_code`) into the new profile on first SSO sign-in, and adds a re-sync trigger for later logins — but only for profiles originally created via SSO, so it never overwrites a manually managed account. Role is never taken from the IdP; that stays admin-controlled. |
| `20260906010500_trigger_function_execute_lockdown.sql` | Follow-up found by re-running the security advisor after applying the above: Supabase's project-level default privileges auto-grant `EXECUTE` on new functions to `anon`/`authenticated`. Revokes that from 8 trigger-only functions (never meant to be called directly via the API) that don't need it. |
| `20260906010600_trigger_function_public_execute_lockdown.sql` | Second follow-up: 6 of those same trigger functions also still had the default `PUBLIC` `EXECUTE` grant from when they were created (never explicitly revoked), which every role — including `anon`/`authenticated` — inherits regardless of role-specific revokes. Closes that. |

## Trusted mutation functions (Edge Functions, deployed and active)

Three Deno Edge Functions in `supabase/functions/`, matching the roadmap's "never trust a client-submitted score/decision" principle:

- **`submit-assessment-attempt`** — replaces the client writing `lesson_progress.quiz_score` directly. The client sends only the raw answers; the function scores them server-side against the lesson's stored quiz/answer key and `pass_threshold`, writes an immutable `assessment_attempts` row, and updates `lesson_progress`.
- **`decide-sign-off`** — validates the reviewer is eligible staff (and, if the sign-off is tied to a competency, checks `eligible_reviewer_roles`) before approving/rejecting, and sets a computed `expires_at` when the competency has an expiry interval.
- **`issue-certificate`** — checks every published lesson is completed and every required sign-off is approved before writing a certificate row, instead of trusting the client's say-so.

**Important cutover note:** deploying these functions does not, by itself, stop the current app from writing scores/certificates the old way — the client-side JavaScript still needs to be updated to call these functions instead of writing to the tables directly. I've left the existing `lesson_progress` update policy untouched for now so the live prototype keeps working; flipping it to block direct client writes is the next piece of work once the client is updated, and I'd do that as its own reviewed change, not bundled silently into this one.

## Decisions I deliberately did not make for you

Per the roadmap's own rule, I did not touch anything that depends on an unratified D-01–D-18 decision:

- **Role catalog** — left the existing 4 roles (`learner` / `facilitator` / `manager` / `administrator`) untouched. The `competencies.eligible_reviewer_roles` field is seeded to use only these 4, as a placeholder — expanding to the roadmap's proposed 8-role catalog (D-03) is a separate, ratified change.
- **Manager-scoped reporting** — added the `manager_id` column and an `is_direct_manager_of()` helper, but did **not** narrow the existing broad `is_staff()`-based SELECT policies (which currently let any facilitator/manager/admin see everyone's progress, not just their own team). Narrowing that is a D-06 decision with real behavior change for current staff users, so I'm flagging it rather than silently changing who can see what.
- **Course versioning cutover** — added `course_versions` as a new, empty table. No existing lesson content was frozen into a version yet; that's a deliberate first "publish" action for you or a content manager to take once you're ready, not something I should do to your working drafts without asking.

## Post-apply security advisor result

Re-ran the security advisor after all 7 migrations. Remaining WARNs are now down to two categories, both expected/out of scope for this work:

- `is_admin()`, `is_staff()`, `is_content_manager()`, `is_direct_manager_of()` are still callable directly by any authenticated user. This is intentional — the client needs these role checks for its own UI logic, and they only return a boolean about the caller's own role/relationships, not sensitive data.
- ~~"Leaked password protection disabled"~~ — **fixed.** Once we had Management API access (from the SSO work), I enabled `password_hibp_enabled` directly — confirmed cleared from the security advisor list. New/changed passwords are now checked against the HaveIBeenPwned breach database.

## Client-code cutover — in progress

Started moving `assets/app.js` off direct table writes and onto the 3 trusted Edge Functions. This is an uncommitted, reviewed-in-place change — nothing has been pushed.

**Done:** The certificate button (`#certificateBtn`) was 100% mocked — three hardcoded certificate names with no real data behind them. It now loads real rows from the `certificates` table, lists any published course not yet certified with a "Claim certificate" action, and calls the `issue-certificate` Edge Function to request one. The function re-verifies every published lesson is `completed` (and every `requires_signoff` lesson has an approved sign-off) server-side before it will write a row, so this is a genuine trust-boundary cutover, not just a UI change. Low risk: it's new, isolated functionality — nothing that previously worked can now break.

**Blocked — needs a decision before I touch it:** the other write I was asked to cut over, `saveProgress()`'s direct `lesson_progress` upsert, can't be swapped for a call to `submit-assessment-attempt` as that function is built today. I found a real mismatch while investigating:

- `submit-assessment-attempt` assumes one flat quiz array per lesson (`lessons.quiz` + `lessons.pass_threshold`) — that's the model I built it against when we set up the audit-trail migration.
- The actual lesson content authored in Content Studio doesn't use that shape at all. A lesson is a set of **modules**, and each module carries its **own** quiz array inside `lessons.content.modules[].quiz`. `saveProgress()` averages scores across every scored module into one composite `quiz_score`, and tracks per-module state in `lesson_progress.detail`.
- If I pointed the existing save flow at the current function as-is, it would score against the always-empty `lessons.quiz` column, always come back 0, and mark every multi-module lesson as failed — a regression, not a fix. I didn't make that swap.
- Separately, and more fundamentally: the correct-answer key for every question (`quiz[].correct`) is already sent to the browser as part of the lesson's `content` today, because the quiz UI checks answers and reveals correct/incorrect instantly, client-side, with no round trip. A trusted server-scoring function closes the "client decides its own pass/fail" gap, but it can't close the "client can already read the answer key over the network" gap — that needs the content the browser receives to stop including `correct`, with a server endpoint validating answers against a copy it keeps to itself. That's a bigger, genuinely security-relevant change to both the content-serving path and the quiz UI's instant-feedback interaction, not a data-layer swap.

I'd rather flag this than either force a swap that breaks completion tracking, or quietly ship a "trusted" boundary that isn't actually trustworthy. Options, roughly in order of effort:

1. **Leave assessment/progress scoring as-is for now.** No real content is at risk today — the `lessons` table currently has zero rows in production, so this path isn't live for any real learner yet. Revisit once real Content-Studio-authored lessons are about to launch.
2. **Redesign `submit-assessment-attempt`** to score against a single module's `content.modules[].quiz` (matched by module id) rather than a flat lesson-level quiz, and have it merge into `lesson_progress.detail`/`quiz_score` incrementally as each module completes — matches today's per-module UX without changing it, but still leaves the answer-key-exposure gap open.
3. **Do the fuller fix**: stop sending `correct` in the lesson `content` payload the browser receives, add a server endpoint that scores a submitted answer set against the key it holds server-side, and rework the quiz modal to await that response before revealing correct/incorrect. This is the only option that actually delivers "server never trusts the client," but it's real frontend rework, not a swap.

No code changes went into `submit-assessment-attempt` or the quiz UI while this was unresolved — want me to pick one of the above and run with it?

## Still open / needs your input

1. Your call on the manager-scoping and role-catalog items above, whenever the D-03/D-06 decisions are ready — no action needed now.
2. **Assessment/progress cutover decision** — see above; needs your direction on options 1–3 before I write more code here.
3. **Git commit/push** — all of the above (this segment's certificate cutover included) is currently uncommitted in the local working tree. I won't push to `main` without a separate explicit go-ahead.

See `docs/SSO_SETUP.md` for the SSO half of this work, which has its own separate status.
