import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-socialization/new-places";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function SocializationNewPlacesPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Socialization Checklist", href: "/puppy-socialization-checklist/" },
        { label: "New Places", href: "/puppy-socialization/new-places/" },
      ]}
      related={[
        { title: "Puppy Socialization Checklist", href: "/puppy-socialization-checklist/" },
        { title: "Puppy Fear Overview", href: "/puppy-fear/" },
        { title: "Car Rides", href: "/puppy-socialization/car-rides/" },
      ]}
    />
  );
}
