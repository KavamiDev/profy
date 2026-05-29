"use client";

import { PricingComparison } from "@/components/pricing/PricingComparison";
import { PricingCta } from "@/components/pricing/PricingCta";
import { PricingFaq } from "@/components/pricing/PricingFaq";
import { PricingHero, PricingPlans } from "@/components/pricing/PricingPlans";

export function PricingContent({ status }: { status?: string }) {
  return (
    <main className="relative z-10">
      <PricingHero />
      <PricingPlans status={status} />
      <PricingComparison />
      <PricingFaq />
      <PricingCta />
    </main>
  );
}
