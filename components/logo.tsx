import { cn } from "@/lib/utils";
import Link from "next/link";

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--foreground)] shadow-[var(--shadow-sm)]">
        <span className="font-[family-name:var(--font-display)] text-lg font-bold text-[var(--background)]">
          P
        </span>
      </span>
      <span className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--foreground)]">
        Profyl
      </span>
    </Link>
  );
}
