"use client"

import { useState, useMemo } from "react"
import { pools } from "@/lib/pool-data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Star, X, ExternalLink, Globe } from "lucide-react"
import Image from "next/image"

interface SelectedPool {
  hotel: string
  name: string
  location: string
  country: string
  rating: number
  image: string
  rank: number
  websiteUrl: string
}

export function WorldMap() {
  const [selectedPool, setSelectedPool] = useState<SelectedPool | null>(null)
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  // Group pools by region
  const poolsByRegion = useMemo(() => {
    const grouped: Record<string, typeof pools> = {}
    pools.forEach(pool => {
      if (!grouped[pool.region]) {
        grouped[pool.region] = []
      }
      grouped[pool.region].push(pool)
    })
    return grouped
  }, [])

  const regions = [
    { 
      name: "Europe", 
      description: "Mediterranean gems & alpine retreats",
      gradient: "from-blue-500/20 to-indigo-500/20",
      countries: ["Greece", "France", "Italy", "Spain", "Portugal", "UK", "Switzerland", "Germany", "Croatia", "Iceland", "Denmark"]
    },
    { 
      name: "Asia", 
      description: "Tropical paradises & urban oases",
      gradient: "from-emerald-500/20 to-teal-500/20",
      countries: ["Singapore", "Indonesia", "Thailand", "Japan", "India", "Maldives", "China", "Vietnam", "Cambodia", "Sri Lanka", "Hong Kong"]
    },
    { 
      name: "Americas", 
      description: "Coastal escapes & desert hideaways",
      gradient: "from-orange-500/20 to-amber-500/20",
      countries: ["USA", "Mexico", "Brazil", "Costa Rica", "Chile", "Saint Lucia", "Anguilla", "Turks and Caicos"]
    },
    { 
      name: "Middle East", 
      description: "Luxury defined",
      gradient: "from-yellow-500/20 to-orange-500/20",
      countries: ["UAE", "Oman", "Turkey"]
    },
    { 
      name: "Africa", 
      description: "Safari lodges & coastal retreats",
      gradient: "from-amber-500/20 to-red-500/20",
      countries: ["Morocco", "South Africa", "Tanzania", "Namibia", "Seychelles"]
    },
    { 
      name: "Oceania", 
      description: "Island paradises",
      gradient: "from-cyan-500/20 to-blue-500/20",
      countries: ["Australia", "French Polynesia"]
    }
  ]

  const handlePoolClick = (pool: typeof pools[0]) => {
    setSelectedPool({
      hotel: pool.hotel,
      name: pool.name,
      location: pool.location,
      country: pool.country,
      rating: pool.rating,
      image: pool.image,
      rank: pool.rank,
      websiteUrl: pool.websiteUrl
    })
  }

  return (
    <section id="map" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4">Explore the Globe</Badge>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pool Locations Worldwide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the world&apos;s most stunning hotel pools across 6 continents. Click any region to explore.
          </p>
        </div>

        {/* Region Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {regions.map((region) => {
            const poolCount = poolsByRegion[region.name]?.length || 0
            const isSelected = selectedRegion === region.name
            
            return (
              <button
                key={region.name}
                onClick={() => setSelectedRegion(isSelected ? null : region.name)}
                className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left group ${
                  isSelected 
                    ? 'border-primary bg-primary/10 shadow-lg' 
                    : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
                }`}
              >
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${region.gradient} opacity-50`} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <Globe className={`w-5 h-5 ${isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'} transition-colors`} />
                    <Badge variant={isSelected ? "default" : "secondary"} className="text-xs">
                      {poolCount}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{region.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{region.description}</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Pool Cards for Selected Region */}
        {selectedRegion && poolsByRegion[selectedRegion] && (
          <div className="bg-card rounded-2xl border border-border p-6 mb-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground">
                  {selectedRegion} Pools
                </h3>
                <p className="text-sm text-muted-foreground">
                  {poolsByRegion[selectedRegion].length} pools in {new Set(poolsByRegion[selectedRegion].map(p => p.country)).size} countries
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedRegion(null)}
                className="rounded-full"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {poolsByRegion[selectedRegion]
                .sort((a, b) => a.rank - b.rank)
                .slice(0, 10)
                .map((pool) => (
                <button
                  key={pool.rank}
                  onClick={() => handlePoolClick(pool)}
                  className={`relative rounded-xl overflow-hidden group aspect-[4/3] ${
                    selectedPool?.rank === pool.rank ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  <Image
                    src={pool.image}
                    alt={pool.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-xs">#{pool.rank}</span>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs font-medium truncate">{pool.name}</p>
                    <p className="text-white/70 text-xs truncate">{pool.country}</p>
                  </div>
                </button>
              ))}
            </div>
            
            {poolsByRegion[selectedRegion].length > 10 && (
              <p className="text-center text-sm text-muted-foreground mt-4">
                +{poolsByRegion[selectedRegion].length - 10} more pools in {selectedRegion}
              </p>
            )}
          </div>
        )}

        {/* Stats Bar */}
        <div className="flex flex-wrap justify-center gap-6 py-6 px-4 bg-card rounded-xl border border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{pools.length}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Pools</p>
          </div>
          <div className="w-px h-12 bg-border hidden sm:block" />
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{new Set(pools.map(p => p.country)).size}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Countries</p>
          </div>
          <div className="w-px h-12 bg-border hidden sm:block" />
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">6</p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Continents</p>
          </div>
          <div className="w-px h-12 bg-border hidden sm:block" />
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">
              {(pools.reduce((acc, p) => acc + p.rating, 0) / pools.length).toFixed(1)}
            </p>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Avg Rating</p>
          </div>
        </div>

        {/* Selected Pool Detail Card */}
        {selectedPool && (
          <Card className="fixed bottom-4 right-4 w-80 p-4 shadow-xl z-50 animate-in slide-in-from-right-4 duration-200">
            <button
              onClick={() => setSelectedPool(null)}
              className="absolute top-2 right-2 p-1 hover:bg-secondary rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="flex gap-3">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={selectedPool.image}
                  alt={selectedPool.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-1 left-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">#{selectedPool.rank}</span>
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-[family-name:var(--font-display)] font-semibold text-foreground truncate">
                  {selectedPool.name}
                </h3>
                <p className="text-sm text-muted-foreground truncate">{selectedPool.hotel}</p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{selectedPool.location}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium">{selectedPool.rating}</span>
                </div>
              </div>
            </div>

            <a
              href={selectedPool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 block"
            >
              <Button size="sm" className="w-full rounded-full gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" />
                Visit Property
              </Button>
            </a>
          </Card>
        )}
      </div>
    </section>
  )
}
