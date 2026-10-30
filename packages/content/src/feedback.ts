import type { AssessmentResult, CriterionResult, PlayoutOutcome, Rating } from '@spieliq/engine'
import { format, t, type Locale } from './i18n'

/**
 * Standard-Feedbacktexte zu den Ergebnisschlüsseln der Bewertungsengine.
 *
 * Leitlinien (Einfache Sprache, siehe docs/design/einfach-verstehen.md):
 * - Du-Form, kurze Sätze (ein Gedanke pro Satz), keine Fachwörter
 * - keine Meter- oder Sekundenangaben – Spielernummern statt Abstände
 * - zuerst, was gut ist; Fehler als Hinweis auf die Lösung formulieren
 * - immer die Ursache nennen, nie nur "falsch"
 */
const DE: Record<string, string> = {
  'common.missingEntity': 'Diese Situation kann gerade nicht ausgewertet werden.',
  'common.notApplicable': '',

  'passLane.open': 'Der Ball kommt sicher zu Nummer {to}.',
  'passLane.risky': 'Der Pass zu Nummer {to} ist gefährlich. Ein Gegner ist nah dran.',
  'passLane.blocked': 'Ein Gegner steht im Weg zu Nummer {to}.',
  'passLane.closed': 'Super: Der Pass zu Nummer {to} geht nicht mehr.',
  'passLane.stillOpen': 'Der Pass zu Nummer {to} geht noch.',

  'passOptions.enough': 'Super: Mehrere Mitspieler können den Ball bekommen.',
  'passOptions.tooFew': 'Zu wenige sind frei für einen Pass. Geht in die Lücken zwischen den Gegnern.',

  'selectFree.ok': 'Bei ihm ist kein Gegenspieler. Er hat viel Zeit.',
  'selectFree.notFree': 'Bei ihm ist ein Gegenspieler nah dran. Wer steht ganz allein?',
  'selectFree.notMostFree': 'Der ist auch frei. Aber einer steht noch freier.',
  'selectFree.none': 'Tippe auf einen Spieler.',
  'selectFree.wrongTeam': 'Tippe auf einen Gegner.',

  'spacing.ok': 'Gute Abstände. Keiner steht zu nah am anderen.',
  'spacing.tooClose': 'Nummer {a} und Nummer {b} stehen zu nah zusammen. Ein Gegner kann beide stören.',

  'widthDepth.ok': 'Ihr macht das Feld groß.',
  'widthDepth.noWidth': 'Einer muss weiter zur Seite.',
  'widthDepth.noDepth': 'Einer muss weiter nach vorne oder nach hinten.',

  'triangle.ok': 'Ihr steht wie ein Dreieck. So gibt es zwei Wege für den Pass.',
  'triangle.flat': 'Ihr steht fast in einer Reihe. Stellt euch wie ein Dreieck auf.',
  'triangle.laneBlocked': 'Ein Gegner steht im Weg. Einer von euch muss sich bewegen.',

  'groupDistance.ok': 'Alle stehen gut für einen Pass.',
  'groupDistance.tooClose': 'Nummer {player} steht zu nah am Ball. So stört ein Gegner beide.',
  'groupDistance.tooFar': 'Nummer {player} steht zu weit weg. Der Pass ist zu lang.',

  'distance.ok': 'Der Abstand passt.',
  'distance.tooClose': 'Zu nah dran.',
  'distance.tooFar': 'Zu weit weg.',

  'pressure.ok': 'Gut! Nah am Gegner und zwischen Ball und Tor.',
  'pressure.tooFar': 'Keiner ist nah genug am Gegner mit dem Ball. Einer muss hin.',
  'pressure.tooClose': 'Sehr nah dran. Ein kleines Stück Abstand ist besser.',
  'pressure.notGoalSide': 'Stell dich zwischen den Ball und unser Tor.',

  'cover.ok': 'Super abgesichert: schräg hinter deinem Mitspieler.',
  'cover.notDeeper': 'Du stehst neben deinem Mitspieler. Geh ein Stück nach hinten.',
  'cover.tooFar': 'Du bist zu weit weg. So kannst du nicht helfen.',
  'cover.tooClose': 'Du bist zu nah dran. Dann kommt der Gegner an euch beiden vorbei.',
  'cover.flat': 'Nicht neben ihm. Schräg hinter ihm.',
  'cover.outside': 'Gut! Noch besser: ein Stück mehr zur Mitte.',
  'cover.samePlayer': 'Absichern muss ein anderer Spieler.',

  'reachInTime.ok': 'Kommt der Ball zu Nummer {target}, bist du schnell da.',
  'reachInTime.laneClosed': 'Der Pass zu Nummer {target} geht nicht durch.',
  'reachInTime.late': 'Kommt der Ball zu Nummer {target}, bist du zu spät.',

  'goalSide.ok': 'Du stehst zwischen Nummer {attacker} und unserem Tor.',
  'goalSide.no': 'Stell dich zwischen Nummer {attacker} und unser Tor.',

  'crowding.ok': 'Nur einer ist am Ball. Gut!',
  'crowding.tooMany': 'Zu viele sind am Ball. Nur einer geht hin.',

  'behindBall.ok': 'Alle stehen zwischen Ball und Tor.',
  'behindBall.beaten': 'Einige stehen schon hinter dem Ball. Sie können nicht mehr helfen.',

  'chainGaps.ok': 'Keine großen Lücken zwischen euch.',
  'chainGaps.tooBig': 'Zwischen Nummer {a} und Nummer {b} ist zu viel Platz.',

  'protectCentre.ok': 'Vor unserem Tor ist jemand. Gut!',
  'protectCentre.open': 'Vor unserem Tor ist es zu leer. Rückt in die Mitte.',

  'shift.ok': 'Gut! Ihr seid auf der Seite vom Ball.',
  'shift.notEnough': 'Geht noch weiter zur Seite vom Ball.',
  'shift.tooMuch': 'Zu weit! Jetzt ist die Mitte leer.',
  'shift.ballCentral': '',

  'compactness.ok': 'Ihr steht eng zusammen. Gut!',
  'compactness.tooWide': 'Ihr steht zu weit auseinander.',
  'compactness.tooDeep': 'Ihr steht zu weit hintereinander.',

  'freeSpace.ok': 'Genau! Hier ist Platz.',
  'freeSpace.notFree': 'Hier ist schon ein Spieler. Such eine Stelle, wo keiner ist.',
  'freeSpace.none': 'Tippe auf eine Stelle im Feld.',

  'choice.correct': 'Richtig!',
  'choice.acceptable': 'Das geht auch.',
  'choice.wrong': 'Nicht ganz.',
  'choice.none': 'Wähle eine Antwort.',
}

const RATING_DE: Record<Rating, string> = {
  excellent: 'Super!',
  good: 'Gut gemacht!',
  'not-yet': 'Noch nicht ganz.',
}

export function criterionMessage(result: CriterionResult, customFail?: string, customPass?: string, locale: Locale = 'de'): string {
  if (result.passed && customPass) return customPass
  if (!result.passed && customFail) return customFail
  const template = DE[result.feedbackKey] ?? ''
  return format(template, result.feedbackParams, locale)
}

export function ratingHeadline(rating: Rating): string {
  return RATING_DE[rating]
}

export function feedbackTemplate(key: string): string | undefined {
  return DE[key]
}

export function allFeedbackKeys(): string[] {
  return Object.keys(DE)
}

/** Texte zur Konsequenz-Animation – aus Sicht der eigenen Mannschaft formuliert. */
export function playoutMessage(outcome: PlayoutOutcome, attackingTeamIsOwn: boolean): string {
  if (attackingTeamIsOwn) {
    switch (outcome) {
      case 'goalChance':
        return 'Torchance für uns!'
      case 'progress':
        return 'Der Pass kommt an. Wir kommen nach vorne.'
      case 'safePass':
        return 'Wir behalten den Ball.'
      case 'interception':
        return 'Der Gegner fängt den Ball ab.'
      case 'pressured':
        return 'Der Pass kommt an. Aber sofort ist ein Gegner da.'
      case 'forcedBack':
        return 'Wir müssen zurückspielen.'
      case 'noOption':
        return 'Keiner ist frei für einen Pass.'
    }
  }
  switch (outcome) {
    case 'goalChance':
      return 'Torchance für den Gegner!'
    case 'progress':
      return 'Der Gegner kommt weiter nach vorne.'
    case 'safePass':
      return 'Der Gegner hat den Ball. Aber er kommt nicht durch.'
    case 'interception':
      return 'Wir haben den Ball! Gut verteidigt.'
    case 'pressured':
      return 'Ein Blauer ist sofort da. Gut verteidigt!'
    case 'forcedBack':
      return 'Der Gegner muss zurückspielen. Gut verteidigt!'
    case 'noOption':
      return 'Beim Gegner ist keiner frei. Super!'
  }
}

/** Kurze, priorisierte Rückmeldung: Überschrift + wichtigster Satz + bis zu zwei positive Punkte. */
export interface FeedbackSummary {
  readonly headline: string
  readonly main: string
  readonly positives: string[]
}

export function summarizeFeedback(
  result: AssessmentResult,
  overrides: {
    stepFeedback?: { excellent?: { de: string }; good?: { de: string }; notYet?: { de: string } }
    criterionTexts?: Record<string, { pass?: { de: string }; fail?: { de: string } } | undefined>
    alternativeExplanation?: { de: string }
  } = {},
  locale: Locale = 'de',
): FeedbackSummary {
  const step = overrides.stepFeedback
  const headline =
    result.rating === 'excellent'
      ? t(step?.excellent, locale) || RATING_DE.excellent
      : result.rating === 'good'
        ? t(step?.good, locale) || RATING_DE.good
        : t(step?.notYet, locale) || RATING_DE['not-yet']
  const primary = result.primary
  let main = ''
  if (result.alternativeId && overrides.alternativeExplanation) {
    main = t(overrides.alternativeExplanation, locale)
  } else if (primary) {
    const custom = overrides.criterionTexts?.[primary.id]
    main = criterionMessage(primary, t(custom?.fail, locale) || undefined, t(custom?.pass, locale) || undefined, locale)
  }
  const positives = result.criteria
    .filter((c) => c.passed && !c.notApplicable && c.id !== primary?.id)
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 2)
    .map((c) => {
      const custom = overrides.criterionTexts?.[c.id]
      return criterionMessage(c, undefined, t(custom?.pass, locale) || undefined, locale)
    })
    .filter((s) => s.length > 0)
  return { headline, main, positives }
}
