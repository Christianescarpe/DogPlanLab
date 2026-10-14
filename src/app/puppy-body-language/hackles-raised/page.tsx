import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-body-language/hackles-raised";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function HacklesRaisedPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Body Language", href: "/puppy-body-language/" },
        { label: "Hackles Raised", href: "/puppy-body-language/hackles-raised/" },
      ]}
      related={[
        { title: "Puppy Body Language Overview", href: "/puppy-body-language/" },
        { title: "Is It Aggression or Play?", href: "/puppy-biting/aggression-or-play/" },
        { title: "Play or Fighting?", href: "/puppy-body-language/play-or-fighting/" },
        { title: "Puppy Fear Overview", href: "/puppy-fear/" },
      ]}
    />
  );
}
