"use client";

import { useT } from "@/components/locale-provider";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import imageCompression from "browser-image-compression";
import { Camera, Loader2, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const MAX_FILE_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];

/**
 * Uploader avatar avec drag-and-drop + compression client.
 * - Drop ou click → compress → upload Supabase Storage bucket `avatars/<user_id>/hero.<ext>`
 * - Renvoie la public URL via onUploaded()
 * - Affiche un preview rond, un spinner pendant upload, un bouton supprimer
 */
export function AvatarUploader({
  value,
  onChange,
  userId
}: {
  value: string;
  onChange: (url: string) => void;
  userId: string;
}) {
  const t = useT();
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError(null);

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError(t("dashboard.upload.error_format"));
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(t("dashboard.upload.error_size", { max: MAX_FILE_SIZE_MB }));
      return;
    }

    setBusy(true);
    try {
      // Compression client : max 500KB, 1200px max edge, WebP.
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1200,
        fileType: "image/webp",
        useWebWorker: true
      });

      const supabase = createSupabaseBrowserClient();
      const filename = `hero-${Date.now()}.webp`;
      const path = `${userId}/${filename}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, compressed, {
          contentType: "image/webp",
          cacheControl: "3600",
          upsert: true
        });

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl }
      } = supabase.storage.from("avatars").getPublicUrl(path);

      onChange(publicUrl);
    } catch (err) {
      console.error("Upload failed", err);
      setError(err instanceof Error ? err.message : t("dashboard.upload.error_failed"));
    } finally {
      setBusy(false);
    }
  }

  function handleClick() {
    if (!busy) fileInputRef.current?.click();
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  function handleRemove() {
    if (!busy && confirm(t("dashboard.upload.delete_confirm"))) onChange("");
  }

  return (
    <div className="space-y-3">
      <div
        onClick={handleClick}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`group relative flex cursor-pointer items-center gap-4 rounded-2xl border-2 border-dashed bg-[var(--surface-solid)] p-4 transition ${
          dragOver
            ? "border-[var(--accent)] bg-[var(--accent-soft)]"
            : "border-[var(--border-strong)] hover:border-[var(--accent)]"
        } ${busy ? "cursor-wait opacity-70" : ""}`}
      >
        {/* Preview rond */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-[var(--surface-solid)] bg-[var(--surface-hover)] shadow-[var(--shadow-md)]">
          {value ? (
            <Image
              src={value}
              alt="Photo"
              fill
              sizes="80px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[var(--muted)]">
              <Camera className="h-6 w-6" />
            </div>
          )}
          {busy ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            </div>
          ) : null}
        </div>

        {/* Texte / CTA */}
        <div className="flex-1">
          <p className="font-medium text-[var(--foreground)]">
            {busy
              ? t("dashboard.upload.busy")
              : value
                ? t("dashboard.upload.change")
                : t("dashboard.upload.drop")}
          </p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            {t("dashboard.upload.hint", { max: MAX_FILE_SIZE_MB })}
            <br />
            {t("dashboard.upload.hint2")}
          </p>
        </div>

        {!busy ? (
          <div className="flex shrink-0 gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-[var(--accent)]">
              <Upload className="h-4 w-4" />
            </span>
            {value ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
                aria-label={t("dashboard.upload.delete_label")}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        ) : null}

        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            // Reset pour permettre de re-uploader le même fichier
            e.target.value = "";
          }}
        />
      </div>

      {error ? (
        <p className="text-sm text-red-600">⚠ {error}</p>
      ) : null}
    </div>
  );
}
