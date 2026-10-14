/**
 * Minimalist line-art dog mark, drawn with a single stroke weight so it
 * reads cleanly at both header-icon size and large hero-illustration size.
 * Uses `currentColor` so callers set the color via className (e.g. text-accent).
 */
export function DogMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 30c-3-4-3-9 0-12 2.5-2.5 6-3 8-1 1-3 4-5 7-4 3 1 4 4 3 7 4-1 8 1 9 5 1 5-2 9-6 11 1 3 1 6-1 8-3 3-8 3-11 0-3 3-8 3-11 0-2-2-2-5-1-8-4-2-7-6-6-11 .6-3 3-5.5 6-6.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="26" cy="30" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="38" cy="30" r="1.4" fill="currentColor" stroke="none" />
      <path
        d="M30 35c1 1 3 1 4 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
