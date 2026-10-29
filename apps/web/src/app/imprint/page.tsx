import type { Metadata } from 'next'
import { Notice, PageHeader } from '@/components/ui/primitives'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = { title: 'Impressum' }

export default function ImprintPage() {
  return (
    <>
      <main id="inhalt" className="mx-auto max-w-2xl px-4 py-8">
        <PageHeader eyebrow="Anbieterkennzeichnung" title="Impressum" />
        <Notice tone="warn">
          Platzhalter: Die Angaben nach § 5 Digitale-Dienste-Gesetz (DDG) werden vor einer öffentlichen Bereitstellung ergänzt
          (Name/Anschrift des Anbieters, Kontakt, ggf. Vertretungsberechtigte und Register).
        </Notice>
      </main>
      <SiteFooter />
    </>
  )
}
