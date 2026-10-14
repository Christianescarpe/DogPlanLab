import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs, Crumb } from "@/components/article/Breadcrumbs";
import { InlineCTA } from "@/components/article/InlineCTA";

export type HubLink = { title: string; description: string; href: string };

export function CategoryHub({
  title,
  intro,
  breadcrumbs,
  links,
}: {
  title: string;
  intro: string;
  breadcrumbs: Crumb[];
  links: HubLink[];
}) {
  return (
    <Container size="wide" className="py-10">
      <div className="mx-auto max-w-content">
        <Breadcrumbs items={breadcrumbs} />
        <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-ink-soft leading-relaxed">{intro}</p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-2xl border border-border bg-surface p-6 hover:border-accent/40"
          >
            <h2 className="font-display text-lg font-semibold text-ink">{link.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{link.description}</p>
          </Link>
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-content">
        <InlineCTA />
      </div>
    </Container>
  );
}
