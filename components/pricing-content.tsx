"use client";

import { PricingComparison } from "@/components/pricing/PricingComparison";
import { PricingCta } from "@/components/pricing/PricingCta";
import { PricingFaq } from "@/components/pricing/PricingFaq";
import { PricingHero, PricingPlans } from "@/components/pricing/PricingPlans";

export function PricingContent() {
  return (
    <main className="relative z-10">
      <PricingHero />
      <PricingPlans />
      <PricingComparison />
      <PricingFaq />
      <PricingCta />
    </main>
  );
}
