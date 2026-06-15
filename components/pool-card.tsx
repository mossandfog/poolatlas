"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin, Star, Award, Users, Baby, Eye, X, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Pool } from "@/lib/pool-data"
import { DiamondButton } from "@/components/diamond-button"

interface PoolCardProps {
  pool: Pool
  featured?: boolean
}

export function PoolCard({ pool, featured = false }: PoolCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className={`relative ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}>
      {/* Front of card */}
      {!isExpanded ? (
        <article 
          className="w-full bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
          onClick={() => setIsExpanded(true)}
        >
          <div className={`relative ${featured ? 'aspect-[16/10]' : 'aspect-[4/3]'} overflow-hidden`}>
            <Image
              src={pool.image}
              alt={`${pool.name} at ${pool.hotel}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-lg">#{pool.rank}</span>
              </div>
              {pool.kidFriendly && (
                <div className="w-6 h-6 rounded-full bg-chart-3/90 flex items-center justify-center shadow-md" title="Kid Friendly">
                  <Baby className="w-3.5 h-3.5 text-foreground" />
                </div>
              )}
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-2">
              <DiamondButton poolId={pool.id} size="sm" />
              <div className="flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
                <Star className="w-3 h-3 fill-accent text-accent" />
                <span className="text-xs font-medium text-foreground">{pool.rating}</span>
              </div>
            </div>

            {/* Bottom overlay with award badge */}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
              {pool.awards && pool.awards.length > 0 ? (
                <div className="flex items-center gap-1 bg-accent/90 backdrop-blur-sm rounded-full px-2 py-1 max-w-[70%]">
                  <Award className="w-3 h-3 text-accent-foreground flex-shrink-0" />
                  <span className="text-xs font-medium text-accent-foreground truncate">
                    {pool.awards[0]}
                  </span>
                </div>
              ) : (
                <div />
              )}
              <div className="flex items-center gap-1 bg-primary/90 backdrop-blur-sm rounded-full px-2 py-1 flex-shrink-0">
                <Eye className="w-3 h-3 text-primary-foreground" />
                <span className="text-xs font-medium text-primary-foreground hidden sm:inline">Details</span>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div>
                <h3 className={`font-[family-name:var(--font-display)] font-semibold text-foreground ${featured ? 'text-xl' : 'text-lg'}`}>
                  {pool.name}
                </h3>
                <p className="text-sm text-muted-foreground">{pool.hotel}</p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-muted-foreground mb-3">
              <MapPin className="w-3 h-3" />
              <span className="text-xs">{pool.location}, {pool.country}</span>
            </div>

            {featured && (
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {pool.description}
              </p>
            )}

            <div className="flex flex-wrap gap-1">
              {pool.features.slice(0, featured ? 4 : 2).map((feature) => (
                <Badge key={feature} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
              {pool.features.length > (featured ? 4 : 2) && (
                <Badge variant="secondary" className="text-xs">
                  +{pool.features.length - (featured ? 4 : 2)}
                </Badge>
              )}
            </div>
          </div>
        </article>
      ) : (
        /* Expanded details card */
        <article className="w-full bg-card rounded-2xl overflow-hidden border border-primary shadow-xl">
          {/* Header with image */}
          <div className="relative h-32 overflow-hidden">
            <Image
              src={pool.image}
              alt={`${pool.name} at ${pool.hotel}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
            
            <div className="absolute top-3 left-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold">#{pool.rank}</span>
              </div>
            </div>
            
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <DiamondButton poolId={pool.id} size="sm" />
              <Button 
                variant="secondary" 
                size="icon" 
                className="rounded-full w-8 h-8"
                onClick={() => setIsExpanded(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold text-foreground">{pool.name}</h3>
              <p className="text-sm text-muted-foreground">{pool.hotel}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-sm">{pool.location}, {pool.country}</span>
              <span className="text-xs px-2 py-0.5 bg-secondary rounded-full">{pool.region}</span>
            </div>

            <p className="text-sm text-foreground/80 leading-relaxed">
              {pool.description}
            </p>

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

            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-border">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-accent text-accent" />
                <span className="font-semibold text-foreground">{pool.rating}</span>
                <span className="text-xs text-muted-foreground">rating</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-primary" />
                <span className="font-semibold text-foreground">{pool.reviewCount.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground">reviews</span>
              </div>
              {pool.kidFriendly && (
                <div className="flex items-center gap-1.5">
                  <Baby className="w-4 h-4 text-chart-3" />
                  <span className="text-xs font-medium text-chart-3">Kid Friendly</span>
                </div>
              )}
            </div>

            {pool.awards && pool.awards.length > 0 && (
              <div className="pt-3 border-t border-border">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Awards</h4>
                <div className="flex flex-wrap gap-1.5">
                  {pool.awards.map((award) => (
                    <div key={award} className="flex items-center gap-1 bg-accent/20 text-accent-foreground rounded-full px-2 py-1">
                      <Award className="w-3 h-3" />
                      <span className="text-xs font-medium">{award}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-border">
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Sources</h4>
              <p className="text-xs text-primary">{pool.sources.join(' • ')}</p>
            </div>

            {/* Property Link */}
            <div className="pt-3 border-t border-border">
              <a
                href={pool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="default" size="sm" className="w-full rounded-full gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Visit Property Website
                </Button>
              </a>
            </div>
          </div>
        </article>
      )}
    </div>
  )
}
