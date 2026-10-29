import type { AssessmentResult, CriterionResult, PlayoutOutcome, Rating } from '@spieliq/engine'
import { format, t, type Locale } from './i18n'

/**
 * Standard-Feedbacktexte zu den Ergebnisschlüsseln der Bewertungsengine.
 *
 * Leitlinien (siehe docs/konzept/lernsystem.md):
 * - Du-Form, kurze Sätze, keine Fachbegriffe ohne Erklärung
 * - zuerst, was gut ist; Fehler als Hinweis auf die Lösung formulieren
 * - immer die Ursache nennen ("weil …"), nie nur "falsch"
 */
const DE: Record<string, string> = {
  'common.missingEntity': 'Diese Situation kann gerade nicht ausgewertet werden.',
  'common.notApplicable': '',

  'passLane.open': 'Der Passweg zu Nummer {to} ist frei.',
  'passLane.risky': 'Der Pass zu Nummer {to} ist riskant – ein Gegner ist nah an der Passlinie.',
  'passLane.blocked': 'Ein Gegner steht im Passweg zu Nummer {to}.',
  'passLane.closed': 'Stark: Der Passweg zu Nummer {to} ist zu.',
  'passLane.stillOpen': 'Der Passweg zu Nummer {to} ist noch offen.',

  'passOptions.enough': 'Super: {open} sichere Anspielstationen.',
  'passOptions.tooFew': 'Erst {open} sichere Anspielstation. Mindestens {min} sollen es sein – sucht die Lücken zwischen den Gegnern.',

  'selectFree.ok': 'Er hätte nach dem Pass etwa {seconds} Sekunden Zeit – niemand stört ihn.',
  'selectFree.notFree': 'Bei ihm ist schnell ein Gegenspieler da oder der Passweg ist zu. Wer steht weit weg von allen?',
  'selectFree.notMostFree': 'Der ist auch frei – aber einer steht noch freier.',
  'selectFree.none': 'Tippe auf einen Spieler.',
  'selectFree.wrongTeam': 'Tippe auf einen Spieler der anderen Mannschaft.',

  'spacing.ok': 'Gute Abstände – niemand steht auf einem Fleck.',
  'spacing.tooClose': 'Nummer {a} und Nummer {b} stehen nur {meters} m auseinander. Ein einziger Gegner kann beide stören.',

  'widthDepth.ok': 'Ihr macht das Feld groß – breit und tief.',
  'widthDepth.noWidth': 'Nutzt die Breite: Einer sollte weiter nach außen.',
  'widthDepth.noDepth': 'Nutzt die Tiefe: Einer sollte weiter vor oder hinter den Ball.',

  'triangle.ok': 'Ihr bildet ein Dreieck – der Ballführende hat zwei Passwege auf einmal.',
  'triangle.flat': 'Ihr steht fast auf einer Linie. Versetzt euch zu einem Dreieck.',
  'triangle.laneBlocked': 'In eurem Dreieck ist ein Passweg zugestellt.',

  'groupDistance.ok': 'Alle stehen in guter Passdistanz.',
  'groupDistance.tooClose': 'Nummer {player} steht mit {meters} m zu nah am Ball – so stört ein Gegner beide.',
  'groupDistance.tooFar': 'Nummer {player} ist {meters} m weg – zu weit für einen sicheren Pass.',

  'distance.ok': 'Der Abstand passt.',
  'distance.tooClose': 'Zu nah: nur {meters} m.',
  'distance.tooFar': 'Zu weit weg: {meters} m.',

  'pressure.ok': 'Gut gestellt: nah dran und zwischen Ball und Tor.',
  'pressure.tooFar': 'Der nächste Verteidiger ist {meters} m vom Ballführenden weg – zu weit, um ihn zu stören.',
  'pressure.tooClose': 'Sehr eng dran. Mit etwas mehr Abstand wirst du nicht so leicht ausgespielt.',
  'pressure.notGoalSide': 'Wer den Ballführenden stellt, muss zwischen Ball und eigenem Tor stehen.',

  'cover.ok': 'Stark abgesichert: schräg hinter deinem Mitspieler.',
  'cover.notDeeper': 'Du stehst auf einer Höhe mit deinem Mitspieler. Wird er ausgespielt, seid ihr beide weg – geh etwas tiefer.',
  'cover.tooFar': 'Du bist {meters} m von deinem Mitspieler entfernt – zu weit, um ihm zu helfen.',
  'cover.tooClose': 'Zu nah an deinem Mitspieler – mit einer Aktion wärt ihr beide überspielt.',
  'cover.flat': 'Steh nicht neben ihm, sondern schräg hinter ihm.',
  'cover.outside': 'Gut! Noch besser: etwas weiter innen absichern – dort ist der Weg zum Tor.',
  'cover.samePlayer': 'Absichern muss ein anderer Spieler als der, der stellt.',

  'reachInTime.ok': 'Wird Nummer {target} angespielt, bist du rechtzeitig da.',
  'reachInTime.laneClosed': 'Der Pass zu Nummer {target} ist zugestellt.',
  'reachInTime.late': 'Wird Nummer {target} angespielt, kommst du etwa {seconds} s zu spät.',

  'goalSide.ok': 'Du stehst zwischen Nummer {attacker} und dem Tor.',
  'goalSide.no': 'Stell dich zwischen Nummer {attacker} und das eigene Tor.',

  'crowding.ok': 'Nur einer am Ball – die anderen halten Abstand.',
  'crowding.tooMany': '{count} Spieler sind direkt am Ball – zu viele! Die anderen werden woanders gebraucht.',

  'behindBall.ok': 'Alle stehen zwischen Ball und Tor.',
  'behindBall.beaten': '{count} Spieler stehen schon hinter dem Ball – sie können nicht mehr helfen.',

  'chainGaps.ok': 'Keine großen Lücken in eurer Kette.',
  'chainGaps.tooBig': 'Zwischen Nummer {a} und Nummer {b} ist eine Lücke von {meters} m.',

  'protectCentre.ok': 'Die Mitte vor dem Tor ist geschützt.',
  'protectCentre.open': 'Vor dem Tor ist es zu leer. Mindestens {min} Spieler sollten die Mitte schützen.',

  'shift.ok': 'Gut verschoben – ihr seid auf der Ballseite.',
  'shift.notEnough': 'Schiebt weiter zur Ballseite!',
  'shift.tooMuch': 'Zu weit verschoben – jetzt wird die Mitte frei.',
  'shift.ballCentral': '',

  'compactness.ok': 'Kompakt!',
  'compactness.tooWide': 'Ihr steht zu breit auseinander ({width} m).',
  'compactness.tooDeep': 'Ihr steht zu weit hintereinander ({depth} m).',

  'freeSpace.ok': 'Genau, hier ist freier Raum.',
  'freeSpace.notFree': 'Hier ist ein Spieler in der Nähe. Such die Stelle, an der niemand ist.',
  'freeSpace.none': 'Tippe auf eine Stelle im Feld.',

  'choice.correct': 'Richtig!',
  'choice.acceptable': 'Das geht auch.',
  'choice.wrong': 'Nicht ganz.',
  'choice.none': 'Wähle eine Antwort.',
}

const RATING_DE: Record<Rating, string> = {
  excellent: 'Stark gelöst!',
  good: 'Gut gelöst!',
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
        return 'Der Pass kommt an – wir kommen nach vorne.'
      case 'safePass':
        return 'Sicherer Pass – wir behalten den Ball.'
      case 'interception':
        return 'Abgefangen – der Gegner hat den Ball.'
      case 'pressured':
        return 'Der Pass kommt an, aber sofort ist ein Gegner da.'
      case 'forcedBack':
        return 'Wir müssen zurückspielen.'
      case 'noOption':
        return 'Keine Anspielstation.'
    }
  }
  switch (outcome) {
    case 'goalChance':
      return 'Torchance für den Gegner!'
    case 'progress':
      return 'Der Gegner kommt weiter nach vorne.'
    case 'safePass':
      return 'Der Gegner behält den Ball, kommt aber nicht durch.'
    case 'interception':
      return 'Abgefangen – Ballgewinn für uns!'
    case 'pressured':
      return 'Sofort unter Druck – gut verteidigt!'
    case 'forcedBack':
      return 'Der Gegner muss zurückspielen – gut verteidigt!'
    case 'noOption':
      return 'Der Gegner findet keine Anspielstation.'
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
