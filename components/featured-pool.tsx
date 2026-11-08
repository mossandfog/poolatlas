import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { pools } from "@/lib/pool-data"
import type { Edition } from "@/lib/editorial-calendar"
import { HERO_FILM } from "@/lib/hero-film"

// The cover story. When the hero shows a film, this section carries the Pool of the Month's photograph too.
export function FeaturedPool({ edition }: { edition: Edition }) {
  const pool = pools.find(p => p.id === edition.featuredId) ?? pools[0]
  const features = pool.features.slice(0, 4)

  return (
    <section id="featured" className="scroll-mt-20 pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16 border-t border-border pt-10 md:pt-14">
        <div className="lg:col-span-5">
          <p className="text-sm font-medium text-primary">Pool of the Month, {edition.label}</p>
          <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-foreground text-balance">
            {pool.name}
          </h2>
          <p className="mt-3 text-lg text-foreground">{pool.hotel}</p>
          <p className="text-muted-foreground">{pool.location}, {pool.country}</p>

          <dl className="mt-8 grid grid-cols-2 max-w-xs gap-6">
            <div>
              <dt className="text-sm text-muted-foreground">World rank</dt>
              <dd className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold tabular-nums text-foreground">#{pool.rank}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted-foreground">Rating</dt>
              <dd className="mt-1 flex items-center gap-1.5 font-[family-name:var(--font-display)] text-3xl font-semibold tabular-nums text-foreground">
                {pool.rating.toFixed(1)}
                <Star className="w-5 h-5 fill-accent text-accent" aria-hidden="true" />
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7">
          {HERO_FILM && (
            <Link href={`/pools/${pool.slug}`} className="group mb-8 block relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted" data-pool-card>
              <Image
                src={pool.image}
                alt={`${pool.name} at ${pool.hotel}, ${pool.location}`}
                fill
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                data-pool-photo
              />
            </Link>
          )}
          <p className="font-[family-name:var(--font-display)] text-2xl md:text-[1.75rem] leading-snug tracking-[-0.01em] text-foreground text-pretty">
            {edition.featuredWhy}
          </p>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-[62ch]">
            {pool.description}
          </p>
          {features.length > 0 && (
            <p className="mt-6 text-sm text-muted-foreground">
              <span className="text-foreground font-medium">Known for </span>
              {features.join(", ")}
            </p>
          )}

          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href={`/pools/${pool.slug}`}>See the pool</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-6">
              <a href={pool.websiteUrl} target="_blank" rel="noopener noreferrer">
                Visit the hotel
                <ArrowUpRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </div>
      </div>
    </section>
  )
}
