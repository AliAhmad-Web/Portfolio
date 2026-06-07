export default function Toast({ message, type = 'success', onClose }) {
  return (
    <div className="fixed bottom-6 right-6 z-120 flex items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/95 px-4 py-3 text-sm shadow-2xl shadow-cyan-900/20 backdrop-blur-xl">
      <span className={`h-2.5 w-2.5 rounded-full ${type === 'error' ? 'bg-rose-400' : 'bg-emerald-400'}`} />
      <span className="text-slate-100">{message}</span>
      <button
        type="button"
        onClick={onClose}
        className="ml-2 rounded-full px-2 text-slate-400 hover:bg-white/5 hover:text-white"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
}
