"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, MapPin, Check, X, ArrowLeftRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { pools } from "@/lib/pool-data"

export function ComparePools() {
  const [pool1Id, setPool1Id] = useState<string>("1")
  const [pool2Id, setPool2Id] = useState<string>("2")

  const pool1 = pools.find(p => p.id.toString() === pool1Id)
  const pool2 = pools.find(p => p.id.toString() === pool2Id)

  const allFeatures = [...new Set([...(pool1?.features || []), ...(pool2?.features || [])])]

  return (
    <section id="compare" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/20 rounded-full mb-3">
            <ArrowLeftRight className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Compare Tool</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Compare Pools Side by Side
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Can't decide between two amazing pools? Compare their features, ratings, and amenities.
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          {/* Pool Selectors */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/50 border-b border-border">
            <Select value={pool1Id} onValueChange={setPool1Id}>
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="Select first pool" />
              </SelectTrigger>
              <SelectContent>
                {pools.slice(0, 20).map((pool) => (
                  <SelectItem key={pool.id} value={pool.id.toString()}>
                    #{pool.rank} {pool.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={pool2Id} onValueChange={setPool2Id}>
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="Select second pool" />
              </SelectTrigger>
              <SelectContent>
                {pools.slice(0, 20).map((pool) => (
                  <SelectItem key={pool.id} value={pool.id.toString()}>
                    #{pool.rank} {pool.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pool Images */}
          <div className="grid grid-cols-2">
            {[pool1, pool2].map((pool, idx) => pool && (
              <div key={pool.id} className={`relative aspect-video ${idx === 0 ? 'border-r border-border' : ''}`}>
                <Image src={pool.image} alt={pool.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mb-2">
                    <span className="text-primary-foreground font-bold">#{pool.rank}</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] font-bold text-foreground text-lg">{pool.name}</h3>
                  <p className="text-sm text-muted-foreground">{pool.hotel}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="divide-y divide-border">
            {/* Rating */}
            <div className="grid grid-cols-3 text-center">
              <div className="p-4 flex items-center justify-center gap-1">
                <Star className="w-5 h-5 fill-accent text-accent" />
                <span className="font-bold text-lg text-foreground">{pool1?.rating}</span>
              </div>
              <div className="p-4 bg-secondary/30 text-sm font-semibold text-muted-foreground flex items-center justify-center">
                Rating
              </div>
              <div className="p-4 flex items-center justify-center gap-1">
                <Star className="w-5 h-5 fill-accent text-accent" />
                <span className="font-bold text-lg text-foreground">{pool2?.rating}</span>
              </div>
            </div>

            {/* Reviews */}
            <div className="grid grid-cols-3 text-center">
              <div className="p-4 font-semibold text-foreground">{pool1?.reviewCount.toLocaleString()}</div>
              <div className="p-4 bg-secondary/30 text-sm font-semibold text-muted-foreground">Reviews</div>
              <div className="p-4 font-semibold text-foreground">{pool2?.reviewCount.toLocaleString()}</div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-3 text-center">
              <div className="p-4 text-sm text-foreground flex items-center justify-center gap-1">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                {pool1?.country}
              </div>
              <div className="p-4 bg-secondary/30 text-sm font-semibold text-muted-foreground">Location</div>
              <div className="p-4 text-sm text-foreground flex items-center justify-center gap-1">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                {pool2?.country}
              </div>
            </div>

            {/* Kid Friendly */}
            <div className="grid grid-cols-3 text-center">
              <div className="p-4 flex justify-center">
                {pool1?.kidFriendly ? (
                  <Check className="w-5 h-5 text-chart-3" />
                ) : (
                  <X className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div className="p-4 bg-secondary/30 text-sm font-semibold text-muted-foreground">Kid Friendly</div>
              <div className="p-4 flex justify-center">
                {pool2?.kidFriendly ? (
                  <Check className="w-5 h-5 text-chart-3" />
                ) : (
                  <X className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </div>

            {/* Features */}
            {allFeatures.slice(0, 6).map((feature) => (
              <div key={feature} className="grid grid-cols-3 text-center">
                <div className="p-3 flex justify-center">
                  {pool1?.features.includes(feature) ? (
                    <Check className="w-4 h-4 text-chart-3" />
                  ) : (
                    <X className="w-4 h-4 text-muted-foreground/50" />
                  )}
                </div>
                <div className="p-3 bg-secondary/30 text-xs text-muted-foreground">{feature}</div>
                <div className="p-3 flex justify-center">
                  {pool2?.features.includes(feature) ? (
                    <Check className="w-4 h-4 text-chart-3" />
                  ) : (
                    <X className="w-4 h-4 text-muted-foreground/50" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
