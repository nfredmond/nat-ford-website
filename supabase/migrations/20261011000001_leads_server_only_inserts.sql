-- Leads are written only by /api/leads, which uses the service-role key and
-- applies spam checks, Turnstile, and per-email and per-IP rate limits.
-- The public insert policy let anyone holding the anon key (shipped in the
-- browser bundle) skip all of that and write rows directly. With RLS on and
-- no insert policy, anon and authenticated inserts are denied; the service
-- role bypasses RLS and is unaffected.
drop policy if exists allow_public_insert_leads on public.leads;
