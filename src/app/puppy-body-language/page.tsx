import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-body-language";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function BodyLanguageHubPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Puppy Body Language", href: "/puppy-body-language/" }]}
      related={[
        { title: "Signs of Stress", href: "/puppy-body-language/stress-signals/" },
        { title: "Calming Signals", href: "/puppy-body-language/calming-signals/" },
        { title: "Tail Wagging", href: "/puppy-body-language/tail-wagging/" },
        { title: "Hackles Raised", href: "/puppy-body-language/hackles-raised/" },
        { title: "Rolling Onto Back", href: "/puppy-body-language/rolling-on-back/" },
        { title: "Play or Fighting", href: "/puppy-body-language/play-or-fighting/" },
        { title: "Fear vs. Excitement", href: "/puppy-body-language/fear-vs-excitement/" },
        { title: "Is It Aggression or Play?", href: "/puppy-biting/aggression-or-play/" },
        { title: "Puppy Fear Overview", href: "/puppy-fear/" },
      ]}
    />
  );
}
