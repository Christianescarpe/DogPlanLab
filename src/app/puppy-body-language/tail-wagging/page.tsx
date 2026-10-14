import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-body-language/tail-wagging";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function TailWaggingPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Body Language", href: "/puppy-body-language/" },
        { label: "Tail Wagging", href: "/puppy-body-language/tail-wagging/" },
      ]}
      related={[
        { title: "Puppy Body Language Overview", href: "/puppy-body-language/" },
        { title: "Signs of Stress", href: "/puppy-body-language/stress-signals/" },
        { title: "Is It Aggression or Play?", href: "/puppy-biting/aggression-or-play/" },
      ]}
    />
  );
}
