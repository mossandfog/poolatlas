"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, MapPin, Award, Calendar, ArrowRight, Sparkles, ExternalLink, Users, CheckCircle2, X, Baby, Waves, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { pools } from "@/lib/pool-data"

export function FeaturedPool() {
  const [isExpanded, setIsExpanded] = useState(false)
  // Feature the #1 ranked pool
  const featuredPool = pools[0]
  
  return (
    <section id="featured" className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/20 rounded-full mb-3">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent">Pool of the Month</span>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-foreground">
              March 2026 Featured Pool
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Updated Monthly</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={featuredPool.image}
              alt={featuredPool.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-xl">#1</span>
              </div>
              {featuredPool.awards && featuredPool.awards.length > 0 && (
                <div className="flex items-center gap-1 bg-accent text-accent-foreground rounded-full px-3 py-1.5 shadow-lg">
                  <Award className="w-4 h-4" />
                  <span className="text-sm font-semibold">{featuredPool.awards[0]}</span>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-2">
                {featuredPool.name}
              </h3>
              <p className="text-xl text-primary font-semibold mb-1">{featuredPool.hotel}</p>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{featuredPool.location}, {featuredPool.country}</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-3 py-1.5 bg-accent/20 rounded-full">
                  <Star className="w-5 h-5 fill-accent text-accent" />
                  <span className="font-bold text-lg text-foreground">{featuredPool.rating}</span>
                </div>
                <span className="text-sm text-muted-foreground">/ 10</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Based on <span className="font-semibold text-foreground">{featuredPool.reviewCount.toLocaleString()}</span> reviews
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {featuredPool.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {featuredPool.features.map((feature) => (
                <Badge key={feature} variant="secondary" className="px-3 py-1.5 text-sm">
                  {feature}
                </Badge>
              ))}
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                <span className="font-semibold">Sources:</span> {featuredPool.sources.join(", ")}
              </p>
              <Button 
                className="rounded-full" 
                size="lg"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <>
                    Close Details
                    <ChevronUp className="w-4 h-4 ml-2" />
                  </>
                ) : (
                  <>
                    Explore This Pool
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Expanded Details Panel */}
        {isExpanded && (
          <div className="mt-8 bg-card rounded-3xl border border-border p-6 md:p-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-foreground">Complete Pool Details</h4>
              <Button variant="ghost" size="icon" onClick={() => setIsExpanded(false)} className="rounded-full">
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Quick Facts */}
              <div className="space-y-4">
                <h5 className="font-semibold text-foreground flex items-center gap-2">
                  <Waves className="w-4 h-4 text-primary" />
                  Quick Facts
                </h5>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Region:</span>
                    <span className="font-medium text-foreground">{featuredPool.region}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Ranking:</span>
                    <span className="font-medium text-foreground">#{featuredPool.rank} Worldwide</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Rating:</span>
                    <span className="font-medium text-foreground">{featuredPool.rating}/10</span>
                  </li>
                  <li className="flex items-center gap-2">
                    {featuredPool.kidFriendly ? (
                      <>
                        <Baby className="w-4 h-4 text-chart-3" />
                        <span className="font-medium text-foreground">Family Friendly</span>
                      </>
                    ) : (
                      <>
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium text-foreground">Adults Preferred</span>
                      </>
                    )}
                  </li>
                </ul>
              </div>

              {/* Awards & Recognition */}
              <div className="space-y-4">
                <h5 className="font-semibold text-foreground flex items-center gap-2">
                  <Award className="w-4 h-4 text-accent" />
                  Awards & Recognition
                </h5>
                {featuredPool.awards && featuredPool.awards.length > 0 ? (
                  <ul className="space-y-2">
                    {featuredPool.awards.map((award, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Star className="w-3 h-3 text-accent" />
                        </div>
                        <span className="text-foreground">{award}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No awards listed</p>
                )}
                
                <div className="pt-4">
                  <p className="text-xs text-muted-foreground mb-2">Featured in:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {featuredPool.sources.map((source) => (
                      <span key={source} className="text-xs bg-secondary px-2 py-1 rounded-full text-foreground">
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Book Your Stay */}
              <div className="space-y-4">
                <h5 className="font-semibold text-foreground flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  Plan Your Visit
                </h5>
                <p className="text-sm text-muted-foreground">
                  Experience the world&apos;s #1 rated hotel pool. Check availability and rates for your preferred dates.
                </p>
                <div className="pt-2">
                  <a
                    href={featuredPool.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button className="w-full rounded-full gap-2" size="lg">
                      <ExternalLink className="w-4 h-4" />
                      Visit Official Website
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* All Features */}
            <div className="mt-8 pt-6 border-t border-border">
              <h5 className="font-semibold text-foreground mb-4">All Pool Features</h5>
              <div className="flex flex-wrap gap-2">
                {featuredPool.features.map((feature) => (
                  <div 
                    key={feature} 
                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span className="font-medium text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
