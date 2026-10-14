import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-body-language/fear-vs-excitement";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function FearVsExcitementPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Body Language", href: "/puppy-body-language/" },
        { label: "Fear vs. Excitement", href: "/puppy-body-language/fear-vs-excitement/" },
      ]}
      related={[
        { title: "Puppy Body Language Overview", href: "/puppy-body-language/" },
        { title: "Puppy Fear Overview", href: "/puppy-fear/" },
        { title: "Signs of Stress", href: "/puppy-body-language/stress-signals/" },
        { title: "Tail Wagging", href: "/puppy-body-language/tail-wagging/" },
      ]}
    />
  );
}
