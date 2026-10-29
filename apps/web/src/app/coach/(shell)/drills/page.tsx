import type { Metadata } from 'next'
import { DRILLS, getPrinciple } from '@spieliq/content'
import { Badge, Card, Notice, PageHeader } from '@/components/ui/primitives'

export const metadata: Metadata = { title: 'Spielformen' }

export default function DrillsPage() {
  return (
    <>
      <PageHeader eyebrow="Für den Platz" title="Spielformen" />
      <div className="mb-6 max-w-3xl">
        <Notice tone="info">
          Jede digitale Mission verweist auf eine passende Spielform. Kurze Fragen statt Zurufe, viel Spielzeit, wenige Coachingpunkte. Status:
          fachliche Prüfung durch lizenzierte Jugendtrainer ausstehend.
        </Notice>
      </div>
      <ul className="grid gap-5 lg:grid-cols-2">
        {DRILLS.map((d) => (
          <Card key={d.id} as="li" className="scroll-mt-24 p-5">
            <article id={d.id}>
              <div className="flex flex-wrap gap-1.5">
                {d.principles.map((p) => (
                  <Badge key={p} tone="accent">
                    {getPrinciple(p)?.name ?? p}
                  </Badge>
                ))}
              </div>
              <h2 className="mt-3 font-display text-2xl font-bold uppercase leading-tight tracking-wide">{d.title}</h2>
              <p className="mt-1 text-text-muted">{d.goal}</p>
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                <dt className="text-text-faint">Spieler</dt>
                <dd>{d.players}</dd>
                <dt className="text-text-faint">Feld</dt>
                <dd>{d.area}</dd>
                <dt className="text-text-faint">Material</dt>
                <dd>{d.material}</dd>
                <dt className="text-text-faint">Dauer</dt>
                <dd>{d.duration}</dd>
                <dt className="text-text-faint">Alter</dt>
                <dd>{d.ageGroups.join(', ')}-Jugend</dd>
              </dl>
              <h3 className="eyebrow mt-4">Organisation</h3>
              <p className="text-sm text-text-muted">{d.setup}</p>
              <h3 className="eyebrow mt-3">Ablauf</h3>
              <ol className="list-decimal space-y-1 pl-5 text-sm text-text-muted">
                {d.flow.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ol>
              <h3 className="eyebrow mt-3">Coachingpunkte</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                {d.coachingPoints.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <h3 className="eyebrow mt-3">Fragen statt Zurufe</h3>
              <ul className="space-y-1 text-sm italic text-text-muted">
                {d.questions.map((q) => (
                  <li key={q}>„{q}“</li>
                ))}
              </ul>
              <h3 className="eyebrow mt-3">Varianten</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-text-muted">
                {d.variations.map((v) => (
                  <li key={v}>{v}</li>
                ))}
              </ul>
            </article>
          </Card>
        ))}
      </ul>
    </>
  )
}
