import type { Locale } from "../locales";

/** Un namespace de traductions : une table clé→texte par locale. */
export type NamespaceMessages = Record<Locale, Record<string, string>>;
