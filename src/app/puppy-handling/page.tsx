import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-handling";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PuppyHandlingHubPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Puppy Handling", href: "/puppy-handling/" }]}
      related={[
        { title: "Touching Your Puppy's Paws", href: "/puppy-handling/paws/" },
        { title: "Touching Your Puppy's Ears", href: "/puppy-handling/ears/" },
        { title: "Mouth Handling", href: "/puppy-handling/mouth/" },
        { title: "How to Pick Up a Puppy Correctly", href: "/puppy-handling/picking-up/" },
        { title: "Brushing Your Puppy", href: "/puppy-handling/brushing/" },
        { title: "Your Puppy's First Bath", href: "/puppy-handling/bathing/" },
        { title: "Puppy Nail Trimming", href: "/puppy-handling/nail-trimming/" },
        { title: "Teeth Brushing", href: "/puppy-handling/teeth-brushing/" },
        { title: "Preparing for the Groomer", href: "/puppy-handling/groomer-visit/" },
        { title: "Preparing for Vet Visits", href: "/puppy-handling/vet-visits/" },
        { title: "Cooperative Care", href: "/puppy-handling/cooperative-care/" },
        { title: "How Often Should a Puppy Be Groomed?", href: "/puppy-handling/how-often/" },
      ]}
    />
  );
}
