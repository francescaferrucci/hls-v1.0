-- Quiz response ledger: server-side source of truth for per-question quiz answers.
--
-- Why this exists: `submit-quiz-answer` already scores each question server-side and never
-- reveals the answer key up front, but it was stateless -- it returned a verdict without
-- recording it anywhere. That left the *aggregate* module/lesson score dependent on the
-- browser's own tally of those verdicts (quizAnswers), which a modified client could still
-- fabricate without ever calling the server. This table gives a subsequent trusted
-- "finalize module attempt" step something authoritative to read instead of trusting the
-- client's tally.
--
-- Only server code (the service role inside edge functions) ever writes here. Learners and
-- staff may read their own/any rows for transparency, but cannot insert or update directly --
-- RLS below grants SELECT only, no INSERT/UPDATE/DELETE policy for authenticated/anon, so those
-- roles are fully denied write access at the database layer even if a client tried to call
-- PostgREST directly.

create table if not exists public.quiz_responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  module_id text not null,
  question_index integer not null,
  selected jsonb not null,
  is_correct boolean not null,
  answered_at timestamptz not null default now(),
  unique (user_id, lesson_id, module_id, question_index)
);

comment on table public.quiz_responses is
  'Server-verified per-question quiz answers. Written only by the submit-quiz-answer edge function (service role). Source of truth for finalize-module-attempt scoring in submit-assessment-attempt.';

alter table public.quiz_responses enable row level security;

-- Learners can see their own answer history; staff can see everyone's (support/audit).
-- No insert/update/delete policy is defined for authenticated/anon on purpose -- only the
-- service role (which bypasses RLS) may write, so this table cannot be tampered with via the
-- client-side Supabase SDK no matter what the browser sends.
create policy quiz_responses_select_own_or_staff
  on public.quiz_responses
  for select
  to authenticated
  using (auth.uid() = user_id or is_staff());

grant select on public.quiz_responses to authenticated;
