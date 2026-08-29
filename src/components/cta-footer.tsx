'use client'

import { KineticWord } from './kinetic-word'
import { MagneticButton } from './magnetic-button'
import { Marquee } from './marquee'

export function CtaFooter() {
  return (
    <footer id="access" className="relative overflow-hidden bg-ink text-ink-foreground">
      <Marquee
        items={['ГОТОВА СЛУШАТЬ', 'ГОТОВА ГОВОРИТЬ', 'ГОТОВА ДЕЙСТВОВАТЬ', 'AURA']}
        variant="electric"
        duration={24}
      />

      <div className="grid-lines-dense pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-10 md:py-32">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-electric">
          получите ранний доступ
        </p>

        <h2 className="font-sans font-bold uppercase leading-[0.85] tracking-mega text-white">
          <KineticWord
            text="GIVE"
            className="block text-[16vw] leading-[0.82] lg:text-[11rem]"
          />
          <span className="block text-[16vw] leading-[0.82] lg:text-[11rem]">
            IT <span className="text-outline-light">ACCESS</span>
          </span>
        </h2>

        <p className="mt-8 max-w-lg text-balance text-lg text-white/60">
          Передайте своему компьютеру голос, зрение и волю. Ранний доступ
          открывается волнами — займите место в очереди.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <MagneticButton
            href="mailto:access@aura.sys?subject=AURA early access"
            cursor="mail"
            variant="solid"
          >
            запросить доступ
          </MagneticButton>
          <MagneticButton href="#manifest" cursor="top" variant="ghost">
            перечитать манифест
          </MagneticButton>
        </div>

        {/* footer meta */}
        <div className="mt-24 grid grid-cols-2 gap-8 border-t border-white/15 pt-10 font-mono text-[11px] uppercase tracking-[0.15em] text-white/50 md:grid-cols-4">
          <div>
            <p className="mb-2 text-white/30">system</p>
            <p>AURA // core v2.4.1</p>
            <p>build 0115.10</p>
          </div>
          <div>
            <p className="mb-2 text-white/30">runtime</p>
            <p>UMBRA · LUMEN · windows</p>
            <p>local fallback</p>
          </div>
          <div>
            <p className="mb-2 text-white/30">contact</p>
            <p>access@aura.sys</p>
            <p>press@aura.sys</p>
          </div>
          <div>
            <p className="mb-2 text-white/30">status</p>
            <p className="text-electric">● operational</p>
            <p>© {new Date().getFullYear()} AURA</p>
          </div>
        </div>

      </div>
    </footer>
  )
}
