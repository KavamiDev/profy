"use client";

import { useT } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import { useEffect, useState } from "react";

const GA_MEASUREMENT_ID = "G-CQMD2Q4VQM";
const CONSENT_KEY = "profyl:analytics-consent";

type Consent = "accepted" | "declined" | null;

function readConsent(): Consent {
  if (typeof window === "undefined") return null;
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Mesure d'audience Google Analytics, conditionnée au consentement (CNIL/RGPD).
 *
 * - Aucun script GA n'est chargé tant que l'utilisateur n'a pas accepté.
 * - Le choix est mémorisé dans localStorage ; le bandeau ne réapparaît plus.
 */
export function Analytics() {
  const t = useT();
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConsent(readConsent());
    setReady(true);
  }, []);

  const decide = (choice: "accepted" | "declined") => {
    setConsent(choice);
    try {
      window.localStorage.setItem(CONSENT_KEY, choice);
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      {consent === "accepted" ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      ) : null}

      {ready && consent === null ? (
        <div
          role="dialog"
          aria-label={t("consent.title")}
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] p-5 shadow-[var(--shadow-lg)] backdrop-blur md:inset-x-auto md:right-6"
        >
          <p className="text-sm font-semibold text-[var(--foreground)]">{t("consent.title")}</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted-strong)]">
            {t("consent.message")}
          </p>
          <div className="mt-4 flex gap-2">
            <Button
              variant="accent"
              size="sm"
              className="flex-1"
              onClick={() => decide("accepted")}
            >
              {t("consent.accept")}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="flex-1"
              onClick={() => decide("declined")}
            >
              {t("consent.decline")}
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
