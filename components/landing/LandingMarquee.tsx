"use client";

import { useT } from "@/components/locale-provider";
import { Star } from "lucide-react";

export function LandingMarquee() {
  const t = useT();
  const marqueeItems = Array.from({ length: 10 }, (_, i) => t(`landing.marquee.${i + 1}`));

  return (
    <section className="relative border-y border-[var(--border)] bg-[var(--accent-5)] py-6 text-white">
      <div className="marquee-mask">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 font-[family-name:var(--font-display)] text-xl font-medium italic md:text-2xl"
            >
              <Star className="h-4 w-4 fill-[var(--accent)] text-[var(--accent)]" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
