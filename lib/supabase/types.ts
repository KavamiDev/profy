import type { ProfileContent } from "@/types/profile";

/**
 * Types DB Profyl.
 *
 * Pour générer ce fichier automatiquement depuis Supabase :
 *   supabase gen types typescript --linked > lib/supabase/types.ts
 *
 * Cette version manuelle suffit tant qu'on contrôle le schema.
 */
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          username: string;
          content: ProfileContent;
          plan: "free" | "pro" | "studio";
          status: "draft" | "published";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          username: string;
          content?: ProfileContent;
          plan?: "free" | "pro" | "studio";
          status?: "draft" | "published";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          username?: string;
          content?: ProfileContent;
          plan?: "free" | "pro" | "studio";
          status?: "draft" | "published";
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      reserved_usernames: {
        Row: {
          username: string;
          reason: string | null;
        };
        Insert: { username: string; reason?: string | null };
        Update: { username?: string; reason?: string | null };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      claim_username: {
        Args: { p_username: string };
        Returns: {
          ok: boolean;
          reason: string;
        };
      };
    };
    Enums: Record<string, never>;
  };
};
