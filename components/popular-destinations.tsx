"use client"

import Image from "next/image"
import { MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { pools } from "@/lib/pool-data"

const destinations = [
  { 
    name: "Bali, Indonesia",
    country: "Indonesia",
    poolCount: 8,
    image: "/images/pool-5.jpg",
    tagline: "Tropical jungle pools"
  },
  { 
    name: "Santorini, Greece",
    country: "Greece", 
    poolCount: 5,
    image: "/images/pool-1.jpg",
    tagline: "Caldera views"
  },
  { 
    name: "Maldives",
    country: "Maldives",
    poolCount: 6,
    image: "/images/pool-3.jpg",
    tagline: "Overwater villas"
  },
  { 
    name: "Dubai, UAE",
    country: "UAE",
    poolCount: 4,
    image: "/images/pool-2.jpg",
    tagline: "Luxury towers"
  },
  { 
    name: "French Riviera",
    country: "France",
    poolCount: 3,
    image: "/images/pool-6.jpg",
    tagline: "Mediterranean glamour"
  },
  { 
    name: "Utah, USA",
    country: "USA",
    poolCount: 2,
    image: "/images/pool-4.jpg",
    tagline: "Desert escapes"
  }
]

export function PopularDestinations() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-foreground mb-2">
              Popular Destinations
            </h2>
            <p className="text-muted-foreground">Explore world-class pools by location</p>
          </div>
          <Button variant="outline" className="hidden sm:flex rounded-full">
            View All Destinations
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {destinations.map((destination, index) => (
            <div 
              key={destination.name}
              className={`relative rounded-2xl overflow-hidden ${
                index === 0 ? 'col-span-2 md:col-span-1 md:row-span-2' : ''
              }`}
            >
              <div className={`relative ${index === 0 ? 'aspect-[4/3] md:aspect-[3/4]' : 'aspect-[4/3]'}`}>
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-1 text-primary mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm font-medium">{destination.tagline}</span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-bold text-foreground mb-1">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {destination.poolCount} ranked pools
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Button variant="outline" className="w-full rounded-full">
            View All Destinations
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
