// A Stay22 map of places to stay, lazy-loaded so it costs nothing until the reader scrolls to it.
interface StaysMapProps {
  src: string
  title: string
  intro?: string
  id?: string
  /** Heading level; use 3 when the map sits inside a section that already has an h2 */
  level?: 2 | 3
}

export function StaysMap({ src, title, intro, id, level = 2 }: StaysMapProps) {
  const Heading = level === 3 ? "h3" : "h2"
  return (
    <section id={id} className="scroll-mt-24">
      <Heading className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground">{title}</Heading>
      {intro ? <p className="mt-2 mb-4 text-sm leading-relaxed text-muted-foreground max-w-2xl">{intro}</p> : <div className="mb-4" />}
      <div className="overflow-hidden rounded-2xl border border-border bg-muted">
        <iframe
          src={src}
          title={title}
          loading="lazy"
          className="block w-full h-[440px] sm:h-[480px] border-0"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Prices and availability come from our booking partner. We may earn a commission when you book, at no cost to you.
      </p>
    </section>
  )
}
