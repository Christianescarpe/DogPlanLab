import Link from "next/link";

export function AffiliateDisclosureBlock() {
  return (
    <p className="rounded-xl bg-paper-alt px-4 py-3 text-xs leading-relaxed text-muted">
      This page may contain affiliate links. If you make a purchase through one, Dog Plan Lab may
      earn a commission at no extra cost to you. See our{" "}
      <Link href="/affiliate-disclosure/" className="underline hover:text-ink-soft">
        affiliate disclosure
      </Link>{" "}
      for details.
    </p>
  );
}
