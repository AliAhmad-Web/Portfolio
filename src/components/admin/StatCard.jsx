export default function StatCard({ label, value, hint, accent = 'cyan' }) {
  const accents = {
    cyan: 'border-cyan-400/20 bg-cyan-400/5 text-cyan-200',
    amber: 'border-amber-400/20 bg-amber-400/5 text-amber-200',
    sky: 'border-sky-400/20 bg-sky-400/5 text-sky-200',
    emerald: 'border-emerald-400/20 bg-emerald-400/5 text-emerald-200',
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{label}</p>
      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
      {hint ? (
        <p className={`mt-3 inline-flex rounded-full border px-2.5 py-1 text-xs ${accents[accent]}`}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}
