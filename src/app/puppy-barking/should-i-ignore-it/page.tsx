import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-barking/should-i-ignore-it";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function ShouldIIgnoreItPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Barking", href: "/puppy-barking/" },
        { label: "Should You Ignore It?", href: "/puppy-barking/should-i-ignore-it/" },
      ]}
      related={[
        { title: "Attention & Demand Barking", href: "/puppy-barking/attention-and-demand/" },
        { title: "Puppy Fear Overview", href: "/puppy-fear/" },
        { title: "Teaching a Quiet Cue", href: "/puppy-barking/quiet-cue/" },
        { title: "Puppy Won't Stop Barking", href: "/puppy-barking/wont-stop/" },
      ]}
    />
  );
}
