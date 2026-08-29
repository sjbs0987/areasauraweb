'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return
    setEnabled(true)
    document.documentElement.classList.add('cursor-none-desktop')

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: target.x, y: target.y }
    let raf = 0

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.x}px, ${target.y}px) translate(-50%, -50%)`
      }
      const el = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null
      if (el) {
        setHovering(true)
        setLabel(el.dataset.cursor || null)
      } else {
        setHovering(false)
        setLabel(null)
      }
    }

    const loop = () => {
      ring.x += (target.x - ring.x) * 0.18
      ring.y += (target.y - ring.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    window.addEventListener('mousemove', onMove)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.documentElement.classList.remove('cursor-none-desktop')
    }
  }, [])

  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden md:block">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-electric mix-blend-difference"
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex items-center justify-center border border-electric bg-electric/5 backdrop-invert-0 transition-[width,height,border-radius] duration-200 ease-out"
        style={{
          width: label ? 88 : hovering ? 56 : 34,
          height: label ? 88 : hovering ? 56 : 34,
        }}
      >
        {label && (
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-electric">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
