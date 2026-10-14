import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/lib/content";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { articleMetadata } from "@/lib/seo";

const SLUG = "puppy-socialization-checklist";

export function generateMetadata() {
  const article = getArticleBySlug(SLUG);
  return article ? articleMetadata(article.frontmatter) : {};
}

export default function SocializationChecklistPage() {
  const article = getArticleBySlug(SLUG);
  if (!article) notFound();

  return (
    <ArticleLayout
      article={article}
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Puppy Socialization Checklist", href: "/puppy-socialization-checklist/" },
      ]}
      related={[
        { title: "Before Full Vaccination", href: "/puppy-socialization/before-vaccinations/" },
        { title: "Socializing With People", href: "/puppy-socialization/people/" },
        { title: "Socializing With Children", href: "/puppy-socialization/children/" },
        { title: "Socializing With Other Dogs", href: "/puppy-socialization/dogs/" },
        { title: "Socializing to Sounds", href: "/puppy-socialization/sounds/" },
        { title: "Getting Comfortable With Car Rides", href: "/puppy-socialization/car-rides/" },
        { title: "Getting Comfortable in New Places", href: "/puppy-socialization/new-places/" },
        { title: "When Your Puppy Has a Bad Experience", href: "/puppy-socialization/bad-experience/" },
        { title: "Puppy Fear Overview", href: "/puppy-fear/" },
        { title: "New Puppy Guide", href: "/new-puppy/" },
        { title: "Puppy Schedule by Age", href: "/puppy-schedule/by-age/" },
        { title: "New Puppy: First Week", href: "/new-puppy/first-week/" },
        { title: "Puppy Handling & Grooming", href: "/puppy-handling/" },
        { title: "Puppy Body Language Overview", href: "/puppy-body-language/" },
      ]}
    />
  );
}
