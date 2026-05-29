/**
 * Scripts inline à injecter dans <head> AVANT React pour éviter le FOUC
 * (flash de mauvais thème / mauvaise locale).
 *
 * Ce fichier N'A PAS de directive "use client" — il est importé depuis
 * app/layout.tsx (Server Component). Les composants ThemeProvider et
 * LocaleProvider importaient ces constantes depuis leurs propres fichiers
 * "use client", ce qui faisait que Next.js les remplaçait par des stubs
 * serveur qui throwaient.
 */

export const themeHydrationScript = `(function(){try{var t=localStorage.getItem('profyl:theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export const localeHydrationScript = `(function(){try{var l=localStorage.getItem('profyl:locale');if(!l){var nav=(navigator.language||'fr').toLowerCase();l=nav.startsWith('en')?'en':'fr';}document.documentElement.setAttribute('lang',l);document.documentElement.setAttribute('data-locale',l);}catch(e){document.documentElement.setAttribute('lang','fr');}})();`;
