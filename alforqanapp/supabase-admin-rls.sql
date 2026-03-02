-- Current app architecture uses the public anon key and does not sign admins in.
-- Because of that, Supabase RLS must explicitly allow anon/public writes for
-- the admin-managed tables below, or inserts/updates/deletes will fail.
--
-- Apply this in Supabase SQL Editor.
-- This is permissive and suitable only for the current no-auth setup.
-- If you add admin authentication later, replace these policies with auth-based ones.

-- Content tables
alter table public.announcements enable row level security;
alter table public.events enable row level security;
alter table public.achievements enable row level security;
alter table public.gallery_items enable row level security;

-- Scout division admin tables
alter table public.scout_divisions enable row level security;
alter table public.scout_members enable row level security;
alter table public.scout_roles enable row level security;

-- Read policies
drop policy if exists "public read announcements" on public.announcements;
create policy "public read announcements"
on public.announcements for select
to public
using (true);

drop policy if exists "public read events" on public.events;
create policy "public read events"
on public.events for select
to public
using (true);

drop policy if exists "public read achievements" on public.achievements;
create policy "public read achievements"
on public.achievements for select
to public
using (true);

drop policy if exists "public read gallery_items" on public.gallery_items;
create policy "public read gallery_items"
on public.gallery_items for select
to public
using (true);

drop policy if exists "public read scout_divisions" on public.scout_divisions;
create policy "public read scout_divisions"
on public.scout_divisions for select
to public
using (true);

drop policy if exists "public read scout_members" on public.scout_members;
create policy "public read scout_members"
on public.scout_members for select
to public
using (true);

drop policy if exists "public read scout_roles" on public.scout_roles;
create policy "public read scout_roles"
on public.scout_roles for select
to public
using (true);

-- Write policies for the in-app admin dashboard
drop policy if exists "public write announcements" on public.announcements;
create policy "public write announcements"
on public.announcements for all
to public
using (true)
with check (true);

drop policy if exists "public write events" on public.events;
create policy "public write events"
on public.events for all
to public
using (true)
with check (true);

drop policy if exists "public write achievements" on public.achievements;
create policy "public write achievements"
on public.achievements for all
to public
using (true)
with check (true);

drop policy if exists "public write gallery_items" on public.gallery_items;
create policy "public write gallery_items"
on public.gallery_items for all
to public
using (true)
with check (true);

drop policy if exists "public write scout_divisions" on public.scout_divisions;
create policy "public write scout_divisions"
on public.scout_divisions for all
to public
using (true)
with check (true);

drop policy if exists "public write scout_members" on public.scout_members;
create policy "public write scout_members"
on public.scout_members for all
to public
using (true)
with check (true);

drop policy if exists "public write scout_roles" on public.scout_roles;
create policy "public write scout_roles"
on public.scout_roles for all
to public
using (true)
with check (true);

-- Storage bucket used by the admin image uploader
insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true)
on conflict (id) do update
set public = excluded.public;

drop policy if exists "public read uploads bucket" on storage.objects;
create policy "public read uploads bucket"
on storage.objects for select
to public
using (bucket_id = 'uploads');

drop policy if exists "public write uploads bucket" on storage.objects;
create policy "public write uploads bucket"
on storage.objects for all
to public
using (bucket_id = 'uploads')
with check (bucket_id = 'uploads');
