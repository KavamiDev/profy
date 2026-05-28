"use client";

import Link from "next/link";
import { ExternalLink, LogOut, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { useT } from "@/components/locale-provider";
import { signOut } from "@/app/dashboard/actions";
import { DEMO_USERNAME } from "@/lib/demo-persona";
import { useEditorStore } from "@/lib/editor/store";

export function EditorHeader({ userEmail }: { userEmail: string }) {
  const t = useT();
  const username = useEditorStore((s) => s.username);

  return (
    <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
        <Logo />
        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard?username=${DEMO_USERNAME}`}
            className="hidden text-sm text-[var(--muted)] transition hover:text-[var(--foreground)] sm:inline"
          >
            {t("dashboard.see_example")}
          </Link>
          {username ? (
            <Link
              href={`/${username}`}
              target="_blank"
              className="hidden items-center gap-2 text-sm text-[var(--muted)] transition hover:text-[var(--foreground)] sm:inline-flex"
            >
              {t("dashboard.see_page")}
              <ExternalLink className="h-4 w-4" />
            </Link>
          ) : null}
          <Button type="submit" form="profile-form" variant="accent" size="sm">
            <Save className="mr-2 h-4 w-4" />
            {t("dashboard.publish")}
          </Button>
          {userEmail ? (
            <form action={signOut}>
              <button
                type="submit"
                className="hidden items-center gap-1.5 text-sm text-[var(--muted)] transition hover:text-[var(--foreground)] sm:inline-flex"
                title={userEmail}
              >
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          ) : null}
        </div>
      </div>
    </header>
  );
}
