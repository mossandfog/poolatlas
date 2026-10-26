import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { destinations, poolsFor, coverImage } from "@/lib/destinations"

// Destination guides. Counts come from the data; every card opens its guide.
export function PopularDestinations() {
  const ordered = [...destinations].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)))

  return (
    <section id="destinations" className="scroll-mt-20 py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-foreground mb-2">
            Destination guides
          </h2>
          <p className="text-muted-foreground">Where the pools are worth planning a trip around</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {ordered.map((d, index) => {
            const count = poolsFor(d).length
            const big = index === 0
            return (
              <Link
                key={d.slug}
                href={`/destinations/${d.slug}`}
                className={`group relative block rounded-2xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  big ? "col-span-2 md:row-span-2" : index === ordered.length - 1 ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                <div className={`relative ${big ? "aspect-[4/3] md:aspect-auto md:h-full" : index === ordered.length - 1 ? "aspect-[2/1] md:aspect-[4/3]" : "aspect-[4/3]"}`}>
                  <Image
                    src={coverImage(d)}
                    alt={`A hotel pool in ${d.name}`}
                    fill
                    sizes={big ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  {d.featured && (
                    <span className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur">
                      New guide
                    </span>
                  )}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-xs sm:text-sm text-white/80 line-clamp-1">{d.tagline}</p>
                    <h3 className="mt-1 flex items-center gap-1 font-[family-name:var(--font-display)] text-lg sm:text-2xl font-semibold">
                      {d.name}
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    </h3>
                    <p className="text-xs sm:text-sm text-white/75 tabular-nums">
                      {count} ranked {count === 1 ? "pool" : "pools"}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
