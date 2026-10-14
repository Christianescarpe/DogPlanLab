import { ReactNode } from "react";
import { RetailerCTA } from "@/components/shop/RetailerCTA";

/**
 * One category-level pick inside a buyer guide (e.g. "Best overall").
 * Bundles the editorial writeup with a RetailerCTA slot in a fixed layout —
 * activating the link later never requires touching this component.
 */
export function ProductPick({
  title,
  children,
  productName,
  retailerName,
  affiliateUrl,
  ctaText,
}: {
  title: string;
  children: ReactNode;
  productName?: string;
  retailerName?: string;
  affiliateUrl?: string;
  ctaText?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h3 className="font-display text-lg font-semibold text-ink">{title}</h3>
      <div className="mt-2 text-sm leading-relaxed text-ink-soft">{children}</div>
      <div className="mt-4">
        <RetailerCTA
          productName={productName}
          retailerName={retailerName}
          affiliateUrl={affiliateUrl}
          ctaText={ctaText}
        />
      </div>
    </div>
  );
}
