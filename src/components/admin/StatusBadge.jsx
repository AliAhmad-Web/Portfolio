import {
  CONTACT_STATUS_LABELS,
  getStatusBadgeClass,
} from '../../utils/contactStatus';

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${getStatusBadgeClass(status)}`}
    >
      {CONTACT_STATUS_LABELS[status] || status}
    </span>
  );
}
