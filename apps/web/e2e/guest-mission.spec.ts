import { expect, test, type Page } from '@playwright/test'

/** „Weiter“ springt während der Animation erst ans Ende; ein zweiter Klick geht weiter. */
async function finishWatch(page: Page) {
  await page.getByTestId('next-step').click()
  if (await page.getByTestId('next-step').isVisible()) await page.getByTestId('next-step').click()
}

test.describe('Gastmodus', () => {
  test('Mission 1 vollständig spielen: zuschauen, freien Gegner erkennen, Feedback, Zusammenfassung', async ({ page }) => {
    await page.goto('/try/nazb-m1-problem-erkennen')
    await expect(page.getByText('Schau zu: Was machen die Blauen?')).toBeVisible()
    await expect(page.getByText('Wir spielen nach oben')).toBeVisible()
    await finishWatch(page)

    await expect(page.getByText('Welcher Gegner ist frei? Tippe ihn an.')).toBeVisible()
    // Falsche Antwort zuerst: positive Fehlerkorrektur statt Bestrafung
    await page.locator('[data-player-id="o10"]').click()
    await page.getByTestId('check').click()
    await expect(page.getByTestId('feedback-headline')).toContainText(/noch mal/i)
    // Nach dem ersten Fehlversuch gibt es sofort Hilfe
    await expect(page.getByTestId('show-solution')).toBeVisible()
    await page.getByTestId('retry').click()

    await page.locator('[data-player-id="o7"]').click()
    await page.getByTestId('check').click()
    await expect(page.getByTestId('feedback-headline')).toContainText('Nummer 7')
    await page.getByTestId('next-step').click()

    // Erklärung der besseren Lösung
    await expect(page.getByText('Nur einer geht zum Ball. Die anderen bleiben hinten')).toBeVisible()
    await page.getByTestId('next-step').click()

    await expect(page.getByText('Geschafft!')).toBeVisible()
    await expect(page.getByText('Ich sehe, wer frei ist.')).toBeVisible()
    await expect(page.getByText('Gastmodus: Dein Fortschritt wird nicht gespeichert.')).toBeVisible()
  })

  test('Positionieren ohne Ziehen: antippen und Zielpunkt antippen (Barrierefreiheit)', async ({ page }) => {
    await page.goto('/try/nazb-m3-aufgaben-verteilen')
    await finishWatch(page)
    const token = page.locator('[data-player-id="d4"]')
    await token.click()
    // Zielpunkt über die Bildschirm-Matrix des Spielfelds berechnen (Spielfeldkoordinate 21|48)
    const target = await page.evaluate(() => {
      const svg = document.querySelector('svg[role="group"]') as SVGSVGElement
      const portrait = svg.dataset.orientation === 'portrait'
      const length = Number(svg.dataset.pitchLength)
      const pitch = { x: 21, y: 48 }
      const local = portrait ? { x: pitch.y, y: length - pitch.x } : pitch
      const pt = svg.createSVGPoint()
      pt.x = local.x
      pt.y = local.y
      const s = pt.matrixTransform(svg.getScreenCTM()!)
      return { x: s.x, y: s.y }
    })
    await page.mouse.click(target.x, target.y)
    await page.getByTestId('check').click()
    await expect(page.getByTestId('feedback-headline')).toContainText(/abgesichert|Gut/)
  })
})
