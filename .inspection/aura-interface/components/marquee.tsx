type Props = {
  items: string[]
  duration?: number
  variant?: 'light' | 'electric'
}

export function Marquee({ items, duration = 28, variant = 'electric' }: Props) {
  const track = [...items, ...items]
  const bg = variant === 'electric' ? 'bg-electric text-electric-foreground' : 'bg-foreground text-background'
  return (
    <div className={`relative flex overflow-hidden border-y border-foreground/10 py-4 ${bg}`}>
      <div
        className="animate-marquee flex shrink-0 items-center gap-8 whitespace-nowrap pr-8"
        style={{ ['--marquee-duration' as string]: `${duration}s` }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-sans text-2xl font-bold uppercase tracking-tight md:text-4xl"
          >
            {item}
            <span aria-hidden className="text-lg opacity-60">
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
