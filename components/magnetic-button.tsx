'use client'

import { useRef, useState, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'

type Props = {
  children: ReactNode
  href?: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  variant?: 'solid' | 'ghost' | 'ghost-dark'
  cursor?: string
  className?: string
}

type Ripple = {
  x: number
  y: number
  id: number
}

export function MagneticButton({
  children,
  href = '#',
  onClick: customOnClick,
  variant = 'solid',
  cursor,
  className = '',
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduce = useReducedMotion()
  const [ripples, setRipples] = useState<Ripple[]>([])
  const [isPressed, setIsPressed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Spring physics for smooth magnetic pull
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = e.clientX - (r.left + r.width / 2)
    const py = e.clientY - (r.top + r.height / 2)
    mouseX.set(px * 0.35)
    mouseY.set(py * 0.45)
  }

  const reset = () => {
    mouseX.set(0)
    mouseY.set(0)
    setIsHovered(false)
  }

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (el) {
      const rect = el.getBoundingClientRect()
      const px = e.clientX - rect.left
      const py = e.clientY - rect.top
      const newRipple = { x: px, y: py, id: Date.now() }
      setRipples((prev) => [...prev.slice(-3), newRipple])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
      }, 700)
    }

    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 240)

    if (customOnClick) {
      e.preventDefault()
      customOnClick(e)
      return
    }
    if (!href.startsWith('#')) return
    const target = document.querySelector(href)
    const navbarHeight = 70
    const rawTop = target ? target.getBoundingClientRect().top + window.scrollY : 0
    const top = rawTop - navbarHeight
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    if (target) {
      target.classList.remove('section-arrival')
      window.requestAnimationFrame(() => target.classList.add('section-arrival'))
      window.setTimeout(() => target.classList.remove('section-arrival'), 850)
    }
  }

  const base =
    'group relative inline-flex items-center gap-3 px-9 py-5 font-mono text-xs uppercase tracking-[0.2em] transition-[background-color,color,box-shadow,border-color] duration-300 ease-out will-change-transform overflow-hidden select-none cursor-pointer'
  const styles =
    variant === 'solid'
      ? 'bg-electric text-electric-foreground hover:bg-foreground hover:shadow-[0_0_35px_rgba(43,74,255,0.45)]'
      : variant === 'ghost-dark'
        ? 'border border-ink-foreground/60 text-ink-foreground hover:bg-ink-foreground hover:text-ink hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]'
        : 'border border-foreground text-foreground hover:bg-foreground hover:text-background hover:shadow-[0_0_25px_rgba(0,0,0,0.18)]'

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={onMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ x, y }}
      data-cursor={cursor}
      className={`${base} ${styles} ${className} ${isPressed ? 'scale-[0.94] shadow-[0_0_45px_rgba(43,74,255,0.7)]' : ''}`}
    >
      {/* Laser Light Sweep Flare on Hover */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-full" />

      {/* Cyber Shockwave Ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-white/45 will-change-transform animate-[cyber-ripple_700ms_cubic-bezier(0.16,1,0.3,1)_forwards]"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 180,
            height: 180,
            marginLeft: -90,
            marginTop: -90,
          }}
        />
      ))}

      {/* Leading Geometry Indicator with hover rotation */}
      <span className="relative z-10 h-1.5 w-1.5 shrink-0 bg-current transition-transform duration-300 ease-out group-hover:rotate-45 group-hover:scale-125" />

      {/* Button Text Label */}
      <span className="relative z-10 flex items-center gap-2 font-semibold tracking-[0.2em]">
        {children}
      </span>
    </motion.a>
  )
}
