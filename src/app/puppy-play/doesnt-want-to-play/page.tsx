import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-play/doesnt-want-to-play";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function DoesntWantToPlayPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Play", href: "/puppy-play/" },
        { label: "Doesn't Want to Play", href: "/puppy-play/doesnt-want-to-play/" },
      ]}
      related={[
        { title: "Puppy Play Overview", href: "/puppy-play/" },
        { title: "Overtired Puppy", href: "/puppy-sleep/overtired/" },
        { title: "Puppy Won't Exercise", href: "/puppy-exercise/wont-exercise/" },
      ]}
    />
  );
}
