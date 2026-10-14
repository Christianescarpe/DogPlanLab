import { LegalPage } from "@/components/layout/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Affiliate Disclosure",
  description: "How Dog Plan Lab discloses affiliate relationships.",
  path: "/affiliate-disclosure/",
});

export default function AffiliateDisclosurePage() {
  return (
    <LegalPage
      title="Affiliate Disclosure"
      updated="August 2026"
      breadcrumbs={[{ label: "Home", href: "/" }, { label: "Affiliate Disclosure", href: "/affiliate-disclosure/" }]}
    >
      <p>
        Dog Plan Lab does not currently have any active affiliate relationships or program
        enrollments. No page on this site currently contains an affiliate link.
      </p>
      <p>
        We may use affiliate links in the future. If we do, clicking one and making a purchase may
        earn us a commission at no additional cost to you, and we will disclose that clearly on
        any page where a qualifying link appears — this page will also be updated to name the
        specific program(s) once any are active.
      </p>
      <p>
        Affiliate relationships never determine our editorial recommendations. Any future
        affiliate link would be chosen for its relevance to the guide you&rsquo;re reading, not for
        its commission rate. See our <a href="/editorial-policy/">editorial policy</a> for more on
        how editorial decisions are made independently of monetization.
      </p>
    </LegalPage>
  );
}
