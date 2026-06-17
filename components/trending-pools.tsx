"use client"

import { TrendingUp } from "lucide-react"
import { pools } from "@/lib/pool-data"
import { PoolCard } from "@/components/pool-card"

// Editor's summer picks
const trendingPoolIds = [3, 7, 12, 5, 18]

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
              Editor&apos;s Summer Picks
            </h2>
            <p className="text-sm text-muted-foreground">Our team's favorites for summer 2026</p>
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
