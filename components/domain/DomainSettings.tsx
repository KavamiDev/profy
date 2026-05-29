"use client";

import { connectDomain, disconnectDomain, verifyDomain } from "@/app/dashboard/domain/actions";
import { useT } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Clock, ExternalLink, Globe } from "lucide-react";

type Dns = { kind: "A" | "CNAME"; name: string; value: string };

const STATUS_TONE: Record<string, "ok" | "error" | "info"> = {
  added: "info",
  verified: "ok",
  pending: "info",
  invalid: "error",
  taken: "error",
  disconnected: "info",
  not_configured: "error",
  error: "error"
};

export function DomainSettings({
  domain,
  verified,
  dns,
  status
}: {
  domain: string | null;
  verified: boolean;
  dns: Dns | null;
  status?: string;
}) {
  const t = useT();
  const tone = status ? (STATUS_TONE[status] ?? "info") : null;

  return (
    <div className="space-y-6">
      {status && tone ? (
        <div
          className={
            "rounded-xl border px-4 py-3 text-sm " +
            (tone === "ok"
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : tone === "error"
                ? "border-red-200 bg-red-50 text-red-800"
                : "border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]")
          }
        >
          {t(`domain.msg.${status}`)}
        </div>
      ) : null}

      {!domain ? (
        <form
          action={connectDomain}
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] p-6 shadow-[var(--shadow-sm)]"
        >
          <label htmlFor="domain" className="text-sm font-medium">
            {t("domain.input_label")}
          </label>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <Input
              id="domain"
              name="domain"
              placeholder={t("domain.input_placeholder")}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              className="flex-1"
            />
            <Button type="submit" variant="accent" size="lg">
              <Globe className="mr-2 h-4 w-4" />
              {t("domain.connect")}
            </Button>
          </div>
          <p className="mt-3 text-xs text-[var(--muted)]">{t("domain.help_buy")}</p>
        </form>
      ) : (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] p-6 shadow-[var(--shadow-sm)]">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-[var(--accent)]" />
              <span className="font-[family-name:var(--font-display)] text-xl font-semibold">
                {domain}
              </span>
            </div>
            {verified ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {t("domain.status_verified")}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                <Clock className="h-3.5 w-3.5" />
                {t("domain.status_pending")}
              </span>
            )}
          </div>

          {verified ? (
            <p className="mt-4 text-sm text-[var(--muted-strong)]">
              {t("domain.live_on")}{" "}
              <a
                href={`https://${domain}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-medium text-[var(--accent)] underline underline-offset-2"
              >
                {domain} <ExternalLink className="h-3 w-3" />
              </a>
            </p>
          ) : dns ? (
            <div className="mt-5">
              <h3 className="text-sm font-semibold">{t("domain.dns_title")}</h3>
              <p className="mt-1 text-sm text-[var(--muted-strong)]">{t("domain.dns_intro")}</p>
              <div className="mt-3 overflow-x-auto rounded-xl border border-[var(--border)]">
                <table className="w-full text-sm">
                  <thead className="bg-[var(--surface-hover)] text-left text-xs text-[var(--muted)]">
                    <tr>
                      <th className="p-3">{t("domain.dns_type")}</th>
                      <th className="p-3">{t("domain.dns_name")}</th>
                      <th className="p-3">{t("domain.dns_value")}</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    <tr className="border-t border-[var(--border)]">
                      <td className="p-3">{dns.kind}</td>
                      <td className="p-3">{dns.name}</td>
                      <td className="p-3 font-semibold text-[var(--accent-deep)]">{dns.value}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-xs text-[var(--muted)]">{t("domain.dns_propagation")}</p>
            </div>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            {!verified ? (
              <form action={verifyDomain}>
                <Button type="submit" variant="accent" size="md">
                  {t("domain.verify")}
                </Button>
              </form>
            ) : null}
            <form action={disconnectDomain}>
              <Button type="submit" variant="ghost" size="md">
                {t("domain.disconnect")}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
