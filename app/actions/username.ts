"use server";

import { isUsernameAvailable } from "@/lib/server/profiles-store";

/**
 * Vérifie la disponibilité d'un username pour le champ "claim" du hero.
 * Réutilise la logique serveur (format + réservé + déjà pris).
 */
export async function checkUsernameAvailability(username: string): Promise<{
  available: boolean;
  reason?: "format" | "reserved" | "taken";
}> {
  return isUsernameAvailable(username);
}
