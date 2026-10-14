import { LegalPage } from "@/components/layout/LegalPage";
import { Callout } from "@/components/ui/Callout";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms for using the Dog Plan Lab website and tools.",
  path: "/terms/",
});

// INTERNAL: this draft has not been reviewed by legal counsel. Route through
// counsel before launch. Tracked in CONTENT-PLACEHOLDERS.md.
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="August 2026"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms", href: "/terms/" }]}
    >
      <div className="not-prose mb-6">
        <Callout tone="caution" title="Draft policy">
          This is a working draft. It has not yet been reviewed by legal counsel.
        </Callout>
      </div>

      <h2>Educational content only</h2>
      <p>
        Dog Plan Lab provides general educational content about puppy care and training. It is not
        veterinary, medical, or professional behavioral advice, and is not a substitute for
        consulting a licensed veterinarian or qualified professional trainer.
      </p>
      <h2>The Puppy Plan tool</h2>
      <p>
        The Puppy Plan is generated from the information you provide using a rules-based system,
        not a diagnosis of your individual puppy. Use your own judgment and consult a professional
        for anything involving your puppy&rsquo;s health or safety.
      </p>
      <h2>Affiliate links</h2>
      <p>
        Dog Plan Lab does not currently have any active affiliate relationships. If that changes,
        affected pages will disclose it directly, and our{" "}
        <a href="/affiliate-disclosure/">affiliate disclosure</a> page will be updated.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}
