import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-socialization/before-vaccinations";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function BeforeVaccinationsPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Socialization Checklist", href: "/puppy-socialization-checklist/" },
        { label: "Before Vaccinations", href: "/puppy-socialization/before-vaccinations/" },
      ]}
      related={[
        { title: "Puppy Socialization Checklist", href: "/puppy-socialization-checklist/" },
        { title: "Socializing With Other Dogs", href: "/puppy-socialization/dogs/" },
        { title: "First Week With a New Puppy", href: "/new-puppy/first-week/" },
      ]}
    />
  );
}
