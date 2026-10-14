import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-handling/teeth-brushing";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function HandlingTeethBrushingPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Handling", href: "/puppy-handling/" },
        { label: "Teeth Brushing", href: "/puppy-handling/teeth-brushing/" },
      ]}
      related={[
        { title: "Mouth Handling", href: "/puppy-handling/mouth/" },
        { title: "Puppy Handling Overview", href: "/puppy-handling/" },
        { title: "Puppy Teething Overview", href: "/puppy-teething/" },
      ]}
    />
  );
}
