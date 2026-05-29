-- =====================================================
--  Profyl — idempotence des webhooks Stripe.
--  On enregistre chaque event.id traité pour ne jamais
--  appliquer deux fois un même paiement (Stripe peut
--  renvoyer un event en cas de retry).
--  À exécuter dans Supabase SQL Editor après 0002.
-- =====================================================

create table if not exists public.stripe_events (
  -- event.id Stripe (ex: evt_...) — clé d'idempotence.
  id text primary key,
  type text not null,
  received_at timestamptz not null default now()
);

-- Écrit/lu uniquement par le client admin (service_role, bypass RLS)
-- depuis la route webhook. On n'ouvre aucune policy à anon/authenticated.
alter table public.stripe_events enable row level security;
