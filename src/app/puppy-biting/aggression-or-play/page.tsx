import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-biting/aggression-or-play";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function AggressionOrPlayPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Biting", href: "/puppy-biting/" },
        { label: "Aggression or Play?", href: "/puppy-biting/aggression-or-play/" },
      ]}
      related={[
        { title: "Puppy Biting Overview", href: "/puppy-biting/" },
        { title: "Bite Inhibition", href: "/puppy-biting/bite-inhibition/" },
        { title: "My Puppy Keeps Biting My Child", href: "/puppy-biting/children/" },
        { title: "Teaching \"Leave It\"", href: "/puppy-training/leave-it/" },
        { title: "Puppy Fear Overview", href: "/puppy-fear/" },
        { title: "Puppy Body Language Overview", href: "/puppy-body-language/" },
        { title: "Barking at Other Dogs", href: "/puppy-barking/at-other-dogs/" },
      ]}
    />
  );
}
