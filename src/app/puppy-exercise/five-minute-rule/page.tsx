import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-exercise/five-minute-rule";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function FiveMinuteRulePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Exercise", href: "/puppy-exercise/" },
        { label: "The Five-Minute Rule", href: "/puppy-exercise/five-minute-rule/" },
      ]}
      related={[
        { title: "Puppy Exercise Overview", href: "/puppy-exercise/" },
        { title: "Exercise by Age", href: "/puppy-exercise/by-age/" },
        { title: "Puppy Zoomies at Night", href: "/puppy-zoomies/at-night/" },
        { title: "Overtired Puppy", href: "/puppy-sleep/overtired/" },
        { title: "Puppy Enrichment Overview", href: "/puppy-enrichment/" },
      ]}
    />
  );
}
