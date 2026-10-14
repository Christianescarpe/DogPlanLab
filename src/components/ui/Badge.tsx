import { ReactNode } from "react";
import clsx from "clsx";

export function Badge({
  children,
  tone = "brand",
  className,
}: {
  children: ReactNode;
  tone?: "brand" | "accent" | "muted";
  className?: string;
}) {
  const tones: Record<string, string> = {
    brand: "bg-brand-light text-brand-dark",
    accent: "bg-accent-light text-accent",
    muted: "bg-paper-alt text-ink-soft",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide uppercase",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
