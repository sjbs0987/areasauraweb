'use client'

import { Reveal } from './reveal'

const PRINCIPLES = [
  {
    n: 'I',
    title: 'Намерение важнее команды',
    body: 'Вы объясняете цель — не синтаксис. Остальное агент выстраивает сам.',
    tag: 'intent-first',
  },
  {
    n: 'II',
    title: 'Только ваш голос',
    body: 'Голосовая биометрия узнаёт хозяина. Чужой команде агент не подчинится.',
    tag: 'voice.id',
  },
  {
    n: 'III',
    title: 'Один агент — весь компьютер',
    body: 'Никаких плагинов на каждое приложение. Она видит Windows целиком и работает в нём.',
    tag: 'full-access',
  },
  {
    n: 'IV',
    title: 'Гибридный разум',
    body: 'UMBRA работает в облаке, LUMEN — в реальном времени. Когда сети нет — локальный fallback. Агент не замолкает.',
    tag: 'umbra + lumen',
  },
  {
    n: 'V',
    title: 'Действие, а не совет',
    body: 'AURA не пишет инструкцию, как что-то сделать. Она делает это — а каждый шаг остаётся под вашим контролем.',
    tag: 'execute',
  },
]

export function Principles() {
  return (
    <section id="principles" className="relative bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-12 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span className="text-electric">03</span>
          <span className="h-px flex-1 bg-line" />
          <span>принципы</span>
        </div>

        <div className="border-t border-foreground/15">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.04}>
              <article
                className="group grid grid-cols-12 items-baseline gap-4 border-b border-foreground/15 py-8 transition-colors duration-300 hover:bg-foreground hover:text-background md:py-10"
              >
                <span className="col-span-2 font-mono text-sm tracking-[0.2em] text-electric md:col-span-1">
                  {p.n}
                </span>
                <h3 className="col-span-10 text-2xl font-bold uppercase leading-tight tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:col-span-6 md:text-4xl">
                  {p.title}
                </h3>
                <p className="col-span-12 mt-2 max-w-md text-sm leading-relaxed text-muted-foreground group-hover:text-background/70 md:col-span-4 md:mt-0 md:text-base">
                  {p.body}
                </p>
                <span className="col-span-12 mt-2 text-right font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground group-hover:text-background/60 md:col-span-1 md:mt-0">
                  {p.tag}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
