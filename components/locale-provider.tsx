"use client";

import { DEFAULT_LOCALE, isValidLocale, type Locale } from "@/lib/i18n/locales";
import { translate } from "@/lib/i18n/translations";
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = "profyl:locale";

/**
 * Script inline pour <head> qui pose `lang` sur <html> avant React.
 */
export const localeHydrationScript = `(function(){try{var l=localStorage.getItem('${STORAGE_KEY}');if(!l){var nav=(navigator.language||'fr').toLowerCase();l=nav.startsWith('en')?'en':'fr';}document.documentElement.setAttribute('lang',l);document.documentElement.setAttribute('data-locale',l);}catch(e){document.documentElement.setAttribute('lang','fr');}})();`;

export function LocaleProvider({
  children,
  initialLocale
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  // initialLocale vient du layout SSR (lu depuis cookie) → pas de mismatch.
  // Fallback sur DEFAULT_LOCALE pour les navigations sans cookie (premier visit).
  const [locale, setLocaleState] = useState<Locale>(initialLocale ?? DEFAULT_LOCALE);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const applied = document.documentElement.getAttribute("data-locale");
    if (applied && isValidLocale(applied) && applied !== locale) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(applied as Locale);
    }
    // Uniquement au montage — on synchronise si le script inline a détecté
    // une locale différente de ce qu'on a reçu du serveur.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(STORAGE_KEY, l);
        // Cookie lu par le layout SSR au prochain chargement → plus de mismatch.
        document.cookie = `${STORAGE_KEY}=${l};path=/;max-age=31536000;samesite=lax`;
      } catch {
        /* ignore */
      }
      document.documentElement.setAttribute("lang", l);
      document.documentElement.setAttribute("data-locale", l);
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>) => translate(locale, key, vars),
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    // Pas wrappé → fallback safe avec FR pur.
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => undefined,
      t: (key, vars) => translate(DEFAULT_LOCALE, key, vars)
    };
  }
  return ctx;
}

/** Hook raccourci. */
export function useT() {
  return useLocale().t;
}
