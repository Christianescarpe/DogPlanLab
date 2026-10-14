import { ReactNode } from "react";
import clsx from "clsx";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-border bg-surface p-6 shadow-sm shadow-ink/[0.03]",
        className
      )}
    >
      {children}
    </div>
  );
}
