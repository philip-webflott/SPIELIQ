import type { NextConfig } from 'next'

/**
 * Sicherheits-Header. Hinweis: script-src erlaubt derzeit 'unsafe-inline'
 * (Next.js-Bootstrap-Skripte). Eine Nonce-basierte CSP erzwingt dynamisches
 * Rendern aller Seiten und kollidiert mit statischen Shells (Cache Components) –
 * als offene Härtungsmaßnahme dokumentiert in docs/architektur/sicherheit.md.
 */
const isDev = process.env.NODE_ENV !== 'production'
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "manifest-src 'self'",
  "worker-src 'self'",
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  // Keine Kamera, kein Mikrofon, kein Standort – SPIELIQ braucht nichts davon.
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
]

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  transpilePackages: ['@spieliq/engine', '@spieliq/content', '@spieliq/pitch'],
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      // Aufnahmen sind inhaltsadressiert (Dateiname = Hash aus Text und Stimme) und ändern sich nie.
      { source: '/voice/clips/:file*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
    ]
  },
}

export default nextConfig
