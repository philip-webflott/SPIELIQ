// Prototyp: SPIELIQ-Figuren in Draufsicht (vektoriell, zum Begutachten – nicht der Produktionscode)
const NS = 'http://www.w3.org/2000/svg'
function el(p, t, a = {}) {
  const e = document.createElementNS(NS, t)
  for (const k in a) e.setAttribute(k, a[k])
  p.appendChild(e)
  return e
}

const KITS = {
  own: { shirt: '#4aa3ff', shirtDark: '#2f7fd6', shorts: '#0d2f57', socks: '#eaf4ff', ink: '#04213f', badge: 'circle' },
  opp: { shirt: '#ff8a3d', shirtDark: '#c95f1c', shorts: '#4a1d00', socks: '#2b1100', ink: '#2b1100', badge: 'square' },
  ownKeeper: { shirt: '#9ad0ff', shirtDark: '#6aaee8', shorts: '#0d2f57', socks: '#eaf4ff', ink: '#04213f', badge: 'circle', gloves: true },
}
// Zurückhaltende Vielfalt: Haut- und Haartöne aus kleiner Palette, je Rückennummer
const LOOKS = [
  { skin: '#f1c7a5', hair: '#3a2a1e' },
  { skin: '#c98e62', hair: '#1d1612' },
  { skin: '#8d5a3b', hair: '#121010' },
  { skin: '#e8b48c', hair: '#8a5a2b' },
  { skin: '#a8714c', hair: '#2a1d14' },
]

// Posen in lokalen Koordinaten: Blickrichtung = -y. Einheit: Körperbreite/18.
const POSES = {
  ready: { feet: [[-4, 1.5, 0], [4, 1.5, 0]], hands: [[-10.5, 3.5], [10.5, 3.5]], lean: 0 },
  runA: { feet: [[-3.5, -7, 0], [3.5, 6.5, 0]], hands: [[-8, 6], [8.5, -7]], lean: -1.2 },
  runB: { feet: [[-3.5, 6.5, 0], [3.5, -7, 0]], hands: [[-8.5, -7], [8, 6]], lean: -1.2 },
  defend: { feet: [[-8.5, 0.5, -20], [8.5, 2.5, 20]], hands: [[-14, -3.5], [14, -3.5]], lean: 0.8, wide: true },
  receive: { feet: [[-4.5, 2, 0], [3.5, -7, 10]], hands: [[-14, 0.5], [13.5, 1.5]], lean: 0 },
  pass: { feet: [[-5, -0.5, 0], [3, -9, -70]], hands: [[-13.5, -2], [7.5, 6.5]], lean: -0.5 },
  shoot: { feet: [[-5.5, -1.5, 0], [1.5, -13.5, 0]], hands: [[-12.5, -6.5], [9, 7]], lean: -1.6 },
}

/**
 * Zeichnet eine Figur. facing in Grad (0 = nach oben auf dem Bildschirm).
 * Rotiert wird nur der Körper; Nummer und Markierungen bleiben aufrecht.
 */
function figure(parent, { x, y, s = 1, facing = 0, pose = 'ready', team = 'own', label = '', look = 0, you = false, movable = false, pointer = true, free = false, trail = null, ball = false, cone = false }) {
  const kit = KITS[team]
  const lk = LOOKS[look % LOOKS.length]
  const P = POSES[pose]
  const g = el(parent, 'g', { transform: `translate(${x} ${y}) scale(${s})` })

  // Bodenebene (dreht nicht mit, außer dem Zeiger)
  if (trail) {
    const a = ((trail.dir - 90) * Math.PI) / 180
    for (let i = 1; i <= 3; i++) {
      el(g, 'circle', { cx: -Math.cos(a) * (8 + i * 7), cy: -Math.sin(a) * (8 + i * 7), r: 3.4 - i * 0.7, fill: '#ffffff', opacity: 0.38 - i * 0.1 })
    }
  }
  if (free) el(g, 'circle', { r: 21, fill: 'rgba(59,214,113,0.16)', stroke: '#3bd671', 'stroke-width': 1.6, 'stroke-dasharray': '4 3' })
  if (movable) el(g, 'circle', { r: 17.5, fill: 'none', stroke: '#ffffff', 'stroke-width': 1.1, 'stroke-dasharray': '3.2 2.4', opacity: 0.9 })

  const body = el(g, 'g', { transform: `rotate(${facing})` })
  if (cone) el(body, 'path', { d: 'M0,0 L-26,-58 A64,64 0 0 1 26,-58 Z', fill: 'rgba(255,255,255,0.16)', stroke: 'rgba(255,255,255,0.5)', 'stroke-width': 0.8 })
  // Fußabdruck als Tropfen: die Spitze zeigt die Blickrichtung (auch ganz klein sichtbar)
  el(body, 'path', { d: 'M0,-20 C6,-16 13.5,-9 13.5,1 C13.5,9 7.5,13.5 0,13.5 C-7.5,13.5 -13.5,9 -13.5,1 C-13.5,-9 -6,-16 0,-20 Z', fill: 'rgba(0,0,0,0.32)' })
  if (pointer) el(body, 'path', { d: 'M0,-20.5 L-3.2,-15.6 L3.2,-15.6 Z', fill: '#ffffff', opacity: 0.95 })
  // Beine (Stutzen in Teamfarbe) und Schuhe
  for (const [fx, fy, rot] of P.feet) {
    const hx = fx < 0 ? -3.2 : 3.2
    el(body, 'line', { x1: hx, y1: 1.2, x2: fx, y2: fy, stroke: kit.socks, 'stroke-width': 3.4, 'stroke-linecap': 'round' })
    const boot = el(body, 'g', { transform: `translate(${fx} ${fy}) rotate(${rot})` })
    el(boot, 'ellipse', { rx: 2.5, ry: 3.8, fill: '#1a2230' })
    el(boot, 'ellipse', { cy: -1.6, rx: 1.4, ry: 1.3, fill: '#5a6b85' })
  }
  if (ball) {
    const [fx, fy] = P.feet.reduce((a, b) => (b[1] < a[1] ? b : a))
    el(body, 'circle', { cx: fx * 0.6, cy: fy - 6.5, r: 3.6, fill: '#fff', stroke: '#111827', 'stroke-width': 0.8 })
    el(body, 'circle', { cx: fx * 0.6, cy: fy - 6.5, r: 1.3, fill: '#111827' })
  }
  // Hose
  el(body, 'ellipse', { cx: 0, cy: 1.8, rx: 6.4, ry: 4.2, fill: kit.shorts })
  // Arme: Ärmel + Hand
  for (const [hx, hy] of P.hands) {
    const sx = hx < 0 ? -8 : 8
    el(body, 'line', { x1: sx, y1: P.lean, x2: hx, y2: hy, stroke: lk.skin, 'stroke-width': 3.2, 'stroke-linecap': 'round' })
    el(body, 'line', { x1: sx, y1: P.lean, x2: sx + (hx - sx) * 0.38, y2: P.lean + (hy - P.lean) * 0.38, stroke: kit.shirt, 'stroke-width': 3.9, 'stroke-linecap': 'round' })
    el(body, 'circle', { cx: hx, cy: hy, r: kit.gloves ? 2.6 : 1.9, fill: kit.gloves ? '#ffd23f' : lk.skin })
  }
  // Oberkörper (Schultern) – Gegner mit Streifen als zweites Merkmal neben der Farbe
  const w = P.wide ? 20.5 : 19.5
  el(body, 'rect', { x: -w / 2, y: -4.6 + P.lean, width: w, height: 10.4, rx: 5, fill: kit.shirt, stroke: kit.shirtDark, 'stroke-width': 0.9 })
  // Kopf: Gesicht vorne (Haut), Haare hinten, Nase als Richtungszeichen
  const hy = -3.4 + P.lean
  const clipId = `c${Math.random().toString(36).slice(2)}`
  const cp = el(body, 'clipPath', { id: clipId })
  el(cp, 'circle', { cx: 0, cy: hy, r: 4.7 })
  el(body, 'circle', { cx: 0, cy: hy, r: 4.7, fill: lk.skin, stroke: 'rgba(0,0,0,0.25)', 'stroke-width': 0.5 })
  el(body, 'circle', { cx: 0, cy: hy + 2.9, r: 5.1, fill: lk.hair, 'clip-path': `url(#${clipId})` })
  el(body, 'circle', { cx: 0, cy: hy - 4.9, r: 1.2, fill: lk.skin })

  // Infoebene: Nummer aufrecht auf dem Rücken (gegenüber der Blickrichtung), Schild nach Team
  if (label) {
    const a = ((facing + 90) * Math.PI) / 180
    const bx = 12.5
    const by = -12.5
    const badge = el(g, 'g', { transform: `translate(${bx} ${by})` })
    if (kit.badge === 'circle') el(badge, 'circle', { r: 7.4, fill: kit.shirt, stroke: '#eaf4ff', 'stroke-width': 1.6 })
    else el(badge, 'rect', { x: -6.9, y: -6.9, width: 13.8, height: 13.8, rx: 2.6, fill: kit.shirt, stroke: '#4a1d00', 'stroke-width': 1.8 })
    const t = el(badge, 'text', { 'text-anchor': 'middle', 'dominant-baseline': 'central', y: 0.4, 'font-size': label.length > 1 ? 8.4 : 9.8, 'font-weight': 800, fill: kit.ink, 'font-family': 'Barlow Condensed, Arial Narrow, sans-serif' })
    t.textContent = label
  }
  if (you) {
    const b = el(g, 'g', { transform: 'translate(0 -27)' })
    el(b, 'rect', { x: -9, y: -4.2, width: 18, height: 8.4, rx: 4.2, fill: '#3bd671' })
    const t = el(b, 'text', { 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': 6, 'font-weight': 800, fill: '#04150a', 'font-family': 'system-ui, sans-serif' })
    t.textContent = 'DU'
  }
  return g
}

function circleToken(parent, { x, y, s = 1, team = 'own', label = '' }) {
  const g = el(parent, 'g', { transform: `translate(${x} ${y}) scale(${s})` })
  const own = team === 'own'
  el(g, 'ellipse', { cx: 1.5, cy: 4.5, rx: 13, ry: 10, fill: 'rgba(0,0,0,0.28)' })
  if (!own) el(g, 'circle', { r: 16.6, fill: 'none', stroke: '#ffe3cc', 'stroke-width': 2 })
  el(g, 'circle', { r: 13, fill: own ? '#4aa3ff' : '#ff8a3d', stroke: own ? '#eaf4ff' : '#4a1d00', 'stroke-width': own ? 2.8 : 4.2 })
  if (!own) el(g, 'circle', { r: 9.4, fill: 'none', stroke: '#4a1d00', 'stroke-width': 1, opacity: 0.6 })
  const t = el(g, 'text', { 'text-anchor': 'middle', 'dominant-baseline': 'central', y: 0.5, 'font-size': 14, 'font-weight': 700, fill: own ? '#04213f' : '#2b1100', 'font-family': 'Barlow Condensed, Arial Narrow, sans-serif' })
  t.textContent = label
}

function ballAt(parent, x, y, s = 1) {
  const g = el(parent, 'g', { transform: `translate(${x} ${y}) scale(${s})` })
  el(g, 'circle', { cx: 1.2, cy: 1.8, r: 4.6, fill: 'rgba(0,0,0,0.3)' })
  el(g, 'circle', { r: 3.9, fill: '#fff', stroke: '#111827', 'stroke-width': 0.8 })
  el(g, 'circle', { r: 1.4, fill: '#111827' })
}

function grass(svg, w, h) {
  el(svg, 'rect', { width: w, height: h, fill: '#1f6b3f' })
  for (let i = 0; i < h / 40; i++) el(svg, 'rect', { y: i * 40, width: w, height: 20, fill: '#23733f' })
}
