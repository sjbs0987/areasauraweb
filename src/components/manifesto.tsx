'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react'

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
  const opacity = useTransform(progress, range, [0.15, 1])
  const highlight = children.includes('намерение') || children.includes('Оператор')
  return (
    <motion.span
      style={{ opacity }}
      className={`mr-[0.28em] inline-block ${highlight ? 'text-electric' : 'text-foreground'}`}
    >
      {children}
    </motion.span>
  )
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.25'],
  })

  return (
    <section id="manifest" className="relative bg-background py-28 md:py-40">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="text-electric">01</span>
          <span className="h-px flex-1 bg-line" />
          <span>манифест</span>
        </div>
        <div ref={ref}>
          <p className="max-w-5xl text-pretty text-3xl font-semibold leading-[1.15] tracking-tight md:text-5xl lg:text-6xl">
            {WORDS.map((w, i) => {
              const start = i / WORDS.length
              const end = start + 1 / WORDS.length
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
