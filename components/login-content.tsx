"use client";

import { useT } from "@/components/locale-provider";
import { LoginForm } from "@/components/login-form";

/**
 * Contenu de la page /login traduisible.
 * La page reste un Server Component qui passe les flags via searchParams.
 */
export function LoginContent({
  next,
  sent,
  error
}: {
  next?: string;
  sent?: boolean;
  error?: string;
}) {
  const t = useT();

  return (
    <div className="w-full max-w-md">
      <div className="text-center">
        <p className="hero-eyebrow">{t("login.eyebrow")}</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
          {t("login.title_1")} <em className="italic text-[var(--accent)]">{t("login.title_em")}</em>
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-[var(--muted-strong)]">{t("login.subtitle")}</p>
      </div>

      <div className="mt-10 rounded-3xl border border-[var(--border)] bg-[var(--surface-solid)] p-7 shadow-[var(--shadow-lg)]">
        <LoginForm next={next} />
      </div>

      {sent ? (
        <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
          {t("login.sent")}
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error === "send-failed"
            ? t("login.error.send")
            : error === "invalid-callback"
              ? t("login.error.callback")
              : t("login.error.generic")}
        </div>
      ) : null}

      <p className="mt-8 text-center text-xs text-[var(--muted)]">
        {t("login.legal_1")}
        <br />
        {t("login.legal_2")}
      </p>
    </div>
  );
}
