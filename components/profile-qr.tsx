"use client";

import { QRCodeSVG } from "qrcode.react";

export function ProfileQr({ username }: { username: string }) {
  const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:3000";
  const profileUrl = `${origin}/${username}`;

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-5 text-center shadow-[var(--shadow-sm)]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
        QR code
      </p>
      <div className="mx-auto mt-4 flex justify-center rounded-xl border border-[var(--border)] bg-white p-3">
        <QRCodeSVG value={profileUrl} size={112} />
      </div>
      <p className="mt-4 truncate text-xs text-[var(--muted)]">{profileUrl}</p>
    </div>
  );
}
