'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { supabase } from '@/lib/supabase'

export type Plan = 'FREE' | 'PULSE' | 'OVERDRIVE'

export type AuthUser = {
  id?: string
  email: string
  plan: Plan
  expiresAt: string | null
}

type AuthCtx = {
  user: AuthUser | null
  isLoading: boolean
  isAuthModalOpen: boolean
  openAuthModal: () => void
  closeAuthModal: () => void
  handleLogin: (email: string, password: string) => Promise<{ error?: string }>
  handleRegister: (email: string, password: string) => Promise<{ error?: string }>
  handleVerifyOtp: (email: string, code: string) => Promise<{ error?: string }>
  handleLogout: () => Promise<void>
  handleSubscribe: (plan?: any) => Promise<void> | void
}

const Ctx = createContext<AuthCtx | null>(null)

export function useAuth() {
  const c = useContext(Ctx)
  if (!c) throw new Error('useAuth must be used within AuthProvider')
  return c
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  // Listen to live Supabase session changes + restore session
  useEffect(() => {
    // 1. Check existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        setUser({
          id: session.user.id,
          email: session.user.email,
          plan: 'FREE',
          expiresAt: null,
        })
      } else {
        try {
          const raw = localStorage.getItem('aura_session')
          if (raw) setUser(JSON.parse(raw))
        } catch {}
      }
      setIsLoading(false)
    }).catch(() => {
      setIsLoading(false)
    })

    // 2. Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email) {
        const u: AuthUser = {
          id: session.user.id,
          email: session.user.email,
          plan: 'FREE',
          expiresAt: null,
        }
        setUser(u)
        localStorage.setItem('aura_session', JSON.stringify(u))
      } else {
        setUser(null)
        localStorage.removeItem('aura_session')
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const persist = (u: AuthUser | null) => {
    setUser(u)
    if (u) localStorage.setItem('aura_session', JSON.stringify(u))
    else localStorage.removeItem('aura_session')
  }

  // ─── Login ─────────────────────────────────────────────────────────────
  const handleLogin = async (email: string, password: string): Promise<{ error?: string }> => {
    if (!email || !password) return { error: 'Заполните все поля' }

    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) return { error: error.message }
      if (data.user?.email) {
        persist({ id: data.user.id, email: data.user.email, plan: 'FREE', expiresAt: null })
      }
    } else {
      await delay(600)
      persist({ email, plan: 'FREE', expiresAt: null })
    }

    setIsAuthModalOpen(false)
    return {}
  }

  // ─── Register (Sign Up) ────────────────────────────────────────────────
  const handleRegister = async (email: string, password: string): Promise<{ error?: string }> => {
    if (!email || !password) return { error: 'Заполните все поля' }

    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) return { error: error.message }
      return {}
    } else {
      await delay(600)
      return {}
    }
  }

  // ─── Verify OTP ────────────────────────────────────────────────────────
  const handleVerifyOtp = async (email: string, code: string): Promise<{ error?: string }> => {
    if (code.length !== 6) return { error: 'Введите 6-значный код из письма' }

    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'signup',
      })
      if (error) return { error: error.message }
      if (data.user?.email) {
        persist({ id: data.user.id, email: data.user.email, plan: 'FREE', expiresAt: null })
      }
    } else {
      await delay(600)
      persist({ email, plan: 'FREE', expiresAt: null })
    }

    setIsAuthModalOpen(false)
    return {}
  }

  // ─── Logout ────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      await supabase.auth.signOut()
    }
    persist(null)
  }

  // ─── Subscribe ─────────────────────────────────────────────────────────
  const handleSubscribe = async (plan?: any) => {
    if (!user) {
      setIsAuthModalOpen(true)
    }
  }

  return (
    <Ctx.Provider value={{
      user,
      isLoading,
      isAuthModalOpen,
      openAuthModal: () => setIsAuthModalOpen(true),
      closeAuthModal: () => setIsAuthModalOpen(false),
      handleLogin,
      handleRegister,
      handleVerifyOtp,
      handleLogout,
      handleSubscribe,
    }}>
      {children}
    </Ctx.Provider>
  )
}

const delay = (ms: number) => new Promise<void>(r => setTimeout(r, ms))
