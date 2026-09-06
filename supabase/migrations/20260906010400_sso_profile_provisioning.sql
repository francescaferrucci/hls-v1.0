-- Prepares profile provisioning for corporate SSO (Supabase Auth SAML 2.0 for Projects --
-- requires upgrading the Supabase org to Pro or above; see docs/SSO_SETUP.md). When a SAML
-- identity provider is configured with attribute mappings, Supabase Auth writes mapped
-- attributes (e.g. department, employee_id, job_title) into auth.users.raw_user_meta_data on
-- every sign-in, and identifies the SSO connection as auth.identities.provider = 'sso:<uuid>'.
-- This migration teaches handle_new_user to seed those claims on first sign-in, and adds an
-- update-path trigger to keep them in sync on later logins -- without ever overwriting fields
-- an administrator has manually edited (provisioned_via stays 'manual' unless the profile was
-- actually created via an SSO sign-in).

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  is_sso boolean;
  claim_employee_id text;
  claim_job_title text;
  claim_location_code text;
  resolved_location_id uuid;
begin
  is_sso := exists (
    select 1 from auth.identities
    where user_id = new.id and provider like 'sso:%'
  );

  claim_employee_id := new.raw_user_meta_data->>'employee_id';
  claim_job_title := coalesce(new.raw_user_meta_data->>'job_title', new.raw_user_meta_data->>'title');
  claim_location_code := new.raw_user_meta_data->>'location_code';

  if claim_location_code is not null then
    select id into resolved_location_id from public.locations where code = claim_location_code;
  end if;

  insert into public.profiles (
    id, email, full_name, employee_id, job_title, location_id, sso_subject, provisioned_via, last_synced_at
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    claim_employee_id,
    claim_job_title,
    resolved_location_id,
    case when is_sso then new.id::text else null end,
    case when is_sso then 'sso' else 'manual' end,
    case when is_sso then now() else null end
  );
  return new;
end;
$function$;

comment on function public.handle_new_user() is
  'Fires on auth.users insert. Seeds public.profiles, and when the account was created via an SSO identity, pulls mapped SAML claims (employee_id, job_title, location_code) into the profile. Role always defaults to the profiles table default (learner) regardless of any IdP-asserted role claim -- role escalation must go through prevent_role_self_escalation and an explicit administrator action, never an IdP attribute, until D-03/D-04 are ratified.';

-- Re-sync path: Supabase Auth updates auth.users.raw_user_meta_data on subsequent SSO logins.
-- Only apply the sync when the profile was originally provisioned via SSO, so a manually
-- created or manually edited profile is never silently overwritten by stale or incorrect IdP data.
create or replace function public.sync_sso_profile_claims()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
  claim_employee_id text;
  claim_job_title text;
  claim_location_code text;
  resolved_location_id uuid;
begin
  if new.raw_user_meta_data is distinct from old.raw_user_meta_data then
    if exists (select 1 from public.profiles where id = new.id and provisioned_via = 'sso') then
      claim_employee_id := new.raw_user_meta_data->>'employee_id';
      claim_job_title := coalesce(new.raw_user_meta_data->>'job_title', new.raw_user_meta_data->>'title');
      claim_location_code := new.raw_user_meta_data->>'location_code';

      if claim_location_code is not null then
        select id into resolved_location_id from public.locations where code = claim_location_code;
      end if;

      update public.profiles
      set
        employee_id = coalesce(claim_employee_id, employee_id),
        job_title = coalesce(claim_job_title, job_title),
        location_id = coalesce(resolved_location_id, location_id),
        last_synced_at = now()
      where id = new.id;
    end if;
  end if;
  return new;
end;
$function$;

comment on function public.sync_sso_profile_claims() is
  'Keeps profiles in sync with IdP-asserted attributes on every SSO login, but only for profiles originally provisioned via SSO. Never touches role or active -- those remain administrator-controlled per prevent_role_self_escalation / protect_profile_privileged_fields.';

drop trigger if exists trg_sync_sso_profile_claims on auth.users;
create trigger trg_sync_sso_profile_claims
  after update on auth.users
  for each row execute function public.sync_sso_profile_claims();

grant execute on function public.sync_sso_profile_claims() to service_role;
