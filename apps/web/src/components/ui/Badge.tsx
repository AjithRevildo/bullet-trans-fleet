import { StatusType, getStatusStyle } from '../../lib/styles';

interface BadgeProps {
  status: StatusType | string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable status badge component
 * Uses centralized status styling
 */
export function Badge({ status, children, className = '' }: BadgeProps) {
  const style = getStatusStyle(status);
  return (
    <span className={`rounded-full border px-2 py-1 text-xs font-medium ${style.badge} ${className}`}>
      {children}
    </span>
  );
}
