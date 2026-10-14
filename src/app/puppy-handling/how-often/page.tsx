import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-handling/how-often";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function HandlingHowOftenPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Handling", href: "/puppy-handling/" },
        { label: "How Often to Groom", href: "/puppy-handling/how-often/" },
      ]}
      related={[
        { title: "Puppy Handling Overview", href: "/puppy-handling/" },
        { title: "Puppy Nail Trimming", href: "/puppy-handling/nail-trimming/" },
        { title: "Brushing Your Puppy", href: "/puppy-handling/brushing/" },
        { title: "Your Puppy's First Bath", href: "/puppy-handling/bathing/" },
        { title: "Teeth Brushing", href: "/puppy-handling/teeth-brushing/" },
      ]}
    />
  );
}
