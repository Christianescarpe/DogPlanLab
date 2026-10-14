import { Container } from "@/components/ui/Container";
import { Breadcrumbs, Crumb } from "@/components/article/Breadcrumbs";
import { RelatedArticles, RelatedItem } from "@/components/article/RelatedArticles";
import { InlineCTA } from "@/components/article/InlineCTA";

/**
 * Route-ready placeholder for a page whose final, reviewed content hasn't
 * been supplied yet. Intentionally contains no invented advice.
 */
export function ComingSoon({
  title,
  breadcrumbs,
  related = [],
}: {
  title: string;
  breadcrumbs: Crumb[];
  related?: RelatedItem[];
}) {
  return (
    <Container size="narrow" className="py-10">
      <Breadcrumbs items={breadcrumbs} />
      <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h1>
      <div className="mt-6 rounded-2xl border border-dashed border-border-strong bg-paper-alt p-6 text-ink-soft">
        <p className="font-medium text-ink">This guide is in development.</p>
        <p className="mt-2 text-sm leading-relaxed">
          We&rsquo;re still finalizing reviewed guidance for this page. In the meantime, the
          resources below cover related ground.
        </p>
      </div>

      <div className="mt-10 space-y-10">
        <InlineCTA />
        <RelatedArticles items={related} />
      </div>
    </Container>
  );
}
