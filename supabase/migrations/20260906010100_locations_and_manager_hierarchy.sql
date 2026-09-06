-- Adds the organizational hierarchy the roadmap's D-06 decision requires: named locations
-- and an effective-dated manager relationship on profiles, plus identity/provisioning
-- fields needed once corporate SSO/HRIS provisioning (D-04/D-05) replaces manual signup.
-- This is additive only -- no existing column is altered or dropped.

create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text not null unique,
  market text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

comment on table public.locations is
  'Candidate v1 location list. Ratify against D-06 before treating as authoritative for manager scoping.';

alter table public.profiles
  add column if not exists location_id uuid references public.locations(id),
  add column if not exists manager_id uuid references public.profiles(id),
  add column if not exists employee_id text unique,
  add column if not exists sso_subject text,
  add column if not exists provisioned_via text not null default 'manual'
    check (provisioned_via in ('manual', 'sso', 'hris_import')),
  add column if not exists last_synced_at timestamptz;

comment on column public.profiles.location is
  'Deprecated free-text location. Retained for backward compatibility with existing rows; use location_id going forward.';
comment on column public.profiles.manager_id is
  'Direct manager only (v1). Multi-level/matrix reporting is a later maturity item per D-06.';
comment on column public.profiles.provisioned_via is
  'How this profile was created: manual (current prototype signup), sso (corporate IdP), or hris_import.';

-- A profile cannot be its own manager, and a self-referential FK on a UUID PK cannot express
-- "not equal to self" as a simple check without referencing the row's own id, so enforce with a trigger.
create or replace function public.prevent_self_management()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if new.manager_id is not null and new.manager_id = new.id then
    raise exception 'A profile cannot be its own manager';
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_prevent_self_management on public.profiles;
create trigger trg_prevent_self_management
  before insert or update of manager_id on public.profiles
  for each row execute function public.prevent_self_management();

grant execute on function public.prevent_self_management() to service_role;

-- Helper used by RLS policies: is the current user the direct manager of the target profile?
create or replace function public.is_direct_manager_of(target_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path to 'public'
as $function$
  select exists (
    select 1 from public.profiles
    where id = target_user_id and manager_id = auth.uid()
  );
$function$;

revoke execute on function public.is_direct_manager_of(uuid) from public, anon;
grant execute on function public.is_direct_manager_of(uuid) to authenticated, service_role;

alter table public.locations enable row level security;

create policy locations_read_authenticated on public.locations
  for select
  using (auth.role() = 'authenticated');

create policy locations_write_staff on public.locations
  for insert
  with check (public.is_staff());

create policy locations_update_staff on public.locations
  for update
  using (public.is_staff());

create policy locations_delete_admin on public.locations
  for delete
  using (public.is_admin());

-- Close a real gap in the existing profiles_update_own policy: a learner could update their
-- own row (id = auth.uid()) and change active/location/job_title/location_id/manager_id, which
-- would let a self-service user bypass deactivation or manager-scoped reporting. Role changes
-- were already blocked by prevent_role_self_escalation; extend the same protection to these
-- fields for anyone who is not an admin.
create or replace function public.protect_profile_privileged_fields()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if auth.uid() is not null and not public.is_admin() then
    if new.active is distinct from old.active
       or new.location_id is distinct from old.location_id
       or new.manager_id is distinct from old.manager_id
       or new.job_title is distinct from old.job_title
       or new.employee_id is distinct from old.employee_id
       or new.provisioned_via is distinct from old.provisioned_via
    then
      raise exception 'Only administrators can change location, manager, job title, employee ID, active status, or provisioning source';
    end if;
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_protect_profile_privileged_fields on public.profiles;
create trigger trg_protect_profile_privileged_fields
  before update on public.profiles
  for each row execute function public.protect_profile_privileged_fields();

grant execute on function public.protect_profile_privileged_fields() to service_role;
