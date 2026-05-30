import { LocaleProvider } from "@/components/locale-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { localeHydrationScript, themeHydrationScript } from "@/lib/hydration-scripts";
import { Analytics } from "@/components/analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { isValidLocale } from "@/lib/i18n/locales";
import {
  SITE_DEFAULT_TITLE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_LOCALE,
  SITE_NAME,
  SITE_TITLE_TEMPLATE,
  SITE_URL
} from "@/lib/seo";
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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_DEFAULT_TITLE,
    template: SITE_TITLE_TEMPLATE
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: {
    canonical: "/"
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false
  },
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_DEFAULT_TITLE,
    description: SITE_DESCRIPTION
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_DEFAULT_TITLE,
    description: SITE_DESCRIPTION
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }]
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
            {/* Vercel Web Analytics (cookieless, sans consentement) + Core Web Vitals (RUM). */}
            <VercelAnalytics />
            <SpeedInsights />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
