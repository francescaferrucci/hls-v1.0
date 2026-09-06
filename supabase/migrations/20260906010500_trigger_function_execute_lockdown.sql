-- Closes a gap surfaced by get_advisors (security) after migrations 20260906010000-010400:
-- Supabase's project-level default privileges auto-grant EXECUTE on newly created functions to
-- anon and authenticated, independent of any PUBLIC-level revoke. Trigger functions are only ever
-- invoked by the trigger mechanism itself (which does not require the firing role to hold EXECUTE),
-- so they should never be callable directly via the PostgREST /rest/v1/rpc/<fn> surface by anon or
-- authenticated. Two pre-existing trigger functions (handle_new_user, prevent_role_self_escalation)
-- had the same residual anon grant from before this session's work; this migration closes all of it.
-- Purely a GRANT/REVOKE change -- no table, column, policy, or data is touched.

revoke execute on function public.handle_new_user() from anon, authenticated;
revoke execute on function public.prevent_role_self_escalation() from anon, authenticated;
revoke execute on function public.prevent_self_management() from anon, authenticated;
revoke execute on function public.protect_profile_privileged_fields() from anon, authenticated;
revoke execute on function public.sync_sso_profile_claims() from anon, authenticated;
revoke execute on function public.log_profile_role_change() from anon, authenticated;
revoke execute on function public.log_sign_off_decision() from anon, authenticated;
revoke execute on function public.log_certificate_issuance() from anon, authenticated;

-- service_role retains EXECUTE on all of the above (unaffected by this revoke; service_role was
-- granted explicitly in each function's originating migration and is not part of this revoke list).
