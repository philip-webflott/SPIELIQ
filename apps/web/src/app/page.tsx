import Link from 'next/link'
import { Eye, Flag, MousePointerClick, Users } from 'lucide-react'
import { getMission } from '@spieliq/content'
import { LinkButton } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { SiteFooter } from '@/components/site-footer'
import { HeroPitch } from '@/features/mission/hero-pitch'

const STEPS = [
  { icon: Eye, title: 'Sehen & verstehen', text: 'Eine kurze Animation zeigt eine echte Spielsituation – und was schiefgeht.' },
  { icon: MousePointerClick, title: 'Selbst entscheiden', text: 'Du ziehst die Spieler dorthin, wo sie hingehören. Sofort siehst du, was sich ändert.' },
  { icon: Flag, title: 'Auf dem Platz anwenden', text: 'Jede Mission endet mit einer Aufgabe fürs nächste Training.' },
]

export default function LandingPage() {
  const mission = getMission('nazb-m1-problem-erkennen').mission
  return (
    <>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <Logo />
        <nav className="flex items-center gap-2" aria-label="Hauptnavigation">
          <Link href="/login" className="rounded-full px-4 py-2 text-sm font-semibold text-text-muted hover:bg-ink-700 hover:text-text">
            Anmelden
          </Link>
        </nav>
      </header>
      <main id="inhalt" className="mx-auto max-w-6xl px-4">
        <section className="grid items-center gap-10 py-6 lg:grid-cols-[1.05fr_1fr] lg:py-14">
          <div className="animate-rise">
            <p className="eyebrow text-accent">Spielverständnis für den Jugendfußball</p>
            <h1 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.95] tracking-wide sm:text-7xl">
              Verstehe das Spiel.
              <span className="block text-text-muted">Nicht nur den Ball.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-text-muted">
              Kurze interaktive Missionen: Du siehst eine Spielsituation, entscheidest selbst, bekommst sofort Feedback – und probierst es im
              nächsten Training aus.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/join" size="lg">
                Mit Teamcode starten
              </LinkButton>
              <LinkButton href="/try" size="lg" variant="secondary">
                Ohne Konto ausprobieren
              </LinkButton>
            </div>
            <p className="mt-4 text-sm text-text-faint">
              Trainer:in?{' '}
              <Link href="/register" className="font-semibold text-accent hover:underline">
                Mannschaft anlegen
              </Link>
            </p>
          </div>
          <div className="card flex justify-center overflow-hidden p-3 sm:p-4">
            <HeroPitch mission={mission} />
          </div>
        </section>

        <section className="grid gap-4 py-8 sm:grid-cols-3" aria-label="So funktioniert SPIELIQ">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <article key={title} className="card p-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent-soft text-accent" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <span className="font-display text-sm font-bold text-text-faint">0{i + 1}</span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-wide">{title}</h2>
              <p className="mt-1 text-text-muted">{text}</p>
            </article>
          ))}
        </section>

        <section className="card mt-4 grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center sm:p-8">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-own/15 text-own" aria-hidden="true">
            <Users size={28} />
          </span>
          <div>
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide">Für Trainer:innen</h2>
            <p className="mt-1 max-w-3xl text-text-muted">
              Mannschaft anlegen, Spieler:innen per Teamcode einladen, Lernmissionen als Hausaufgabe vergeben und sehen, welche Prinzipien noch
              haken – mit passenden Spielformen fürs Training. Ohne Ranglisten, ohne Chats, datensparsam.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
