'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Mic, Eye, Zap } from 'lucide-react'

const LIVE_ACTIONS = [
  { text: 'Голосовая биометрия подтверждена', icon: Mic, tag: 'Voice.ID' },
  { text: 'Анализ контекста экрана и окон', icon: Eye, tag: 'UMBRA' },
  { text: 'Выполнение задачи в реальном времени', icon: Zap, tag: 'LUMEN' },
]

export function BootTerminal() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % LIVE_ACTIONS.length)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-black/8 bg-white/90 p-5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:shadow-2xl">
      {/* Top status bar */}
      <div className="flex items-center justify-between border-b border-black/6 pb-3.5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
          </span>
          <span className="text-xs font-semibold tracking-wide text-foreground">
            AURA LIVE ENGINE
          </span>
        </div>
        <span className="rounded-full bg-electric/10 px-2.5 py-0.5 text-[10px] font-medium text-electric">
          24kHz Realtime
        </span>
      </div>

      {/* Voice Wave Visualizer */}
      <div className="my-4 flex h-8 items-center justify-center gap-1.5 py-1">
        {[0.4, 0.7, 1.1, 0.6, 1.3, 0.8, 1.2, 0.5, 1.0, 0.7, 1.4, 0.6, 0.9, 0.4].map((scale, i) => (
          <motion.span
            key={i}
            animate={{
              scaleY: [0.3, scale, 0.3],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: i * 0.07,
              ease: 'easeInOut',
            }}
            className="h-6 w-1 origin-center rounded-full bg-electric/80"
          />
        ))}
      </div>

      {/* Active transcription prompt */}
      <div className="rounded-xl border border-black/5 bg-slate-50/80 p-3">
        <div className="flex items-center justify-between text-[10px] font-medium text-muted-foreground">
          <span>ВХОДЯЩИЙ ГОЛОС</span>
          <span className="text-electric font-mono">0.12s latency</span>
        </div>
        <p className="mt-1 text-xs font-medium text-foreground">
          «Аура, открой рабочие файлы и подготовь проект к запуску»
        </p>
      </div>

      {/* Action steps */}
      <div className="mt-3.5 space-y-1.5">
        {LIVE_ACTIONS.map((action, i) => {
          const Icon = action.icon
          const isActive = activeStep === i
          return (
            <div
              key={action.text}
              className={`flex items-center justify-between rounded-lg border px-3 py-2 text-xs font-medium transition-colors duration-300 ${
                isActive
                  ? 'border-electric/25 bg-electric/8 text-electric'
                  : 'border-transparent text-muted-foreground'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`h-3.5 w-3.5 transition-colors ${isActive ? 'text-electric' : 'text-muted-foreground/60'}`} />
                <span>{action.text}</span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-wider opacity-70">
                {action.tag}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
