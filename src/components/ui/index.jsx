// src/components/ui/index.jsx
// ─── Componentes UI reutilizables ─────────────────────────────────────────────

// ── Button ────────────────────────────────────────────────────────────────────
export const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  icon: Icon,
  disabled = false,
  type = 'button',
}) => {
  const base =
    'px-6 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2';
  const variants = {
    primary:   'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20',
    secondary: 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm',
    outline:   'border border-white/20 hover:border-white/40 text-white',
    ghost:     'text-gray-400 hover:text-white',
    danger:    'bg-red-600/20 hover:bg-red-600/40 text-red-400 border border-red-500/30',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

// ── Card ──────────────────────────────────────────────────────────────────────
export const Card = ({ children, className = '' }) => (
  <div
    className={`bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden ${className}`}
  >
    {children}
  </div>
);

// ── Badge ─────────────────────────────────────────────────────────────────────
export const Badge = ({ children, color = 'indigo' }) => (
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold bg-${color}-500/20 text-${color}-400 border border-${color}-500/30`}
  >
    {children}
  </span>
);

// ── Input ─────────────────────────────────────────────────────────────────────
export const Input = ({ label, className = '', ...props }) => (
  <div className="space-y-2">
    {label && <label className="text-sm text-gray-400 ml-1">{label}</label>}
    <input
      className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white
        focus:border-indigo-500 outline-none transition-colors ${className}`}
      {...props}
    />
  </div>
);

// ── Textarea ──────────────────────────────────────────────────────────────────
export const Textarea = ({ label, className = '', ...props }) => (
  <div className="space-y-2">
    {label && <label className="text-sm text-gray-400 ml-1">{label}</label>}
    <textarea
      className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white
        focus:border-indigo-500 outline-none resize-none transition-colors ${className}`}
      {...props}
    />
  </div>
);

// ── Select ────────────────────────────────────────────────────────────────────
export const Select = ({ label, options = [], className = '', ...props }) => (
  <div className="space-y-2">
    {label && <label className="text-sm text-gray-400 ml-1">{label}</label>}
    <select
      className={`w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white
        focus:border-indigo-500 outline-none transition-colors ${className}`}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-neutral-900">
          {opt}
        </option>
      ))}
    </select>
  </div>
);

// ── Spinner ───────────────────────────────────────────────────────────────────
export const Spinner = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className="animate-spin"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.25" />
    <path
      d="M12 2a10 10 0 0 1 10 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
