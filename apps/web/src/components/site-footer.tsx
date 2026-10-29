import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-line px-4 py-8 text-sm text-text-faint">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p>
          SPIELIQ ist ein unabhängiges Projekt und steht in keiner Verbindung zu DFB, FIFA oder UEFA. Entwicklungsstand: Prototyp.
        </p>
        <nav className="flex gap-4" aria-label="Rechtliches">
          <Link href="/privacy" className="hover:text-text">
            Datenschutz
          </Link>
          <Link href="/imprint" className="hover:text-text">
            Impressum
          </Link>
        </nav>
      </div>
    </footer>
  )
}
