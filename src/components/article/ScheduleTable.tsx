export type ScheduleRow = {
  time: string;
  activity: string;
  note?: string;
};

export function ScheduleTable({ rows, caption }: { rows: ScheduleRow[]; caption?: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full border-collapse text-sm">
        {caption && <caption className="p-4 text-left text-sm text-muted">{caption}</caption>}
        <thead>
          <tr className="bg-paper-alt text-left text-ink">
            <th scope="col" className="px-4 py-3 font-semibold">Time</th>
            <th scope="col" className="px-4 py-3 font-semibold">Activity</th>
            <th scope="col" className="px-4 py-3 font-semibold">Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`${row.time}-${index}`} className="border-t border-border">
              <td className="px-4 py-3 font-medium text-ink whitespace-nowrap">{row.time}</td>
              <td className="px-4 py-3 text-ink-soft">{row.activity}</td>
              <td className="px-4 py-3 text-ink-soft">{row.note ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
