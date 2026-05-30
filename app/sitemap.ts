import { absoluteUrl } from "@/lib/seo";
import { getAllPublishedProfileSlugs } from "@/lib/server/profiles-store";
import type { MetadataRoute } from "next";

// Régénéré toutes les heures (les nouveaux profils publiés apparaissent vite
// sans rebuild). Aligné sur la stratégie ISR du reste du site.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1
    },
    {
      url: absoluteUrl("/pricing"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6
    }
  ];

  let profileEntries: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllPublishedProfileSlugs();
    profileEntries = slugs.map(({ username, updatedAt }) => ({
      url: absoluteUrl(`/${username}`),
      lastModified: new Date(updatedAt),
      changeFrequency: "weekly",
      priority: 0.8
    }));
  } catch {
    // Si la DB est injoignable au build/revalidate, on sert au moins le statique.
    profileEntries = [];
  }

  return [...staticEntries, ...profileEntries];
}
