import { useAuth } from '../../context/AuthContext';
import { formatDateTime } from '../../utils/contactStatus';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Account</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">Profile</h1>
        <p className="mt-2 text-sm text-slate-400">
          Your admin account details for the portfolio dashboard.
        </p>
      </div>

      <div className="max-w-2xl rounded-3xl border border-white/10 bg-white/[0.04] p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 text-lg font-bold text-cyan-200">
            {(user?.fullName || user?.email || 'A').slice(0, 1).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              {user?.fullName || 'Admin User'}
            </h2>
            <p className="text-sm text-slate-400">{user?.email}</p>
          </div>
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <dt className="text-xs uppercase tracking-wider text-slate-400">Role</dt>
            <dd className="mt-2 capitalize text-cyan-200">{user?.role || 'admin'}</dd>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <dt className="text-xs uppercase tracking-wider text-slate-400">Email verified</dt>
            <dd className="mt-2 text-slate-200">
              {user?.emailVerified ? 'Yes' : 'No'}
            </dd>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <dt className="text-xs uppercase tracking-wider text-slate-400">Member since</dt>
            <dd className="mt-2 text-slate-200">{formatDateTime(user?.createdAt)}</dd>
          </div>
          <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
            <dt className="text-xs uppercase tracking-wider text-slate-400">Last sign in</dt>
            <dd className="mt-2 text-slate-200">{formatDateTime(user?.lastSignInAt)}</dd>
          </div>
        </dl>

        <button
          type="button"
          onClick={logout}
          className="mt-8 rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm font-medium text-rose-200 transition hover:border-rose-300/50"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
