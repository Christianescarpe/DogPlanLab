import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-biting/when-picked-up";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function WhenPickedUpPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Biting", href: "/puppy-biting/" },
        { label: "When Picked Up or Handled", href: "/puppy-biting/when-picked-up/" },
      ]}
      related={[
        { title: "Puppy Biting Overview", href: "/puppy-biting/" },
        { title: "Puppy Fear Overview", href: "/puppy-fear/" },
        { title: "First Week With a New Puppy", href: "/new-puppy/first-week/" },
        { title: "Teaching Calm & Settle", href: "/puppy-training/calm-settle/" },
        { title: "How to Pick Up a Puppy Correctly", href: "/puppy-handling/picking-up/" },
      ]}
    />
  );
}
