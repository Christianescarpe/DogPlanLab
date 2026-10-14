import { ComingSoon } from "@/components/article/ComingSoon";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Best Online Puppy Training Programs",
  description: "A comparison of online puppy training programs.",
  path: "/best-online-puppy-training-programs/",
  // Not a completed page — no comparison content, no verified affiliate
  // relationships. Kept reachable (e.g. by direct link) but out of search
  // results and the sitemap until it's actually written. See the Wave 1
  // content brief's Section 19/Page 18 status note.
  noindex: true,
});

export default function BestOnlineProgramsPage() {
  return (
    <ComingSoon
      title="Best Online Puppy Training Programs"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Best Online Puppy Training Programs", href: "/best-online-puppy-training-programs/" },
      ]}
      related={[
        { title: "New Puppy: First Week", href: "/new-puppy/first-week/" },
        { title: "About Dog Plan Lab", href: "/about/" },
      ]}
    />
  );
}
