import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-handling/vet-visits";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function HandlingVetVisitsPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Handling", href: "/puppy-handling/" },
        { label: "Vet Visits", href: "/puppy-handling/vet-visits/" },
      ]}
      related={[
        { title: "Puppy Handling Overview", href: "/puppy-handling/" },
        { title: "Cooperative Care", href: "/puppy-handling/cooperative-care/" },
        { title: "Getting Comfortable With Car Rides", href: "/puppy-socialization/car-rides/" },
        { title: "Puppy Fear Overview", href: "/puppy-fear/" },
      ]}
    />
  );
}
