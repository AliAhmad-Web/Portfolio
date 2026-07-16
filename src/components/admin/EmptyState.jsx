export default function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-3xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-14 text-center">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">{description}</p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
