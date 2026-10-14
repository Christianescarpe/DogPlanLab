import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-biting/hands";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function BitingHandsPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Biting", href: "/puppy-biting/" },
        { label: "Hands", href: "/puppy-biting/hands/" },
      ]}
      related={[
        { title: "Biting Feet & Ankles", href: "/puppy-biting/feet-ankles/" },
        { title: "Biting At Night", href: "/puppy-biting/at-night/" },
        { title: "Puppy Biting Overview", href: "/puppy-biting/" },
      ]}
    />
  );
}
