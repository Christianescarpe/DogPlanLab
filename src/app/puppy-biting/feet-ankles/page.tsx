import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-biting/feet-ankles";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function BitingFeetAnklesPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Biting", href: "/puppy-biting/" },
        { label: "Feet & Ankles", href: "/puppy-biting/feet-ankles/" },
      ]}
      related={[
        { title: "Biting Hands", href: "/puppy-biting/hands/" },
        { title: "Biting At Night", href: "/puppy-biting/at-night/" },
      ]}
    />
  );
}
