import { CustomCursor } from '@/components/custom-cursor'
import { Navbar } from '@/components/navbar'
import { AuthModal } from '@/components/auth-modal'
import { Pricing } from '@/components/pricing'
import { CtaFooter } from '@/components/cta-footer'

export const metadata = {
  title: 'Тарифы | AURA',
  description: 'Тарифные планы AURA — выберите режим работы агента.',
}

export default function PricingPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <CustomCursor />
      <Navbar />
      <AuthModal />
      <div className="pt-16">
        <Pricing />
        <CtaFooter />
      </div>
    </main>
  )
}
