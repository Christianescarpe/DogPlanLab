import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-handling/paws";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function HandlingPawsPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Handling", href: "/puppy-handling/" },
        { label: "Paws", href: "/puppy-handling/paws/" },
      ]}
      related={[
        { title: "Puppy Handling Overview", href: "/puppy-handling/" },
        { title: "Puppy Nail Trimming", href: "/puppy-handling/nail-trimming/" },
        { title: "Puppy Biting When Picked Up", href: "/puppy-biting/when-picked-up/" },
      ]}
    />
  );
}
