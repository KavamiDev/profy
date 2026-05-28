"use client";

import { useT } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { ArrowRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function LoginForm({ next }: { next?: string }) {
  const t = useT();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || loading) return;
    setLoading(true);

    const supabase = createSupabaseBrowserClient();
    const origin = window.location.origin;
    const redirectTo = `${origin}/auth/callback${next ? `?next=${encodeURIComponent(next)}` : ""}`;

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: redirectTo }
    });

    setLoading(false);

    if (error) {
      router.push("/login?error=send-failed");
      return;
    }
    router.push("/login?sent=1");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email">{t("login.email_label")}</Label>
        <Input
          id="email"
          type="email"
          name="email"
          required
          autoFocus
          placeholder={t("login.email_placeholder")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        variant="accent"
        size="lg"
        disabled={loading || !email}
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {t("login.button_loading")}
          </>
        ) : (
          <>
            {t("login.button")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}
