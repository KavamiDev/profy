/**
 * Liste extensible des locales supportées.
 * Pour ajouter une langue : 1) ajouter ici 2) ajouter le dictionnaire
 * dans translations.ts 3) (re)build.
 */

export type Locale = "fr" | "en";

export type LocaleConfig = {
  code: Locale;
  label: string;
  shortLabel: string;
  flag: string; // emoji unicode pour affichage rapide (sera remplacé par SVG si besoin)
};

export const LOCALES: LocaleConfig[] = [
  { code: "fr", label: "Français", shortLabel: "FR", flag: "🇫🇷" },
  { code: "en", label: "English", shortLabel: "EN", flag: "🇬🇧" }
];

export const DEFAULT_LOCALE: Locale = "fr";

export function isValidLocale(value: string): value is Locale {
  return LOCALES.some((l) => l.code === value);
}
