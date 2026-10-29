/**
 * Fachlicher Fehler mit einer Meldung, die direkt angezeigt werden darf.
 * Technische Fehler werden nie mit Details an den Client gegeben.
 */
export class DomainError extends Error {
  constructor(
    readonly code: 'not-found' | 'forbidden' | 'invalid' | 'conflict' | 'rate-limited' | 'unauthenticated',
    readonly userMessage: string,
  ) {
    super(userMessage)
  }
}

export function forbidden(message = 'Dafür fehlen dir die Rechte.'): DomainError {
  return new DomainError('forbidden', message)
}

export function notFound(message = 'Nicht gefunden.'): DomainError {
  return new DomainError('not-found', message)
}

export function invalid(message: string): DomainError {
  return new DomainError('invalid', message)
}
