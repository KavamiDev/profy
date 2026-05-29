import type { PlanTier } from "./plan-limits";

/**
 * Accès Pro = paiement unique (pack) qui pose une date `pro_until`.
 * Pas d'abonnement récurrent : on est Pro tant que `pro_until` est dans le futur.
 */
export function isProActive(proUntil: string | null | undefined): boolean {
  if (!proUntil) return false;
  const ts = new Date(proUntil).getTime();
  return Number.isFinite(ts) && ts > Date.now();
}

/** Plan effectif dérivé de pro_until (ignore la colonne `plan` legacy). */
export function effectivePlan(proUntil: string | null | undefined): PlanTier {
  return isProActive(proUntil) ? "pro" : "free";
}

/** Durées des packs Pro (en mois). Source de vérité partagée UI ↔ Stripe. */
export const PRO_PACKS = {
  m1: { months: 1, priceEur: 7, labelKey: "pricing.pack.m1" },
  m3: { months: 3, priceEur: 15, labelKey: "pricing.pack.m3" },
  m12: { months: 12, priceEur: 45, labelKey: "pricing.pack.m12" }
} as const;

export type ProPackKey = keyof typeof PRO_PACKS;

/**
 * Calcule la nouvelle date pro_until après achat d'un pack.
 * Prolonge depuis la date existante si encore active (cumul), sinon depuis maintenant.
 */
export function extendProUntil(current: string | null | undefined, months: number): string {
  const base = isProActive(current) ? new Date(current as string) : new Date();
  base.setMonth(base.getMonth() + months);
  return base.toISOString();
}
