import { ReactNode } from "react";

export function AnswerFirstSummary({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-accent/25 bg-accent-light/50 p-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent">
        Quick answer
      </p>
      <div className="text-ink-soft leading-relaxed">{children}</div>
    </div>
  );
}
