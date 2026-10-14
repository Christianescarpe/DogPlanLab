import clsx from "clsx";

export function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={clsx(
        "w-full rounded-xl border px-5 py-3.5 text-left text-sm font-medium transition-colors",
        selected
          ? "border-accent bg-accent-light text-ink"
          : "border-border bg-surface text-ink hover:border-accent/40"
      )}
    >
      {label}
    </button>
  );
}
