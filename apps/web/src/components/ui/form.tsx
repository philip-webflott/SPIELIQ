import type { ComponentProps, ReactNode } from 'react'

export function Field({ label, hint, error, children, htmlFor }: { label: string; hint?: ReactNode; error?: string | null; children: ReactNode; htmlFor: string }) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-text">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs text-text-faint">{hint}</p>}
      {error && (
        <p className="text-xs font-medium text-bad" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

const inputClass =
  'block w-full rounded-xl border border-line-strong bg-ink-850 px-4 py-3 text-base text-text placeholder:text-text-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40'

export function Input(props: ComponentProps<'input'>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ''}`} />
}

export function Select(props: ComponentProps<'select'>) {
  return <select {...props} className={`${inputClass} ${props.className ?? ''}`} />
}

export function Textarea(props: ComponentProps<'textarea'>) {
  return <textarea {...props} className={`${inputClass} ${props.className ?? ''}`} />
}

export function Checkbox({ label, ...props }: ComponentProps<'input'> & { label: ReactNode }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-sm text-text-muted">
      <input type="checkbox" {...props} className="mt-0.5 h-5 w-5 shrink-0 rounded border-line-strong bg-ink-850 accent-[var(--color-accent)]" />
      <span>{label}</span>
    </label>
  )
}

export function FormError({ message }: { message?: string | null }) {
  if (!message) return null
  return (
    <div role="alert" className="rounded-xl border border-bad/40 bg-bad/10 px-4 py-3 text-sm font-medium text-bad">
      {message}
    </div>
  )
}
