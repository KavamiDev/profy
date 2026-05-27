-- =====================================================
--  Profyl — schema initial
--  À exécuter dans Supabase SQL Editor (Project → SQL).
-- =====================================================

-- citext pour usernames case-insensitive
create extension if not exists citext;

-- =====================================================
--  TABLE: profiles
--  Un user Supabase Auth ↔ un profil Profyl.
-- =====================================================

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  username citext not null unique,
  content jsonb not null default '{}'::jsonb,
  plan text not null default 'free' check (plan in ('free', 'pro', 'studio')),
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint username_format check (username ~ '^[a-z0-9-]{3,30}$')
);

-- Un user ne peut avoir qu'UN profil (pour le moment — Studio le lèvera).
create unique index if not exists profiles_user_id_unique
  on public.profiles(user_id);

create index if not exists profiles_username_idx
  on public.profiles(username);

create index if not exists profiles_status_idx
  on public.profiles(status)
  where status = 'published';

-- Auto-update updated_at
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row
  execute function public.touch_updated_at();

-- =====================================================
--  TABLE: reserved_usernames
--  Blacklist de noms qu'on ne veut pas voir réclamés.
-- =====================================================

create table if not exists public.reserved_usernames (
  username citext primary key,
  reason text
);

insert into public.reserved_usernames (username, reason) values
  ('admin', 'system'),
  ('api', 'system'),
  ('www', 'system'),
  ('app', 'system'),
  ('dashboard', 'system'),
  ('login', 'system'),
  ('logout', 'system'),
  ('signup', 'system'),
  ('signin', 'system'),
  ('register', 'system'),
  ('auth', 'system'),
  ('pricing', 'system'),
  ('billing', 'system'),
  ('checkout', 'system'),
  ('account', 'system'),
  ('settings', 'system'),
  ('profile', 'system'),
  ('blog', 'system'),
  ('news', 'system'),
  ('help', 'system'),
  ('support', 'system'),
  ('faq', 'system'),
  ('about', 'system'),
  ('contact', 'system'),
  ('terms', 'system'),
  ('privacy', 'system'),
  ('legal', 'system'),
  ('cgu', 'system'),
  ('cgv', 'system'),
  ('mentions-legales', 'system'),
  ('confidentialite', 'system'),
  ('rgpd', 'system'),
  ('cookies', 'system'),
  ('profyl', 'brand'),
  ('marie-laurent', 'demo')
on conflict (username) do nothing;

-- =====================================================
--  RLS — Row Level Security
-- =====================================================

alter table public.profiles enable row level security;
alter table public.profiles force row level security;

alter table public.reserved_usernames enable row level security;

-- Anyone (anon + authenticated) peut LIRE les profils publiés.
drop policy if exists "Published profiles are public" on public.profiles;
create policy "Published profiles are public"
  on public.profiles
  for select
  using (status = 'published');

-- Les owners peuvent lire leur propre profil (même draft).
drop policy if exists "Owners read their own profile" on public.profiles;
create policy "Owners read their own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = user_id);

-- Les owners peuvent insérer leur propre profil.
drop policy if exists "Owners insert their own profile" on public.profiles;
create policy "Owners insert their own profile"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = user_id);

-- Les owners peuvent updater leur propre profil.
drop policy if exists "Owners update their own profile" on public.profiles;
create policy "Owners update their own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Les owners peuvent supprimer leur propre profil.
drop policy if exists "Owners delete their own profile" on public.profiles;
create policy "Owners delete their own profile"
  on public.profiles
  for delete
  to authenticated
  using (auth.uid() = user_id);

-- Reserved usernames : lecture publique (pour le check de dispo).
drop policy if exists "Reserved usernames are readable" on public.reserved_usernames;
create policy "Reserved usernames are readable"
  on public.reserved_usernames
  for select
  using (true);

-- =====================================================
--  RPC: claim_username
--  Permet à un user authentifié de réserver un username
--  ATOMIQUEMENT (transaction → pas de race condition).
-- =====================================================

create or replace function public.claim_username(p_username text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_normalized citext := lower(trim(p_username))::citext;
begin
  if v_uid is null then
    return jsonb_build_object('ok', false, 'reason', 'unauthenticated');
  end if;

  -- Format
  if v_normalized !~ '^[a-z0-9-]{3,30}$' then
    return jsonb_build_object('ok', false, 'reason', 'invalid_format');
  end if;

  -- Réservé ?
  if exists (select 1 from public.reserved_usernames where username = v_normalized) then
    return jsonb_build_object('ok', false, 'reason', 'reserved');
  end if;

  -- Déjà pris ?
  if exists (select 1 from public.profiles where username = v_normalized) then
    -- C'est peut-être le nôtre ? OK.
    if exists (select 1 from public.profiles where username = v_normalized and user_id = v_uid) then
      return jsonb_build_object('ok', true, 'reason', 'already_yours');
    end if;
    return jsonb_build_object('ok', false, 'reason', 'taken');
  end if;

  -- Le user a-t-il déjà un profil ? Rename si oui.
  if exists (select 1 from public.profiles where user_id = v_uid) then
    update public.profiles
      set username = v_normalized
      where user_id = v_uid;
    return jsonb_build_object('ok', true, 'reason', 'renamed');
  end if;

  -- Sinon : créer un profil draft vide.
  insert into public.profiles (user_id, username, status, content)
    values (v_uid, v_normalized, 'draft', '{}'::jsonb);

  return jsonb_build_object('ok', true, 'reason', 'created');
end;
$$;

grant execute on function public.claim_username(text) to authenticated;

-- =====================================================
--  STORAGE: bucket avatars
--  À créer manuellement dans Storage → New bucket "avatars" (public).
--  Les policies ci-dessous s'appliquent ensuite.
-- =====================================================

-- Anyone peut lire les avatars (bucket public).
-- (créer aussi la policy dans Supabase UI si besoin)

-- Les users authentifiés peuvent uploader DANS LEUR PROPRE DOSSIER `avatars/<user_id>/...`
do $$
begin
  -- Cette section échoue silencieusement si le bucket n'existe pas — c'est OK.
  if exists (select 1 from storage.buckets where id = 'avatars') then
    drop policy if exists "Avatars publicly readable" on storage.objects;
    create policy "Avatars publicly readable"
      on storage.objects for select
      using (bucket_id = 'avatars');

    drop policy if exists "Users upload their own avatar" on storage.objects;
    create policy "Users upload their own avatar"
      on storage.objects for insert
      to authenticated
      with check (
        bucket_id = 'avatars'
        and (storage.foldername(name))[1] = auth.uid()::text
      );

    drop policy if exists "Users update their own avatar" on storage.objects;
    create policy "Users update their own avatar"
      on storage.objects for update
      to authenticated
      using (
        bucket_id = 'avatars'
        and (storage.foldername(name))[1] = auth.uid()::text
      );

    drop policy if exists "Users delete their own avatar" on storage.objects;
    create policy "Users delete their own avatar"
      on storage.objects for delete
      to authenticated
      using (
        bucket_id = 'avatars'
        and (storage.foldername(name))[1] = auth.uid()::text
      );
  end if;
end $$;
