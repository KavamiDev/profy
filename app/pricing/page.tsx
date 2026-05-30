import { PricingContent } from "@/components/pricing-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tarifs",
  description:
    "Profyl est gratuit pour créer et publier votre CV en ligne. Passez en Pro pour un domaine à votre nom, les statistiques de vues et l'export PDF.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    type: "website",
    url: "/pricing",
    title: "Tarifs Profyl, votre CV en ligne",
    description:
      "Gratuit pour publier votre CV en ligne. Pro pour le domaine personnalisé, les stats de vues et l'export PDF."
  }
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
