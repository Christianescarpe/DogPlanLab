import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-handling/brushing";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function HandlingBrushingPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Handling", href: "/puppy-handling/" },
        { label: "Brushing", href: "/puppy-handling/brushing/" },
      ]}
      related={[
        { title: "Puppy Handling Overview", href: "/puppy-handling/" },
        { title: "Puppy Biting When Picked Up", href: "/puppy-biting/when-picked-up/" },
        { title: "How Often Should a Puppy Be Groomed?", href: "/puppy-handling/how-often/" },
        { title: "Brushes by Coat Type", href: "/shop/brushes-by-coat-type/" },
      ]}
    />
  );
}
