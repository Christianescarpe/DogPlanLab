import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-socialization/people";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function SocializationPeoplePage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Socialization Checklist", href: "/puppy-socialization-checklist/" },
        { label: "People", href: "/puppy-socialization/people/" },
      ]}
      related={[
        { title: "Puppy Socialization Checklist", href: "/puppy-socialization-checklist/" },
        { title: "Scared of People", href: "/puppy-fear/scared-of-people/" },
        { title: "Rewards & Treats", href: "/puppy-training/rewards/" },
      ]}
    />
  );
}
