import Image from "next/image"
import Link from "next/link"
import { ArrowDown } from "lucide-react"
import { PoolSearch } from "@/components/pool-search"
import { pools } from "@/lib/pool-data"
import { siteStats, RANKINGS_REVIEWED, type Edition } from "@/lib/editorial-calendar"

// The cover: this month's Pool of the Month, shown at full strength beside the headline.
export function Hero({ edition }: { edition: Edition }) {
  const cover = pools.find(p => p.id === edition.featuredId) ?? pools[0]

  return (
    <section className="relative bg-background">
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:min-h-[min(86vh,860px)]">
        {/* Cover photo: first on mobile, bleeds off the right edge on desktop */}
        <figure className="relative lg:order-2 m-0">
          <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:absolute lg:inset-x-0 lg:top-0 lg:bottom-14 overflow-hidden bg-muted pa-cover-in">
            <Image
              src={cover.image}
              alt={`${cover.name} at ${cover.hotel}, ${cover.location}`}
              fill
              priority
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="px-4 sm:px-6 lg:px-6 lg:absolute lg:inset-x-0 lg:bottom-0 lg:h-14 lg:flex lg:items-center">
            <Link
              href="#featured"
              className="group mt-3 lg:mt-0 block text-sm leading-relaxed text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-foreground font-medium">On the cover:</span>{" "}
              {cover.name}, {cover.hotel}. Pool of the Month for {edition.monthName}.{" "}
              <span className="text-primary whitespace-nowrap group-hover:underline underline-offset-4">Read why</span>
            </Link>
          </figcaption>
        </figure>

        {/* Headline and search */}
        <div className="relative lg:order-1 flex flex-col justify-center px-4 sm:px-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:pr-12 pt-8 pb-14 lg:py-20">
          <h1 className="pa-headline-in font-[family-name:var(--font-display)] font-semibold text-foreground text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem] tracking-[-0.035em] text-balance max-w-[12ch]">
            The world&apos;s best hotel pools, ranked.
          </h1>

          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-[34rem] text-pretty">
            {siteStats.poolCount} pools in {siteStats.countryCount} countries, chosen by our editors and
            checked against the travel press. Rankings reviewed {RANKINGS_REVIEWED}.
          </p>

          <div className="mt-8 max-w-xl [&>div]:mx-0 [&>div]:max-w-none">
            <PoolSearch />
          </div>

          <a
            href="#rankings"
            className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors self-start"
          >
            <ArrowDown className="w-4 h-4" />
            Browse all {siteStats.poolCount} pools
          </a>
        </div>
      </div>
    </section>
  )
}
