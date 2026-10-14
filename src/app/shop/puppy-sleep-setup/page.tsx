import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "shop/puppy-sleep-setup";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function PuppySleepSetupPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Shop", href: "/shop/" },
        { label: "Puppy Sleep Setup", href: "/shop/puppy-sleep-setup/" },
      ]}
      related={[
        { title: "Shop Overview", href: "/shop/" },
        { title: "Crate Training Overview", href: "/crate-training/" },
        { title: "Where Should a Puppy Sleep?", href: "/puppy-sleep/where-should-puppy-sleep/" },
        { title: "Puppy Teething", href: "/puppy-teething/" },
        { title: "Puppy Crate Size Guide", href: "/shop/crate-size-guide/" },
      ]}
      showAffiliateDisclosure
    />
  );
}
