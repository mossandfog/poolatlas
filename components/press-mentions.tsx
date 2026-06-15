import Image from "next/image"

export function PressMentions() {
  const publications = [
    { name: "Conde Nast Traveler", abbr: "CNT" },
    { name: "Travel + Leisure", abbr: "T+L" },
    { name: "The New York Times", abbr: "NYT" },
    { name: "Forbes", abbr: "F" },
    { name: "Bloomberg", abbr: "BB" },
    { name: "Departures", abbr: "DEP" },
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 border-y border-border bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        {/* Pool Atlas Logo - Brand Moment */}
        <div className="flex justify-center mb-8">
          <Image
            src="/images/poolatlas-wordmark.png"
            alt="Pool Atlas"
            width={200}
            height={100}
            style={{ width: '200px', height: 'auto' }}
            priority
          />
        </div>
        
        <p className="text-center text-sm text-muted-foreground mb-3">
          Compiling and ranking the world's best pools through sources like
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 md:gap-x-3">
          {publications.map((pub, index) => (
            <span 
              key={pub.name}
              className="text-foreground font-medium text-sm whitespace-nowrap"
            >
              {pub.name}{index < publications.length - 1 && <span className="text-muted-foreground ml-2 md:ml-3">·</span>}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
