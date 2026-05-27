import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

/**
 * Faux navigateur macOS contenant un iframe scrollable.
 * Permet d'embarquer une vraie page Profyl dans la landing.
 */
export function BrowserFrame({
  url,
  src,
  title,
  className,
  height = 720
}: {
  url: string;
  src: string;
  title: string;
  className?: string;
  height?: number;
}) {
  return (
    <div className={cn("browser-frame group", className)}>
      <div className="browser-chrome">
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="browser-url">
          <Lock className="h-3 w-3 text-[var(--muted)]" />
          <span className="text-[var(--muted)]">{url.replace(/^https?:\/\//, "")}</span>
        </div>
        <div className="hidden w-12 sm:block" aria-hidden />
      </div>
      <iframe
        src={src}
        title={title}
        className="browser-content"
        style={{ height }}
        loading="lazy"
      />
    </div>
  );
}
