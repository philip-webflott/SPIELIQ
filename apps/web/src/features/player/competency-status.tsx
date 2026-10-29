import { CircleCheck, CircleDashed, Flag, MonitorCheck } from 'lucide-react'

/**
 * Drei getrennte Zustände – bewusst nicht zu einem Prozentwert verrechnet:
 * bearbeitet · digital verstanden · auf dem Platz angewendet.
 */
export function CompetencyStatus({ practised, understood, applied, compact = false }: { practised: boolean; understood: boolean; applied: boolean; compact?: boolean }) {
  const items = [
    { on: practised, label: 'bearbeitet', icon: CircleDashed },
    { on: understood, label: 'digital verstanden', icon: MonitorCheck },
    { on: applied, label: 'auf dem Platz', icon: Flag },
  ]
  return (
    <ul className={`flex flex-wrap gap-1.5 ${compact ? '' : 'mt-2'}`}>
      {items.map(({ on, label, icon: Icon }) => (
        <li
          key={label}
          className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-semibold ${
            on ? 'border-good/40 bg-good/12 text-good' : 'border-line text-text-faint'
          }`}
        >
          {on ? <CircleCheck size={13} aria-hidden="true" /> : <Icon size={13} aria-hidden="true" />}
          <span>{label}</span>
          <span className="sr-only">{on ? ': ja' : ': noch nicht'}</span>
        </li>
      ))}
    </ul>
  )
}
