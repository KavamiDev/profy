import Stripe from "stripe";

import { PRO_PACKS, type ProPackKey } from "./pro";

/**
 * Client Stripe + mapping packs → price_id.
 *
 * Secrets requis (côté serveur uniquement) :
 *   STRIPE_SECRET_KEY        — clé API (sk_live_… ou sk_test_…)
 *   STRIPE_WEBHOOK_SECRET    — secret de signature du webhook (whsec_…)
 *   STRIPE_PRICE_M1/M3/M12   — id des Prices one-time créés dans le dashboard
 *
 * Les Prices sont pré-créés dans Stripe (un Product + Price one-time par pack).
 * Source de vérité des durées = PRO_PACKS ; source des montants = Stripe.
 */

let cached: Stripe | null = null;

export function getStripe(): Stripe {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY manquant");
  cached = new Stripe(key);
  return cached;
}

const PRICE_ENV: Record<ProPackKey, string> = {
  m1: "STRIPE_PRICE_M1",
  m3: "STRIPE_PRICE_M3",
  m12: "STRIPE_PRICE_M12"
};

/** Récupère le price_id Stripe configuré pour un pack, ou null si absent. */
export function getPriceId(pack: ProPackKey): string | null {
  return process.env[PRICE_ENV[pack]] ?? null;
}

export function isStripeConfigured(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      (Object.keys(PRO_PACKS) as ProPackKey[]).every((p) => getPriceId(p))
  );
}
