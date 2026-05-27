import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

/**
 * Client admin Supabase (service_role).
 * À utiliser UNIQUEMENT côté serveur, jamais exposé au browser.
 * Bypass RLS — réservé aux opérations système (seed, cron, webhooks).
 */
export function createSupabaseAdminClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
}
