export function ArticleMeta({
  author,
  reviewer,
  updated,
}: {
  author: string;
  reviewer?: string;
  updated: string;
}) {
  const formattedDate = new Date(updated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
      <span>
        By <span className="font-medium text-ink-soft">{author}</span>
      </span>
      {reviewer && (
        <span>
          Reviewed by <span className="font-medium text-ink-soft">{reviewer}</span>
        </span>
      )}
      <span>Updated {formattedDate}</span>
    </div>
  );
}
