"use client";

interface StatusToggleProps {
  active: boolean;
  label: string;
  disabled?: boolean;
  onChange: () => void;
}

export function StatusToggle({ active, label, disabled = false, onChange }: StatusToggleProps) {
  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        role="switch"
        aria-checked={active}
        aria-label={`Set ${label} ${active ? 'inactive' : 'active'}`}
        disabled={disabled}
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--primary-plum) focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${active ? 'bg-green-500' : 'bg-slate-300'}`}
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${active ? 'translate-x-5' : 'translate-x-0'}`}
        />
      </button>
      <span className={`text-xs font-semibold ${active ? 'text-green-700' : 'text-slate-500'}`}>
        {active ? 'Active' : 'Inactive'}
      </span>
    </div>
  );
}
