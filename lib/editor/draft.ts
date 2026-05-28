"use client";

import { useEffect } from "react";
import { useEditorStore } from "./store";
import { buffersFromContent, type EditorBuffers } from "./normalize";
import type { ProfileContent } from "@/types/profile";

type DraftPayload = {
  username: string;
  content: ProfileContent;
  buffers: EditorBuffers;
  savedAt: number;
};

const DRAFT_TTL_MS = 60 * 60 * 1000; // 1h

function key(userId: string): string {
  return userId ? `profyl:draft:${userId}` : "profyl:draft:anon";
}

/**
 * Persiste le contenu de l'éditeur dans localStorage.
 * - Restore à mount si draft < 1h
 * - Sauvegarde debounced 400ms à chaque changement
 * - Nettoie après publish réussi (saved=true)
 */
export function useDraftPersistence(userId: string, saved: boolean) {
  // Restore au mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(key(userId));
      if (!raw) return;
      const parsed = JSON.parse(raw) as DraftPayload;
      if (Date.now() - parsed.savedAt > DRAFT_TTL_MS) return;
      if (!parsed.content?.hero?.fullName && !parsed.username) return;
      useEditorStore.setState({
        username: parsed.username,
        content: parsed.content,
        buffers: parsed.buffers ?? buffersFromContent(parsed.content),
        restoredFromDraft: true
      });
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave debounced
  useEffect(() => {
    if (typeof window === "undefined") return;
    let timer: ReturnType<typeof setTimeout> | null = null;
    const unsub = useEditorStore.subscribe((state) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        try {
          const payload: DraftPayload = {
            username: state.username,
            content: state.content,
            buffers: state.buffers,
            savedAt: Date.now()
          };
          window.localStorage.setItem(key(userId), JSON.stringify(payload));
        } catch {
          /* ignore */
        }
      }, 400);
    });
    return () => {
      unsub();
      if (timer) clearTimeout(timer);
    };
  }, [userId]);

  // Cleanup après publish
  useEffect(() => {
    if (!saved || typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(key(userId));
    } catch {
      /* ignore */
    }
    useEditorStore.setState({ restoredFromDraft: false });
  }, [saved, userId]);
}
