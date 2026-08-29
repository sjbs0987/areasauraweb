import { CustomCursor } from '@/components/custom-cursor'
import { Navbar } from '@/components/navbar'
import { AuthModal } from '@/components/auth-modal'
import { Hero } from '@/components/hero'
import { Marquee } from '@/components/marquee'
import { Manifesto } from '@/components/manifesto'
import { Capabilities } from '@/components/capabilities'
import { Principles } from '@/components/principles'
import { Dashboard } from '@/components/dashboard'
import { CtaFooter } from '@/components/cta-footer'

export default function Page() {
  return (
    <main className="relative">
      <CustomCursor />
      <Navbar />
      <AuthModal />

      {/* Push content below fixed navbar */}
      <div className="pt-16">
        <Hero />

        <Marquee
          items={[
            'СЛЫШИТ',
            'ГОВОРИТ',
            'ВИДИТ ЭКРАН',
            'ЧИТАЕТ ФАЙЛЫ',
            'УПРАВЛЯЕТ ОС',
            'ДЕЙСТВУЕТ',
          ]}
          variant="light"
          duration={30}
        />

        <Manifesto />
        <Capabilities />
        <Principles />

        {/* Dashboard — visible only when logged in (client component handles it) */}
        <Dashboard />

        <CtaFooter />
      </div>
    </main>
  )
}
