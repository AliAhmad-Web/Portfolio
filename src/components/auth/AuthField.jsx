export default function AuthField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  error,
  autoComplete,
  placeholder,
  disabled = false,
}) {
  return (
    <label className="block space-y-2" htmlFor={id}>
      <span className="text-sm font-medium text-slate-200">{label}</span>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full rounded-2xl border bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${
          error
            ? 'border-rose-400/60 focus:border-rose-300 focus:ring-rose-400/20'
            : 'border-white/10 focus:border-cyan-400/70 focus:ring-cyan-400/20'
        }`}
      />
      {error ? <span className="block text-xs text-rose-300">{error}</span> : null}
    </label>
  );
}
