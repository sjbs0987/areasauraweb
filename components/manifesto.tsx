'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue, useReducedMotion } from 'motion/react'
import { Reveal } from './reveal'

const TEXT =
  'Программы ждут команд. AURA понимает намерение. Вы говорите — она смотрит на экран, читает контекст, открывает файлы и делает работу за вас. Не ассистент. Оператор вашей машины.'

const WORDS = TEXT.split(' ')

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const reduce = useReducedMotion()
  const opacity = useTransform(progress, range, [0.12, 1])
  const y = useTransform(progress, range, [6, 0])
  const blurVal = useTransform(progress, range, [3, 0])
  const filter = useTransform(blurVal, (v) => `blur(${v}px)`)

  const highlight = children.includes('намерение') || children.includes('Оператор')

  if (reduce) {
    return (
      <span className={`mr-[0.28em] inline-block ${highlight ? 'text-electric' : 'text-foreground'}`}>
        {children}
      </span>
    )
  }

  return (
    <motion.span
      style={{ opacity, y, filter }}
      className={`mr-[0.28em] inline-block transition-colors duration-200 ${
        highlight ? 'text-electric font-bold' : 'text-foreground'
      }`}
    >
      {children}
    </motion.span>
  )
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.88', 'start 0.22'],
  })

  return (
    <section id="manifest" className="relative min-h-[calc(100vh-5rem)] flex items-center bg-transparent py-20 overflow-hidden">
      {/* Ambient soft glow background */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-electric/5 blur-[100px]"
      />

      <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10 flex flex-col justify-center">
        <Reveal variant="fade-up">
          <div className="mb-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="text-electric">01</span>
            <span className="h-px flex-1 bg-line" />
            <span>манифест</span>
          </div>
        </Reveal>

        <div ref={ref} className="py-2">
          <p className="max-w-5xl text-pretty text-3xl font-semibold leading-[1.22] tracking-tight md:text-5xl lg:text-6xl">
            {WORDS.map((w, i) => {
              const start = i / WORDS.length
              const end = Math.min(1, start + 1.2 / WORDS.length)
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {w}
                </Word>
              )
            })}
          </p>
        </div>
      </div>
    </section>
  )
}
