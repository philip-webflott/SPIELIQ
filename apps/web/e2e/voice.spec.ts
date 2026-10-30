import { readFileSync } from 'node:fs'
import { expect, test } from '@playwright/test'

/**
 * Vorlesen mit vorab erzeugten Aufnahmen (KI-Stimme). Das Verzeichnis und die
 * Audiodateien werden im Test ersetzt (kurzer Ton), damit kein echter
 * ElevenLabs-Zugang nötig ist. Geprüft wird, welche Aufnahmen die App startet.
 */
const tone = readFileSync(new URL('./fixtures/ton.mp3', import.meta.url))
const TEXTS = [
  'Schau zu: Was machen die Blauen?',
  'Alle drei Blauen laufen zum Ball. Hinten ist es jetzt leer.',
  'Welcher Gegner ist frei? Tippe ihn an.',
]
const fileFor = (i: number) => `${String(i + 1).padStart(20, '0')}.mp3`

test('liest mit KI-Stimme vor und lässt sich ausschalten', async ({ page }) => {
  const clips = Object.fromEntries(TEXTS.map((text, i) => [text, { file: fileFor(i), ms: 600 }]))
  await page.route('**/voice/manifest.json', (route) => route.fulfill({ json: { version: 1, profile: null, clips } }))
  await page.route('**/voice/clips/*.mp3', (route) => route.fulfill({ body: tone, contentType: 'audio/mpeg' }))
  await page.addInitScript(() => {
    const played: string[] = []
    Object.assign(window, { __played: played })
    const original = HTMLMediaElement.prototype.play
    HTMLMediaElement.prototype.play = function (this: HTMLMediaElement) {
      played.push(this.src.split('/').pop() ?? '')
      return original.call(this)
    }
  })
  const played = () => page.evaluate(() => (window as unknown as { __played: string[] }).__played)

  await page.goto('/try/nazb-m1-problem-erkennen')
  const toggle = page.getByTestId('voice-toggle')
  await expect(toggle).toHaveAttribute('aria-pressed', 'true')
  await expect(toggle).toHaveAttribute('aria-label', 'Vorlesen (KI-Stimme)')

  // Erst nach der Animation erscheint die Erklärung – sie wird vorgelesen.
  await page.getByTestId('next-step').click()
  await expect.poll(played).toContain(fileFor(1))
  await page.getByTestId('next-step').click()
  await expect.poll(played).toContain(fileFor(2))

  // Ausschalten: neue Texte werden nicht mehr vorgelesen, der Knopf am Text bleibt.
  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-pressed', 'false')
  const before = (await played()).length
  await page.locator('[data-player-id="o7"]').click()
  await page.getByTestId('check').click()
  await expect(page.getByTestId('feedback-headline')).toBeVisible()
  expect((await played()).length).toBe(before)
})
