"use client";

import { useMemo } from "react";
import { useT } from "@/components/locale-provider";
import { PhoneFrame } from "@/components/phone-frame";
import { ProfileView } from "@/components/profile-view";
import { ProfileQr } from "@/components/profile-qr";
import { AmbientBackground } from "@/components/ambient-background";
import { useEditorStore } from "@/lib/editor/store";
import { buildNormalizedContent } from "@/lib/editor/normalize";

function useNormalizedPreview() {
  const content = useEditorStore((s) => s.content);
  const buffers = useEditorStore((s) => s.buffers);
  return useMemo(() => buildNormalizedContent(content, buffers), [content, buffers]);
}

export function EditorPreviewMobile() {
  const t = useT();
  const username = useEditorStore((s) => s.username);
  const previewContent = useNormalizedPreview();
  const previewUsername = username || t("profile.placeholder.username");

  return (
    <div className="relative border-b border-[var(--border)] bg-[var(--surface-solid)]/60 p-6 lg:hidden">
      <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
        {t("dashboard.preview_mobile")}
      </p>
      <PhoneFrame className="max-w-[300px]">
        <ProfileView username={previewUsername} content={previewContent} compact />
      </PhoneFrame>
    </div>
  );
}

export function EditorPreviewDesktop() {
  const t = useT();
  const username = useEditorStore((s) => s.username);
  const previewContent = useNormalizedPreview();
  const previewUsername = username || t("profile.placeholder.username");

  return (
    <aside className="relative hidden min-h-screen w-full max-w-[440px] flex-col border-l border-[var(--border)] bg-[var(--surface-solid)]/50 lg:flex">
      <AmbientBackground variant="subtle" />
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-8">
        <div className="mb-6 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
            {t("dashboard.preview_live")}
          </p>
        </div>
        <PhoneFrame>
          <ProfileView username={previewUsername} content={previewContent} compact />
        </PhoneFrame>
        {username ? (
          <div className="mt-8 w-full max-w-[300px]">
            <ProfileQr username={username} />
          </div>
        ) : null}
      </div>
    </aside>
  );
}

/**
 * Hidden input qui transporte le contenu normalisé JSON vers la server action.
 */
export function EditorContentField() {
  const previewContent = useNormalizedPreview();
  return <input type="hidden" name="content" value={JSON.stringify(previewContent)} />;
}
