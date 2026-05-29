import type { Locale } from "./locales";
import { TRANSLATIONS } from "./messages";

/**
 * Dictionnaire central des strings UI traduites, assemblé à partir des
 * namespaces de `lib/i18n/messages/` (un fichier par feature).
 *
 * Convention de clés : `<page>.<section>.<role>`
 *
 * Cohérence culturelle EN vs FR :
 * - FR cible le marché français → photo CV, "made in France", RGPD France.
 * - EN cible les francophones expats + non-FR visant le marché FR.
 *   "Made for France" → "Built in Europe", "CV" → "Resume".
 *
 * Si une clé n'a pas de traduction EN, `translate()` retombe sur FR.
 */
export { TRANSLATIONS };

/**
 * Lookup avec interpolation simple `{key}` et fallback FR si la clé
 * n'existe pas dans la locale demandée.
 */
export function translate(
  locale: Locale,
  key: string,
  vars?: Record<string, string | number>
): string {
  const dict = TRANSLATIONS[locale] ?? TRANSLATIONS.fr;
  let value = dict[key] ?? TRANSLATIONS.fr[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      value = value.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    }
  }
  return value;
}
