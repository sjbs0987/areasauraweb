'use client'

import { useRef, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  href?: string
  variant?: 'solid' | 'ghost'
  cursor?: string
}

export function MagneticButton({ children, href = '#', variant = 'solid', cursor }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - (r.left + r.width / 2)
    const y = e.clientY - (r.top + r.height / 2)
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`
  }
  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0px, 0px)'
  }

  const base =
    'group relative inline-flex items-center gap-3 px-9 py-5 font-mono text-xs uppercase tracking-[0.2em] transition-[transform,background-color,color] duration-300 ease-out will-change-transform'
  const styles =
    variant === 'solid'
      ? 'bg-electric text-electric-foreground hover:bg-foreground'
      : 'border border-foreground text-foreground hover:bg-foreground hover:text-background'

  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseLeave={reset}
      data-cursor={cursor}
      className={`${base} ${styles}`}
    >
      <span className="h-1.5 w-1.5 bg-current transition-transform duration-300 group-hover:rotate-45" />
      {children}
    </a>
  )
}
