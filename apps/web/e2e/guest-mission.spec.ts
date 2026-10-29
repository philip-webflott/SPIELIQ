import { expect, test } from '@playwright/test'

test.describe('Gastmodus', () => {
  test('Mission 1 vollständig spielen: zuschauen, freien Gegner erkennen, Feedback, Zusammenfassung', async ({ page }) => {
    await page.goto('/try/nazb-m1-problem-erkennen')
    await expect(page.getByText('Schau genau hin')).toBeVisible()
    // Animation zu Ende laufen lassen bzw. überspringen
    await page.getByRole('button', { name: 'Zum Ende springen' }).click()
    await page.getByTestId('next-step').click()

    await expect(page.getByText('Tippe auf den Gegner, der jetzt frei ist.')).toBeVisible()
    // Falsche Antwort zuerst: positive Fehlerkorrektur statt Bestrafung
    await page.locator('[data-player-id="o10"]').click()
    await page.getByTestId('check').click()
    await expect(page.getByTestId('feedback-headline')).toContainText(/noch mal/i)
    await page.getByTestId('retry').click()

    await page.locator('[data-player-id="o7"]').click()
    await page.getByTestId('check').click()
    await expect(page.getByTestId('feedback-headline')).toContainText('Nummer 7')
    await page.getByTestId('next-step').click()

    // Erklärung der besseren Lösung
    await expect(page.getByText('Einer geht zum Ball und stellt den Gegner')).toBeVisible()
    await page.getByTestId('next-step').click()

    await expect(page.getByText('Mission geschafft')).toBeVisible()
    await expect(page.getByText('Freie Räume erkennen')).toBeVisible()
    await expect(page.getByText('Gastmodus: Dein Fortschritt wird nicht gespeichert.')).toBeVisible()
  })

  test('Positionieren ohne Ziehen: antippen und Zielpunkt antippen (Barrierefreiheit)', async ({ page }) => {
    await page.goto('/try/nazb-m3-aufgaben-verteilen')
    await page.getByRole('button', { name: 'Zum Ende springen' }).click()
    await page.getByTestId('next-step').click()
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
