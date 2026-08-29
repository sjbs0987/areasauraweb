'use client'

import { useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { useAuth } from '@/lib/auth-context'
import { KineticWord } from './kinetic-word'
import { MagneticButton } from './magnetic-button'
import { BootTerminal } from './boot-terminal'
import { Reveal } from './reveal'

export function Hero() {
  const { openAuthModal } = useAuth()
  const heroRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [orbPos, setOrbPos] = useState({ x: 0, y: 0 })

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = heroRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 50
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 50
    setOrbPos({ x, y })
  }

  return (
    <section
      ref={heroRef}
      onMouseMove={onMouseMove}
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-between overflow-hidden bg-transparent"
    >
      {/* Ambient Interactive Floating Aura Glow */}
      <div
        aria-hidden
        style={{
          transform: `translate3d(${orbPos.x}px, ${orbPos.y}px, 0)`,
          transition: 'transform 800ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="pointer-events-none absolute -left-20 top-20 h-[500px] w-[500px] rounded-full bg-electric/[0.07] blur-[130px]"
      />
      <div
        aria-hidden
        style={{
          transform: `translate3d(${-orbPos.x * 0.7}px, ${-orbPos.y * 0.7}px, 0)`,
          transition: 'transform 800ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="pointer-events-none absolute right-10 top-1/3 h-[400px] w-[400px] rounded-full bg-electric/[0.05] blur-[120px]"
      />

      {/* Top meta row */}
      <Reveal variant="fade-up">
        <div className="relative mx-auto w-full max-w-[1400px] flex items-center justify-between px-5 pt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:px-10 md:pt-6">
          <span className="hidden sm:inline">aura · umbra · lumen</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </Reveal>

      <div className="relative mx-auto w-full max-w-[1400px] grid grid-cols-1 gap-y-8 px-5 py-6 md:px-10 lg:grid-cols-12 lg:gap-x-8">
        {/* Left: wordmark + copy */}
        <div className="lg:col-span-8">
          <Reveal variant="mask" delay={0.05}>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.35em] text-electric">
              augmented user reality agent
            </p>
          </Reveal>

          <h1 className="font-sans font-bold uppercase leading-[0.82] tracking-mega text-foreground">
            <KineticWord
              text="AURA"
              className="text-[20vw] leading-[0.8] sm:text-[18vw] lg:text-[13rem]"
              outlineIndices={[2]}
            />
          </h1>

          <Reveal variant="fade-up" delay={0.2}>
            <div className="mt-6 max-w-xl border-l-2 border-electric pl-5">
              <p className="text-balance text-base font-medium leading-snug text-foreground md:text-xl">
                Она слышит и узнаёт вас по голосу. Говорит в ответ. Видит ваш
                экран, читает файлы и управляет Windows. И&nbsp;— действует.
              </p>
              <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                <span>CREATE · EDIT · DELETE · </span>
                <span className="text-electric font-semibold">AUDIT</span>
              </p>
            </div>
          </Reveal>

          <Reveal variant="fade-up" delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <MagneticButton onClick={openAuthModal} cursor="join" variant="solid">
                получить доступ
              </MagneticButton>
              <MagneticButton href="#manifest" cursor="read" variant="ghost">
                манифест ↓
              </MagneticButton>
            </div>
          </Reveal>
        </div>

        {/* Right: terminal + model identifiers */}
        <div className="flex flex-col gap-5 lg:col-span-4 lg:items-end lg:justify-center">
          <Reveal variant="fade-up" delay={0.25} className="w-full max-w-sm">
            <BootTerminal />
          </Reveal>

          <Reveal variant="fade-up" delay={0.35} className="w-full max-w-sm">
            <div className="grid w-full grid-cols-2 gap-2.5">
              {[
                { type: 'ТЕКСТ · ЗАПРОСЫ', model: 'UMBRA', desc: 'Cloud Multi-Modal' },
                { type: 'ГОЛОС · РЕАЛТАЙМ', model: 'LUMEN', desc: 'Zero-Latency Live' },
              ].map((item) => (
                <div
                  key={item.model}
                  className="group rounded-xl border border-black/8 bg-white/80 p-3.5 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-electric/40 hover:shadow-md"
                >
                  <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground">
                    {item.type}
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-base font-bold text-electric">
                    <span className="h-1.5 w-1.5 rounded-full bg-electric animate-pulse" />
                    <span>{item.model}</span>
                  </div>
                  <div className="mt-0.5 text-[10px] text-muted-foreground/80">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll cue */}
      <Reveal variant="fade-up" delay={0.4}>
        <div className="relative pb-4 flex justify-center font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="inline-block animate-pulse transition-transform duration-300 hover:translate-y-1">scroll ↓</span>
        </div>
      </Reveal>
    </section>
  )
}
