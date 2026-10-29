import type { Metadata } from 'next'
import { Notice, PageHeader } from '@/components/ui/primitives'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = { title: 'Datenschutz für Kinder und Jugendliche' }

const ITEMS = [
  { q: 'Was weiß SPIELIQ über mich?', a: 'Deinen Spitznamen, deinen Anmeldenamen, in welcher Mannschaft du bist und welche Aufgaben du gelöst hast.' },
  { q: 'Was weiß SPIELIQ nicht?', a: 'Deinen echten Namen (wenn du ihn nicht als Spitznamen nimmst), dein Geburtsdatum, wo du wohnst oder bist, deine Fotos und deine Kontakte.' },
  { q: 'Wer sieht meine Ergebnisse?', a: 'Nur du und die Trainer deiner Mannschaft. Andere Spieler sehen deine Ergebnisse nicht. Es gibt keine Rangliste.' },
  { q: 'Kann mir jemand schreiben?', a: 'Nein. In SPIELIQ gibt es keine Chats und keine Nachrichten.' },
  { q: 'Und meine Eltern?', a: 'Deine Eltern müssen einverstanden sein, dass du SPIELIQ nutzt. Darum kümmert sich dein Verein.' },
  { q: 'Kann ich alles löschen?', a: 'Ja. In deinem Profil kannst du dein Konto und alle Ergebnisse jederzeit löschen. Du kannst dir auch alles herunterladen, was gespeichert ist.' },
]

export default function KidsPrivacyPage() {
  return (
    <>
      <main id="inhalt" className="mx-auto max-w-2xl px-4 py-8">
        <PageHeader eyebrow="Kurz und klar" title="Deine Daten" />
        <Notice tone="warn">Entwurf – wird vor dem Start noch rechtlich geprüft.</Notice>
        <ul className="mt-6 space-y-3">
          {ITEMS.map((i) => (
            <li key={i.q} className="card p-5">
              <p className="font-display text-xl font-bold uppercase tracking-wide">{i.q}</p>
              <p className="mt-1 text-text-muted">{i.a}</p>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  )
}
