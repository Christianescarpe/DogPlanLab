import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-fear/scared-of-dogs";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function ScaredOfDogsPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Fear", href: "/puppy-fear/" },
        { label: "Scared of Other Dogs", href: "/puppy-fear/scared-of-dogs/" },
      ]}
      related={[
        { title: "Puppy Fear Overview", href: "/puppy-fear/" },
        { title: "Socializing With Other Dogs", href: "/puppy-socialization/dogs/" },
        { title: "Bad Experience", href: "/puppy-socialization/bad-experience/" },
      ]}
    />
  );
}
