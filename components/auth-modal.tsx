'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useAuth } from '@/lib/auth-context'

type Tab = 'login' | 'register'
type RegStep = 'form' | 'otp'

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, handleLogin, handleRegister, handleVerifyOtp } = useAuth()

  const [tab, setTab] = useState<Tab>('login')
  const [regStep, setRegStep] = useState<RegStep>('form')

  const [loginEmail, setLoginEmail] = useState('')
  const [loginPass, setLoginPass] = useState('')
  const [loginErr, setLoginErr] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)

  const [regEmail, setRegEmail] = useState('')
  const [regPass, setRegPass] = useState('')
  const [regErr, setRegErr] = useState('')
  const [regLoading, setRegLoading] = useState(false)

  const [otp, setOtp] = useState('')
  const [otpErr, setOtpErr] = useState('')
  const [otpLoading, setOtpLoading] = useState(false)

  const overlayRef = useRef<HTMLDivElement>(null)

  // Reset state when modal opens
  useEffect(() => {
    if (!isAuthModalOpen) return
    setTab('login'); setRegStep('form')
    setLoginEmail(''); setLoginPass(''); setLoginErr('')
    setRegEmail(''); setRegPass(''); setRegErr('')
    setOtp(''); setOtpErr('')
  }, [isAuthModalOpen])

  // ESC closes modal
  useEffect(() => {
    if (!isAuthModalOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeAuthModal() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isAuthModalOpen, closeAuthModal])

  // Lock body scroll while open
  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true); setLoginErr('')
    const r = await handleLogin(loginEmail, loginPass)
    setLoginLoading(false)
    if (r.error) setLoginErr(r.error)
  }

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setRegLoading(true); setRegErr('')
    const r = await handleRegister(regEmail, regPass)
    setRegLoading(false)
    if (r.error) setRegErr(r.error)
    else setRegStep('otp')
  }

  const onVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setOtpLoading(true); setOtpErr('')
    const r = await handleVerifyOtp(regEmail, otp)
    setOtpLoading(false)
    if (r.error) setOtpErr(r.error)
  }

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <motion.div
          key="auth-modal-overlay"
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-xl px-4"
          onClick={(e) => { if (e.target === overlayRef.current) closeAuthModal() }}
        >
          {/* Ambient background aura glow behind modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.3 } }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="pointer-events-none absolute h-[420px] w-[420px] rounded-full bg-electric/30 blur-[110px]"
          />

          {/* Modal Container with cinematic 3D spring zoom & exit physics */}
          <motion.div
            key="auth-modal-card"
            initial={{ scale: 0.68, opacity: 0, y: 80, rotateX: 18, filter: 'blur(24px)' }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
            exit={{
              scale: 0.72,
              opacity: 0,
              y: 60,
              rotateX: -12,
              filter: 'blur(20px)',
              transition: { duration: 0.32, ease: [0.32, 0, 0.67, 0] },
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 20, mass: 0.85 }}
            style={{ perspective: 1200 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-black/10 bg-white/95 shadow-[0_30px_90px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-all"
          >
        {/* Top perimeter laser flash sweep on open */}
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-electric to-transparent shadow-[0_0_15px_rgba(43,74,255,0.9)]"
        />

        {/* Close button with spring hover */}
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={closeAuthModal}
          aria-label="Закрыть"
          data-cursor="CLOSE"
          className="absolute right-5 top-5 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100/90 text-sm leading-none text-muted-foreground transition-colors hover:bg-slate-200 hover:text-foreground"
        >
          ✕
        </motion.button>

        {/* Header + tabs */}
        <div className="border-b border-black/6 px-8 pt-8 pb-5">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.35 }}
            className="mb-2 pr-8"
          >
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              {tab === 'login' ? 'Вход в аккаунт' : 'Создать аккаунт'}
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              {tab === 'login'
                ? 'Войдите для управления вашим агентом'
                : 'Зарегистрируйтесь для получения доступа к AURA'}
            </p>
          </motion.div>

          {/* Animated Tab Switcher with sliding pill */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.35 }}
            className="mt-5 flex gap-1 rounded-xl bg-slate-100/90 p-1.5"
          >
            {(['login', 'register'] as Tab[]).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setRegStep('form') }}
                data-cursor={t === 'login' ? 'LOGIN' : 'JOIN'}
                className={`relative z-10 flex-1 rounded-lg py-2 text-xs font-semibold transition-colors duration-200 ${
                  tab === t ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tab === t && (
                  <motion.span
                    layoutId="auth-tab-pill"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    className="absolute inset-0 z-[-1] rounded-lg bg-white shadow-sm"
                  />
                )}
                {t === 'login' ? 'Вход' : 'Регистрация'}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Body with Animated Tab Content */}
        <div className="px-8 py-6">
          <AnimatePresence mode="wait" initial={false}>
            {/* ─── Login ───────────────────────────────────────── */}
            {tab === 'login' && (
              <motion.form
                key="login-form"
                initial={{ opacity: 0, x: -16, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: 16, filter: 'blur(4px)' }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={onLogin}
                className="flex flex-col gap-4"
                noValidate
              >
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-foreground">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="operator@aura.ai"
                    value={loginEmail}
                    onChange={e => setLoginEmail(e.target.value)}
                    autoComplete="email"
                    className="w-full rounded-xl border border-black/10 bg-slate-50 px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-electric focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-foreground">
                    Пароль
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={loginPass}
                    onChange={e => setLoginPass(e.target.value)}
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-black/10 bg-slate-50 px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-electric focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                {loginErr && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-red-500/20 bg-red-50 px-4 py-2.5"
                  >
                    <p className="text-xs font-medium text-red-600">
                      ⚠ {loginErr}
                    </p>
                  </motion.div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loginLoading}
                    data-cursor="ENTER"
                    className="w-full rounded-xl bg-electric py-3.5 text-xs font-semibold text-white shadow-md transition-all duration-200 hover:bg-electric/90 hover:shadow-lg disabled:opacity-50 active:scale-[0.98]"
                  >
                    {loginLoading ? 'Авторизация...' : 'Войти'}
                  </button>
                </div>
              </motion.form>
            )}

            {/* ─── Register: Step 1 ────────────────────────────── */}
            {tab === 'register' && regStep === 'form' && (
              <motion.form
                key="register-form"
                initial={{ opacity: 0, x: 16, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -16, filter: 'blur(4px)' }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={onRegister}
                className="flex flex-col gap-4"
                noValidate
              >
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-foreground">
                    Ваш Email
                  </label>
                  <input
                    type="email"
                    placeholder="operator@aura.ai"
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    autoComplete="email"
                    className="w-full rounded-xl border border-black/10 bg-slate-50 px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-electric focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-foreground">
                    Придумайте пароль
                  </label>
                  <input
                    type="password"
                    placeholder="Минимум 8 символов"
                    value={regPass}
                    onChange={e => setRegPass(e.target.value)}
                    autoComplete="new-password"
                    className="w-full rounded-xl border border-black/10 bg-slate-50 px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-electric focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                {regErr && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-red-500/20 bg-red-50 px-4 py-2.5"
                  >
                    <p className="text-xs font-medium text-red-600">
                      ⚠ {regErr}
                    </p>
                  </motion.div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={regLoading}
                    data-cursor="REGISTER"
                    className="w-full rounded-xl bg-electric py-3.5 text-xs font-semibold text-white shadow-md transition-all duration-200 hover:bg-electric/90 hover:shadow-lg disabled:opacity-50 active:scale-[0.98]"
                  >
                    {regLoading ? 'Генерация кода...' : 'Получить код подтверждения'}
                  </button>
                </div>
              </motion.form>
            )}

            {/* ─── Register: Step 2 — OTP ──────────────────────── */}
            {tab === 'register' && regStep === 'otp' && (
              <motion.form
                key="otp-form"
                initial={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.96, filter: 'blur(4px)' }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                onSubmit={onVerifyOtp}
                className="flex flex-col gap-4"
                noValidate
              >
                <div className="rounded-xl bg-electric/8 p-3.5 border border-electric/20">
                  <p className="text-xs text-muted-foreground">
                    Код подтверждения отправлен на{' '}
                    <span className="font-semibold text-foreground">{regEmail}</span>
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-center text-xs font-semibold text-foreground">
                    Введите 6-значный код
                  </label>
                  <input
                    type="text"
                    placeholder="0  0  0  0  0  0"
                    value={otp}
                    onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    className="w-full rounded-xl border border-electric/40 bg-slate-50 px-4 py-3 text-center text-xl font-bold tracking-[0.4em] text-foreground focus:border-electric focus:bg-white focus:outline-none"
                  />
                </div>

                {otpErr && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-red-500/20 bg-red-50 px-4 py-2.5"
                  >
                    <p className="text-xs font-medium text-red-600">
                      ⚠ {otpErr}
                    </p>
                  </motion.div>
                )}

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    type="submit"
                    disabled={otpLoading}
                    data-cursor="VERIFY"
                    className="w-full rounded-xl bg-electric py-3.5 text-xs font-semibold text-white shadow-md transition-all duration-200 hover:bg-electric/90 hover:shadow-lg disabled:opacity-50 active:scale-[0.98]"
                  >
                    {otpLoading ? 'Проверка...' : 'Подтвердить и войти'}
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegStep('form')}
                    className="py-1 text-xs text-muted-foreground transition-colors hover:text-electric text-center"
                  >
                    ← Изменить данные
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  )
}
