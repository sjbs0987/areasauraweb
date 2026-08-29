'use client'

import { useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { useAuth } from '@/lib/auth-context'
import { Reveal } from '@/components/reveal'

const PLANS = [
  {
    slug: 'pulse' as const,
    name: 'AURA PULSE',
    price: '590',
    tag: 'standard',
    dark: false,
    features: [
      'Голосовое управление ПК',
      'Voice.ID — распознавание владельца',
      'UMBRA — облачный разум',
      'Управление файлами и приложениями',
      'Зрение экрана (базовое)',
      'До 100 голосовых команд в день',
    ],
    locked: [
      'LUMEN — реалтайм локальный ИИ',
      'Полный контроль Windows (os.control)',
      'Приоритетная обработка',
      'Работа без интернета',
    ],
  },
  {
    slug: 'overdrive' as const,
    name: 'AURA OVERDRIVE',
    price: '1 290',
    tag: 'maximum',
    dark: true,
    features: [
      'Всё из PULSE без ограничений',
      'LUMEN — реалтайм ИИ без задержек',
      'Полный контроль Windows (os.control)',
      'Зрение экрана (расширенное)',
      'Offline fallback — работа без сети',
      'Приоритетная обработка запросов',
      'Приоритетный доступ к обновлениям',
      'Без лимита по командам',
    ],
    locked: [],
  },
] as const

function PricingCard({
  plan,
  isCurrent,
  onSelect,
  user,
}: {
  plan: typeof PLANS[number]
  isCurrent: boolean
  onSelect: (slug: 'pulse' | 'overdrive') => void
  user: any
}) {
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
    const rotateX = ((y - centerY) / centerY) * -4
    const rotateY = ((x - centerX) / centerX) * 4

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
      style={{
        transform: transformStyle,
        transition: 'transform 260ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 300ms ease',
      }}
      className={`group relative flex h-full flex-1 flex-col overflow-hidden rounded-3xl p-8 transition-all duration-300 ${
        plan.dark
          ? 'border border-electric/40 bg-ink shadow-xl hover:border-electric hover:shadow-2xl hover:shadow-electric/10'
          : 'border border-black/10 bg-white/90 shadow-md backdrop-blur-xl hover:border-black/20 hover:shadow-xl'
      }`}
    >
      {/* Dynamic Cursor Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: mousePos.active
            ? `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, ${
                plan.dark ? 'rgba(43, 74, 255, 0.2)' : 'rgba(43, 74, 255, 0.08)'
              }, transparent 70%)`
            : undefined,
        }}
      />

      {/* Top meta */}
      <div className="relative z-10 mb-5 flex items-center justify-between">
        <span
          className={`rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider ${
            plan.dark ? 'bg-electric/20 text-electric' : 'bg-slate-100 text-muted-foreground'
          }`}
        >
          {plan.tag}
        </span>
        {isCurrent && (
          <span className="rounded-full bg-electric/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-electric">
            Текущий
          </span>
        )}
      </div>

      {/* Name */}
      <h3
        className={`relative z-10 mb-1 font-sans text-2xl font-bold uppercase tracking-tight transition-transform duration-300 group-hover:translate-x-0.5 md:text-3xl ${
          plan.dark ? 'text-white' : 'text-foreground'
        }`}
      >
        {plan.name}
      </h3>

      {/* Price */}
      <div className="relative z-10 mb-8 flex items-baseline gap-2">
        <span className="font-mono text-5xl font-bold text-electric">
          {plan.price}
        </span>
        <span
          className={`font-mono text-xs ${plan.dark ? 'text-white/40' : 'text-muted-foreground'}`}
        >
          ₽&thinsp;/&thinsp;мес
        </span>
      </div>

      {/* Features */}
      <ul className="relative z-10 mb-8 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-3 text-xs transition-transform duration-200"
          >
            <span className="mt-0.5 shrink-0 text-electric font-bold">✓</span>
            <span className={plan.dark ? 'text-white/80' : 'text-foreground/80'}>{f}</span>
          </li>
        ))}
        {plan.locked.map((f) => (
          <li
            key={f}
            className="flex items-start gap-3 text-xs"
          >
            <span className="mt-0.5 shrink-0 text-foreground/20">✕</span>
            <span className="text-muted-foreground/40 line-through">{f}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={() => onSelect(plan.slug)}
        disabled={isCurrent}
        data-cursor={isCurrent ? 'ACTIVE' : 'SELECT'}
        className={`group relative z-10 overflow-hidden rounded-xl px-6 py-4 text-xs font-semibold uppercase tracking-wider transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-40 active:scale-[0.98] ${
          plan.dark
            ? 'bg-electric text-white shadow-lg hover:bg-electric/90 hover:shadow-xl hover:shadow-electric/25'
            : 'bg-foreground text-background shadow-md hover:bg-foreground/90 hover:shadow-lg'
        }`}
      >
        <span className="relative z-10">
          {isCurrent ? 'Активный тариф' : !user ? 'Войти и подключить' : `Подключить ${plan.name}`}
        </span>
      </button>
    </div>
  )
}

export function Pricing() {
  const { user, openAuthModal, handleSubscribe } = useAuth()

  const onSelect = (slug: 'pulse' | 'overdrive') => {
    if (!user) {
      openAuthModal()
      return
    }
    handleSubscribe(slug)
  }

  return (
    <section id="pricing" className="relative bg-transparent py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Section label */}
        <Reveal variant="fade-up">
          <div className="mb-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="text-electric">{user ? '05' : '04'}</span>
            <span className="h-px flex-1 bg-foreground/10" />
            <span>тарифы</span>
          </div>
        </Reveal>

        <Reveal delay={0.04} variant="fade-up">
          <div className="mb-14">
            <h2 className="font-sans text-4xl font-bold uppercase leading-[0.9] tracking-tight md:text-6xl">
              ВЫБЕРИ <span className="text-outline-electric">РЕЖИМ</span>
            </h2>
            <p className="mt-5 max-w-lg font-mono text-sm leading-relaxed text-muted-foreground">
              Оба тарифа включают UMBRA и Voice.ID.&nbsp; OVERDRIVE добавляет LUMEN — реалтайм ИИ
              без задержек.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 items-stretch">
          {PLANS.map((plan, i) => {
            const isCurrent = user?.plan === plan.slug.toUpperCase()
            return (
              <Reveal key={plan.slug} delay={i * 0.08} className="h-full flex flex-col" variant="fade-up">
                <PricingCard
                  plan={plan}
                  isCurrent={isCurrent}
                  onSelect={onSelect}
                  user={user}
                />
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
