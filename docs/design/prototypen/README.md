# Prototypen (nicht Teil der App)

- `figuren/` – Entwurf der Draufsicht-Figuren als Vektorzeichnung im Browser. Bild erzeugen:
  `node docs/design/prototypen/figuren/shot.cjs "$PWD/docs/design/prototypen/figuren/sheet.html" /tmp/figuren.png`
- `leistung/` – Leistungsmessung Kreise vs. live animierte Vektorfiguren vs. Sprites (22 Spieler + Ball, Pixel-7-Emulation, CPU-Drosselung 1/4/6):
  `node docs/design/prototypen/leistung/run.cjs`

Beide nutzen das vorinstallierte Playwright/Chromium. Ergebnisse und Entscheidung: [Spielerfiguren](../spielerfiguren.md).
