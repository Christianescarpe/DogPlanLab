import { ReactNode } from "react";
import clsx from "clsx";

type Tone = "info" | "caution" | "success";

const toneStyles: Record<Tone, string> = {
  info: "bg-accent-light border-accent/30 text-accent",
  caution: "bg-caution-bg border-caution-border text-caution",
  success: "bg-accent-light border-accent/30 text-accent",
};

const toneLabels: Record<Tone, string> = {
  info: "Note",
  caution: "Caution",
  success: "Good to know",
};

export function Callout({
  children,
  tone = "info",
  title,
}: {
  children: ReactNode;
  tone?: Tone;
  title?: string;
}) {
  return (
    <div
      role={tone === "caution" ? "alert" : undefined}
      className={clsx("rounded-xl border px-5 py-4 text-sm leading-relaxed", toneStyles[tone])}
    >
      <p className="mb-1 font-semibold">{title ?? toneLabels[tone]}</p>
      <div>{children}</div>
    </div>
  );
}
