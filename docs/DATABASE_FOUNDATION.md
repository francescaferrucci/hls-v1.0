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

- **`submit-assessment-attempt`** ("finalize-module-attempt", redesigned — see update below) — the client sends only `{lesson_id, module_id}`, no answers and no claimed score. The function reads its own `quiz_responses` ledger (see below) for that user/lesson/module, computes the score itself, writes an immutable `assessment_attempts` row, and updates `lesson_progress.quiz_score`/`quiz_attempts`/`detail.moduleScores`/`detail.moduleProgress` for that module only. It never trusts a score, answer, or correctness flag sent by the client.
- **`submit-quiz-answer`** — the trusted per-question boundary. The client never receives a question's answer key up front; it submits a selection for one question at a time, the function scores it server-side (via `lessons_public`'s redacted content on the read side, and the real `lessons.content` on the service-role write side) and returns only the verdict. Every verified verdict is also persisted to `quiz_responses` so `submit-assessment-attempt` has an authoritative ledger to finalize against.
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

**Done — option 3 (the fuller fix) plus the module-scoring redesign, both shipped:**

The blocker above had two parts, and both are now closed:

1. **Answer-key exposure** — `lessons.content.quiz[].correct`/`.exp` no longer reaches the browser for any DB-backed lesson before it's answered. Learners read lesson content through the new `lessons_public` view (via `redact_lesson_content()`), which strips `correct`/`exp` from every quiz question and replaces them with a boolean `hasKey` flag. `submit-quiz-answer` is the only code path that ever reads the real `correct`/`exp` values (via the service role, straight from the base `lessons` table), and only after the learner has submitted a selection for that specific question. The quiz modal (`assets/app.js`) awaits that function's verdict before painting correct/incorrect instead of computing it locally.
2. **Flat-schema mismatch** — `submit-assessment-attempt` no longer assumes `lessons.quiz`/`lessons.pass_threshold` (both dead columns, always empty in every real lesson). It's been redesigned as a **finalize-module-attempt** endpoint: the client sends only `{lesson_id, module_id}`; the function reads its own `quiz_responses` ledger (populated question-by-question by `submit-quiz-answer` as the learner answers) to see what that learner has actually gotten right for that module's `content.modules[].quiz`, computes the score itself against the module's own `passThreshold` (default 75, matching the client default), and only then writes an `assessment_attempts` row and merges the result into `lesson_progress` (`quiz_score`, `quiz_attempts`, `detail.moduleScores[module_id]`, `detail.moduleProgress[module_id]`).

`saveProgress()` in `assets/app.js` still owns the non-quiz parts of `lesson_progress` (checklist, case completion, self-attestation, overall `status`/`completed_at`) exactly as before — those have no secret answer key to protect and remain self-reported by design. It now deliberately **omits** `quiz_score`/`quiz_attempts` from its own upsert whenever the lesson has scored modules, so its write can never clobber the values `submit-assessment-attempt` just computed server-side; Postgrest's upsert leaves omitted columns untouched on conflict.

New table: `quiz_responses` (migration `20260906020000_quiz_response_ledger.sql`) — one row per (user, lesson, module, question), written only by `submit-quiz-answer`'s service-role client. RLS grants learners/staff read access to their own/any rows for transparency, but there is no insert/update/delete policy for `authenticated`/`anon` at all, so the ledger cannot be tampered with via the client-side SDK even if a modified browser tried.

**Residual, explicitly out of scope:** checklist items, case-exercise completion, and self-attestation remain entirely client-reported (`st.casesCompleted`, `st.checklist`, `st.attested` inside `lesson_progress.detail`). There's no secret answer key to protect for those — a case exercise doesn't have a hidden "correct" the client could leak — but a modified browser could still mark them done without actually completing them. Flagging this as a known, lower-priority follow-up rather than fixing it silently; happy to design a similar trusted-ledger pattern for cases if/when that's a priority.

## Still open / needs your input

1. Your call on the manager-scoping and role-catalog items above, whenever the D-03/D-06 decisions are ready — no action needed now.
2. **Checklist/case/attestation self-reporting** — see "Residual, explicitly out of scope" above. Not currently trusted-server-verified; no action needed unless you want to prioritize it.
3. **Git commit/push** — this work is currently uncommitted in the local working tree pending its own explicit go-ahead, separate from any Supabase-apply approval.

See `docs/SSO_SETUP.md` for the SSO half of this work, which has its own separate status.
