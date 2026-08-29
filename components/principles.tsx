'use client'

import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { Reveal } from './reveal'

const PRINCIPLES = [
  {
    n: 'I',
    title: 'Намерение важнее команды',
    body: 'Вы объясняете цель — не синтаксис. Остальное агент выстраивает сам.',
    tag: 'intent-first',
  },
  {
    n: 'II',
    title: 'Только ваш голос',
    body: 'Голосовая биометрия узнаёт хозяина. Чужой команде агент не подчинится.',
    tag: 'voice.id',
  },
  {
    n: 'III',
    title: 'Один агент — весь компьютер',
    body: 'Никаких плагинов на каждое приложение. Она видит Windows целиком и работает в нём.',
    tag: 'full-access',
  },
  {
    n: 'IV',
    title: 'Гибридный разум',
    body: 'UMBRA работает в облаке, LUMEN — в реальном времени. Когда сети нет — локальный fallback. Агент не замолкает.',
    tag: 'umbra + lumen',
  },
  {
    n: 'V',
    title: 'Действие, а не совет',
    body: 'AURA не пишет инструкцию, как что-то сделать. Она делает это — а каждый шаг остаётся под вашим контролем.',
    tag: 'execute',
  },
]

function PrincipleRow({ p, i }: { p: typeof PRINCIPLES[0]; i: number }) {
  const rowRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [spotlight, setSpotlight] = useState({ x: 0, active: false })

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = rowRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    setSpotlight({ x, active: true })
  }

  return (
    <Reveal key={p.n} delay={i * 0.05} variant="fade-up">
      <article
        ref={rowRef}
        onMouseMove={onMouseMove}
        onMouseLeave={() => setSpotlight((prev) => ({ ...prev, active: false }))}
        data-cursor={`0${i + 1}`}
        className="group relative grid grid-cols-12 items-center gap-4 overflow-hidden border-b border-foreground/15 py-8 transition-colors duration-400 hover:bg-foreground hover:text-background md:py-10"
      >
        {/* Left vertical electric accent bar on hover */}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-1 bg-electric opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Dynamic mouse cursor light trail across row */}
        {spotlight.active && (
          <div
            className="pointer-events-none absolute inset-y-0 w-48 -translate-x-1/2 bg-gradient-to-r from-transparent via-electric/15 to-transparent transition-opacity duration-200"
            style={{ left: spotlight.x }}
          />
        )}

        <div className="col-span-2 flex items-center gap-2 pl-4 font-mono text-sm tracking-[0.2em] text-electric transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:text-electric md:col-span-1 md:pl-6">
          <span>{p.n}</span>
        </div>

        <h3 className="col-span-10 flex items-center gap-3 text-2xl font-bold uppercase leading-tight tracking-tight transition-transform duration-300 ease-out group-hover:translate-x-3 md:col-span-6 md:text-4xl">
          <span>{p.title}</span>
          <span className="inline-block text-electric opacity-0 transition-all duration-300 ease-out -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 text-2xl">
            →
          </span>
        </h3>

        <p className="col-span-12 mt-2 max-w-md text-sm leading-relaxed text-muted-foreground transition-colors duration-300 group-hover:text-background/80 md:col-span-4 md:mt-0 md:text-base">
          {p.body}
        </p>

        <div className="col-span-12 mt-2 flex items-center justify-between pr-4 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-300 group-hover:text-background/70 md:col-span-1 md:mt-0 md:pr-6">
          <span>{p.tag}</span>
        </div>
      </article>
    </Reveal>
  )
}

export function Principles() {
  return (
    <section id="principles" className="relative bg-transparent py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal variant="fade-up">
          <div className="mb-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="text-electric">03</span>
            <span className="h-px flex-1 bg-line" />
            <span>принципы</span>
          </div>
        </Reveal>

        <div className="border-t border-foreground/15">
          {PRINCIPLES.map((p, i) => (
            <PrincipleRow key={p.n} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
