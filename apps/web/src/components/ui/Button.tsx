import type { ReactNode } from 'react';

interface TableProps {
  columns: Array<{ key: string; label: string } | string>;
  children: ReactNode;
}

export function Table({ columns, children }: TableProps) {
  const columnLabels = columns.map((column) => (typeof column === 'string' ? column : column.label));

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

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

export function TableCell({ children, className = '' }: TableCellProps) {
  return <td className={`py-3 pr-4 ${className}`}>{children}</td>;
}

interface TableRowProps {
  children: ReactNode;
}

export function TableRow({ children }: TableRowProps) {
  return <tr className="border-b border-slate-800/80 text-slate-200">{children}</tr>;
}
