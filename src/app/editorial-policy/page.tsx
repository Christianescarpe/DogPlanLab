import { LegalPage } from "@/components/layout/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Editorial Policy",
  description: "How Dog Plan Lab researches, writes, and reviews its content.",
  path: "/editorial-policy/",
});

export default function EditorialPolicyPage() {
  return (
    <LegalPage
      title="Editorial Policy"
      updated="August 2026"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Editorial Policy", href: "/editorial-policy/" }]}
    >
      <h2>Our approach</h2>
      <p>
        We do not publish invented specifics — exact durations, feeding amounts, medical
        thresholds, or behavioral diagnoses. Where solid guidance for a topic doesn&rsquo;t exist
        yet, we mark it clearly rather than filling the gap with a guess.
      </p>

      <h2>How we choose sources</h2>
      <p>
        We prioritize veterinary hospital networks, recognized animal-welfare and behavior
        organizations (for example the American Veterinary Society of Animal Behavior, the
        American Animal Hospital Association, and the American Kennel Club), and named,
        credentialed professionals when quoted directly. We avoid treating a commercial blog or an
        uncredentialed opinion piece as authoritative on its own. Where a common claim turns out
        not to be well-supported by any of those sources, we say so rather than repeating it
        because it&rsquo;s widely believed.
      </p>

      <h2>How we verify claims</h2>
      <p>
        Every specific factual claim in a published article traces back to a cited source, listed
        in that article&rsquo;s Sources section. We preserve the qualifiers and uncertainty in the
        underlying research — a source describing something as a general pattern doesn&rsquo;t get
        rewritten into a firm rule, and a claim that&rsquo;s commonly repeated but not traced to an
        authoritative source is labeled as such rather than presented as settled fact.
      </p>

      <h2>Professional review status</h2>
      <p>
        Articles go through internal research and editorial work before publishing. Some — the
        ones touching higher-stakes territory like crate duration, biting technique, or
        vaccine-timing/socialization guidance — also need direct confirmation from an appropriate
        professional before we consider them fully vetted. Depending on the subject, that&rsquo;s a
        veterinarian, a credentialed dog trainer, or a veterinary behaviorist — not every article
        needs all three, and which one applies depends on what&rsquo;s actually being flagged.
      </p>
      <p>
        While that confirmation is pending, we publish our current, sourced draft rather than
        holding the article back entirely, and treat any specific recommendation on that page as
        provisional until the review is complete. Those pages are kept out of search results until
        then.
      </p>
      <p>
        We track this review status internally rather than displaying it on individual pages — a
        partial or in-progress label next to an article is easy to misread as a broader claim about
        that article, or about Dog Plan Lab generally. We don&rsquo;t publish reviewer names or
        credentials, and we don&rsquo;t label any page or the site as a whole &ldquo;vet
        approved&rdquo;&mdash;when a professional confirms guidance, that confirmation applies
        specifically to what was flagged, not to the article or site more broadly.
      </p>

      <h2>Sources</h2>
      <p>
        Where we cite external material, we link to it directly in the article&rsquo;s Sources
        section.
      </p>

      <h2>Corrections and updates</h2>
      <p>
        If sourcing turns out to be incomplete, superseded, or wrong, we correct the article
        rather than leaving it as published — including reversing specific guidance where a more
        careful source review shows the original framing was mistaken. Each article shows the date
        it was last updated. If you believe something on this site is inaccurate, contact us at{" "}
        <a href="mailto:hello@dogplanlab.com">hello@dogplanlab.com</a>.
      </p>

      <h2>Editorial independence</h2>
      <p>
        Editorial decisions — what we cover, what we recommend, and how we frame guidance — are
        made independently of any affiliate relationship. See our{" "}
        <a href="/affiliate-disclosure/">affiliate disclosure</a> for how we handle affiliate
        links where they exist.
      </p>
    </LegalPage>
  );
}
