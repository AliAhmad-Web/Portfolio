import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../lib/api';
import StatCard from '../../components/admin/StatCard';
import StatusBadge from '../../components/admin/StatusBadge';
import EmptyState from '../../components/admin/EmptyState';
import LoadingBlock from '../../components/admin/LoadingBlock';
import { formatDateTime, truncateText } from '../../utils/contactStatus';

export default function DashboardHomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadOverview = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const result = await adminApi.dashboard();
      setData(result.data);
    } catch (err) {
      setError(err.message || 'Failed to load dashboard overview.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOverview();
  }, [loadOverview]);

  if (loading) {
    return <LoadingBlock label="Loading dashboard…" />;
  }

  if (error) {
    return (
      <EmptyState
        title="Unable to load dashboard"
        description={error}
        action={
          <button
            type="button"
            onClick={loadOverview}
            className="rounded-2xl bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
          >
            Try again
          </button>
        }
      />
    );
  }

  const stats = data?.stats ?? {
    total: 0,
    pending: 0,
    resolved: 0,
    completed: 0,
  };
  const recent = data?.recentContacts ?? [];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Overview</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-2 text-sm text-slate-400">
            Track contact inquiries and manage response status.
          </p>
        </div>
        <Link
          to="/dashboard/contacts"
          className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2.5 text-sm font-medium text-cyan-200 transition hover:border-cyan-300"
        >
          View all contacts
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Contacts" value={stats.total} hint="All messages" accent="cyan" />
        <StatCard label="Pending Contacts" value={stats.pending} hint="Needs attention" accent="amber" />
        <StatCard label="Resolved Contacts" value={stats.resolved} hint="In progress" accent="sky" />
        <StatCard label="Completed Contacts" value={stats.completed} hint="Finished" accent="emerald" />
      </div>

      <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 sm:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-white">Recent Contact Messages</h2>
          <button
            type="button"
            onClick={loadOverview}
            className="text-sm text-cyan-300 hover:text-cyan-200"
          >
            Refresh
          </button>
        </div>

        {recent.length === 0 ? (
          <EmptyState
            title="No contact messages yet"
            description="When visitors submit the portfolio contact form, their messages will appear here."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-3 py-3 font-medium">Name</th>
                  <th className="px-3 py-3 font-medium">Email</th>
                  <th className="hidden px-3 py-3 font-medium md:table-cell">Message</th>
                  <th className="px-3 py-3 font-medium">Status</th>
                  <th className="px-3 py-3 font-medium">Received</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((contact) => (
                  <tr key={contact.id} className="border-b border-white/5 last:border-0">
                    <td className="px-3 py-4 font-medium text-white">{contact.name}</td>
                    <td className="px-3 py-4 text-slate-300">{contact.email}</td>
                    <td className="hidden max-w-xs px-3 py-4 text-slate-400 md:table-cell">
                      {truncateText(contact.message, 70)}
                    </td>
                    <td className="px-3 py-4">
                      <StatusBadge status={contact.status} />
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-slate-400">
                      {formatDateTime(contact.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
