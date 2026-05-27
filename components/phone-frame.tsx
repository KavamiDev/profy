import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function PhoneFrame({
  children,
  className,
  floating = false
}: {
  children: ReactNode;
  className?: string;
  floating?: boolean;
}) {
  return (
    <div
      className={cn(
        "phone-frame mx-auto w-full max-w-[340px]",
        floating && "animate-float",
        className
      )}
    >
      <div className="phone-screen">{children}</div>
    </div>
  );
}
