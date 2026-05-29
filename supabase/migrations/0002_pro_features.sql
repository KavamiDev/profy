-- =====================================================
--  Profyl — features Pro : passes (pro_until), domaine
--  custom, et stats de vues. À exécuter dans Supabase
--  SQL Editor après 0001_init.sql.
-- =====================================================

-- -----------------------------------------------------
--  profiles : accès Pro borné dans le temps + domaine custom
-- -----------------------------------------------------

-- Accès Pro = pro_until > now(). NULL ou passé => Free.
-- Un "pack" (paiement unique) pose/prolonge cette date.
alter table public.profiles
  add column if not exists pro_until timestamptz;

-- Domaine custom branché par l'utilisateur (Pro).
alter table public.profiles
  add column if not exists custom_domain citext unique;

alter table public.profiles
  add column if not exists custom_domain_verified boolean not null default false;

-- Lookup rapide domaine -> profil dans le middleware (proxy.ts).
create index if not exists profiles_custom_domain_idx
  on public.profiles(custom_domain)
  where custom_domain is not null;

-- -----------------------------------------------------
--  TABLE: profile_views — analytics de vues anonymes
--  RGPD-friendly : aucune IP brute stockée, pays au mieux.
-- -----------------------------------------------------

create table if not exists public.profile_views (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  viewed_at timestamptz not null default now(),
  -- "linkedin.com", "google.com", "direct"... (host du referer, jamais l'URL complète)
  referer_host text,
  -- code pays ISO-2 (header Vercel x-vercel-ip-country), niveau pays = OK RGPD
  country text
);

create index if not exists profile_views_profile_time_idx
  on public.profile_views(profile_id, viewed_at desc);

alter table public.profile_views enable row level security;

-- Les inserts se font via le client admin (service_role bypass RLS) depuis la
-- page publique. On n'ouvre donc PAS d'insert à anon.
-- Le owner peut lire les vues de SON profil uniquement.
drop policy if exists "Owners read their profile views" on public.profile_views;
create policy "Owners read their profile views"
  on public.profile_views
  for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles p
      where p.id = profile_views.profile_id
        and p.user_id = auth.uid()
    )
  );
