import { PricingContent } from "@/components/pricing-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "Pricing — Profyl",
  description: "Free or Pro at 5 €/month. Simple."
};

export default async function PricingPage({
  searchParams
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  return (
    <div className="grain relative min-h-screen overflow-hidden">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -right-[10%] -top-[15%] h-[700px] w-[700px] rounded-full opacity-80"
          style={{
            background:
              "radial-gradient(circle, rgba(255,90,60,0.12) 0%, rgba(255,90,60,0.04) 40%, transparent 70%)"
          }}
        />
        <div
          className="absolute -left-[15%] top-[35%] h-[600px] w-[600px] rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(122,108,224,0.10) 0%, transparent 65%)"
          }}
        />
      </div>

      <SiteHeader showPricing={false} />
      <PricingContent status={status} />
      <SiteFooter />
    </div>
  );
}
