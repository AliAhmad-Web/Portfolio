export default function LoadingBlock({ label = 'Loading…' }) {
  return (
    <div className="flex min-h-[220px] items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03]">
      <div className="flex items-center gap-3 text-sm text-slate-300">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-cyan-300/30 border-t-cyan-300" />
        {label}
      </div>
    </div>
  );
}
