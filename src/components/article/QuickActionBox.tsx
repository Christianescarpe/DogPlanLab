import { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";

export function QuickActionBox({
  title,
  children,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  children: ReactNode;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <div className="rounded-2xl border border-brand/25 bg-brand-light/30 p-6">
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-ink-soft">{children}</div>
      <ButtonLink href={ctaHref} size="md" className="mt-4">
        {ctaLabel}
      </ButtonLink>
    </div>
  );
}
