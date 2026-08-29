'use client'

import { useEffect, useState } from 'react'

function Corner({ className }: { className: string }) {
  return (
    <div className={`absolute h-4 w-4 border-electric ${className}`} />
  )
}

export function HudFrame() {
  const [clock, setClock] = useState('--:--:--')
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      setClock(
        [d.getHours(), d.getMinutes(), d.getSeconds()]
          .map((n) => String(n).padStart(2, '0'))
          .join(':'),
      )
    }
    tick()
    const id = setInterval(tick, 1000)

    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setScroll(h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      clearInterval(id)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 hidden select-none p-3 sm:block md:p-5"
    >
      {/* corner brackets */}
      <Corner className="left-3 top-3 border-l-2 border-t-2 md:left-5 md:top-5" />
      <Corner className="right-3 top-3 border-r-2 border-t-2 md:right-5 md:top-5" />
      <Corner className="bottom-3 left-3 border-b-2 border-l-2 md:bottom-5 md:left-5" />
      <Corner className="bottom-3 right-3 border-b-2 border-r-2 md:bottom-5 md:right-5" />

      {/* right vertical readout */}
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 [writing-mode:vertical-rl] font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground lg:block">
        LOCAL_TIME {clock} · SCROLL {String(Math.round(scroll)).padStart(3, '0')}%
      </div>

      {/* left tick ladder */}
      <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col gap-2 lg:flex">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="h-px bg-foreground/30"
            style={{ width: i % 3 === 0 ? 18 : 9 }}
          />
        ))}
      </div>

      {/* progress bar bottom */}
      <div className="absolute bottom-6 left-1/2 h-px w-40 -translate-x-1/2 bg-foreground/15">
        <div className="h-full bg-electric" style={{ width: `${scroll}%` }} />
      </div>
    </div>
  )
}
