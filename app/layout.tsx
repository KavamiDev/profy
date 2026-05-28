import { LocaleProvider, localeHydrationScript } from "@/components/locale-provider";
import { ThemeProvider, themeHydrationScript } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <LocaleProvider>{children}</LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
