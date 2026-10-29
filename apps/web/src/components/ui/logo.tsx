/** Wortmarke: "SPIEL" + "IQ" mit stilisiertem Passdreieck. */
export function Logo({ className = '', compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} aria-label="SPIELIQ">
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <rect width="32" height="32" rx="9" fill="#1d6b3f" />
        <path d="M8 23 L16 8 L24 21 Z" fill="none" stroke="#f4fbff" strokeWidth="1.6" strokeDasharray="2.2 1.8" />
        <circle cx="8" cy="23" r="3.1" fill="#4aa3ff" stroke="#eaf4ff" strokeWidth="1" />
        <circle cx="16" cy="8" r="3.1" fill="#4aa3ff" stroke="#eaf4ff" strokeWidth="1" />
        <circle cx="24" cy="21" r="3.1" fill="#3bd671" stroke="#04150a" strokeWidth="1" />
      </svg>
      {!compact && (
        <span className="font-display text-xl font-extrabold tracking-wider text-text">
          SPIEL<span className="text-accent">IQ</span>
        </span>
      )}
    </span>
  )
}
