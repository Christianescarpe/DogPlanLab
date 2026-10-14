import { LegalPage } from "@/components/layout/LegalPage";
import { Callout } from "@/components/ui/Callout";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/data/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Dog Plan Lab collects and uses information.",
  path: "/privacy/",
});

// INTERNAL: this draft describes the site's current actual behavior (no
// production email/analytics provider connected — see
// src/lib/email-provider.ts and src/lib/analytics.ts). It has not been
// reviewed by legal counsel. Route through counsel and update this page
// (and re-verify the "what we collect"/"third parties" sections) before an
// email provider, analytics, or GHL integration goes live. Tracked in
// CONTENT-PLACEHOLDERS.md.
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="August 2026"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy", href: "/privacy/" }]}
    >
      <div className="not-prose mb-6">
        <Callout tone="caution" title="Draft policy">
          This is a working draft describing the site&rsquo;s current actual data practices. It
          has not yet been reviewed by legal counsel, and will be revised as our tooling changes.
        </Callout>
      </div>

      <h2>Information we collect</h2>
      <p>
        When you use the Puppy Plan tool or subscribe to our newsletter, we collect the
        information you provide directly: your email address and the details you share about your
        puppy (name, age range, routine, and challenges).
      </p>
      <h2>How we use it</h2>
      <p>
        We use this information to generate your personalized plan and to send the plan and
        related content to your email. See our{" "}
        <a href="/editorial-policy/">editorial policy</a> for how content decisions are made.
      </p>
      <h2>Analytics</h2>
      <p>
        We do not currently run analytics tracking in production. If we add an analytics tool in
        the future, this policy will be updated to describe what it collects before it goes live.
      </p>
      <h2>Email communications</h2>
      <p>
        Any email we send will include an unsubscribe link, and you can opt out at any time. We do
        not currently have a production email-sending system connected — sign-ups are stored, not
        yet delivered to an active mailing list.
      </p>
      <h2>Third parties</h2>
      <p>
        We may use third-party services for email delivery and analytics in the future. We&rsquo;ll
        name the specific services here once any are actually in use.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about this policy can be sent to{" "}
        <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
      </p>
    </LegalPage>
  );
}
