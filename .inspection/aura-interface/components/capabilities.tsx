'use client'

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

function Card({ cap, delay }: { cap: Cap; delay: number }) {
  return (
    <Reveal delay={delay} className={cap.className}>
      <div
        data-cursor={cap.title.toLowerCase()}
        className="group relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden border border-white/12 bg-white/[0.02] p-6 transition-colors duration-300 hover:border-electric hover:bg-electric/[0.06]"
      >
        <div className="flex items-start justify-between">
          <span className="text-electric transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-6deg]">
            {cap.icon}
          </span>
          <span className="font-mono text-[10px] tracking-[0.25em] text-white/40">
            {cap.index}
          </span>
        </div>

        <div>
          <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.35em] text-electric">
            {cap.ru}
          </p>
          <h3 className="font-sans text-3xl font-bold uppercase tracking-tight text-white md:text-4xl">
            {cap.title}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
            {cap.desc}
          </p>

          {cap.chips && (
            <div className="mt-5 flex flex-wrap gap-2">
              {cap.chips.map((c) => (
                <span
                  key={c}
                  className="border border-white/20 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-white/70"
                >
                  {c}
                </span>
              ))}
            </div>
          )}

          <div className="mt-5 border-t border-white/10 pt-3 font-mono text-[10px] tracking-[0.15em] text-white/35">
            {cap.tag}
          </div>
        </div>
      </div>
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

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
          <span className="text-electric">02</span>
          <span className="h-px flex-1 bg-white/15" />
          <span>возможности</span>
        </div>

        <h2 className="mb-14 max-w-4xl text-balance font-sans text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white md:text-6xl">
          Пять чувств
          <span className="text-outline-light"> одной</span> машины
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {CAPS.map((cap, i) => (
            <Card key={cap.id} cap={cap} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  )
}
