"use client"

import { useState } from "react"
import { Award, Trophy, Medal, Crown, Star, Sparkles, X, MapPin, ChevronRight } from "lucide-react"
import { pools } from "@/lib/pool-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const awards = [
  {
    id: "cnt-gold",
    name: "CNT Gold List",
    description: "Conde Nast Traveler's annual list of the world's best hotels",
    icon: Crown,
    color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400",
    activeColor: "bg-amber-500 text-white",
    filter: (pool: typeof pools[0]) => 
      pool.awards?.some(a => a.toLowerCase().includes("gold list") || a.toLowerCase().includes("conde nast") || a.toLowerCase().includes("cnt")) ||
      pool.sources?.some(s => s.toLowerCase().includes("conde nast")) || false
  },
  {
    id: "tl-best",
    name: "Travel + Leisure World's Best",
    description: "Reader-voted awards for excellence in hospitality",
    icon: Trophy,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    activeColor: "bg-blue-500 text-white",
    filter: (pool: typeof pools[0]) => 
      pool.awards?.some(a => a.toLowerCase().includes("world's best") || a.toLowerCase().includes("travel + leisure") || a.toLowerCase().includes("t+l")) ||
      pool.sources?.some(s => s.toLowerCase().includes("travel + leisure")) || false
  },
  {
    id: "tripadvisor",
    name: "TripAdvisor Travelers' Choice",
    description: "Top 1% of hotels worldwide based on reviews",
    icon: Medal,
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
    activeColor: "bg-green-500 text-white",
    filter: (pool: typeof pools[0]) => 
      pool.awards?.some(a => a.toLowerCase().includes("tripadvisor") || a.toLowerCase().includes("travelers' choice")) ||
      pool.sources?.some(s => s.toLowerCase().includes("tripadvisor")) || false
  },
  {
    id: "forbes",
    name: "Forbes Travel Guide Star",
    description: "Rigorous inspection-based ratings",
    icon: Star,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    activeColor: "bg-purple-500 text-white",
    filter: (pool: typeof pools[0]) => 
      pool.awards?.some(a => a.toLowerCase().includes("forbes")) ||
      pool.sources?.some(s => s.toLowerCase().includes("forbes")) || false
  },
  {
    id: "world-record",
    name: "World Record Holder",
    description: "Guinness World Records certified achievements",
    icon: Award,
    color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    activeColor: "bg-red-500 text-white",
    filter: (pool: typeof pools[0]) => 
      pool.awards?.some(a => a.toLowerCase().includes("world record") || a.toLowerCase().includes("guinness") || a.toLowerCase().includes("largest") || a.toLowerCase().includes("deepest") || a.toLowerCase().includes("highest")) || false
  },
  {
    id: "editors-pick",
    name: "Pool Atlas Editor's Pick",
    description: "Our team's personal favorites",
    icon: Sparkles,
    color: "bg-primary/20 text-primary",
    activeColor: "bg-primary text-primary-foreground",
    filter: (pool: typeof pools[0]) => 
      pool.awards?.some(a => a.toLowerCase().includes("editor") || a.toLowerCase().includes("pick")) || 
      pool.rank <= 10
  }
]

export function AwardsBadges() {
  const [selectedAward, setSelectedAward] = useState<string | null>(null)
  
  const activeAward = awards.find(a => a.id === selectedAward)
  const filteredPools = activeAward ? pools.filter(activeAward.filter).slice(0, 6) : []

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Browse by Award
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find pools recognized by the world's most prestigious travel publications and awards
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {awards.map((award) => {
            const count = pools.filter(award.filter).length
            const isActive = selectedAward === award.id
            
            return (
              <button
                key={award.id}
                onClick={() => setSelectedAward(isActive ? null : award.id)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  isActive 
                    ? `${award.activeColor} border-transparent shadow-lg scale-[1.02]`
                    : "bg-card border-border hover:border-primary/50 hover:shadow-md"
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                  isActive ? "bg-white/20" : award.color
                }`}>
                  <award.icon className={`w-6 h-6 ${isActive ? "text-white" : ""}`} />
                </div>
                <h3 className={`font-[family-name:var(--font-display)] font-semibold mb-1 ${
                  isActive ? "text-white" : "text-foreground"
                }`}>
                  {award.name}
                </h3>
                <p className={`text-xs mb-3 line-clamp-2 ${
                  isActive ? "text-white/80" : "text-muted-foreground"
                }`}>
                  {award.description}
                </p>
                <span className={`text-sm font-semibold ${
                  isActive ? "text-white" : "text-primary"
                }`}>
                  {count} pools
                </span>
              </button>
            )
          })}
        </div>

        {/* Expanded Results Panel */}
        {selectedAward && activeAward && (
          <div className="mt-8 bg-card rounded-2xl border border-border p-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeAward.activeColor}`}>
                  <activeAward.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{activeAward.name}</h3>
                  <p className="text-sm text-muted-foreground">{pools.filter(activeAward.filter).length} pools with this award</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setSelectedAward(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {filteredPools.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPools.map((pool) => (
                    <div
                      key={pool.id}
                      className="group bg-secondary/30 rounded-xl overflow-hidden hover:shadow-md transition-all"
                    >
                      <div className="relative h-32 overflow-hidden">
                        <Image
                          src={pool.image}
                          alt={pool.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-xs font-bold">
                            #{pool.rank}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold text-sm text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                          {pool.name}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                          <MapPin className="w-3 h-3" />
                          <span>{pool.location}, {pool.country}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span className="text-xs font-medium">{pool.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {pools.filter(activeAward.filter).length > 6 && (
                  <div className="mt-6 text-center">
                    <Button 
                      variant="outline" 
                      className="rounded-full gap-2"
                      onClick={() => {
                        const element = document.getElementById('top-100')
                        element?.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      View All {pools.filter(activeAward.filter).length} Award Winners
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No pools found with this award in current data.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
