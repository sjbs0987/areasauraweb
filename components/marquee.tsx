'use client'

type Props = {
  items: string[]
  duration?: number
  variant?: 'light' | 'electric'
}

export function Marquee({ items, duration = 28, variant = 'electric' }: Props) {
  const track = [...items, ...items, ...items, ...items]
  const bg =
    variant === 'electric'
      ? 'bg-electric text-electric-foreground'
      : 'bg-foreground text-background'

  return (
    <div className={`group relative flex overflow-hidden border-y border-foreground/10 py-4 select-none ${bg}`}>
      {/* Side gradient masks for smooth fade edge */}
      <div className="pointer-events-none absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-background/20 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-background/20 to-transparent z-10" />

      <div
        className="animate-marquee flex shrink-0 items-center gap-8 whitespace-nowrap pr-8 group-hover:[animation-play-state:paused]"
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-sans text-2xl font-bold uppercase tracking-tight transition-transform duration-300 ease-out hover:scale-105 md:text-4xl"
          >
            <span className="hover:text-white transition-colors duration-200">{item}</span>
            <span
              aria-hidden
              className="inline-block text-lg opacity-60 transition-transform duration-500 hover:rotate-90 hover:opacity-100 hover:scale-125"
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
