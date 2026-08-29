'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const squareRef = useRef<HTMLDivElement>(null)
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
    let lastTime = performance.now()
    let angle = 0
    let angularVelocity = 0
    let targetVelocity = 0
    let nextVelocityChange = 0

    const pickTargetVelocity = (now: number) => {
      targetVelocity = (Math.random() - 0.5) * 2 * 110
      nextVelocityChange = now + 900 + Math.random() * 2200
    }

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY

      const el = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null
      setHovering(!!el)
      setLabel(el ? el.dataset.cursor || null : null)
    }

    window.addEventListener('mousemove', onMove)

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now
      if (now >= nextVelocityChange) pickTargetVelocity(now)
      angularVelocity += (targetVelocity - angularVelocity) * Math.min(dt * 1.6, 1)
      angle += angularVelocity * dt

      // Organic spring physics: square chases the center pupil
      ring.x += (target.x - ring.x) * 0.22
      ring.y += (target.y - ring.y) * 0.22

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`
      }
      if (squareRef.current) {
        squareRef.current.style.transform = `rotate(${angle}deg)`
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.documentElement.classList.remove('cursor-none-desktop')
    }
  }, [])

  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* 1. Leading Center Circle Pupil */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-electric will-change-transform shadow-[0_0_8px_rgba(43,74,255,0.9)]"
      />

      {/* 2. Floating Geometric Square Follower */}
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex items-center justify-center will-change-transform"
        style={{
          width: label ? 80 : hovering ? 48 : 28,
          height: label ? 80 : hovering ? 48 : 28,
          transition: 'width 200ms ease-out, height 200ms ease-out',
        }}
      >
        <div
          ref={squareRef}
          className="pointer-events-none absolute inset-0 border border-electric/90 bg-electric/[0.07] backdrop-blur-[1px] will-change-transform"
        />

        {label && (
          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-electric">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
