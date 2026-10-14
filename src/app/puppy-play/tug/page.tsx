import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-play/tug";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function TugPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Play", href: "/puppy-play/" },
        { label: "Playing Tug", href: "/puppy-play/tug/" },
      ]}
      related={[
        { title: "Puppy Play Overview", href: "/puppy-play/" },
        { title: "Teaching \"Drop It\"", href: "/puppy-training/drop-it/" },
        { title: "Is It Aggression or Play?", href: "/puppy-biting/aggression-or-play/" },
      ]}
    />
  );
}
