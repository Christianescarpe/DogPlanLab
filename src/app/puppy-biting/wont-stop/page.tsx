import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-biting/wont-stop";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function WontStopPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Biting", href: "/puppy-biting/" },
        { label: "Won't Stop, Even With Redirection", href: "/puppy-biting/wont-stop/" },
      ]}
      related={[
        { title: "Puppy Biting Overview", href: "/puppy-biting/" },
        { title: "Biting Hands", href: "/puppy-biting/hands/" },
        { title: "Is It Aggression or Play?", href: "/puppy-biting/aggression-or-play/" },
        { title: "Bite Inhibition", href: "/puppy-biting/bite-inhibition/" },
      ]}
    />
  );
}
