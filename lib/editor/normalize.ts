import type { ProfileContent } from "@/types/profile";

export function splitList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

export type EditorBuffers = {
  skillsCore: string;
  skillsTools: string;
  certifications: string;
  interests: string;
};

export function buffersFromContent(content: ProfileContent): EditorBuffers {
  return {
    skillsCore: content.skills.core.join(", "),
    skillsTools: content.skills.tools.join(", "),
    certifications: content.certifications.join(", "),
    interests: content.extras.interests.join(", ")
  };
}

/**
 * Produit le ProfileContent final pour preview/save :
 * - merge les buffers texte → arrays
 * - normalise les URLs
 * - filtre les items vides
 */
export function buildNormalizedContent(
  content: ProfileContent,
  buffers: EditorBuffers
): ProfileContent {
  return {
    hero: content.hero,
    contact: {
      ...content.contact,
      website: normalizeUrl(content.contact.website),
      linkedin: normalizeUrl(content.contact.linkedin)
    },
    skills: {
      core: splitList(buffers.skillsCore),
      tools: splitList(buffers.skillsTools)
    },
    experience: content.experience.filter((e) => e.company || e.role),
    education: content.education.filter((e) => e.school || e.degree),
    projects: content.projects
      .filter((p) => p.name)
      .map((p) => ({ ...p, link: p.link ? normalizeUrl(p.link) : "" })),
    languages: content.languages.filter((l) => l.name),
    certifications: splitList(buffers.certifications),
    extras: { interests: splitList(buffers.interests) }
  };
}
