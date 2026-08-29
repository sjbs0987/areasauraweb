import { CustomCursor } from '@/components/custom-cursor'
import { Hero } from '@/components/hero'
import { Marquee } from '@/components/marquee'
import { Manifesto } from '@/components/manifesto'
import { Capabilities } from '@/components/capabilities'
import { Principles } from '@/components/principles'
import { CtaFooter } from '@/components/cta-footer'

export default function Page() {
  return (
    <main className="relative">
      <CustomCursor />

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
      <CtaFooter />
    </main>
  )
}
