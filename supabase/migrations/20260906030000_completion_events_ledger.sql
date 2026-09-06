-- Completion events ledger for checklist items, case exercises, and self-attestation.
--
-- Mirrors the quiz_responses pattern from 20260906020000: this table is the only place a
-- learner's checklist toggle, case-exercise completion, or attestation signature is recorded.
-- It has a SELECT policy for the row owner and staff, and deliberately NO insert/update/delete
-- policy for anon/authenticated -- only the record-completion Edge Function (service role) can
-- write to it. That closes the gap flagged in docs/DATABASE_FOUNDATION.md: previously these
-- three fields were only ever set by the client directly inside its own lesson_progress upsert,
-- with no trusted, tamper-resistant record of when/whether they actually happened.
--
-- Scope note (same boundary as the quiz redesign): this closes the "modified browser calls the
-- normal app functions with fabricated state" gap. It does NOT change the lesson_progress RLS
-- policy that still lets a learner UPDATE their own row directly via the raw PostgREST API --
-- that gap (flagged for quiz_score/quiz_attempts in 20260906020000's migration and still open
-- in docs/DATABASE_FOUNDATION.md) is unchanged here and remains its own separate, reviewed
-- follow-up rather than something to fold in silently.

create table if not exists public.completion_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  kind text not null check (kind in ('checklist_item', 'case', 'attestation')),
  item_key text not null,
  checked boolean not null default true,
  payload jsonb not null default '{}'::jsonb,
  recorded_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id, kind, item_key)
);

comment on table public.completion_events is
  'Server-written, tamper-resistant record of checklist/case/attestation completion. Only the record-completion Edge Function (service role) may insert or update rows.';
comment on column public.completion_events.item_key is
  'Checklist item index (as text), case id, or the literal ''attestation''.';
comment on column public.completion_events.payload is
  'Kind-specific detail: case decisions {hostId: chosenOptionIndex}, or an attestation text/version snapshot. Empty for checklist items.';

create index if not exists completion_events_user_lesson_idx
  on public.completion_events (user_id, lesson_id);

alter table public.completion_events enable row level security;

create policy completion_events_select_own_or_staff
  on public.completion_events for select
  using (user_id = auth.uid() or is_staff());

-- No insert/update/delete policy for anon/authenticated: writes are service-role only.
