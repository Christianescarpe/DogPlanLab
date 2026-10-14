import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-barking/wont-stop";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function WontStopPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Barking", href: "/puppy-barking/" },
        { label: "Won't Stop Barking", href: "/puppy-barking/wont-stop/" },
      ]}
      related={[
        { title: "Puppy Barking Overview", href: "/puppy-barking/" },
        { title: "Attention & Demand Barking", href: "/puppy-barking/attention-and-demand/" },
        { title: "Puppy Body Language Overview", href: "/puppy-body-language/" },
        { title: "Puppy Schedule by Age", href: "/puppy-schedule/" },
        { title: "Overtired Puppy", href: "/puppy-sleep/overtired/" },
      ]}
    />
  );
}
