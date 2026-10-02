"use client"

import { useState } from "react"
import { Sun, Snowflake, Leaf, Flower } from "lucide-react"
import { pools } from "@/lib/pool-data"
import { PoolCard } from "@/components/pool-card"
import type { Season } from "@/lib/editorial-calendar"

const seasons = [
  {
    name: "Spring",
    icon: Flower,
    poolIds: [1, 4, 8],
    description: "Perfect weather, fewer crowds"
  },
  {
    name: "Summer",
    icon: Sun,
    poolIds: [1, 43, 22],
    description: "Mediterranean peak, Ibiza sun, Africa dry season"
  },
  {
    name: "Fall",
    icon: Leaf,
    poolIds: [5, 125, 117],
    description: "Desert season opens and safari reaches its late dry season, when wildlife gathers at the water"
  },
  {
    name: "Winter",
    icon: Snowflake,
    poolIds: [9, 10, 71],
    description: "Geothermal water, heated indoor pools, and a roof that opens when the sun does"
  }
]

export function SeasonalPicks({ initialSeason, year }: { initialSeason: Season; year: number }) {
  const [activeSeason, setActiveSeason] = useState(
    seasons.find(s => s.name === initialSeason) ?? seasons[0]
  )

  const seasonPools = activeSeason.poolIds
    .map(id => pools.find(p => p.id === id)!)
    .filter(Boolean)

  return (
    <section id="seasonal" className="scroll-mt-20 py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold tracking-[-0.025em] text-foreground">
              Pools for every season
            </h2>
            <p className="mt-2 text-muted-foreground">Showing {activeSeason.name.toLowerCase()} {year}. {activeSeason.description}.</p>
          </div>
        </div>

        {/* Season tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {seasons.map((season) => (
            <button
              key={season.name}
              onClick={() => setActiveSeason(season)}
              aria-pressed={season.name === activeSeason.name}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                season.name === activeSeason.name
                  ? 'bg-foreground text-background'
                  : 'bg-secondary text-muted-foreground hover:text-foreground'
              }`}
            >
              <season.icon className="w-4 h-4" />
              {season.name}
            </button>
          ))}
        </div>

        {/* Pool recommendations for selected season */}
        <div className="grid sm:grid-cols-3 gap-6">
          {seasonPools.map((pool) => (
            <PoolCard key={pool.id} pool={pool} sizes="(min-width: 640px) 30vw, 100vw" />
          ))}
        </div>
        

      </div>
    </section>
  )
}
