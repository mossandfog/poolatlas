export function PressMentions() {
  const publications = [
    "Condé Nast Traveler",
    "Travel + Leisure",
    "Forbes Travel Guide",
    "The New York Times",
    "Departures",
    "Bloomberg",
  ]

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 border-y border-border bg-secondary/20">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-5">
          Rankings sourced from the world's leading travel publications
        </p>
        <div className="flex flex-wrap items-center justify-center gap-y-3">
          {publications.map((pub, index) => (
            <span key={pub} className="flex items-center">
              <span className="text-sm font-semibold text-foreground/75 tracking-wide whitespace-nowrap px-4">
                {pub}
              </span>
              {index < publications.length - 1 && (
                <span className="text-border text-lg leading-none hidden sm:inline">·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
