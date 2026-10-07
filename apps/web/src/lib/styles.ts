/**
 * Centralized status-to-styling mapping
 * Prevents dynamic Tailwind class generation and ensures type safety
 */

export type StatusType =
  | 'MOVING'
  | 'IDLE'
  | 'MAINTENANCE'
  | 'OFFLINE'
  | 'ACTIVE'
  | 'ASSIGNED'
  | 'ON_ROUTE'
  | 'DELAYED'
  | 'COMPLETED'
  | 'ALERT'
  | 'WARNING'
  | 'OK'
  | 'APPROVED'
  | 'PENDING'
  | 'ARCHIVED'
  | 'REVIEW'
  | 'LOW'
  | 'MEDIUM'
  | 'HIGH'
  | 'CRITICAL';

export interface StatusStyle {
  badge: string;
  indicator: string;
  text: string;
}

/**
 * Static mapping of all status values to Tailwind classes
 * This ensures all classes are present at build time
 */
export const STATUS_STYLES: Record<StatusType, StatusStyle> = {
  MOVING: {
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    indicator: 'bg-emerald-400',
    text: 'text-emerald-300',
  },
  IDLE: {
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    indicator: 'bg-amber-400',
    text: 'text-amber-300',
  },
  MAINTENANCE: {
    badge: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    indicator: 'bg-violet-400',
    text: 'text-violet-300',
  },
  OFFLINE: {
    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    indicator: 'bg-rose-400',
    text: 'text-rose-300',
  },
  ACTIVE: {
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    indicator: 'bg-emerald-400',
    text: 'text-emerald-300',
  },
  ASSIGNED: {
    badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    indicator: 'bg-cyan-400',
    text: 'text-cyan-300',
  },
  ON_ROUTE: {
    badge: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
    indicator: 'bg-violet-400',
    text: 'text-violet-300',
  },
  DELAYED: {
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    indicator: 'bg-amber-400',
    text: 'text-amber-300',
  },
  COMPLETED: {
    badge: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
    indicator: 'bg-slate-400',
    text: 'text-slate-300',
  },
  ALERT: {
    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    indicator: 'bg-rose-400',
    text: 'text-rose-300',
  },
  WARNING: {
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    indicator: 'bg-amber-400',
    text: 'text-amber-300',
  },
  OK: {
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    indicator: 'bg-emerald-400',
    text: 'text-emerald-300',
  },
  APPROVED: {
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    indicator: 'bg-emerald-400',
    text: 'text-emerald-300',
  },
  PENDING: {
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    indicator: 'bg-amber-400',
    text: 'text-amber-300',
  },
  ARCHIVED: {
    badge: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
    indicator: 'bg-slate-400',
    text: 'text-slate-300',
  },
  REVIEW: {
    badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    indicator: 'bg-cyan-400',
    text: 'text-cyan-300',
  },
  LOW: {
    badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    indicator: 'bg-emerald-400',
    text: 'text-emerald-300',
  },
  MEDIUM: {
    badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    indicator: 'bg-amber-400',
    text: 'text-amber-300',
  },
  HIGH: {
    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    indicator: 'bg-rose-400',
    text: 'text-rose-300',
  },
  CRITICAL: {
    badge: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    indicator: 'bg-rose-400',
    text: 'text-rose-300',
  },
};

/**
 * Get status badge styling with fallback
 */
export function getStatusStyle(status: unknown): StatusStyle {
  if (typeof status === 'string' && status in STATUS_STYLES) {
    return STATUS_STYLES[status as StatusType];
  }
  // Fallback for unknown status
  return {
    badge: 'border-slate-600 bg-slate-800 text-slate-300',
    indicator: 'bg-slate-400',
    text: 'text-slate-300',
  };
}
