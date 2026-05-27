import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "accent" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-200 disabled:opacity-50",
        variant === "primary" && "btn-primary",
        variant === "accent" && "btn-accent text-white",
        variant === "secondary" &&
          "border border-[var(--border)] bg-white text-[var(--foreground)] hover:bg-[var(--surface-hover)]",
        variant === "ghost" &&
          "text-[var(--muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]",
        size === "sm" && "h-9 rounded-full px-4 text-sm",
        size === "md" && "h-11 rounded-full px-6 text-sm",
        size === "lg" && "h-12 rounded-full px-8 text-base",
        className
      )}
      {...props}
    />
  );
}
