interface TableProps {
  columns: Array<{ key: string; label: string }> | string[];
  children: React.ReactNode;
}

/**
 * Reusable table component with consistent styling
 */
export function Table({ columns, children }: TableProps) {
  const columnLabels = Array.isArray(columns)
    ? typeof columns[0] === 'string'
      ? columns
      : (columns as Array<{ key: string; label: string }>).map((col) => col.label)
    : [];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto text-left text-sm">
        <thead>
          <tr className="border-b border-slate-800 text-slate-400">
            {columnLabels.map((label) => (
              <th key={label} className="pb-3 pr-4 font-medium">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

interface TableRowProps {
  children: React.ReactNode;
}

export function TableRow({ children }: TableRowProps) {
  return <tr className="border-b border-slate-800/80 text-slate-200">{children}</tr>;
}

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
}

export function TableCell({ children, className = '' }: TableCellProps) {
  return <td className={`py-3 pr-4 ${className}`}>{children}</td>;
}
