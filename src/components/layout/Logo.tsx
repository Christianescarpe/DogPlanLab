import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`font-display text-xl font-semibold tracking-tight text-ink ${className ?? ""}`}
    >
      Dog Plan Lab
    </Link>
  );
}
