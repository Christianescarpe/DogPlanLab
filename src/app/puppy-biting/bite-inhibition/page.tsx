import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-biting/bite-inhibition";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function BiteInhibitionPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Biting", href: "/puppy-biting/" },
        { label: "Bite Inhibition", href: "/puppy-biting/bite-inhibition/" },
      ]}
      related={[
        { title: "Puppy Biting Overview", href: "/puppy-biting/" },
        { title: "Biting Hands", href: "/puppy-biting/hands/" },
        { title: "Biting Feet & Ankles", href: "/puppy-biting/feet-ankles/" },
        { title: "Is It Aggression or Play?", href: "/puppy-biting/aggression-or-play/" },
      ]}
    />
  );
}
