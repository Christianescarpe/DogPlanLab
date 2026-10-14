import { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs, Crumb } from "@/components/article/Breadcrumbs";

export function LegalPage({
  title,
  updated,
  breadcrumbs,
  children,
}: {
  title: string;
  updated: string;
  breadcrumbs: Crumb[];
  children: ReactNode;
}) {
  return (
    <Container size="narrow" className="py-12">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h1>
      <p className="mt-2 text-sm text-muted">Last updated {updated}</p>
      <div className="prose mt-8 max-w-none prose-headings:font-display">
        {children}
      </div>
    </Container>
  );
}
