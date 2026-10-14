import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-barking";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function BarkingHubPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Puppy Barking", href: "/puppy-barking/" }]}
      related={[
        { title: "What Your Puppy's Bark Actually Means", href: "/puppy-barking/types-of-barks/" },
        { title: "Attention & Demand Barking", href: "/puppy-barking/attention-and-demand/" },
        { title: "Barking at the Door", href: "/puppy-barking/at-the-door/" },
        { title: "Barking at Other Dogs", href: "/puppy-barking/at-other-dogs/" },
        { title: "Barking at Sounds & Sights", href: "/puppy-barking/at-sounds-and-sights/" },
        { title: "Puppy Won't Stop Barking", href: "/puppy-barking/wont-stop/" },
        { title: "Should You Ignore Barking?", href: "/puppy-barking/should-i-ignore-it/" },
        { title: "Teaching a Quiet Cue", href: "/puppy-barking/quiet-cue/" },
        { title: "Why Does My Puppy Howl?", href: "/puppy-barking/howling/" },
        { title: "Crying in the Crate", href: "/crate-training/crying/" },
        { title: "Crate Crying at Night", href: "/crate-training/crying-at-night/" },
        { title: "Puppy Home Alone", href: "/puppy-home-alone/" },
        { title: "Nighttime Sleep Problems", href: "/puppy-sleep/nighttime-problems/" },
        { title: "Puppy Fear Overview", href: "/puppy-fear/" },
      ]}
    />
  );
}
