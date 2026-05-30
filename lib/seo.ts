/**
 * Source de vérité SEO (URL canonique, nom, descriptions, mots-clés).
 *
 * IMPORTANT canonical : `SITE_URL` doit pointer vers le domaine qu'on veut
 * voir indexé par Google. Priorité :
 *   1. NEXT_PUBLIC_SITE_URL (à définir explicitement, recommandé)
 *   2. https://<NEXT_PUBLIC_PRIMARY_DOMAIN> (branding, ici profyl.io)
 *   3. https://<VERCEL_PROJECT_PRODUCTION_URL> (fallback prod Vercel)
 *   4. http://localhost:3000 (dev)
 *
 * Tant que profyl.io n'est pas servi par l'app, définir
 * NEXT_PUBLIC_SITE_URL sur le domaine réellement en ligne pour que les
 * canonicals et OG pointent vers une page que Googlebot peut charger.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const primary = process.env.NEXT_PUBLIC_PRIMARY_DOMAIN?.trim();
  if (primary) return `https://${primary.replace(/^https?:\/\//, "").replace(/\/$/, "")}`;

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/$/, "")}`;

  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = "Profyl";

/** Nom affiché en titre par défaut (page d'accueil ou pages sans titre propre). */
export const SITE_DEFAULT_TITLE = "Profyl, votre CV en ligne gratuit et partageable";

/** Template appliqué aux titres de page : "Tarifs · Profyl". */
export const SITE_TITLE_TEMPLATE = "%s · Profyl";

export const SITE_DESCRIPTION =
  "Créez votre CV en ligne gratuit avec Profyl : une vraie page web professionnelle à votre nom, toujours à jour, partageable par lien ou QR code. Prêt en 10 minutes, sans template ni mise en page à gérer.";

/** Mots-clés cibles. Modeste impact direct sur Google, utile pour Bing et clarté. */
export const SITE_KEYWORDS = [
  "CV en ligne",
  "CV",
  "créer un CV",
  "CV gratuit",
  "site CV",
  "page CV",
  "CV numérique",
  "CV partageable",
  "Profyl",
  "alternative au CV PDF",
  "CV pour recruteur",
  "portfolio candidat"
];

export const SITE_LOCALE = "fr_FR";

/** Code de vérification Google Search Console (balise google-site-verification). */
export const GOOGLE_SITE_VERIFICATION = "joP_bMm1qHPXUmxBCe6fdXJ4keK5Xoh7PfDk3BTReCA";

/** Construit une URL absolue à partir d'un chemin relatif. */
export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** URL canonique publique d'un profil. */
export function profileUrl(username: string): string {
  return absoluteUrl(`/${username}`);
}
