import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-body-language/rolling-on-back";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function RollingOnBackPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Body Language", href: "/puppy-body-language/" },
        { label: "Rolling Onto Back", href: "/puppy-body-language/rolling-on-back/" },
      ]}
      related={[
        { title: "Puppy Body Language Overview", href: "/puppy-body-language/" },
        { title: "Signs of Stress", href: "/puppy-body-language/stress-signals/" },
        { title: "Play or Fighting?", href: "/puppy-body-language/play-or-fighting/" },
        { title: "Puppy Fear Overview", href: "/puppy-fear/" },
      ]}
    />
  );
}
