import Link from 'next/link'
import { Logo } from '@/components/ui/logo'

export default function AuthLayout({ children }: LayoutProps<'/'>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-lg items-center justify-between px-4 py-5">
        <Link href="/" aria-label="Zur Startseite">
          <Logo />
        </Link>
      </header>
      <main id="inhalt" className="mx-auto w-full max-w-lg flex-1 px-4 pb-12">
        {children}
      </main>
    </div>
  )
}
