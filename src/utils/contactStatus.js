export const CONTACT_STATUSES = ['pending', 'resolved', 'completed'];

export const CONTACT_STATUS_LABELS = {
  pending: 'Pending',
  resolved: 'Resolved',
  completed: 'Completed',
};

export function getStatusBadgeClass(status) {
  switch (status) {
    case 'pending':
      return 'border-amber-400/30 bg-amber-400/10 text-amber-200';
    case 'resolved':
      return 'border-sky-400/30 bg-sky-400/10 text-sky-200';
    case 'completed':
      return 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200';
    default:
      return 'border-white/10 bg-white/5 text-slate-300';
  }
}

export function formatDateTime(value) {
  if (!value) return '—';

  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value));
  } catch {
    return value;
  }
}

export function truncateText(value, max = 80) {
  if (!value) return '';
  if (value.length <= max) return value;
  return `${value.slice(0, max).trim()}…`;
}
