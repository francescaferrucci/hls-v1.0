-- Quiz answer-key redaction and server-side scoring boundary.
--
-- Today, lessons.content.modules[].quiz[] questions carry their `correct` answer key and `exp`
-- explanation directly inside the jsonb the client fetches. Any learner -- and, since the
-- original lessons SELECT policy allowed `status = 'published'` for any role including `anon`,
-- literally any unauthenticated visitor holding only the public anon API key -- can read every
-- quiz's full answer key straight out of the network response, before ever answering a single
-- question. This migration closes that at the data layer (not just in client code, which a
-- modified or direct-REST client could bypass):
--
--   1. Adds `redact_lesson_content()`, which strips `correct`/`exp` from each quiz question and
--      replaces them with a `hasKey` boolean, so existing client gating logic
--      (moduleHasAnswerKey / moduleUsesScoring / moduleIsUngradedReview / etc.) keeps working
--      without the browser ever holding the real key.
--   2. Adds a `lessons_public` view over published lessons only, serving redacted content, as the
--      new learner-facing read path.
--   3. Tightens the `lessons` table's SELECT policy to staff-only (is_staff()). The raw,
--      unredacted table -- including drafts -- is no longer selectable by learners or anon at
--      all. Content Studio (staff) keeps reading/writing the base table directly and is
--      unaffected.
--
-- The real-time per-question scoring itself is handled by the new submit-quiz-answer edge
-- function (supabase/functions/submit-quiz-answer), which is the only thing that ever reads the
-- unredacted key, via the service role, and only returns a verdict for a question the learner has
-- just submitted a selection for.
--
-- Explicitly OUT OF SCOPE for this migration (flagged, not silently skipped): Content Studio case
-- decision points (content.cases[].stages[].decision.correct/exp) have the same answer-key shape,
-- but case completion is boolean-only and does not depend on decision correctness for
-- lesson_progress/certificate scoring, so they are left unredacted for now.
--
-- Additive and reversible: no data is deleted, the old `lessons` table and its data are untouched
-- aside from the SELECT policy swap, and the new view/function can be dropped without affecting
-- any other object.

create or replace function public.redact_lesson_content(content jsonb)
returns jsonb
language sql
immutable
as $$
  select case
    when content is null then content
    when content -> 'modules' is null then content
    else jsonb_set(
      content,
      '{modules}',
      coalesce(
        (
          select jsonb_agg(
            case
              when (m -> 'quiz') is null then m
              else jsonb_set(
                m,
                '{quiz}',
                coalesce(
                  (
                    select jsonb_agg(
                      case
                        when (q ? 'correct') then
                          ((q - 'correct') - 'exp') || jsonb_build_object('hasKey', true)
                        else
                          q || jsonb_build_object('hasKey', false)
                      end
                    )
                    from jsonb_array_elements(m -> 'quiz') as q
                  ),
                  '[]'::jsonb
                )
              )
            end
          )
          from jsonb_array_elements(content -> 'modules') as m
        ),
        '[]'::jsonb
      )
    )
  end
$$;

comment on function public.redact_lesson_content(jsonb) is
  'Strips quiz correct/exp answer-key fields from lesson content modules, replacing them with a '
  'hasKey boolean the client uses for gating (scored vs. manual vs. ungraded-review). Used by '
  'lessons_public only -- never applied to the raw lessons table, which stays staff-only. Case '
  'decision points are intentionally left untouched (out of scope, see migration header).';

create or replace view public.lessons_public as
select
  id, course_id, slug, title, summary, sort_order, status, requires_signoff,
  public.redact_lesson_content(content) as content,
  created_at, updated_at
from public.lessons
where status = 'published';

comment on view public.lessons_public is
  'Learner-facing read path for published lessons. Serves redacted content (quiz answer keys '
  'stripped, replaced with a hasKey flag) so the browser never receives a question''s correct '
  'answer before the learner submits a response for it via submit-quiz-answer. Staff/Content '
  'Studio reads must keep using the base lessons table directly (is_staff()-gated), which still '
  'returns full unredacted content including drafts.';

grant select on public.lessons_public to authenticated, anon;

drop policy if exists "lessons_read_published" on public.lessons;

create policy "lessons_read_staff" on public.lessons
  for select
  using (is_staff());
