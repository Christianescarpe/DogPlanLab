import { LegalPage } from "@/components/layout/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Dog Plan Lab",
  description: "Who we are and what Dog Plan Lab is trying to do.",
  path: "/about/",
});

export default function AboutPage() {
  return (
    <LegalPage
      title="About Dog Plan Lab"
      updated="August 2026"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "About", href: "/about/" }]}
    >
      <p>
        Dog Plan Lab exists to make the first year of puppy ownership less confusing. Raising a
        puppy involves a lot of scattered, conflicting advice — our goal is to organize it into
        plans and guides that are practical, structured, and honest about what is and isn&rsquo;t
        settled.
      </p>
      <p>
        Dog Plan Lab is an independent educational publisher and planning tool. We&rsquo;re not a
        veterinary practice, a training franchise, or a certification body — we research and
        organize existing guidance from veterinary and animal-behavior organizations into
        structured guides, plus a personalized planning tool (the{" "}
        <a href="/puppy-plan/">Puppy Plan</a>) that turns that guidance into a routine built
        around your specific puppy.
      </p>
      <p>
        We build our content around an editorial process rather than treating every article as a
        one-off, and we&rsquo;re transparent about where each guide stands in that process: some
        guidance still needs a veterinarian, trainer, or behaviorist to review it before we treat
        it as fully vetted. Guides in that state say so directly on the page, and we keep them out
        of search results until that review is complete rather than presenting them as settled.
        The full process is outlined in our <a href="/editorial-policy/">editorial policy</a>.
      </p>
      <p>
        Dog Plan Lab is an independent publisher. We may use affiliate links in the future; see
        our <a href="/affiliate-disclosure/">affiliate disclosure</a> for current details. Nothing
        on this site is a substitute for veterinary care or a qualified professional trainer.
      </p>
    </LegalPage>
  );
}
