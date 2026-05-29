import type { ProfileContent } from "@/types/profile";

/**
 * Dedup case-insensitive en conservant la première occurrence telle quelle.
 * Ex: ["Notion", "notion", "Figma"] → ["Notion", "Figma"]
 */
export function dedupCaseInsensitive(items: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const item of items) {
    const key = item.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(item.trim());
  }
  return result;
}

export function combinedSkills(skills: ProfileContent["skills"]): string[] {
  return dedupCaseInsensitive([...skills.core, ...skills.tools]);
}
