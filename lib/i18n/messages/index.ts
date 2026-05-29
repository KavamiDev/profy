import type { Locale } from "../locales";
import { common } from "./common";
import { consent } from "./consent";
import { dashboard } from "./dashboard";
import { domain } from "./domain";
import { landing } from "./landing";
import { login } from "./login";
import { pricing } from "./pricing";
import { profile } from "./profile";
import { publicpage } from "./publicpage";
import { stats } from "./stats";
import type { NamespaceMessages } from "./types";

/**
 * Tous les namespaces de traduction.
 * Ajouter une feature = créer `messages/<feature>.ts` puis l'ajouter ici.
 */
const namespaces: NamespaceMessages[] = [
  common,
  consent,
  landing,
  pricing,
  login,
  dashboard,
  profile,
  publicpage,
  stats,
  domain
];

/** Fusionne les namespaces en un dictionnaire plat par locale. */
function mergeNamespaces(): Record<Locale, Record<string, string>> {
  const merged: Record<Locale, Record<string, string>> = { fr: {}, en: {} };
  for (const ns of namespaces) {
    Object.assign(merged.fr, ns.fr);
    Object.assign(merged.en, ns.en);
  }
  return merged;
}

export const TRANSLATIONS = mergeNamespaces();
