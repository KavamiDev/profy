import { LocaleProvider } from "@/components/locale-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { localeHydrationScript, themeHydrationScript } from "@/lib/hydration-scripts";
import { Analytics } from "@/components/analytics";
import { isValidLocale } from "@/lib/i18n/locales";
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces"
});

export const metadata: Metadata = {
  title: "Profyl — Ton CV en ligne, toujours à jour",
  description: "Crée ton profil professionnel partageable en moins de 10 minutes.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" }
    ]
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("profyl:locale")?.value;
  const initialLocale = cookieLocale && isValidLocale(cookieLocale) ? cookieLocale : undefined;

  return (
    <html lang="fr" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        {/* Anti-FOUC : applique data-theme + lang AVANT React. */}
        <script
          dangerouslySetInnerHTML={{
            __html: themeHydrationScript + localeHydrationScript
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <LocaleProvider initialLocale={initialLocale}>
            {children}
            {/* Google Analytics (gtag.js), chargé uniquement après consentement. */}
            <Analytics />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
