import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-handling/bathing";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function HandlingBathingPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Handling", href: "/puppy-handling/" },
        { label: "First Bath", href: "/puppy-handling/bathing/" },
      ]}
      related={[
        { title: "Puppy Handling Overview", href: "/puppy-handling/" },
        { title: "Puppy Fear Overview", href: "/puppy-fear/" },
        { title: "Brushing Your Puppy", href: "/puppy-handling/brushing/" },
        { title: "Puppy-Safe Shampoo", href: "/shop/puppy-safe-shampoo/" },
      ]}
    />
  );
}
