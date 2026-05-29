"use client";

import { checkUsernameAvailability } from "@/app/actions/username";
import { useT } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Status = "idle" | "short" | "checking" | "available" | "taken" | "reserved" | "format";

/** Normalise une saisie libre en username valide (lowercase, sans accents, tirets). */
function slugify(raw: string): string {
  return raw
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-/, "")
    .slice(0, 30);
}

export function HeroClaim({ demoUsername }: { demoUsername: string }) {
  const t = useT();
  const router = useRouter();
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [submitting, setSubmitting] = useState(false);
  const reqId = useRef(0);

  useEffect(() => {
    const username = value;
    /* eslint-disable react-hooks/set-state-in-effect -- debounced sync of input → availability status */
    if (username.length === 0) {
      setStatus("idle");
      return;
    }
    if (username.length < 3) {
      setStatus("short");
      return;
    }

    setStatus("checking");
    /* eslint-enable react-hooks/set-state-in-effect */
    const id = ++reqId.current;
    const timer = setTimeout(async () => {
      const res = await checkUsernameAvailability(username);
      if (id !== reqId.current) return; // réponse obsolète
      if (res.available) setStatus("available");
      else setStatus(res.reason ?? "taken");
    }, 400);

    return () => clearTimeout(timer);
  }, [value]);

  function go() {
    if (status !== "available" || submitting) return;
    setSubmitting(true);
    const next = `/dashboard?claim=${encodeURIComponent(value)}`;
    router.push(`/login?next=${encodeURIComponent(next)}`);
  }

  const hint: Record<Status, { text: string; tone: "muted" | "ok" | "error" } | null> = {
    idle: null,
    short: { text: t("landing.claim.short"), tone: "muted" },
    checking: { text: t("landing.claim.checking"), tone: "muted" },
    available: { text: t("landing.claim.available"), tone: "ok" },
    taken: { text: t("landing.claim.taken"), tone: "error" },
    reserved: { text: t("landing.claim.reserved"), tone: "error" },
    format: { text: t("landing.claim.format"), tone: "error" }
  };
  const current = hint[status];

  return (
    <div className="mx-auto mt-10 w-full max-w-md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          go();
        }}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <div className="flex h-12 flex-1 items-center rounded-full border border-[var(--border-strong)] bg-[var(--surface-solid)] pl-4 pr-2 shadow-[var(--shadow-sm)] transition focus-within:border-[var(--foreground)] focus-within:ring-2 focus-within:ring-[var(--foreground)]/10">
          <span className="select-none text-sm font-medium text-[var(--muted)]">profyl.io/</span>
          <input
            value={value}
            onChange={(e) => setValue(slugify(e.target.value))}
            placeholder={t("landing.claim.placeholder")}
            aria-label={t("landing.claim.placeholder")}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[var(--foreground)] outline-none placeholder:font-normal placeholder:text-[var(--muted)]"
          />
          <span className="flex h-6 w-6 shrink-0 items-center justify-center">
            {status === "checking" && <Loader2 className="h-4 w-4 animate-spin text-[var(--muted)]" />}
            {status === "available" && <Check className="h-4 w-4 text-emerald-600" />}
            {(status === "taken" || status === "reserved" || status === "format") && (
              <X className="h-4 w-4 text-red-500" />
            )}
          </span>
        </div>

        <Button
          type="submit"
          variant="accent"
          size="lg"
          disabled={status !== "available" || submitting}
          className="animate-pulse-coral sm:w-auto"
        >
          {submitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {t("landing.cta.primary")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div className="mt-2 flex min-h-5 items-center justify-center gap-3 text-sm">
        {current ? (
          <span
            className={
              current.tone === "ok"
                ? "text-emerald-600"
                : current.tone === "error"
                  ? "text-red-500"
                  : "text-[var(--muted)]"
            }
          >
            {current.text}
          </span>
        ) : (
          <a
            href={`/${demoUsername}`}
            className="text-[var(--muted)] underline decoration-[var(--border-strong)] underline-offset-4 transition hover:text-[var(--foreground)]"
          >
            {t("landing.cta.secondary")}
          </a>
        )}
      </div>
    </div>
  );
}
