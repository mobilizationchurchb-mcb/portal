create table if not exists sunday_programs (
  id uuid primary key default gen_random_uuid(),
  program_date date not null,
  mc_name text not null,

  opening_song text,
  opening_prayer text,
  worship_leader text,

  pastor text,

  communion_officiant text,

  tithes_prayer text,
  offering_song text,

  closing_song text,
  closing_prayer text,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Index for date sorting
create index if not exists idx_programs_date
  on sunday_programs (program_date desc);

alter table sunday_programs enable row level security;

-- Allow anonymous INSERT (anyone can save)
create policy "anon can insert programs"
  on sunday_programs for insert
  to anon
  with check (true);

-- Allow anonymous SELECT (anyone can read)
create policy "anon can read programs"
  on sunday_programs for select
  to anon
  using (true);