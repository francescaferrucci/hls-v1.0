-- Follow-up to 20260906010500. get_advisors (security) still flagged log_certificate_issuance,
-- log_profile_role_change, log_sign_off_decision, prevent_self_management,
-- protect_profile_privileged_fields, and sync_sso_profile_claims as executable by anon/authenticated
-- even after revoking their role-specific grants. Root cause: these functions were created in
-- migration 20260906010200/010100/010400 with only an explicit `grant ... to service_role`, and
-- never had the default `PUBLIC` EXECUTE grant (auto-added by CREATE FUNCTION) revoked. Every role,
-- including anon and authenticated, implicitly inherits PUBLIC grants, so the PUBLIC grant alone
-- was enough to leave them exposed via PostgREST RPC regardless of role-specific revokes.
-- Purely a GRANT/REVOKE change -- no table, column, policy, or data is touched. service_role
-- access (granted explicitly in each function's originating migration) is unaffected.

revoke execute on function public.log_certificate_issuance() from public;
revoke execute on function public.log_profile_role_change() from public;
revoke execute on function public.log_sign_off_decision() from public;
revoke execute on function public.prevent_self_management() from public;
revoke execute on function public.protect_profile_privileged_fields() from public;
revoke execute on function public.sync_sso_profile_claims() from public;
