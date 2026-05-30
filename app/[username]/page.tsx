import { FloatingEditButton } from "@/components/floating-edit-button";
import { JsonLd } from "@/components/json-ld";
import { ProfileFullView } from "@/components/profile-full-view";
import { ViewTracker } from "@/components/profile/ViewTracker";
import { PublicProfileFooter, PublicProfileHeader } from "@/components/public-profile-chrome";
import { DEMO_USERNAME } from "@/lib/demo-persona";
import { combinedSkills } from "@/lib/profile/dedup";
import { SITE_NAME, profileUrl } from "@/lib/seo";
import { getProfileByUsername, type StoredProfile } from "@/lib/server/profiles-store";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 300;

/** Coupe proprement une description à ~155 caractères (sur un mot, sans tronquer). */
function clampDescription(text: string, max = 155): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 60 ? lastSpace : max).trim()}…`;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const profile = await getProfileByUsername(username);

  if (!profile) {
    return { title: "Profil introuvable", robots: { index: false, follow: false } };
  }

  const { hero } = profile.content;
  const fullName = hero.fullName || username;
  const title = hero.title
    ? `${fullName} · ${hero.title}`
    : `${fullName} · CV en ligne`;

  const description = hero.summary
    ? clampDescription(hero.summary)
    : `Découvrez le CV en ligne de ${fullName}${hero.title ? `, ${hero.title}` : ""} sur ${SITE_NAME} : parcours, expériences et compétences, toujours à jour.`;

  const canonical = profileUrl(profile.username);
  // Le profil de démonstration est fictif : crawlable mais non indexé pour ne
  // pas polluer l'index avec une fausse personne.
  const isDemo = profile.id === "demo" || profile.username === DEMO_USERNAME;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: isDemo ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "profile",
      url: canonical,
      title,
      description,
      firstName: fullName.split(" ")[0],
      lastName: fullName.split(" ").slice(1).join(" ")
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  };
}

/** Données structurées schema.org Person / ProfilePage pour un profil. */
function buildProfileJsonLd(profile: StoredProfile): Record<string, unknown> {
  const { hero, contact, skills, experience, education, languages } = profile.content;
  const fullName = hero.fullName || profile.username;
  const url = profileUrl(profile.username);

  const sameAs = [contact.linkedin, contact.website].filter(
    (v): v is string => Boolean(v && v.trim())
  );
  const allSkills = combinedSkills(skills);

  const person: Record<string, unknown> = {
    "@type": "Person",
    name: fullName,
    url
  };
  if (hero.title) person.jobTitle = hero.title;
  if (hero.photoUrl) person.image = hero.photoUrl;
  if (hero.summary) person.description = clampDescription(hero.summary, 300);
  if (hero.location) {
    person.address = { "@type": "PostalAddress", addressLocality: hero.location };
  }
  if (sameAs.length > 0) person.sameAs = sameAs;
  if (allSkills.length > 0) person.knowsAbout = allSkills;
  if (experience[0]?.company) {
    person.worksFor = { "@type": "Organization", name: experience[0].company };
  }
  if (education.length > 0) {
    person.alumniOf = education
      .filter((e) => e.school)
      .map((e) => ({ "@type": "EducationalOrganization", name: e.school }));
  }
  if (languages.length > 0) {
    person.knowsLanguage = languages.map((l) => l.name).filter(Boolean);
  }

  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: profile.updatedAt,
    mainEntity: person
  };
}

export default async function PublicProfilePage({
  params,
  searchParams
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ embed?: string }>;
}) {
  const [{ username }, { embed }] = await Promise.all([params, searchParams]);
  const profile = await getProfileByUsername(username);

  if (!profile) {
    notFound();
  }

  const isEmbed = embed === "1";

  let isOwner = false;
  if (!isEmbed) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    isOwner = Boolean(user && profile.userId === user.id);
  }

  return (
    <div
      className={`grain relative min-h-screen bg-[var(--background)] ${isEmbed ? "embed-mode" : ""}`}
    >
      {!isEmbed && profile.id !== "demo" ? (
        <JsonLd data={buildProfileJsonLd(profile)} />
      ) : null}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 -z-0 h-[600px] overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-[-200px] h-[700px] w-[1100px] -translate-x-1/2 rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(255,90,60,0.10) 0%, rgba(122,108,224,0.06) 35%, transparent 70%)"
          }}
        />
      </div>

      <PublicProfileHeader />

      <div className="relative z-10">
        <ProfileFullView username={profile.username} content={profile.content} />
      </div>

      {isOwner ? <FloatingEditButton /> : null}

      {/* Analytics : on ne track ni l'embed, ni le owner, ni la démo. */}
      {!isEmbed && !isOwner && profile.id !== "demo" ? (
        <ViewTracker username={profile.username} />
      ) : null}

      <PublicProfileFooter username={profile.username} />
    </div>
  );
}
