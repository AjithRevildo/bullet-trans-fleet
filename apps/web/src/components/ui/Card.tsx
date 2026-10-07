interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  selected?: boolean;
}

/**
 * Reusable card component with consistent styling
 */
export function Card({ children, className = '', interactive = false, selected = false }: CardProps) {
  const baseClasses = 'rounded-2xl border border-slate-800 bg-slate-900 p-5';
  const interactiveClasses = interactive
    ? `cursor-pointer transition hover:border-slate-700 ${
        selected ? 'border-cyan-500/30 bg-cyan-500/10' : 'bg-slate-950/50'
      }`
    : '';

  return <div className={`${baseClasses} ${interactiveClasses} ${className}`}>{children}</div>;
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

/**
 * Card header with title and optional action
 */
export function CardHeader({ title, subtitle, action }: CardHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
