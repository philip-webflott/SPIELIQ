import type { ReactNode } from 'react'

export function Card({ children, className = '', as: Tag = 'section' }: { children: ReactNode; className?: string; as?: 'section' | 'div' | 'article' | 'li' }) {
  return <Tag className={`card ${className}`}>{children}</Tag>
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>
}

type Tone = 'neutral' | 'good' | 'warn' | 'bad' | 'info' | 'accent'

const toneClass: Record<Tone, string> = {
  neutral: 'bg-ink-600 text-text-muted border-line-strong',
  good: 'bg-good/12 text-good border-good/35',
  warn: 'bg-warn/12 text-warn border-warn/35',
  bad: 'bg-bad/12 text-bad border-bad/35',
  info: 'bg-info/12 text-info border-info/35',
  accent: 'bg-accent-soft text-accent border-accent/35',
}

export function Badge({ children, tone = 'neutral', className = '' }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${toneClass[tone]} ${className}`}>
      {children}
    </span>
  )
}

/** Deutlich gekennzeichnete Demo-Daten (nur Entwicklung/Vorführung). */
export function DemoBadge() {
  return (
    <Badge tone="warn" className="uppercase tracking-wide">
      Demo-Daten
    </Badge>
  )
}

export function ProgressBar({ value, max, label, className = '' }: { value: number; max: number; label: string; className?: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className={className}>
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-ink-600"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
      >
        <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

export function ProgressRing({ value, max, size = 56, label }: { value: number; max: number; size?: number; label: string }) {
  const r = (size - 8) / 2
  const c = 2 * Math.PI * r
  const pct = max > 0 ? value / max : 0
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${label}: ${value} von ${max}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-ink-600)" strokeWidth={6} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={6}
        strokeLinecap="round"
        strokeDasharray={`${c * pct} ${c}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" fill="var(--color-text)" fontSize={size * 0.28} fontWeight={700} fontFamily="var(--font-display)">
        {value}/{max}
      </text>
    </svg>
  )
}

export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-ink-700/70 ${className}`} aria-hidden="true" />
}

export function PageHeader({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-text sm:text-4xl">{title}</h1>
      </div>
      {children}
    </header>
  )
}

export function Notice({ tone = 'info', children }: { tone?: Tone; children: ReactNode }) {
  return <div className={`rounded-2xl border px-4 py-3 text-sm ${toneClass[tone]}`}>{children}</div>
}
