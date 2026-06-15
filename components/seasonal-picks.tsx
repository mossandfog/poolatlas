"use client"

import { useState } from "react"
import { Sun, Snowflake, Leaf, Flower } from "lucide-react"
import { pools } from "@/lib/pool-data"
import { PoolCard } from "@/components/pool-card"

const seasons = [
  {
    name: "Spring",
    icon: Flower,
    color: "bg-pink-100 text-pink-600",
    poolIds: [1, 4, 8],
    description: "Perfect weather, fewer crowds"
  },
  {
    name: "Summer",
    icon: Sun,
    color: "bg-amber-100 text-amber-600",
    poolIds: [2, 3, 6],
    description: "Peak season, vibrant energy"
  },
  {
    name: "Fall",
    icon: Leaf,
    color: "bg-orange-100 text-orange-600",
    poolIds: [5, 7, 12],
    description: "Mild temps, stunning colors"
  },
  {
    name: "Winter",
    icon: Snowflake,
    color: "bg-blue-100 text-blue-600",
    poolIds: [9, 10, 15],
    description: "Heated pools, snowy views"
  }
]

export function SeasonalPicks() {
  const [activeSeason, setActiveSeason] = useState(seasons[1])

  const seasonPools = activeSeason.poolIds
    .map(id => pools.find(p => p.id === id)!)
    .filter(Boolean)

  return (
    <section id="seasonal" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3 ${activeSeason.color}`}>
              <activeSeason.icon className="w-4 h-4" />
              <span className="text-sm font-semibold">{activeSeason.name} 2026</span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-foreground">
              Best Pools to Visit This Season
            </h2>
          </div>
        </div>

        {/* Season tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {seasons.map((season) => (
            <button
              key={season.name}
              onClick={() => setActiveSeason(season)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                season.name === activeSeason.name 
                  ? season.color
                  : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
              }`}
            >
              <season.icon className="w-4 h-4" />
              {season.name}
            </button>
          ))}
        </div>

        {/* Pool recommendations for selected season */}
        <div className="grid md:grid-cols-3 gap-6">
          {seasonPools.map((pool) => (
            <PoolCard key={pool.id} pool={pool} />
          ))}
        </div>
        
        <p className="text-center text-sm text-muted-foreground mt-6">
          Why {activeSeason.name.toLowerCase()}? {activeSeason.description}
        </p>
      </div>
    </section>
  )
}
