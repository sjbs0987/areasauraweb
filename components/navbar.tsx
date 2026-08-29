'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth-context'

const PLAN_BADGE: Record<string, string> = {
  FREE: 'border border-foreground/20 text-muted-foreground',
  PULSE: 'border border-electric text-electric shadow-[0_0_10px_rgba(43,74,255,0.2)]',
  OVERDRIVE: 'bg-electric border border-electric text-white shadow-[0_0_15px_rgba(43,74,255,0.4)]',
}

export function Navbar() {
  const { user, openAuthModal, handleLogout } = useAuth()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-[90] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        scrolled
          ? 'border-b border-foreground/10 bg-background/80 backdrop-blur-lg shadow-sm'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      {/* Laser sweep on scroll */}
      {scrolled && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-electric/60 to-transparent" />
      )}

      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-5 py-4 md:px-10">
        {/* Logo */}
        <a
          href="#"
          className="group flex items-center gap-2.5 font-mono text-sm font-bold uppercase tracking-[0.35em] text-foreground transition-colors duration-200 hover:text-electric"
        >
          {/* Aura Identity Logo — rotating frame with core eye dot */}
          <div className="relative flex h-7 w-7 items-center justify-center">
            <div className="absolute inset-0 rotate-[18deg] border border-electric bg-electric/5 transition-transform duration-500 ease-out group-hover:rotate-[45deg] group-hover:scale-110" />
            <div className="relative h-2 w-2 rounded-full bg-electric group-hover:scale-125 transition-transform duration-300 shadow-[0_0_8px_rgba(43,74,255,0.8)]" />
          </div>
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">AURA</span>
        </a>

        {/* Socials */}
        <div className="flex items-center gap-5">
          <a
            href="https://t.me/areas_offtg"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="text-muted-foreground transition-all duration-200 hover:text-electric hover:scale-115"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
          </a>
          <a
            href="https://discord.gg/PTvxEchF8y"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Discord"
            className="text-muted-foreground transition-all duration-200 hover:text-electric hover:scale-115"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.04.031.05a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/channel/UCeF_srRsDUynMlxtNTVB4mQ"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="text-muted-foreground transition-all duration-200 hover:text-electric hover:scale-115"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
        </div>

        {/* Auth zone */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              {/* User info — hidden on mobile */}
              <div className="hidden flex-col items-end sm:flex">
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-foreground">
                  {user.email}
                </span>
                <span className={`mt-0.5 font-mono text-[8px] uppercase tracking-[0.15em] px-2 py-0.5 ${PLAN_BADGE[user.plan]}`}>
                  {user.plan}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="border border-foreground/25 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-all duration-200 hover:border-foreground hover:text-foreground hover:bg-foreground/5 active:scale-95"
              >
                ВЫХОД
              </button>
            </>
          ) : (
            <button
              onClick={() => openAuthModal()}
              data-cursor="JOIN"
              className="group relative overflow-hidden border border-foreground px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground transition-all duration-300 hover:border-electric hover:bg-electric hover:text-white hover:shadow-[0_0_25px_rgba(43,74,255,0.45)] active:scale-[0.95]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 ease-in-out group-hover:translate-x-full" />
              <span className="relative z-10 flex items-center gap-1.5 font-semibold">
                <span>ВХОД</span>
                <span className="text-electric group-hover:text-white/60">/</span>
                <span>РЕГИСТРАЦИЯ</span>
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
