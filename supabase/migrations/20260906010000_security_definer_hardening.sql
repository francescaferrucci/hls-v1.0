-- Security hardening: helper functions used inside RLS policies (is_admin, is_staff,
-- is_content_manager) and lifecycle triggers (handle_new_user, prevent_role_self_escalation)
-- were publicly executable via PostgREST RPC (e.g. /rest/v1/rpc/is_admin), flagged by the
-- Supabase security advisor. These must remain executable by `authenticated` (RLS policies
-- run under the querying role and need EXECUTE), but must NOT be callable by anonymous users
-- or via the default PUBLIC grant.

revoke execute on function public.handle_new_user() from public;
revoke execute on function public.is_admin() from public;
revoke execute on function public.is_content_manager() from public;
revoke execute on function public.is_staff() from public;
revoke execute on function public.prevent_role_self_escalation() from public;

revoke execute on function public.is_admin() from anon;
revoke execute on function public.is_content_manager() from anon;
revoke execute on function public.is_staff() from anon;

grant execute on function public.is_admin() to authenticated, service_role;
grant execute on function public.is_content_manager() to authenticated, service_role;
grant execute on function public.is_staff() to authenticated, service_role;
grant execute on function public.handle_new_user() to service_role;
grant execute on function public.prevent_role_self_escalation() to service_role;
