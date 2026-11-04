-- Run this entire file in Supabase Dashboard > SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  phone text,
  email text,
  bio text,
  photo_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.members enable row level security;

-- Anyone can view the public member directory.
drop policy if exists "Public can view members" on public.members;
create policy "Public can view members"
on public.members for select
to anon, authenticated
using (true);

-- Only accounts explicitly added to this admin allow-list can change member records.
create table if not exists public.site_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.site_admins enable row level security;

drop policy if exists "Admins can view admin list" on public.site_admins;
create policy "Admins can view admin list"
on public.site_admins for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Admins can insert members" on public.members;
create policy "Admins can insert members"
on public.members for insert
to authenticated
with check (exists (select 1 from public.site_admins a where a.user_id = auth.uid()));

drop policy if exists "Admins can update members" on public.members;
create policy "Admins can update members"
on public.members for update
to authenticated
using (exists (select 1 from public.site_admins a where a.user_id = auth.uid()))
with check (exists (select 1 from public.site_admins a where a.user_id = auth.uid()));

drop policy if exists "Admins can delete members" on public.members;
create policy "Admins can delete members"
on public.members for delete
to authenticated
using (exists (select 1 from public.site_admins a where a.user_id = auth.uid()));

-- Create the storage bucket for member profile images.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('member-photos', 'member-photos', true, 3145728, array['image/jpeg','image/png','image/webp'])
on conflict (id) do nothing;

drop policy if exists "Public can view member photos" on storage.objects;
create policy "Public can view member photos"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'member-photos');

drop policy if exists "Admins can upload member photos" on storage.objects;
create policy "Admins can upload member photos"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'member-photos'
  and exists (select 1 from public.site_admins a where a.user_id = auth.uid())
);

drop policy if exists "Admins can update member photos" on storage.objects;
create policy "Admins can update member photos"
on storage.objects for update
to authenticated
using (
  bucket_id = 'member-photos'
  and exists (select 1 from public.site_admins a where a.user_id = auth.uid())
);

drop policy if exists "Admins can delete member photos" on storage.objects;
create policy "Admins can delete member photos"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'member-photos'
  and exists (select 1 from public.site_admins a where a.user_id = auth.uid())
);

-- After creating your admin user in Authentication > Users, run:
-- insert into public.site_admins (user_id)
-- values ('PASTE-THE-ADMIN-USER-UUID-HERE');
