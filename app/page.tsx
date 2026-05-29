import { LandingContent } from "@/components/landing-content";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { DEMO_USERNAME, composeWall } from "@/lib/demo-persona";
import {
  getPublishedProfilesCount,
  getRecentPublishedProfiles
} from "@/lib/server/profiles-store";
import { unstable_cache } from "next/cache";

// Données réelles (compteur + mur), mises en cache 5 min et invalidées à
// chaque publication via revalidateTag("landing") → landing reste en ISR.
export const revalidate = 300;

const getLandingData = unstable_cache(
  async () => {
    const [publishedCount, realProfiles] = await Promise.all([
      getPublishedProfilesCount(),
      getRecentPublishedProfiles(6)
    ]);
    return { publishedCount, realProfiles };
  },
  ["landing-data"],
  { revalidate: 300, tags: ["landing"] }
);

export default async function HomePage() {
  const { publishedCount, realProfiles } = await getLandingData();
  const wallPersonas = composeWall(realProfiles, 6);

  return (
    <div className="grain relative min-h-screen overflow-hidden">
      {/* Background mesh */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="animate-float absolute -right-[15%] -top-[20%] h-[800px] w-[800px] rounded-full opacity-90"
          style={{
            background:
              "radial-gradient(circle, rgba(255,90,60,0.14) 0%, rgba(255,90,60,0.05) 40%, transparent 70%)"
          }}
        />
        <div
          className="absolute -left-[20%] top-[40%] h-[700px] w-[700px] rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(122,108,224,0.10) 0%, transparent 65%)"
          }}
        />
      </div>

      <SiteHeader showPricing showExample demoUsername={DEMO_USERNAME} />
      <LandingContent
        demoUsername={DEMO_USERNAME}
        wallPersonas={wallPersonas}
        publishedCount={publishedCount}
      />
      <SiteFooter />
    </div>
  );
}
