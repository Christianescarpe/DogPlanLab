import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-socialization/dogs";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function SocializationDogsPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Socialization Checklist", href: "/puppy-socialization-checklist/" },
        { label: "Other Dogs", href: "/puppy-socialization/dogs/" },
      ]}
      related={[
        { title: "Puppy Socialization Checklist", href: "/puppy-socialization-checklist/" },
        { title: "Scared of Other Dogs", href: "/puppy-fear/scared-of-dogs/" },
        { title: "Bad Experience", href: "/puppy-socialization/bad-experience/" },
        { title: "Play or Fighting?", href: "/puppy-body-language/play-or-fighting/" },
      ]}
    />
  );
}
