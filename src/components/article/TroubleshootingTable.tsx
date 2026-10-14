export type TroubleshootingRow = {
  problem: string;
  likelyCause: string;
  tryThis: string;
};

export function TroubleshootingTable({ rows }: { rows: TroubleshootingRow[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-paper-alt text-left text-ink">
            <th scope="col" className="px-4 py-3 font-semibold">If you&apos;re seeing</th>
            <th scope="col" className="px-4 py-3 font-semibold">It&apos;s likely</th>
            <th scope="col" className="px-4 py-3 font-semibold">Try this</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-t border-border align-top">
              <td className="px-4 py-3 font-medium text-ink">{row.problem}</td>
              <td className="px-4 py-3 text-ink-soft">{row.likelyCause}</td>
              <td className="px-4 py-3 text-ink-soft">{row.tryThis}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
