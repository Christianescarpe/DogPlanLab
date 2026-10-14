import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-biting/suddenly-worse";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function SuddenlyWorsePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Biting", href: "/puppy-biting/" },
        { label: "Suddenly Biting More", href: "/puppy-biting/suddenly-worse/" },
      ]}
      related={[
        { title: "Puppy Teething Overview", href: "/puppy-teething/" },
        { title: "Puppy Teething Timeline", href: "/puppy-teething/timeline/" },
        { title: "Puppy Sleep", href: "/puppy-sleep/" },
        { title: "Is It Aggression or Play?", href: "/puppy-biting/aggression-or-play/" },
      ]}
    />
  );
}
