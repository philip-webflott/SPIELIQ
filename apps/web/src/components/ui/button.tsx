import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger'
type Size = 'sm' | 'md' | 'lg' | 'xl'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-[transform,background-color,box-shadow,color] duration-150 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none select-none'

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-accent-ink hover:bg-accent-strong shadow-glow',
  secondary: 'bg-ink-600 text-text hover:bg-ink-500 border border-line-strong',
  ghost: 'text-text-muted hover:text-text hover:bg-ink-700',
  danger: 'bg-bad/15 text-bad hover:bg-bad/25 border border-bad/40',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[0.95rem]',
  lg: 'h-14 px-7 text-lg',
  xl: 'h-16 px-9 text-xl font-display font-bold uppercase tracking-wide',
}

export function buttonClass(variant: Variant = 'primary', size: Size = 'md', extra = ''): string {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ComponentProps<'button'> & { variant?: Variant; size?: Size }) {
  return <button className={buttonClass(variant, size, className)} {...props} />
}

export function LinkButton({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  prefetch,
}: {
  href: string
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  prefetch?: boolean
}) {
  return (
    <Link href={href} className={buttonClass(variant, size, className)} prefetch={prefetch}>
      {children}
    </Link>
  )
}
