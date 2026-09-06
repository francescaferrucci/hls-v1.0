-- The existing certificates_insert_staff policy allows `is_staff() OR (user_id = auth.uid())`,
-- meaning any authenticated learner can INSERT their own certificate row directly from the
-- client with an arbitrary certificate_number, course_id, and issued_at -- a real self-issuance
-- gap. Certificates should only ever be created by the issue-certificate edge function
-- (service role, bypasses RLS, verifies completion + required sign-offs first) or manually by
-- staff. This migration removes the self-insert path; it does not touch any existing rows
-- (the table has 0 rows today).

drop policy if exists certificates_insert_staff on public.certificates;

create policy certificates_insert_staff on public.certificates
  for insert
  with check (public.is_staff());
