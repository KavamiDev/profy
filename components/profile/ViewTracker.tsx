"use client";

import { useEffect } from "react";

/**
 * Beacon discret qui enregistre une vue de profil au montage.
 * Rendu uniquement sur les pages publiques (pas en embed, pas pour le owner).
 * Une vue par chargement de page ; aucune donnée perso côté client.
 */
export function ViewTracker({ username }: { username: string }) {
  useEffect(() => {
    // Évite le double-comptage en navigation SPA / Strict Mode.
    const key = `profyl:viewed:${username}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      /* sessionStorage indispo (mode privé) : on track quand même une fois */
    }

    const payload = JSON.stringify({ username, referrer: document.referrer || "" });
    fetch("/api/views", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true
    }).catch(() => {
      /* analytics best-effort, on n'embête jamais le visiteur */
    });
  }, [username]);

  return null;
}
