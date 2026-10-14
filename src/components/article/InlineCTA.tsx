import { ButtonLink } from "@/components/ui/Button";
import { ctaHref, ctaLabel } from "@/data/nav";

export function InlineCTA({
  title = "Want a plan built around your puppy?",
  description = "Answer a few quick questions and get a personalized starting point.",
  label = ctaLabel,
  href = ctaHref,
}: {
  title?: string;
  description?: string;
  label?: string;
  href?: string;
}) {
  return (
    <div className="flex flex-col items-start gap-4 rounded-2xl border border-brand/25 bg-brand-light/30 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-display text-lg font-semibold text-ink">{title}</p>
        <p className="mt-1 text-sm text-ink-soft">{description}</p>
      </div>
      <ButtonLink href={href} className="shrink-0">
        {label}
      </ButtonLink>
    </div>
  );
}
