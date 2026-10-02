import Link from "next/link"
import { pools } from "@/lib/pool-data"
import { PoolCard } from "@/components/pool-card"
import type { Edition } from "@/lib/editorial-calendar"

// Picks rotate monthly from lib/editorial-calendar.ts
export function TrendingPools({ edition }: { edition: Edition }) {
  const picks = edition.pickIds
    .map(id => pools.find(p => p.id === id))
    .filter((p): p is (typeof pools)[number] => Boolean(p))

  return (
    <section id="picks" className="scroll-mt-20 pb-20 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold tracking-[-0.025em] text-foreground">
            Where to swim in {edition.monthName}
          </h2>
          <p className="mt-2 text-muted-foreground max-w-xl">{edition.picksWhy}. Chosen by our editors for this month.</p>
        </div>
        <Link href="/explore#seasonal" className="text-sm font-medium text-primary hover:underline underline-offset-4">
          Picks for every season
        </Link>
      </div>

      {/* Swipe row on phones, five across on desktop */}
      <div className="mt-8 max-w-7xl mx-auto">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 px-4 pb-2 sm:px-6 lg:px-8 lg:grid lg:grid-cols-5 lg:gap-6 lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {picks.map((pool) => (
            <div key={pool.id} className="w-[72%] shrink-0 snap-start sm:w-[40%] lg:w-auto">
              <PoolCard pool={pool} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
