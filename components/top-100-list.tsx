"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Baby, Award, ChevronDown, ChevronUp, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { pools, regions, countries, continents, features as allFeatures } from "@/lib/pool-data"
import { RANKINGS_REVIEWED } from "@/lib/editorial-calendar"
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
    <section id="rankings" className="scroll-mt-20 py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-secondary/40">
      {/* Old links pointed at #top-100; keep them landing here */}
      <span id="top-100" className="block relative -top-20" aria-hidden="true" />
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold tracking-[-0.025em] text-foreground">
              The rankings
            </h2>
            <p className="mt-2 text-muted-foreground max-w-xl">
              Every pool, ranked against the travel press and guest reviews. Reviewed {RANKINGS_REVIEWED}.
            </p>
          </div>
          <Link href="/about#how-we-rank" className="text-sm font-medium text-primary hover:underline underline-offset-4">
            How we rank
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="sr-only">Filter the rankings</span>

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
            Good for kids
          </Button>

          <div className="ml-auto text-sm text-muted-foreground tabular-nums" aria-live="polite">
            {filteredPools.length} {filteredPools.length === 1 ? "pool" : "pools"}
          </div>
        </div>

        {/* List */}
        <ol className="bg-card rounded-2xl border border-border divide-y divide-border overflow-hidden">
          {displayedPools.map((pool) => (
            <li
              key={pool.id}
              className={`transition-colors ${expandedPool === pool.id ? 'bg-secondary/40' : ''}`}
            >
              <div
                role="button"
                tabIndex={0}
                aria-expanded={expandedPool === pool.id}
                className="w-full px-3 py-3 sm:px-5 sm:py-4 flex items-center gap-2.5 sm:gap-5 text-left cursor-pointer hover:bg-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                onClick={() => setExpandedPool(expandedPool === pool.id ? null : pool.id)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpandedPool(expandedPool === pool.id ? null : pool.id) } }}
              >
                <span
                  className={`w-7 sm:w-12 shrink-0 text-right font-[family-name:var(--font-display)] text-xl sm:text-2xl font-semibold tabular-nums tracking-tight ${
                    pool.rank <= 3 ? 'text-primary' : 'text-foreground/35'
                  }`}
                >
                  {pool.rank}
                </span>

                <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden shrink-0 bg-muted">
                  <Image
                    src={pool.image}
                    alt={pool.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-grow min-w-0">
                  <Link
                    href={`/pools/${pool.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="font-[family-name:var(--font-display)] font-semibold leading-snug text-foreground line-clamp-2 hover:text-primary transition-colors"
                  >
                    {pool.name}
                    {pool.kidFriendly && (
                      <Baby className="inline-block w-3.5 h-3.5 ml-1.5 -mt-0.5 text-chart-3" aria-label="Good for kids" />
                    )}
                  </Link>
                  <p className="text-sm text-muted-foreground truncate">{pool.hotel}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{pool.location}, {pool.country}</p>
                </div>

                <div className="flex items-center gap-1 shrink-0 tabular-nums">
                  <Star className="w-4 h-4 fill-accent text-accent" aria-hidden="true" />
                  <span className="font-semibold text-foreground">{pool.rating.toFixed(1)}</span>
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
                <div className="px-4 sm:pl-[10.75rem] sm:pr-5 pb-5 pt-0">
                  <div className="pt-4 grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {pool.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2">Features</h4>
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
                          <h4 className="text-sm font-medium text-foreground mb-2">Awards</h4>
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
                        <h4 className="text-sm font-medium text-foreground mb-1">Sources</h4>
                        <p className="text-sm text-muted-foreground">{pool.sources.join(', ')}</p>
                      </div>

                      {/* Links */}
                      <div className="pt-3 border-t border-border space-y-2">
                        <Link
                          href={`/pools/${pool.slug}`}
                          className="block"
                        >
                          <Button variant="default" size="sm" className="w-full rounded-full gap-1.5">
                            See the pool
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
                            Visit the hotel
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ol>

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
                Show {filteredPools.length - INITIAL_DISPLAY_COUNT} more pools
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
              Show fewer
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
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
