export type Source = { label: string; url?: string };

export function SourcesList({ sources }: { sources: Source[] }) {
  if (sources.length === 0) {
    return (
      <p className="text-sm text-muted">Source list for this guide is being finalized.</p>
    );
  }

  return (
    <ol className="list-decimal space-y-1.5 pl-5 text-sm text-ink-soft">
      {sources.map((source, index) => (
        <li key={index}>
          {source.url ? (
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-accent underline hover:text-accent-dark">
              {source.label}
            </a>
          ) : (
            source.label
          )}
        </li>
      ))}
    </ol>
  );
}
