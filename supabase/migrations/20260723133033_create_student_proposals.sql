/*
# Create student_proposals table (single-tenant, no auth)

1. New Tables
- `student_proposals`
  - `id` (uuid, primary key)
  - `ministry` (text, which ministry the proposal is for: Ta'lim, Sport, Ekologiya, Madaniyat, Innovatsiya, Kommunikatsiya)
  - `full_name` (text, student's full name)
  - `class` (text, student's class/grade, e.g. "9-A")
  - `title` (text, proposal title)
  - `description` (text, detailed proposal description)
  - `status` (text, default 'pending' — pending/reviewed/approved/rejected)
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on `student_proposals`.
- Allow anon + authenticated INSERT (students submit proposals publicly) and SELECT (so the community can see submitted proposals).
- No UPDATE or DELETE from the anon client.
*/

CREATE TABLE IF NOT EXISTS student_proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ministry text NOT NULL,
  full_name text NOT NULL,
  class text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE student_proposals ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_proposals" ON student_proposals;
CREATE POLICY "anon_select_proposals" ON student_proposals FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_proposals" ON student_proposals;
CREATE POLICY "anon_insert_proposals" ON student_proposals FOR INSERT
  TO anon, authenticated WITH CHECK (true);
;

CREATE INDEX IF NOT EXISTS idx_student_proposals_ministry ON student_proposals(ministry);
CREATE INDEX IF NOT EXISTS idx_student_proposals_created_at ON student_proposals(created_at DESC);
