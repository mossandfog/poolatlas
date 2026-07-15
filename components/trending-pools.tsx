"use client"

import { TrendingUp } from "lucide-react"
import { pools } from "@/lib/pool-data"
import { PoolCard } from "@/components/pool-card"

// July 2026 editor picks: Mediterranean peak season + Africa dry season + one wild card
// #1 Grace Santorini, #6 Monastero Santa Rosa (Amalfi), #43 Aguas de Ibiza, #22 Four Seasons Serengeti, #62 Cap Rocat (Mallorca)
const trendingPoolIds = [1, 6, 43, 22, 62]

export function TrendingPools() {
  const trendingPools = trendingPoolIds
    .map(id => pools.find(p => p.id === id)!)
    .filter(Boolean)

  return (
    <section id="trending" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-destructive/20 flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">
              Editor&apos;s July Picks
            </h2>
            <p className="text-sm text-muted-foreground">Mediterranean peak season, Africa dry season — now</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {trendingPools.map((pool) => (
            <PoolCard key={pool.id} pool={pool} />
          ))}
        </div>
      </div>
    </section>
  )
}
