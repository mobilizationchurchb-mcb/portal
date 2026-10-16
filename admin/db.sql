-- ============================================================
-- Members table
-- ============================================================
create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  address text,
  birthday date,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_members_name on members (lower(full_name));
create index if not exists idx_members_birthday on members (birthday);

-- ============================================================
-- RLS policies for anon (adjust for production)
-- ============================================================
alter table members enable row level security;

drop policy if exists "anon can read members"   on members;
drop policy if exists "anon can insert members" on members;
drop policy if exists "anon can update members" on members;
drop policy if exists "anon can delete members" on members;

create policy "anon can read members"
  on members for select to anon using (true);

create policy "anon can insert members"
  on members for insert to anon with check (true);

create policy "anon can update members"
  on members for update to anon using (true) with check (true);

create policy "anon can delete members"
  on members for delete to anon using (true);


-- ============================================================
-- Allowed Users table (roles + PINs)
-- ============================================================
create table if not exists allowed_users (
  id uuid primary key default gen_random_uuid(),
  member_id uuid references members(id) on delete set null,
  full_name text not null,
  role text not null check (role in ('prog', 'p&w')),
  pin text not null unique,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_allowed_role on allowed_users (role);
create index if not exists idx_allowed_name on allowed_users (lower(full_name));

-- ============================================================
-- RLS policies for anon (adjust for production)
-- ============================================================
alter table allowed_users enable row level security;

drop policy if exists "anon can read allowed"   on allowed_users;
drop policy if exists "anon can insert allowed" on allowed_users;
drop policy if exists "anon can update allowed" on allowed_users;
drop policy if exists "anon can delete allowed" on allowed_users;

create policy "anon can read allowed"
  on allowed_users for select to anon using (true);

create policy "anon can insert allowed"
  on allowed_users for insert to anon with check (true);

create policy "anon can update allowed"
  on allowed_users for update to anon using (true) with check (true);

create policy "anon can delete allowed"
  on allowed_users for delete to anon using (true);

-- Add status column to allowed_users
alter table allowed_users
  add column if not exists status text not null default 'active'
  check (status in ('active', 'offline'));

-- Optional index
create index if not exists idx_allowed_status on allowed_users (status);