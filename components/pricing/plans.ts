import { Sparkles, Zap } from "lucide-react";

export type PlanDef = {
  key: "free" | "pro";
  nameKey: string;
  taglineKey: string;
  ctaKey: string;
  ctaHref: string;
  price: { monthly: string; annual?: string };
  highlight?: boolean;
  icon: typeof Zap;
  featureKeys: string[];
  notIncludedKeys?: string[];
};

export const plans: PlanDef[] = [
  {
    key: "free",
    nameKey: "pricing.free.name",
    taglineKey: "pricing.free.tagline",
    ctaKey: "pricing.free.cta",
    ctaHref: "/dashboard",
    price: { monthly: "0 €" },
    icon: Sparkles,
    featureKeys: Array.from({ length: 6 }, (_, i) => `pricing.free.feature.${i + 1}`),
    notIncludedKeys: ["pricing.free.notincluded.1", "pricing.free.notincluded.2"]
  },
  {
    key: "pro",
    nameKey: "pricing.pro.name",
    taglineKey: "pricing.pro.tagline",
    ctaKey: "pricing.pro.cta",
    ctaHref: "/dashboard?upgrade=pro",
    price: { monthly: "5 €", annual: "50 €" },
    highlight: true,
    icon: Zap,
    featureKeys: Array.from({ length: 10 }, (_, i) => `pricing.pro.feature.${i + 1}`)
  }
];
