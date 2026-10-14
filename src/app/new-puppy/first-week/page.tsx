import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "new-puppy/first-week";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function FirstWeekPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "New Puppy", href: "/new-puppy/" },
        { label: "First Week", href: "/new-puppy/first-week/" },
      ]}
      related={[
        { title: "Puppy Schedule", href: "/puppy-schedule/" },
        { title: "Potty Training Overview", href: "/potty-training/" },
        { title: "Crate Training Overview", href: "/crate-training/" },
        { title: "Puppy Handling & Grooming", href: "/puppy-handling/" },
        { title: "New Puppy Shopping List", href: "/shop/new-puppy-shopping-list/" },
      ]}
    />
  );
}
