'use client'

import { useRef } from 'react'

type Props = {
  text: string
  className?: string
  outlineIndices?: number[]
}

/** Letters lift and lean toward the pointer — type as an interactive object. */
export function KineticWord({ text, className = '', outlineIndices = [] }: Props) {
  const ref = useRef<HTMLSpanElement>(null)

  const onMove = (e: React.MouseEvent) => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const letters = ref.current?.querySelectorAll<HTMLElement>('[data-letter]')
    if (!letters) return
    letters.forEach((el) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const dist = (e.clientX - cx) / window.innerWidth
      const pull = Math.max(-1, Math.min(1, dist * 2.4))
      el.style.transform = `translateY(${-Math.abs(pull) * 14}px) skewX(${pull * -10}deg)`
    })
  }

  const reset = () => {
    const letters = ref.current?.querySelectorAll<HTMLElement>('[data-letter]')
    letters?.forEach((el) => (el.style.transform = 'translateY(0) skewX(0deg)'))
  }

  return (
    <span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`inline-flex ${className}`}
      aria-label={text}
    >
      {text.split('').map((ch, i) => (
        <span
          key={i}
          data-letter
          aria-hidden
          className={`inline-block transition-transform duration-300 ease-out will-change-transform ${
            outlineIndices.includes(i) ? 'text-outline-electric' : ''
          }`}
        >
          {ch}
        </span>
      ))}
    </span>
  )
}
