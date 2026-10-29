import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'SPIELIQ – Spielverständnis trainieren', template: '%s · SPIELIQ' },
  description:
    'Interaktive Lernplattform für Spielverständnis im Jugendfußball: Räume erkennen, Abstände halten, gemeinsam verteidigen – mit Feedback und Transfer auf den Platz.',
  applicationName: 'SPIELIQ',
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  themeColor: '#0a0f1c',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="de">
      <body className="antialiased">
        <a href="#inhalt" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink">
          Zum Inhalt springen
        </a>
        {children}
      </body>
    </html>
  )
}
