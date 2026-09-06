-- Closes three gaps against the roadmap's target data model (Appendix A):
--  1. Course content is currently mutable in place (lessons.content jsonb edited live) with no
--     record of what a learner actually saw when they completed a lesson. course_versions adds
--     an immutable, publishable snapshot layer on top of the existing lessons/courses tables
--     without restructuring them.
--  2. lesson_progress only stores the latest aggregated quiz_score/quiz_attempts -- there is no
--     per-attempt audit trail. assessment_attempts adds that, and is designed to be written only
--     by a trusted server-side function (see supabase/functions/submit-assessment-attempt), never
--     directly by the client.
--  3. sign_offs represents lesson-level approval only; competencies lets a sign-off represent a
--     reusable clinical/operational competency (with its own review requirements and expiry),
--     separate from any single lesson.
-- An audit_log table is added for tamper-evident tracking of sensitive state changes.

-- 1. Course versions -------------------------------------------------------

create table if not exists public.course_versions (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  version_number int not null,
  status text not null default 'draft' check (status in ('draft', 'published', 'withdrawn')),
  content_snapshot jsonb not null default '{}',
  learning_objectives_snapshot jsonb not null default '[]',
  published_at timestamptz,
  published_by uuid references public.profiles(id),
  effective_date date,
  withdrawn_at timestamptz,
  withdrawal_reason text,
  created_at timestamptz not null default now(),
  unique (course_id, version_number)
);

comment on table public.course_versions is
  'Immutable snapshots of course/lesson content at the moment of publish. lessons/courses remain the editable working copy; a version freezes it for audit and for pinning learner completions to what they actually saw.';

alter table public.lessons
  add column if not exists pass_threshold numeric not null default 80
    check (pass_threshold >= 0 and pass_threshold <= 100);

comment on column public.lessons.pass_threshold is
  'Minimum score (0-100) required to pass this lesson''s quiz. Enforced server-side in submit-assessment-attempt, never trusted from the client.';

alter table public.assignments
  add column if not exists course_version_id uuid references public.course_versions(id);

alter table public.course_versions enable row level security;

create policy course_versions_read_published on public.course_versions
  for select
  using (status = 'published' or public.is_staff());

create policy course_versions_write_content_manager on public.course_versions
  for insert
  with check (public.is_content_manager());

create policy course_versions_update_content_manager on public.course_versions
  for update
  using (public.is_content_manager());

-- 2. Assessment attempts (trusted server-write audit trail) ----------------

create table if not exists public.assessment_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  course_version_id uuid references public.course_versions(id),
  attempt_number int not null,
  answers jsonb not null default '{}',
  score numeric,
  max_score numeric,
  passed boolean,
  started_at timestamptz not null default now(),
  submitted_at timestamptz,
  scoring_source text not null default 'server' check (scoring_source = 'server'),
  created_at timestamptz not null default now(),
  unique (user_id, lesson_id, attempt_number)
);

comment on table public.assessment_attempts is
  'Per-attempt, immutable audit trail of quiz submissions. scoring_source is pinned to ''server'' -- rows are written only by the submit-assessment-attempt edge function using the service role, never by direct client insert, so a learner cannot fabricate a passing score.';

alter table public.assessment_attempts enable row level security;

-- Read-only for the client. No INSERT/UPDATE policy is defined for authenticated/anon, so RLS
-- denies those by default; only the service role (which bypasses RLS) can write.
create policy assessment_attempts_select_own on public.assessment_attempts
  for select
  using (user_id = auth.uid() or public.is_staff());

-- 3. Competencies -----------------------------------------------------------

create table if not exists public.competencies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  requires_clinical_review boolean not null default false,
  eligible_reviewer_roles text[] not null default array['facilitator', 'manager', 'administrator'],
  evidence_type text,
  expiry_interval_months int,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

comment on table public.competencies is
  'Reusable clinical/operational competencies that a sign-off can attest to, independent of any single lesson. Candidate v1 shape -- ratify reviewer-role eligibility against D-03 before treating as final.';

alter table public.sign_offs
  add column if not exists competency_id uuid references public.competencies(id),
  add column if not exists evidence_url text,
  add column if not exists expires_at timestamptz;

alter table public.competencies enable row level security;

create policy competencies_read_authenticated on public.competencies
  for select
  using (auth.role() = 'authenticated');

create policy competencies_write_staff on public.competencies
  for insert
  with check (public.is_staff());

create policy competencies_update_staff on public.competencies
  for update
  using (public.is_staff());

-- 4. Audit log ---------------------------------------------------------------

create table if not exists public.audit_log (
  id uuid primary key default gen_random_uuid(),
  occurred_at timestamptz not null default now(),
  actor_id uuid references public.profiles(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  before_state jsonb,
  after_state jsonb,
  metadata jsonb not null default '{}'
);

comment on table public.audit_log is
  'Tamper-evident log of sensitive state changes (role changes, sign-off decisions, certificate issuance, course version publish/withdraw). Written by triggers and trusted edge functions using the service role; no client insert/update policy exists.';

create index if not exists audit_log_entity_idx on public.audit_log (entity_type, entity_id);
create index if not exists audit_log_actor_idx on public.audit_log (actor_id);

alter table public.audit_log enable row level security;

create policy audit_log_select_admin on public.audit_log
  for select
  using (public.is_admin());

-- 5. Audit triggers on the most sensitive existing tables --------------------

create or replace function public.log_profile_role_change()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if new.role is distinct from old.role or new.active is distinct from old.active then
    insert into public.audit_log (actor_id, action, entity_type, entity_id, before_state, after_state)
    values (
      auth.uid(),
      'profile_role_or_status_change',
      'profiles',
      new.id,
      jsonb_build_object('role', old.role, 'active', old.active),
      jsonb_build_object('role', new.role, 'active', new.active)
    );
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_log_profile_role_change on public.profiles;
create trigger trg_log_profile_role_change
  after update on public.profiles
  for each row execute function public.log_profile_role_change();

grant execute on function public.log_profile_role_change() to service_role;

create or replace function public.log_sign_off_decision()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if new.status is distinct from old.status then
    insert into public.audit_log (actor_id, action, entity_type, entity_id, before_state, after_state)
    values (
      auth.uid(),
      'sign_off_decision',
      'sign_offs',
      new.id,
      jsonb_build_object('status', old.status),
      jsonb_build_object('status', new.status, 'facilitator_id', new.facilitator_id, 'notes', new.notes)
    );
  end if;
  return new;
end;
$function$;

drop trigger if exists trg_log_sign_off_decision on public.sign_offs;
create trigger trg_log_sign_off_decision
  after update on public.sign_offs
  for each row execute function public.log_sign_off_decision();

grant execute on function public.log_sign_off_decision() to service_role;

create or replace function public.log_certificate_issuance()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  insert into public.audit_log (actor_id, action, entity_type, entity_id, after_state)
  values (
    auth.uid(),
    'certificate_issued',
    'certificates',
    new.id,
    jsonb_build_object('user_id', new.user_id, 'course_id', new.course_id, 'certificate_number', new.certificate_number)
  );
  return new;
end;
$function$;

drop trigger if exists trg_log_certificate_issuance on public.certificates;
create trigger trg_log_certificate_issuance
  after insert on public.certificates
  for each row execute function public.log_certificate_issuance();

grant execute on function public.log_certificate_issuance() to service_role;
