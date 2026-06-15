export function Partners() {
  const partners = [
    { name: "Marriott Bonvoy", abbr: "MB" },
    { name: "Hilton Honors", abbr: "HH" },
    { name: "Hyatt", abbr: "HY" },
    { name: "Four Seasons", abbr: "FS" },
    { name: "Aman Resorts", abbr: "AM" },
    { name: "Six Senses", abbr: "SS" },
    { name: "Booking.com", abbr: "BC" },
    { name: "Expedia", abbr: "EX" }
  ]

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 border-y border-border">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-xs text-muted-foreground mb-6 uppercase tracking-wider">
          Official Partners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {partners.map((partner) => (
            <div 
              key={partner.name}
              className="flex items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                <span className="text-[10px] font-bold">{partner.abbr}</span>
              </div>
              <span className="text-xs font-medium hidden sm:inline">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
