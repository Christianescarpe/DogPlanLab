import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-body-language/stress-signals";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function StressSignalsPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Body Language", href: "/puppy-body-language/" },
        { label: "Signs of Stress", href: "/puppy-body-language/stress-signals/" },
      ]}
      related={[
        { title: "Puppy Body Language Overview", href: "/puppy-body-language/" },
        { title: "Puppy Fear Overview", href: "/puppy-fear/" },
        { title: "Is It Aggression or Play?", href: "/puppy-biting/aggression-or-play/" },
        { title: "Overtired Puppy", href: "/puppy-sleep/overtired/" },
        { title: "Calming Signals", href: "/puppy-body-language/calming-signals/" },
      ]}
    />
  );
}
