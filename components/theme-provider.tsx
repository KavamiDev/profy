"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggle: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "profyl:theme";

/**
 * Script à injecter inline dans <head> AVANT React hydrate.
 * Lit la préférence et applique data-theme sur <html> pour éviter le FOUC.
 */
export const themeHydrationScript = `(function(){try{var t=localStorage.getItem('${STORAGE_KEY}');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  // Au mount, on lit la valeur appliquée par le script d'hydration.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const applied = document.documentElement.getAttribute("data-theme");
    if (applied === "dark" || applied === "light") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setThemeState(applied);
    }
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(STORAGE_KEY, t);
      } catch {
        /* ignore */
      }
      document.documentElement.setAttribute("data-theme", t);
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    // Pas wrappé dans ThemeProvider → fallback no-op (safe pour les Server
    // Components rendus côté client par erreur).
    return { theme: "light", setTheme: () => undefined, toggle: () => undefined };
  }
  return ctx;
}
