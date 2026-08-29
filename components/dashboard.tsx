'use client'

import { useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { useAuth, type Plan } from '@/lib/auth-context'
import { Reveal } from '@/components/reveal'

const PLAN_LABEL: Record<Plan, string> = {
  FREE: 'FREE',
  PULSE: 'AURA PULSE',
  OVERDRIVE: 'AURA OVERDRIVE',
}

const PLAN_BADGE: Record<Plan, string> = {
  FREE: 'rounded-full bg-slate-100 text-muted-foreground px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider',
  PULSE: 'rounded-full bg-electric/10 text-electric px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider',
  OVERDRIVE: 'rounded-full bg-electric text-white px-3 py-1 font-mono text-[9px] font-semibold uppercase tracking-wider shadow-sm',
}

// System capabilities unlocked per plan
const SYSTEM_STATUS = (plan: Plan) => [
  { key: 'agent.core', status: 'online', active: true },
  { key: 'voice.id', status: plan === 'FREE' ? 'locked' : 'active', active: plan !== 'FREE' },
  { key: 'umbra.core', status: plan === 'FREE' ? 'locked' : 'connected', active: plan !== 'FREE' },
  { key: 'screen.vision', status: plan === 'FREE' ? 'locked' : 'online', active: plan !== 'FREE' },
  { key: 'lumen.core', status: plan === 'OVERDRIVE' ? 'connected' : 'locked', active: plan === 'OVERDRIVE' },
  { key: 'os.control', status: plan === 'OVERDRIVE' ? 'granted' : 'locked', active: plan === 'OVERDRIVE' },
]

export function Dashboard() {
  const { user, handleLogout, handleSubscribe } = useAuth()
  const reduce = useReducedMotion()

  const [mouseLeft, setMouseLeft] = useState({ x: 0, y: 0, active: false })
  const [mouseRight, setMouseRight] = useState({ x: 0, y: 0, active: false })

  if (!user) return null

  const expiresText = user.expiresAt
    ? new Date(user.expiresAt).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  return (
    <section id="dashboard" className="relative bg-transparent py-24 md:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-electric/5 blur-[120px]"
      />

      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Section label */}
        <Reveal variant="fade-up">
          <div className="mb-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="text-electric">04</span>
            <span className="h-px flex-1 bg-foreground/10" />
            <span>кабинет оператора</span>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Profile card */}
          <Reveal delay={0.04} variant="fade-up">
            <div
              onMouseMove={(e) => {
                if (reduce) return
                const rect = e.currentTarget.getBoundingClientRect()
                setMouseLeft({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true })
              }}
              onMouseLeave={() => setMouseLeft((p) => ({ ...p, active: false }))}
              className="group relative flex flex-col rounded-3xl border border-black/10 bg-white/90 p-8 shadow-md backdrop-blur-xl transition-all duration-300 hover:border-black/20 hover:shadow-xl overflow-hidden"
            >
              {/* Dynamic spotlight */}
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: mouseLeft.active
                    ? `radial-gradient(400px circle at ${mouseLeft.x}px ${mouseLeft.y}px, rgba(43, 74, 255, 0.08), transparent 70%)`
                    : undefined,
                }}
              />

              <div className="relative z-10 mb-6 flex items-start justify-between border-b border-black/6 pb-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-electric font-semibold">
                  operator.profile
                </p>
                <span className={PLAN_BADGE[user.plan]}>
                  {PLAN_LABEL[user.plan]}
                </span>
              </div>

              <dl className="relative z-10 flex-1 space-y-5">
                <div>
                  <dt className="mb-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                    email оператора
                  </dt>
                  <dd className="font-mono text-sm font-semibold text-foreground">{user.email}</dd>
                </div>
                <div>
                  <dt className="mb-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                    статус доступа
                  </dt>
                  <dd className="font-mono text-sm font-semibold text-electric flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-electric animate-pulse" />
                    <span>АКТИВЕН · ПОЛНЫЙ ДОСТУП</span>
                  </dd>
                </div>
              </dl>

              {/* Actions */}
              <div className="relative z-10 mt-8 flex flex-wrap gap-3">
                <button
                  onClick={handleLogout}
                  className="rounded-xl border border-black/10 px-6 py-3.5 text-xs font-semibold text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-slate-100 active:scale-95"
                >
                  Выйти из системы
                </button>
              </div>
            </div>
          </Reveal>

          {/* System status */}
          <Reveal delay={0.08} variant="fade-up">
            <div
              onMouseMove={(e) => {
                if (reduce) return
                const rect = e.currentTarget.getBoundingClientRect()
                setMouseRight({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true })
              }}
              onMouseLeave={() => setMouseRight((p) => ({ ...p, active: false }))}
              className="group relative rounded-3xl border border-black/10 bg-white/90 p-8 shadow-md backdrop-blur-xl transition-all duration-300 hover:border-black/20 hover:shadow-xl overflow-hidden"
            >
              {/* Dynamic spotlight */}
              <div
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: mouseRight.active
                    ? `radial-gradient(400px circle at ${mouseRight.x}px ${mouseRight.y}px, rgba(43, 74, 255, 0.08), transparent 70%)`
                    : undefined,
                }}
              />

              <p className="relative z-10 mb-6 border-b border-black/6 pb-5 font-mono text-[9px] uppercase tracking-[0.35em] text-electric font-semibold">
                system.status
              </p>
              <div className="relative z-10 space-y-0">
                {[
                  { key: 'agent.core', status: 'online' },
                  { key: 'voice.id', status: 'active' },
                  { key: 'umbra.vision', status: 'connected' },
                  { key: 'screen.vision', status: 'online' },
                  { key: 'lumen.realtime', status: 'connected' },
                  { key: 'os.control', status: 'granted' },
                ].map(({ key, status }) => (
                  <div
                    key={key}
                    className="flex items-center justify-between border-b border-foreground/5 py-3 transition-colors hover:bg-foreground/[0.02]"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                      {'> '}
                      {key}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] flex items-center gap-1.5 text-electric font-semibold">
                      <span className="h-1 w-1 rounded-full bg-electric animate-pulse" />
                      <span>{status}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
