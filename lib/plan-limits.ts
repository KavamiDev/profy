/**
 * Limites douces par section pour chaque plan.
 * - Free : limites raisonnables qui couvrent 95% des candidats juniors/mid.
 * - Pro : illimité, c'est un argument de conversion clé.
 *
 * Quand un user Free atteint la limite, l'UI affiche un upsell
 * "Passe en Pro pour ajouter plus" au lieu de simplement bloquer.
 */

export type PlanTier = "free" | "pro" | "studio";

export type SectionKey =
  | "experiences"
  | "education"
  | "projects"
  | "languages"
  | "certifications"
  | "skills"
  | "interests";

export const PLAN_LIMITS: Record<PlanTier, Record<SectionKey, number>> = {
  free: {
    experiences: 6,
    education: 4,
    projects: 6,
    languages: 5,
    certifications: 6,
    skills: 15,
    interests: 6
  },
  pro: {
    experiences: Infinity,
    education: Infinity,
    projects: Infinity,
    languages: Infinity,
    certifications: Infinity,
    skills: Infinity,
    interests: Infinity
  },
  studio: {
    experiences: Infinity,
    education: Infinity,
    projects: Infinity,
    languages: Infinity,
    certifications: Infinity,
    skills: Infinity,
    interests: Infinity
  }
};

export function getLimit(plan: PlanTier, section: SectionKey): number {
  return PLAN_LIMITS[plan][section];
}

export function canAdd(plan: PlanTier, section: SectionKey, currentCount: number): boolean {
  return currentCount < getLimit(plan, section);
}

export const PLAN_LABELS: Record<PlanTier, string> = {
  free: "Free",
  pro: "Pro",
  studio: "Studio"
};
