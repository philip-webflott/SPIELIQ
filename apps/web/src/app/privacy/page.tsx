import type { Metadata } from 'next'
import Link from 'next/link'
import { Notice, PageHeader } from '@/components/ui/primitives'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = { title: 'Datenschutzhinweise (Entwurf)' }

/**
 * ENTWURF – nicht rechtsverbindlich. Struktur und Inhalte folgen dem
 * Datenschutzkonzept (docs/recht/datenschutzkonzept.md) und müssen vor dem
 * Echtbetrieb anwaltlich geprüft und um Verantwortliche/Kontakt ergänzt werden.
 */
export default function PrivacyPage() {
  return (
    <>
      <main id="inhalt" className="mx-auto max-w-3xl px-4 py-8">
        <PageHeader eyebrow="Entwurf" title="Datenschutzhinweise" />
        <Notice tone="warn">
          Entwurf für die Entwicklungsphase. Diese Hinweise sind noch nicht rechtlich geprüft und ersetzen keine verbindliche
          Datenschutzerklärung. Kindgerechte Fassung:{' '}
          <Link href="/privacy/kids" className="font-semibold underline">
            Datenschutz für Kinder und Jugendliche
          </Link>
          .
        </Notice>
        <div className="prose-invert mt-6 space-y-5 text-text-muted [&_h2]:mb-1 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:uppercase [&_h2]:text-text">
          <section>
            <h2>Wer ist verantwortlich?</h2>
            <p>
              Für die Daten der Spieler:innen ist grundsätzlich der Verein bzw. die Fußballschule verantwortlich, der/die SPIELIQ nutzt. Der
              Betreiber von SPIELIQ verarbeitet die Daten in dessen Auftrag (Auftragsverarbeitung). [Angaben zu Betreiber und Kontakt folgen –
              offene Rechtsfrage, siehe Datenschutzkonzept.]
            </p>
          </section>
          <section>
            <h2>Welche Daten?</h2>
            <ul className="list-disc space-y-1 pl-5">
              <li>Spieler:innen: Spitzname, generierter Anmeldename, Passwort-Hash, Mannschaftszugehörigkeit, Lernergebnisse (gelöste Aufgaben, Positionen auf dem virtuellen Spielfeld, Zeitpunkte, genutzte Tipps).</li>
              <li>Trainer:innen: Name, E-Mail, Passwort-Hash, Verein und Mannschaften, eingetragene Beobachtungen.</li>
              <li>Nicht erhoben: Geburtsdatum, Standort, Fotos, Kontakte, Geräte-Kennungen, Werbe- oder Tracking-Daten. Es gibt keine Chats.</li>
            </ul>
          </section>
          <section>
            <h2>Wozu?</h2>
            <p>Um Lernmissionen bereitzustellen, Fortschritt zu speichern und den Trainer:innen der eigenen Mannschaft die Lernentwicklung zu zeigen. Keine Werbung, kein Profiling zu anderen Zwecken, keine Weitergabe an Dritte.</p>
          </section>
          <section>
            <h2>Wer sieht was?</h2>
            <p>Spieler:innen sehen nur ihre eigenen Ergebnisse. Trainer:innen sehen nur Spieler:innen ihrer Mannschaften. Es gibt keine öffentlichen Ranglisten.</p>
          </section>
          <section>
            <h2>Speicherung im Browser</h2>
            <p>SPIELIQ nutzt nur ein technisch notwendiges Sitzungs-Cookie für die Anmeldung. Keine Analyse- oder Werbe-Cookies.</p>
          </section>
          <section>
            <h2>Deine Rechte</h2>
            <p>Auskunft (Download im Profil), Berichtigung, Löschung (im Profil), Einschränkung, Widerspruch, Datenübertragbarkeit sowie Beschwerde bei einer Datenschutzaufsichtsbehörde.</p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
