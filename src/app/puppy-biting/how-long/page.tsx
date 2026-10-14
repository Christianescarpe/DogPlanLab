import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-biting/how-long";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function HowLongPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Biting", href: "/puppy-biting/" },
        { label: "How Long Does It Last?", href: "/puppy-biting/how-long/" },
      ]}
      related={[
        { title: "Puppy Biting Overview", href: "/puppy-biting/" },
        { title: "Won't Stop, Even With Redirection", href: "/puppy-biting/wont-stop/" },
        { title: "Bite Inhibition", href: "/puppy-biting/bite-inhibition/" },
      ]}
    />
  );
}
