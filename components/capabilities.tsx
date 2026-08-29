'use client'

import { useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { Ear, AudioLines, ScanEye, FolderTree, Zap } from 'lucide-react'
import { Reveal } from './reveal'
import type { ReactNode } from 'react'

type Cap = {
  id: string
  index: string
  title: string
  ru: string
  desc: string
  tag: string
  icon: ReactNode
  className: string
  chips?: string[]
}

const CAPS: Cap[] = [
  {
    id: 'listen',
    index: '/01',
    title: 'LISTEN',
    ru: 'Слышит',
    desc: 'Живой микрофонный поток с детекцией голоса. Распознаёт речь на лету и узнаёт хозяина по голосовой биометрии — чужому она не подчиняется.',
    tag: 'audio.input · voice.id',
    icon: <Ear className="h-7 w-7" strokeWidth={1.25} />,
    className: 'lg:col-span-3 lg:row-span-2',
  },
  {
    id: 'speak',
    index: '/02',
    title: 'SPEAK',
    ru: 'Говорит',
    desc: 'Естественный синтез речи на русском и английском. Отвечает голосом, а не текстом на экране.',
    tag: 'speech.synth · ru/en',
    icon: <AudioLines className="h-7 w-7" strokeWidth={1.25} />,
    className: 'lg:col-span-3',
  },
  {
    id: 'see',
    index: '/03',
    title: 'SEE SCREEN',
    ru: 'Видит экран',
    desc: 'Делает скриншот и понимает его через мультимодальное зрение UMBRA. Читает интерфейсы, окна и находит нужное сама.',
    tag: 'screen.capture · vision',
    icon: <ScanEye className="h-7 w-7" strokeWidth={1.25} />,
    className: 'lg:col-span-3',
  },
  {
    id: 'files',
    index: '/04',
    title: 'FILES & OS',
    ru: 'Файлы и Windows',
    desc: 'Громкость, яркость, буфер обмена, процессы и активные окна. Полный доступ к файлам и системе — она знает вашу машину как свою.',
    tag: 'fs.access · os.control',
    icon: <FolderTree className="h-7 w-7" strokeWidth={1.25} />,
    className: 'lg:col-span-2',
  },
  {
    id: 'act',
    index: '/05',
    title: 'ACT',
    ru: 'Действует',
    desc: 'Не советует — делает. Запускает и закрывает приложения, эмулирует клавиатуру и мышь, создаёт, изменяет и удаляет файлы, доводит задачу до конца.',
    tag: 'exec // write-access',
    icon: <Zap className="h-7 w-7" strokeWidth={1.25} />,
    className: 'lg:col-span-4',
    chips: ['CREATE', 'MODIFY', 'DELETE', 'RUN'],
  },
]

function TiltCard({ cap }: { cap: Cap }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false })
  const [transformStyle, setTransformStyle] = useState('')

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -5.5
    const rotateY = ((x - centerX) / centerX) * 5.5

    setMousePos({ x, y, active: true })
    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`)
  }

  const onMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, active: false }))
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)')
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-cursor={cap.title.toLowerCase()}
      style={{
        transform: transformStyle,
        transition: 'transform 240ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease',
      }}
      className="group relative flex h-full min-h-[240px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-7 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-electric/60 hover:bg-white/[0.07] hover:shadow-2xl"
    >
      {/* Dynamic Cursor Spotlight Radial Glow */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: mousePos.active
            ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(43, 74, 255, 0.18), transparent 75%)`
            : undefined,
        }}
      />

      <div className="relative z-10 flex items-start justify-between">
        <span className="text-electric transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:scale-110">
          {cap.icon}
        </span>
        <span className="font-mono text-xs font-medium tracking-wider text-white/40 transition-colors duration-300 group-hover:text-electric">
          {cap.index}
        </span>
      </div>

      <div className="relative z-10 mt-6">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-electric">
          {cap.ru}
        </p>
        <h3 className="font-sans text-2xl font-bold uppercase tracking-tight text-white transition-transform duration-300 ease-out group-hover:translate-x-0.5 md:text-3xl">
          {cap.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/70 transition-colors duration-300 group-hover:text-white/90">
          {cap.desc}
        </p>

        {cap.chips && (
          <div className="mt-5 flex flex-wrap gap-2">
            {cap.chips.map((c, idx) => (
              <span
                key={c}
                style={{ transitionDelay: `${idx * 40}ms` }}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[10px] tracking-wider text-white/80 transition-all duration-300 group-hover:border-electric group-hover:bg-electric/20 group-hover:text-white"
              >
                {c}
              </span>
            ))}
          </div>
        )}

        <div className="mt-5 border-t border-white/10 pt-3 font-mono text-[10px] tracking-wider text-white/40 transition-colors duration-300 group-hover:text-white/60">
          {cap.tag}
        </div>
      </div>
    </div>
  )
}

function Card({ cap, delay }: { cap: Cap; delay: number }) {
  return (
    <Reveal delay={delay} className={cap.className} variant="fade-up">
      <TiltCard cap={cap} />
    </Reveal>
  )
}

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative overflow-hidden bg-ink py-24 text-ink-foreground md:py-32"
    >
      <div className="grid-lines-dense pointer-events-none absolute inset-0 opacity-70" />

      {/* Ambient background glow orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-electric/15 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-electric/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal variant="fade-up">
          <div className="mb-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
            <span className="text-electric">02</span>
            <span className="h-px flex-1 bg-white/15" />
            <span>возможности</span>
          </div>
        </Reveal>

        <Reveal variant="fade-up" delay={0.05}>
          <h2 className="mb-14 max-w-4xl text-balance font-sans text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white md:text-6xl">
            Пять чувств
            <span className="text-outline-light"> одной</span> машины
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {CAPS.map((cap, i) => (
            <Card key={cap.id} cap={cap} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}
