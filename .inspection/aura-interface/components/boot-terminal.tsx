'use client'

import { useEffect, useState } from 'react'

const LINES = [
  '> booting aura.core v2.4.1',
  '> audio.input ......... online',
  '> voice.id ............ verified',
  '> umbra.core .......... connected',
  '> lumen.core .......... connected',
  '> screen.vision ....... online',
  '> os.control .......... granted',
  '> agent ready. awaiting intent_',
]

export function BootTerminal() {
  const [shown, setShown] = useState<string[]>([])
  const [typing, setTyping] = useState('')

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setShown(LINES)
      return
    }
    let line = 0
    let char = 0
    let timeout: ReturnType<typeof setTimeout>

    const step = () => {
      if (line >= LINES.length) return
      const current = LINES[line]
      if (char <= current.length) {
        setTyping(current.slice(0, char))
        char++
        timeout = setTimeout(step, 22)
      } else {
        setShown((s) => [...s, current])
        setTyping('')
        line++
        char = 0
        timeout = setTimeout(step, 260)
      }
    }
    timeout = setTimeout(step, 500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="scanlines relative w-full max-w-sm overflow-hidden border border-line bg-card/60 p-4 font-mono text-[11px] leading-relaxed text-muted-foreground backdrop-blur-sm">
      <div className="mb-2 flex items-center justify-between border-b border-line pb-2 text-[9px] uppercase tracking-[0.2em]">
        <span>aura@localhost</span>
        <span className="text-electric">● live</span>
      </div>
      <div className="min-h-[150px] space-y-0.5">
        {shown.map((l, i) => (
          <div key={i} className={l.includes('ready') ? 'text-electric' : undefined}>
            {l}
          </div>
        ))}
        {typing && (
          <div>
            {typing}
            <span className="animate-blink">▋</span>
          </div>
        )}
      </div>
    </div>
  )
}
