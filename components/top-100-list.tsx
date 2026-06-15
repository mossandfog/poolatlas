"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Star, Users, Baby, Award, ChevronDown, ChevronUp, Filter, ExternalLink, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { pools, regions, countries, continents, features as allFeatures } from "@/lib/pool-data"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const INITIAL_DISPLAY_COUNT = 25

export function Top100List() {
  const [expandedPool, setExpandedPool] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState("All Regions")
  const [selectedCountry, setSelectedCountry] = useState("All Countries")
  const [kidFriendlyOnly, setKidFriendlyOnly] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  const filteredPools = pools.filter((pool) => {
    if (selectedRegion !== "All Regions" && pool.region !== selectedRegion) return false
    if (selectedCountry !== "All Countries" && pool.country !== selectedCountry) return false
    if (kidFriendlyOnly && !pool.kidFriendly) return false
    if (selectedFeature && !pool.features.includes(selectedFeature)) return false
    return true
  })

  const availableCountries = selectedRegion === "All Regions" 
    ? countries 
    : [...new Set(pools.filter(p => p.region === selectedRegion).map(p => p.country))].sort()

  const displayedPools = showAll ? filteredPools : filteredPools.slice(0, INITIAL_DISPLAY_COUNT)
  const hasMorePools = filteredPools.length > INITIAL_DISPLAY_COUNT

  return (
    <section id="top-100" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span className="text-primary text-sm font-semibold">Complete Rankings</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Top 100 Hotel Pools Worldwide
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-3">
            The definitive list of the world&apos;s most exceptional hotel swimming pools, 
            aggregated from leading travel publications and guest reviews.
          </p>
          <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground/70">
            <RefreshCw className="w-3 h-3" />
            <span>Last updated: March 2026</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8 p-4 bg-card rounded-2xl border border-border">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Filter className="w-4 h-4" />
            <span className="font-medium">Filters:</span>
          </div>
          
          <Select value={selectedRegion} onValueChange={(v) => { setSelectedRegion(v); setSelectedCountry("All Countries"); }}>
            <SelectTrigger className="w-[150px] rounded-full">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              {continents.map((region) => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-[160px] rounded-full">
              <SelectValue placeholder="Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Countries">All Countries</SelectItem>
              {availableCountries.map((country) => (
                <SelectItem key={country} value={country}>{country}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedFeature || "all"} onValueChange={(v) => setSelectedFeature(v === "all" ? null : v)}>
            <SelectTrigger className="w-[160px] rounded-full">
              <SelectValue placeholder="Feature" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Features</SelectItem>
              {allFeatures.map((feature) => (
                <SelectItem key={feature} value={feature}>{feature}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant={kidFriendlyOnly ? "default" : "outline"}
            size="sm"
            className={`rounded-full gap-1.5 ${kidFriendlyOnly ? "shadow-sm" : ""}`}
            onClick={() => setKidFriendlyOnly(!kidFriendlyOnly)}
          >
            <Baby className="w-4 h-4" />
            Kid Friendly
          </Button>

          <div className="ml-auto text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredPools.length}</span> pools
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {displayedPools.map((pool) => (
            <div 
              key={pool.id}
              className={`bg-card rounded-2xl border transition-all duration-300 overflow-hidden ${
                expandedPool === pool.id ? 'border-primary shadow-lg' : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="w-full p-4 flex items-center gap-4 text-left cursor-pointer" onClick={() => setExpandedPool(expandedPool === pool.id ? null : pool.id)}>
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="text-primary-foreground font-bold">#{pool.rank}</span>
                </div>

                <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <Image
                    src={pool.image}
                    alt={pool.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Link
                      href={`/pools/${pool.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="font-[family-name:var(--font-display)] font-semibold text-foreground truncate hover:text-primary transition-colors"
                    >
                      {pool.name}
                    </Link>
                    {pool.kidFriendly && (
                      <Baby className="w-4 h-4 text-chart-3 shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{pool.hotel}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3" />
                    <span>{pool.country}</span>
                    <span className="mx-1">•</span>
                    <span>{pool.region}</span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-4 shrink-0">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span className="font-semibold text-foreground">{pool.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{pool.reviewCount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="shrink-0">
                  {expandedPool === pool.id ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
              </div>

              {expandedPool === pool.id && (
                <div className="px-4 pb-4 pt-0 border-t border-border">
                  <div className="pt-4 grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-foreground/80 leading-relaxed mb-4">
                        {pool.description}
                      </p>
                      
                      <div className="flex items-center gap-2 text-sm mb-3">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground">{pool.location}, {pool.country}</span>
                      </div>

                      <div className="flex sm:hidden items-center gap-4 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="font-semibold">{pool.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{pool.reviewCount.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Features</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {pool.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs rounded-full">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {pool.awards && pool.awards.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Awards</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {pool.awards.map((award) => (
                              <div key={award} className="flex items-center gap-1 bg-accent/20 rounded-full px-2 py-1">
                                <Award className="w-3 h-3 text-accent-foreground" />
                                <span className="text-xs font-medium text-accent-foreground">{award}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Sources</h4>
                        <p className="text-xs text-primary">{pool.sources.join(' • ')}</p>
                      </div>

                      {/* Links */}
                      <div className="pt-3 border-t border-border space-y-2">
                        <Link
                          href={`/pools/${pool.slug}`}
                          className="block"
                        >
                          <Button variant="default" size="sm" className="w-full rounded-full gap-1.5">
                            View Full Pool Page
                          </Button>
                        </Link>
                        <a
                          href={pool.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Button variant="outline" size="sm" className="w-full rounded-full gap-1.5">
                            <ExternalLink className="w-3.5 h-3.5" />
                            Visit Property Website
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Explore More Button */}
        {hasMorePools && !showAll && (
          <div className="text-center pt-8">
            <div className="inline-flex flex-col items-center gap-3">
              <p className="text-sm text-muted-foreground">
                Showing {displayedPools.length} of {filteredPools.length} pools
              </p>
              <Button 
                variant="outline" 
                size="lg"
                className="rounded-full gap-2 px-8"
                onClick={() => setShowAll(true)}
              >
                <ChevronDown className="w-4 h-4" />
                Explore {filteredPools.length - INITIAL_DISPLAY_COUNT} More Pools
              </Button>
            </div>
          </div>
        )}

        {showAll && hasMorePools && (
          <div className="text-center pt-6">
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

        {filteredPools.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No pools match your current filters.</p>
            <Button 
              variant="outline" 
              className="mt-4 rounded-full"
              onClick={() => {
                setSelectedRegion("All Regions")
                setSelectedCountry("All Countries")
                setSelectedFeature(null)
                setKidFriendlyOnly(false)
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
