import { absoluteUrl, SITE_URL } from "@/lib/seo";
import type { MetadataRoute } from "next";

/**
 * robots.txt généré. On laisse indexer le public (landing, tarifs, profils)
 * et on bloque les zones privées / techniques (dashboard, auth, API).
 */
const DISALLOW = ["/dashboard", "/login", "/auth", "/api"];

// Crawlers des moteurs de réponse IA : on les accueille explicitement pour
// pouvoir apparaître / être cité dans ChatGPT, Perplexity, Claude, Google AI.
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-Web",
  "Google-Extended",
  "Applebot-Extended"
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: DISALLOW },
      { userAgent: AI_BOTS, allow: "/", disallow: DISALLOW }
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL
  };
}
