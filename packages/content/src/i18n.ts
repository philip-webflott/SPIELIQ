import type { LocalizedText } from '@spieliq/engine'

export type Locale = 'de' | 'en'
export const DEFAULT_LOCALE: Locale = 'de'

/** Liefert den Text in der gewünschten Sprache, sonst Deutsch (Pflichtsprache). */
export function t(text: LocalizedText | undefined, locale: Locale = DEFAULT_LOCALE): string {
  if (!text) return ''
  return text[locale] ?? text.de
}

/** Ersetzt Platzhalter der Form {name}. Zahlen werden deutsch formatiert. */
export function format(
  template: string,
  params: Readonly<Record<string, string | number>> | undefined,
  locale: Locale = DEFAULT_LOCALE,
): string {
  if (!params) return template
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = params[key]
    if (value === undefined) return match
    if (typeof value === 'number') {
      return new Intl.NumberFormat(locale === 'de' ? 'de-DE' : 'en-GB', { maximumFractionDigits: 1 }).format(value)
    }
    return value
  })
}

export function de(text: string): LocalizedText {
  return { de: text }
}
