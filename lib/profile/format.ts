/**
 * Met en forme une période début/fin pour l'affichage.
 *
 * formatPeriod("2020", "2023") → "2020 – 2023"
 * formatPeriod("2020", "")     → "2020"
 * formatPeriod("", "")         → ""
 */
export function formatPeriod(start?: string, end?: string): string {
  const s = start?.trim() ?? "";
  const e = end?.trim() ?? "";
  if (!s && !e) return "";
  if (s && e) return `${s} – ${e}`;
  return s || e;
}
