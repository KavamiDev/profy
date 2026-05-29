"use client";

import { LandingCta } from "@/components/landing/LandingCta";
import { LandingEmbed } from "@/components/landing/LandingEmbed";
import { LandingHero } from "@/components/landing/LandingHero";
import { LandingMarquee } from "@/components/landing/LandingMarquee";
import { LandingSteps } from "@/components/landing/LandingSteps";
import { LandingWall } from "@/components/landing/LandingWall";
import type { WallPersona } from "@/lib/demo-persona";

export function LandingContent({
  demoUsername,
  wallPersonas,
  publishedCount
}: {
  demoUsername: string;
  wallPersonas: WallPersona[];
  publishedCount: number;
}) {
  return (
    <main className="relative z-10">
      <LandingHero
        demoUsername={demoUsername}
        wallPersonas={wallPersonas}
        publishedCount={publishedCount}
      />
      <LandingEmbed demoUsername={demoUsername} />
      <LandingMarquee />
      <LandingWall demoUsername={demoUsername} wallPersonas={wallPersonas} />
      <LandingSteps />
      <LandingCta demoUsername={demoUsername} />
    </main>
  );
}
