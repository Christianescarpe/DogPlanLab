/**
 * The activation point for affiliate/retailer links. Renders nothing until
 * `affiliateUrl` is supplied — never a placeholder "Buy" button pointing
 * nowhere. To go live on a given pick, edit its content/shop/*.mdx call site
 * and add retailerName/affiliateUrl/ctaText (and optionally productName) —
 * no component or page redesign needed.
 */
export function RetailerCTA({
  productName,
  retailerName,
  affiliateUrl,
  ctaText,
}: {
  productName?: string;
  retailerName?: string;
  affiliateUrl?: string;
  ctaText?: string;
}) {
  if (!affiliateUrl) return null;

  const label = ctaText ?? `Check price${retailerName ? ` at ${retailerName}` : ""}`;

  return (
    <a
      href={affiliateUrl}
      target="_blank"
      rel="sponsored noopener noreferrer"
      aria-label={productName ? `${label} — ${productName}` : label}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-brand-dark"
    >
      {label}
    </a>
  );
}
