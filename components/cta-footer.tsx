'use client'

import { useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { useAuth } from '@/lib/auth-context'
import { KineticWord } from './kinetic-word'
import { MagneticButton } from './magnetic-button'
import { Marquee } from './marquee'
import { Reveal } from './reveal'

export function CtaFooter() {
  const { openAuthModal } = useAuth()
  const footerRef = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 })

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const el = footerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 60
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 60
    setGlowPos({ x, y })
  }

  return (
    <footer
      ref={footerRef}
      onMouseMove={onMouseMove}
      id="access"
      className="relative overflow-hidden bg-ink text-ink-foreground"
    >
      <Marquee
        items={['ГОТОВА СЛУШАТЬ', 'ГОТОВА ГОВОРИТЬ', 'ГОТОВА ДЕЙСТВОВАТЬ', 'AURA']}
        variant="electric"
        duration={24}
      />

      <div className="grid-lines-dense pointer-events-none absolute inset-0 opacity-50" />

      {/* Ambient floating glow orb */}
      <div
        aria-hidden
        style={{
          transform: `translate3d(${glowPos.x}px, ${glowPos.y}px, 0)`,
          transition: 'transform 800ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="pointer-events-none absolute -right-20 top-1/3 h-[500px] w-[500px] rounded-full bg-electric/15 blur-[140px]"
      />

      <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <Reveal variant="fade-up">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-electric">
            подключение
          </p>
        </Reveal>

        <h2 className="font-sans font-bold uppercase leading-[0.85] tracking-mega text-white">
          <KineticWord
            text="GIVE"
            className="block text-[16vw] leading-[0.82] lg:text-[11rem]"
          />
          <span className="block text-[16vw] leading-[0.82] lg:text-[11rem]">
            IT <span className="text-outline-light hover:text-white transition-colors duration-300">ACCESS</span>
          </span>
        </h2>

        <Reveal variant="fade-up" delay={0.1}>
          <p className="mt-8 max-w-lg text-balance text-lg text-white/60">
            Передайте своему компьютеру голос, зрение и волю. Подключите AURA прямо сейчас и начните работу.
          </p>
        </Reveal>

        <Reveal variant="fade-up" delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-4">
            <MagneticButton
              onClick={openAuthModal}
              cursor="join"
              variant="solid"
            >
              получить доступ
            </MagneticButton>
            <MagneticButton href="#manifest" cursor="top" variant="ghost-dark">
              перечитать манифест
            </MagneticButton>
          </div>
        </Reveal>

        {/* Footer meta */}
        <Reveal variant="fade-up" delay={0.3}>
          <div className="mt-24 grid grid-cols-2 gap-8 border-t border-white/15 pt-10 font-mono text-[11px] uppercase tracking-[0.15em] text-white/50 md:grid-cols-3">
            <div>
              <p className="mb-2 text-white/30">runtime</p>
              <p className="text-white/80">UMBRA · LUMEN</p>
            </div>
            <div>
              <p className="mb-3 text-white/30">contact</p>
              <div className="flex flex-col gap-2">
                <a
                  href="https://t.me/areas_offtg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-all duration-200 hover:text-electric hover:translate-x-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  <span>telegram</span>
                </a>
                <a
                  href="https://discord.gg/PTvxEchF8y"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-all duration-200 hover:text-electric hover:translate-x-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.031.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  <span>discord</span>
                </a>
                <a
                  href="https://www.youtube.com/channel/UCeF_srRsDUynMlxtNTVB4mQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-all duration-200 hover:text-electric hover:translate-x-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>youtube</span>
                </a>
                <div
                  className="flex items-center gap-2 cursor-text transition-colors duration-200 hover:text-electric"
                  data-cursor="EMAIL"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                  <span className="select-all">support@areasteam.xyz</span>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-2 text-white/30">status</p>
              <p className="flex items-center gap-1.5 text-electric font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-electric animate-ping" />
                <span>operational</span>
              </p>
              <div className="mt-2 flex items-center gap-2 text-white/40">
                <div className="relative flex h-3.5 w-3.5 items-center justify-center">
                  <div className="absolute inset-0 rotate-12 border border-electric bg-electric/20" />
                  <div className="h-1 w-1 rounded-full bg-electric" />
                </div>
                <p>© {new Date().getFullYear()} AURA</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
