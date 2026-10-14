import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-handling/nail-trimming";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function HandlingNailTrimmingPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Handling", href: "/puppy-handling/" },
        { label: "Nail Trimming", href: "/puppy-handling/nail-trimming/" },
      ]}
      related={[
        { title: "Touching Your Puppy's Paws", href: "/puppy-handling/paws/" },
        { title: "Puppy Handling Overview", href: "/puppy-handling/" },
        { title: "Puppy Biting When Picked Up", href: "/puppy-biting/when-picked-up/" },
        { title: "How Often Should a Puppy Be Groomed?", href: "/puppy-handling/how-often/" },
        { title: "Nail Clippers & Grinders", href: "/shop/nail-clippers-and-grinders/" },
      ]}
    />
  );
}
