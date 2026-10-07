import type { ReactNode } from 'react';
import { getStatusStyle, type StatusType } from '../../lib/styles';

interface BadgeProps {
  status: StatusType | string;
  children: ReactNode;
  className?: string;
}

export function Badge({ status, children, className = '' }: BadgeProps) {
  const style = getStatusStyle(status);

  return (
    <span className={`rounded-full border px-2 py-1 text-[10px] font-medium ${style.badge} ${className}`}>
      {children}
    </span>
  );
}
