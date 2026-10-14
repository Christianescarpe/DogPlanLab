import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-biting";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PuppyBitingHubPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Puppy Biting", href: "/puppy-biting/" }]}
      related={[
        { title: "Biting Hands", href: "/puppy-biting/hands/" },
        { title: "Biting Feet & Ankles", href: "/puppy-biting/feet-ankles/" },
        { title: "Biting At Night", href: "/puppy-biting/at-night/" },
        { title: "How Long Does It Last?", href: "/puppy-biting/how-long/" },
        { title: "Daily Puppy Schedule", href: "/puppy-schedule/" },
        { title: "Teaching \"Drop It\"", href: "/puppy-training/drop-it/" },
        { title: "Teaching \"Leave It\"", href: "/puppy-training/leave-it/" },
        { title: "Socializing With Children", href: "/puppy-socialization/children/" },
        { title: "My Puppy Keeps Biting My Child", href: "/puppy-biting/children/" },
        { title: "Bite Inhibition", href: "/puppy-biting/bite-inhibition/" },
        { title: "Is It Aggression or Play?", href: "/puppy-biting/aggression-or-play/" },
      ]}
    />
  );
}
