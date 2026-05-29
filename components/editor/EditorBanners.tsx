"use client";

import Link from "next/link";
import { useT } from "@/components/locale-provider";
import { useEditorStore } from "@/lib/editor/store";

export function EditorBanners({
  saved,
  error,
  proActivated
}: {
  saved?: boolean;
  error?: string;
  proActivated?: boolean;
}) {
  const t = useT();
  const username = useEditorStore((s) => s.username);
  const restoredFromDraft = useEditorStore((s) => s.restoredFromDraft);

  return (
    <>
      {proActivated ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {t("dashboard.pro_activated")}
        </div>
      ) : null}
      {saved ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          ✓ {t("dashboard.saved", { url: "" }).replace("{url}", "").trim()}{" "}
          <Link
            href={`/${username}`}
            target="_blank"
            className="font-medium underline underline-offset-2"
          >
            profyl.io/{username}
          </Link>
        </div>
      ) : null}
      {restoredFromDraft && !saved ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {t("dashboard.draft_restored")}
        </div>
      ) : null}
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <p className="font-medium">⚠ {t(`dashboard.error.${error.replace(/-/g, "_")}`)}</p>
          {error === "contenu-invalide" ? (
            <p className="mt-1 text-xs text-red-700">{t("dashboard.error.content_hint")}</p>
          ) : null}
          <p className="mt-1 text-xs text-red-700">{t("dashboard.error.reassurance")}</p>
        </div>
      ) : null}
    </>
  );
}
