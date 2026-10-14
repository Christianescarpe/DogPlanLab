import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-biting/children";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function BitingChildrenPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Biting", href: "/puppy-biting/" },
        { label: "Biting Children", href: "/puppy-biting/children/" },
      ]}
      related={[
        { title: "Socializing With Children", href: "/puppy-socialization/children/" },
        { title: "Puppy Biting Overview", href: "/puppy-biting/" },
        { title: "Teaching Calm & Settle", href: "/puppy-training/calm-settle/" },
      ]}
    />
  );
}
