import { useCallback, useEffect, useMemo, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { adminApi } from '../../lib/api';
import StatusBadge from '../../components/admin/StatusBadge';
import EmptyState from '../../components/admin/EmptyState';
import LoadingBlock from '../../components/admin/LoadingBlock';
import {
  CONTACT_STATUSES,
  CONTACT_STATUS_LABELS,
  formatDateTime,
  truncateText,
} from '../../utils/contactStatus';

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');
  const [updating, setUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  const loadContacts = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const result = await adminApi.listContacts({
        search: search.trim(),
        status: statusFilter,
      });
      setContacts(result.data?.contacts ?? []);
    } catch (err) {
      setError(err.message || 'Failed to load contacts.');
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadContacts();
    }, 250);

    return () => clearTimeout(timer);
  }, [loadContacts]);

  const openDetails = async (id) => {
    setSelectedId(id);
    setSelectedContact(null);
    setDetailLoading(true);
    setDetailError('');
    setUpdateMessage('');

    try {
      const result = await adminApi.getContact(id);
      setSelectedContact(result.data?.contact ?? null);
    } catch (err) {
      setDetailError(err.message || 'Failed to load contact details.');
    } finally {
      setDetailLoading(false);
    }
  };

  const closeDetails = () => {
    setSelectedId(null);
    setSelectedContact(null);
    setDetailError('');
    setUpdateMessage('');
  };

  const handleStatusChange = async (nextStatus) => {
    if (!selectedContact || nextStatus === selectedContact.status) return;

    setUpdating(true);
    setUpdateMessage('');
    setDetailError('');

    try {
      const result = await adminApi.updateContactStatus(
        selectedContact.id,
        nextStatus,
      );
      const updated = result.data?.contact;

      setSelectedContact(updated);
      setContacts((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item)),
      );
      setUpdateMessage('Status updated successfully.');
    } catch (err) {
      setDetailError(err.message || 'Failed to update status.');
    } finally {
      setUpdating(false);
    }
  };

  const resultLabel = useMemo(() => {
    const count = contacts.length;
    return `${count} contact${count === 1 ? '' : 's'}`;
  }, [contacts.length]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Inbox</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Contact Queries</h1>
        <p className="mt-2 text-sm text-slate-400">
          Search, review, and update the status of portfolio contact messages.
        </p>
      </div>

      <div className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-4 sm:flex-row sm:items-center">
        <label className="relative flex-1" htmlFor="contact-search">
          <FiSearch className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-slate-500" />
          <input
            id="contact-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, email, or message…"
            className="w-full rounded-2xl border border-white/10 bg-slate-950/70 py-3 pr-4 pl-11 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/70 focus:ring-2 focus:ring-cyan-400/20"
          />
        </label>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/70"
          aria-label="Filter by status"
        >
          <option value="">All statuses</option>
          {CONTACT_STATUSES.map((status) => (
            <option key={status} value={status}>
              {CONTACT_STATUS_LABELS[status]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>{resultLabel}</span>
        <button
          type="button"
          onClick={loadContacts}
          className="text-cyan-300 hover:text-cyan-200"
        >
          Refresh
        </button>
      </div>

      {loading ? (
        <LoadingBlock label="Loading contacts…" />
      ) : error ? (
        <EmptyState
          title="Unable to load contacts"
          description={error}
          action={
            <button
              type="button"
              onClick={loadContacts}
              className="rounded-2xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
            >
              Try again
            </button>
          }
        />
      ) : contacts.length === 0 ? (
        <EmptyState
          title="No contacts found"
          description={
            search || statusFilter
              ? 'Try adjusting your search or status filter.'
              : 'Contact form submissions will show up here.'
          }
        />
      ) : (
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="hidden px-4 py-3 font-medium lg:table-cell">Message</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Received</th>
                  <th className="px-4 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id} className="border-b border-white/5 last:border-0">
                    <td className="px-4 py-4 font-medium text-white">{contact.name}</td>
                    <td className="px-4 py-4 text-slate-300">{contact.email}</td>
                    <td className="hidden max-w-sm px-4 py-4 text-slate-400 lg:table-cell">
                      {truncateText(contact.message, 90)}
                    </td>
                    <td className="px-4 py-4">
                      <StatusBadge status={contact.status} />
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-slate-400">
                      {formatDateTime(contact.createdAt)}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        onClick={() => openDetails(contact.id)}
                        className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-cyan-200 transition hover:border-cyan-400/40"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedId ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/70 p-4 sm:items-center">
          <button
            type="button"
            className="absolute inset-0 cursor-default"
            aria-label="Close details"
            onClick={closeDetails}
          />

          <div className="relative z-10 w-full max-w-lg rounded-3xl border border-white/10 bg-slate-950 p-5 shadow-2xl sm:p-6">
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                  Message details
                </p>
                <h2 className="mt-2 text-xl font-semibold text-white">
                  {selectedContact?.name || 'Contact'}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeDetails}
                className="rounded-full border border-white/10 p-2 text-slate-300 hover:text-white"
                aria-label="Close"
              >
                <FiX size={18} />
              </button>
            </div>

            {detailLoading ? (
              <LoadingBlock label="Loading details…" />
            ) : detailError && !selectedContact ? (
              <p className="text-sm text-rose-300">{detailError}</p>
            ) : selectedContact ? (
              <div className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <p className="text-xs text-slate-400">Email</p>
                    <a
                      href={`mailto:${selectedContact.email}`}
                      className="mt-1 block text-sm text-cyan-300 hover:text-cyan-200"
                    >
                      {selectedContact.email}
                    </a>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <p className="text-xs text-slate-400">Received</p>
                    <p className="mt-1 text-sm text-slate-200">
                      {formatDateTime(selectedContact.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs text-slate-400">Message</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-200">
                    {selectedContact.message}
                  </p>
                </div>

                <label className="block space-y-2" htmlFor="contact-status">
                  <span className="text-sm font-medium text-slate-200">Status</span>
                  <select
                    id="contact-status"
                    value={selectedContact.status}
                    disabled={updating}
                    onChange={(event) => handleStatusChange(event.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/70 disabled:opacity-60"
                  >
                    {CONTACT_STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {CONTACT_STATUS_LABELS[status]}
                      </option>
                    ))}
                  </select>
                </label>

                {updateMessage ? (
                  <p className="text-sm text-emerald-300">{updateMessage}</p>
                ) : null}
                {detailError ? (
                  <p className="text-sm text-rose-300">{detailError}</p>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
