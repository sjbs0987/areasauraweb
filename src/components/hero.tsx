'use client'

import { KineticWord } from './kinetic-word'
import { MagneticButton } from './magnetic-button'
import { BootTerminal } from './boot-terminal'

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />

      {/* top meta row */}
      <div className="relative mx-auto flex max-w-[1400px] items-center justify-between px-5 pt-10 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:px-10 md:pt-14">
        <span className="hidden sm:inline">aura · umbra · lumen</span>
        <span>© {new Date().getFullYear()}</span>
      </div>

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-y-10 px-5 pb-24 pt-10 md:px-10 lg:grid-cols-12 lg:gap-x-8 lg:pt-16">
        {/* left: wordmark + copy */}
        <div className="lg:col-span-8">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.35em] text-electric">
            augmented user reality agent
          </p>

          <h1 className="font-sans font-bold uppercase leading-[0.82] tracking-mega text-foreground">
            <KineticWord
              text="AURA"
              className="text-[24vw] leading-[0.8] sm:text-[20vw] lg:text-[15rem]"
              outlineIndices={[2]}
            />
          </h1>

          <div className="mt-8 max-w-xl border-l-2 border-electric pl-5">
            <p className="text-balance text-lg font-medium leading-snug text-foreground md:text-2xl">
              Она слышит и узнаёт вас по голосу. Говорит в ответ. Видит ваш
              экран, читает файлы и управляет Windows. И&nbsp;— действует.
            </p>
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
              <span>CREATE · EDIT · DELETE · </span>
              <span className="text-electric">AUDIT</span>
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton href="#access" cursor="join" variant="solid">
              запросить доступ
            </MagneticButton>
            <MagneticButton href="#manifest" cursor="read" variant="ghost">
              манифест ↓
            </MagneticButton>
          </div>
        </div>

        {/* right: terminal + model identifiers */}
        <div className="flex flex-col gap-6 lg:col-span-4 lg:items-end lg:pt-24">
          <BootTerminal />
          <dl className="grid w-full max-w-sm grid-cols-2 border border-line font-mono text-[10px] uppercase tracking-[0.15em]">
            {[
              ['текст · запросы', 'UMBRA'],
              ['голос · реалтайм', 'LUMEN'],
            ].map(([k, v]) => (
              <div key={k} className="border-r border-line p-3 last:border-r-0">
                <dt className="text-muted-foreground">{k}</dt>
                <dd className="mt-1 text-base normal-case tracking-normal text-electric">
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* japanese vertical accent */}
      <div className="pointer-events-none absolute bottom-24 right-6 hidden font-sans text-sm tracking-[0.5em] text-muted-foreground [writing-mode:vertical-rl] xl:block">
        自律 / autonomy
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span className="inline-block animate-pulse">scroll ↓</span>
      </div>
    </section>
  )
}
