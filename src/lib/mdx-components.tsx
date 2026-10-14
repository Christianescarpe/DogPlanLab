import type { MDXComponents } from "mdx/types";
import { ReactNode } from "react";
import { slugifyHeading } from "@/lib/toc";
import { Callout } from "@/components/ui/Callout";
import { Checklist } from "@/components/article/Checklist";
import { ScheduleTable } from "@/components/article/ScheduleTable";
import { TroubleshootingTable } from "@/components/article/TroubleshootingTable";
import { QuickActionBox } from "@/components/article/QuickActionBox";
import { InlineCTA } from "@/components/article/InlineCTA";
import { AnswerFirstSummary } from "@/components/article/AnswerFirstSummary";
import { ProductPick } from "@/components/shop/ProductPick";
import { RetailerCTA } from "@/components/shop/RetailerCTA";

function textContent(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textContent).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textContent((node as { props?: { children?: ReactNode } }).props?.children);
  }
  return "";
}

export const mdxComponents: MDXComponents = {
  h2: ({ children, ...props }) => (
    <h2 id={slugifyHeading(textContent(children))} className="font-display text-2xl font-semibold text-ink" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 id={slugifyHeading(textContent(children))} className="font-display text-xl font-semibold text-ink" {...props}>
      {children}
    </h3>
  ),
  a: ({ href, children, ...props }) => (
    <a href={href} className="text-accent underline underline-offset-2 hover:text-accent-dark" {...props}>
      {children}
    </a>
  ),
  // Plain GFM markdown tables (the production content's tables vary in
  // shape — decision tables, DO THIS/NOT THIS, stage progressions — so they
  // render as real markdown tables rather than being forced through a
  // fixed-column component). This wrapper adds mobile scroll + consistent
  // styling to match the rest of the design system.
  table: ({ children, ...props }) => (
    <div className="not-prose overflow-x-auto rounded-2xl border border-border">
      <table className="w-full min-w-[36rem] border-collapse text-sm" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-paper-alt text-left text-ink" {...props}>
      {children}
    </thead>
  ),
  th: ({ children, ...props }) => (
    <th scope="col" className="px-4 py-3 font-semibold" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-3 align-top text-ink-soft" {...props}>
      {children}
    </td>
  ),
  tr: ({ children, ...props }) => (
    <tr className="border-t border-border first:border-t-0" {...props}>
      {children}
    </tr>
  ),
  // Content-authoring components available inside MDX body copy.
  AnswerFirstSummary,
  Callout,
  Checklist,
  ScheduleTable,
  TroubleshootingTable,
  QuickActionBox,
  InlineCTA,
  ProductPick,
  RetailerCTA,
};
