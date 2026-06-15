"use client"

import { useState } from "react"
import { Waves, Building2, Zap, TreePalm, Snowflake, Heart, Baby, Sparkles, Star, MapPin, X, ChevronRight } from "lucide-react"
import { pools } from "@/lib/pool-data"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const categories = [
  {
    id: "infinity",
    name: "Infinity Pools",
    description: "Vanishing edges that blend with the horizon",
    icon: Waves,
    color: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
    activeColor: "bg-cyan-500 text-white",
    filter: (pool: typeof pools[0]) => pool.features?.some(f => f.toLowerCase().includes("infinity")) ?? false
  },
  {
    id: "rooftop",
    name: "Rooftop Pools",
    description: "City skylines and elevated views",
    icon: Building2,
    color: "bg-violet-500/10 text-violet-600 border-violet-500/20",
    activeColor: "bg-violet-500 text-white",
    filter: (pool: typeof pools[0]) => pool.features?.some(f => f.toLowerCase().includes("rooftop")) || pool.highlights?.toLowerCase().includes("rooftop") || false
  },
  {
    id: "waterslides",
    name: "Waterslides",
    description: "Thrilling slides for all ages",
    icon: Zap,
    color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    activeColor: "bg-emerald-500 text-white",
    filter: (pool: typeof pools[0]) => pool.features?.some(f => f.toLowerCase().includes("waterslide") || f.toLowerCase().includes("water slide")) || false
  },
  {
    id: "tropical",
    name: "Tropical Paradise",
    description: "Oceanfront pools in exotic locations",
    icon: TreePalm,
    color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    activeColor: "bg-amber-500 text-white",
    filter: (pool: typeof pools[0]) => pool.region === "Asia" || pool.region === "Oceania" || pool.country === "Maldives" || pool.country === "Mexico"
  },
  {
    id: "heated",
    name: "Heated & Spa",
    description: "Year-round warmth and wellness",
    icon: Snowflake,
    color: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    activeColor: "bg-blue-500 text-white",
    filter: (pool: typeof pools[0]) => pool.features?.some(f => f.toLowerCase().includes("heated") || f.toLowerCase().includes("spa") || f.toLowerCase().includes("thermal")) ?? false
  },
  {
    id: "romantic",
    name: "Romantic Escapes",
    description: "Perfect pools for couples",
    icon: Heart,
    color: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    activeColor: "bg-rose-500 text-white",
    filter: (pool: typeof pools[0]) => pool.highlights?.toLowerCase().includes("romantic") || pool.highlights?.toLowerCase().includes("intimate") || pool.highlights?.toLowerCase().includes("honeymoon") || pool.country === "Maldives" || pool.country === "Greece"
  },
  {
    id: "family",
    name: "Family Friendly",
    description: "Safe fun for kids of all ages",
    icon: Baby,
    color: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    activeColor: "bg-orange-500 text-white",
    filter: (pool: typeof pools[0]) => pool.kidFriendly === true
  },
  {
    id: "unique",
    name: "Unique & Unusual",
    description: "One-of-a-kind swimming experiences",
    icon: Sparkles,
    color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    activeColor: "bg-purple-500 text-white",
    filter: (pool: typeof pools[0]) => pool.features?.some(f => f.toLowerCase().includes("glass") || f.toLowerCase().includes("cave") || f.toLowerCase().includes("floating")) || pool.highlights?.toLowerCase().includes("unique") || false
  }
]

export function PoolCategories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
  const activeCategory = categories.find(c => c.id === selectedCategory)
  const filteredPools = activeCategory ? pools.filter(activeCategory.filter).slice(0, 6) : []

  return (
    <section id="categories" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Browse by Pool Type
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find your perfect pool experience by exploring our curated categories
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {categories.map((category) => {
            const count = pools.filter(category.filter).length
            const isActive = selectedCategory === category.id
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(isActive ? null : category.id)}
                className={`group p-4 md:p-5 rounded-2xl border text-left transition-all ${
                  isActive 
                    ? "bg-primary text-primary-foreground border-primary shadow-lg scale-[1.02]" 
                    : "bg-card border-border hover:border-primary/50 hover:shadow-md"
                }`}
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center mb-3 transition-all ${
                  isActive ? "bg-white/20" : category.color
                }`}>
                  <category.icon className={`w-5 h-5 md:w-6 md:h-6 ${isActive ? "text-white" : ""}`} />
                </div>
                <h3 className={`font-semibold text-sm md:text-base mb-1 ${
                  isActive ? "text-white" : "text-foreground group-hover:text-primary"
                } transition-colors`}>
                  {category.name}
                </h3>
                <p className={`text-xs mb-2 line-clamp-2 ${
                  isActive ? "text-white/80" : "text-muted-foreground"
                }`}>
                  {category.description}
                </p>
                <span className={`text-xs font-semibold ${
                  isActive ? "text-white" : "text-primary"
                }`}>
                  {count} pools
                </span>
              </button>
            )
          })}
        </div>

        {/* Expanded Results Panel */}
        {selectedCategory && activeCategory && (
          <div className="mt-8 bg-card rounded-2xl border border-border p-6 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeCategory.activeColor}`}>
                  <activeCategory.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{activeCategory.name}</h3>
                  <p className="text-sm text-muted-foreground">{pools.filter(activeCategory.filter).length} pools in this category</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setSelectedCategory(null)}
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

                {pools.filter(activeCategory.filter).length > 6 && (
                  <div className="mt-6 text-center">
                    <Button 
                      variant="outline" 
                      className="rounded-full gap-2"
                      onClick={() => {
                        const element = document.getElementById('top-100')
                        element?.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      View All {pools.filter(activeCategory.filter).length} {activeCategory.name}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No pools found in this category with current data.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
