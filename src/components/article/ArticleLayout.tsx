import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Article } from "@/types/content";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs, Crumb } from "@/components/article/Breadcrumbs";
import { ArticleMeta } from "@/components/article/ArticleMeta";
import { TableOfContents } from "@/components/article/TableOfContents";
import { SourcesList } from "@/components/article/SourcesList";
import { RelatedArticles, RelatedItem } from "@/components/article/RelatedArticles";
import { CategoryImage } from "@/components/article/CategoryImage";
import { InlineCTA } from "@/components/article/InlineCTA";
import { AffiliateDisclosureBlock } from "@/components/article/AffiliateDisclosureBlock";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/components/seo/JsonLd";
import { mdxComponents } from "@/lib/mdx-components";
import { extractToc } from "@/lib/toc";
import { siteConfig } from "@/data/site";

function formatCategoryLabel(category: string): string {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function ArticleLayout({
  article,
  breadcrumbs,
  related = [],
  showAffiliateDisclosure = false,
}: {
  article: Article;
  breadcrumbs: Crumb[];
  related?: RelatedItem[];
  showAffiliateDisclosure?: boolean;
}) {
  const { frontmatter, content } = article;
  const toc = extractToc(content);
  const url = `${siteConfig.url}/${frontmatter.slug}/`;

  return (
    <article>
      <JsonLd
        data={articleSchema({
          title: frontmatter.title,
          description: frontmatter.description,
          url,
          datePublished: frontmatter.updated,
          dateModified: frontmatter.updated,
          authorName: frontmatter.author,
        })}
      />
      <JsonLd
        data={breadcrumbSchema(
          breadcrumbs.map((crumb) => ({ name: crumb.label, url: `${siteConfig.url}${crumb.href}` }))
        )}
      />

      <div className="border-b border-border bg-paper-alt py-8">
        <Container size="default">
          <div className="lg:flex lg:items-start lg:gap-12">
            <div className="lg:max-w-3xl lg:flex-1">
              <Breadcrumbs items={breadcrumbs} />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                {formatCategoryLabel(frontmatter.category)}
              </p>
              <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {frontmatter.title}
              </h1>
              <div className="mt-4">
                <ArticleMeta author={frontmatter.author} reviewer={frontmatter.reviewer} updated={frontmatter.updated} />
              </div>
              <div className="mt-6 lg:hidden">
                <CategoryImage category={frontmatter.category} />
              </div>
            </div>
            <div className="hidden lg:block lg:w-72 lg:shrink-0">
              <CategoryImage category={frontmatter.category} />
            </div>
          </div>
        </Container>
      </div>

      <Container size="default" className="py-10">
        <div className="lg:flex lg:items-start lg:gap-12">
          <div className="min-w-0 space-y-10 lg:max-w-3xl lg:flex-1">
            {toc.length > 0 && (
              <div className="lg:hidden">
                <TableOfContents items={toc} />
              </div>
            )}

            {showAffiliateDisclosure && <AffiliateDisclosureBlock />}

            <div className="prose max-w-none prose-headings:font-display">
              <MDXRemote
                source={content}
                components={mdxComponents}
                options={{
                  mdxOptions: { remarkPlugins: [remarkGfm] },
                  // Content in /content is first-party and trusted, so allow the
                  // JS expressions our custom components rely on (e.g. items={[...]}).
                  blockJS: false,
                }}
              />
            </div>

            {frontmatter.primaryCTA && (
              <InlineCTA href={frontmatter.primaryCTA.href} label={frontmatter.primaryCTA.label} />
            )}

            <div>
              <h2 className="font-display text-xl font-semibold text-ink">Sources</h2>
              <div className="mt-3">
                <SourcesList sources={frontmatter.sources ?? []} />
              </div>
            </div>

            <RelatedArticles items={related} />
          </div>

          {toc.length > 0 && (
            <div className="hidden lg:block lg:w-72 lg:shrink-0">
              <div className="sticky top-24">
                <TableOfContents items={toc} />
              </div>
            </div>
          )}
        </div>
      </Container>
    </article>
  );
}
