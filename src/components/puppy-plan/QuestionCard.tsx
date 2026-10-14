import { ReactNode } from "react";
import { Card } from "@/components/ui/Card";

export function QuestionCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <Card className="sm:p-8">
      <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-ink-soft">{subtitle}</p>}
      <div className="mt-6">{children}</div>
    </Card>
  );
}
