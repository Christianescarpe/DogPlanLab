import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-teething/timeline";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PuppyTeethingTimelinePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Teething", href: "/puppy-teething/" },
        { label: "Timeline", href: "/puppy-teething/timeline/" },
      ]}
      related={[
        { title: "Puppy Teething Overview", href: "/puppy-teething/" },
        { title: "Puppy Chewing Everything", href: "/puppy-chewing/everything/" },
      ]}
    />
  );
}
