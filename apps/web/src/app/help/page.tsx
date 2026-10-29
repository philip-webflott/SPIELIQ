import type { Metadata } from 'next'
import { Notice, PageHeader } from '@/components/ui/primitives'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = { title: 'Hilfe & Melden' }

/**
 * Kindgerechte Hilfe- und Meldeseite (Empfehlung aus Recherche D: Melde- und
 * Abhilfeverfahren, Hinweise auf unabhängige Beratung). SPIELIQ hat keine Chats;
 * Meldungen laufen über Vertrauenspersonen und unabhängige Stellen.
 */
const ITEMS = [
  {
    title: 'Sprich mit jemandem, dem du vertraust',
    text: 'Zum Beispiel mit deinen Eltern, einer anderen erwachsenen Person in deiner Familie, einer Lehrkraft oder der Ansprechperson für Kinderschutz in deinem Verein.',
  },
  {
    title: 'Nummer gegen Kummer – Kinder- und Jugendtelefon',
    text: '116 111 (kostenlos und anonym). Auch online unter nummergegenkummer.de.',
  },
  {
    title: 'Kinderschutz im Fußball',
    text: 'Der DFB und die Landesverbände haben Anlaufstellen für Kinderschutz („Safe Sport“). Die Kontakte findet ihr auf den Seiten des DFB und eures Landesverbands.',
  },
  {
    title: 'Ein Problem mit SPIELIQ?',
    text: 'Wenn in SPIELIQ etwas nicht stimmt (zum Beispiel ein komischer Spitzname im Team), sag deinem Trainer oder der Kinderschutz-Ansprechperson deines Vereins Bescheid.',
  },
]

export default function HelpPage() {
  return (
    <>
      <main id="inhalt" className="mx-auto max-w-2xl px-4 py-8">
        <PageHeader eyebrow="Du bist nicht allein" title="Hilfe & Melden" />
        <Notice tone="info">Bei Gefahr sofort: Notruf 110 (Polizei) oder 112 (Feuerwehr und Rettungsdienst).</Notice>
        <ul className="mt-6 space-y-3">
          {ITEMS.map((i) => (
            <li key={i.title} className="card p-5">
              <p className="font-display text-xl font-bold uppercase tracking-wide">{i.title}</p>
              <p className="mt-1 text-text-muted">{i.text}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-text-faint">
          Hinweis: Die Meldewege werden vor dem Echtbetrieb mit den Vereinen und Landesverbänden abgestimmt (Entwurf).
        </p>
      </main>
      <SiteFooter />
    </>
  )
}
