"use client"

import { useState, useMemo } from "react"
import { PoolCard } from "@/components/pool-card"
import { Button } from "@/components/ui/button"
import { pools, regions, countries, features, sortOptions } from "@/lib/pool-data"
import { Filter, SlidersHorizontal, ChevronDown, ChevronUp, Baby, MapPin, Globe, Sparkles } from "lucide-react"

const INITIAL_DISPLAY_COUNT = 12

export function PoolGrid() {
  const [selectedRegion, setSelectedRegion] = useState("All Regions")
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [kidFriendlyOnly, setKidFriendlyOnly] = useState(false)
  const [sortBy, setSortBy] = useState("rank")
  const [showFilters, setShowFilters] = useState(false)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showAll, setShowAll] = useState(false)

  const filteredAndSortedPools = useMemo(() => {
    let result = pools.filter((pool) => {
      if (selectedRegion !== "All Regions" && pool.region !== selectedRegion) {
        return false
      }
      if (selectedCountry && pool.country !== selectedCountry) {
        return false
      }
      if (kidFriendlyOnly && !pool.kidFriendly) {
        return false
      }
      if (selectedFeatures.length > 0) {
        const hasAllFeatures = selectedFeatures.every(f => 
          f === "Kid Friendly" ? pool.kidFriendly : pool.features.includes(f)
        )
        if (!hasAllFeatures) return false
      }
      return true
    })

    // Sort
    switch (sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "reviews":
        result.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        result.sort((a, b) => a.rank - b.rank)
    }

    return result
  }, [selectedRegion, selectedCountry, selectedFeatures, kidFriendlyOnly, sortBy])

  const displayedPools = showAll ? filteredAndSortedPools : filteredAndSortedPools.slice(0, INITIAL_DISPLAY_COUNT)
  const hasMorePools = filteredAndSortedPools.length > INITIAL_DISPLAY_COUNT

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    )
  }

  const clearFilters = () => {
    setSelectedRegion("All Regions")
    setSelectedCountry(null)
    setSelectedFeatures([])
    setKidFriendlyOnly(false)
    setSortBy("rank")
  }

  const activeFilterCount = [
    selectedRegion !== "All Regions",
    selectedCountry !== null,
    selectedFeatures.length > 0,
    kidFriendlyOnly
  ].filter(Boolean).length

  return (
    <section id="rankings" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
        <div>
          <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Global Rankings
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold text-foreground">
            Top Rated Hotel Pools
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant={showFilters ? "default" : "outline"}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="rounded-full"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-2 px-2 py-0.5 text-xs bg-accent text-accent-foreground rounded-full">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-8 p-6 bg-card rounded-2xl border border-border shadow-sm">
          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Button
              variant={kidFriendlyOnly ? "default" : "outline"}
              size="sm"
              onClick={() => setKidFriendlyOnly(!kidFriendlyOnly)}
              className="rounded-full"
            >
              <Baby className="w-4 h-4 mr-2" />
              Kid Friendly
            </Button>
          </div>

          {/* Region Filter */}
          <div className="mb-6">
            <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" />
              Region
            </p>
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Button
                  key={region.name}
                  variant={selectedRegion === region.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedRegion(region.name)
                    setSelectedCountry(null)
                  }}
                  className="rounded-full"
                >
                  {region.name} ({region.count})
                </Button>
              ))}
            </div>
          </div>

          {/* Country Filter */}
          <div className="mb-6">
            <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Country
            </p>
            <div className="relative">
              <button
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center justify-between w-full max-w-xs px-4 py-2 bg-secondary rounded-full text-sm text-secondary-foreground"
              >
                {selectedCountry || "All Countries"}
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              {showCountryDropdown && (
                <div className="absolute top-full mt-2 w-full max-w-xs bg-card border border-border rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                  <button
                    onClick={() => {
                      setSelectedCountry(null)
                      setShowCountryDropdown(false)
                    }}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors"
                  >
                    All Countries
                  </button>
                  {countries.map((country) => (
                    <button
                      key={country}
                      onClick={() => {
                        setSelectedCountry(country)
                        setShowCountryDropdown(false)
                      }}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors ${
                        selectedCountry === country ? "bg-primary/10 text-primary" : ""
                      }`}
                    >
                      {country}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Features Filter */}
          <div className="mb-6">
            <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" />
              Features
            </p>
            <div className="flex flex-wrap gap-2">
              {features.filter(f => f !== "Kid Friendly").map((feature) => (
                <Button
                  key={feature}
                  variant={selectedFeatures.includes(feature) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFeature(feature)}
                  className="rounded-full"
                >
                  {feature}
                </Button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <div className="flex gap-1">
                {sortOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={sortBy === option.value ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSortBy(option.value)}
                    className="rounded-full"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </div>

            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="ml-auto text-muted-foreground hover:text-foreground"
              >
                Clear all filters
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Results Count */}
      <p className="text-sm text-muted-foreground mb-6">
        Showing <span className="font-semibold text-foreground">{filteredAndSortedPools.length}</span> pools
        {selectedRegion !== "All Regions" && <span> in {selectedRegion}</span>}
        {selectedCountry && <span> ({selectedCountry})</span>}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedPools.map((pool, index) => (
          <PoolCard 
            key={pool.id} 
            pool={pool} 
            featured={index === 0 && sortBy === "rank"}
          />
        ))}
      </div>

      {/* Expand/Collapse Button */}
      {hasMorePools && !showAll && (
        <div className="text-center pt-10">
          <div className="inline-flex flex-col items-center gap-3">
            <p className="text-sm text-muted-foreground">
              Showing {displayedPools.length} of {filteredAndSortedPools.length} pools
            </p>
            <Button 
              variant="outline" 
              size="lg"
              className="rounded-full gap-2 px-8"
              onClick={() => setShowAll(true)}
            >
              <ChevronDown className="w-4 h-4" />
              Explore {filteredAndSortedPools.length - INITIAL_DISPLAY_COUNT} More Pools
            </Button>
          </div>
        </div>
      )}

      {showAll && hasMorePools && (
        <div className="text-center pt-8">
          <Button 
            variant="ghost" 
            size="sm"
            className="rounded-full gap-2 text-muted-foreground"
            onClick={() => setShowAll(false)}
          >
            <ChevronUp className="w-4 h-4" />
            Show Less
          </Button>
        </div>
      )}

      {filteredAndSortedPools.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
            <Filter className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No pools found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your filters to see more results.</p>
          <Button onClick={clearFilters} variant="outline" className="rounded-full">
            Clear all filters
          </Button>
        </div>
      )}
    </section>
  )
}
