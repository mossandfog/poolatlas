"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

type AdSize = "leaderboard" | "rectangle" | "sidebar" | "inline"

interface AdPlaceholderProps {
  size: AdSize
  className?: string
}

const adContent = {
  leaderboard: [
    {
      headline: "Escape to Paradise",
      subline: "Book luxury resorts with pools from $299/night",
      cta: "View Deals",
      brand: "Booking.com",
      image: "/images/pool-1.jpg"
    },
    {
      headline: "Marriott Bonvoy",
      subline: "Earn 3x points on resort stays this summer",
      cta: "Learn More",
      brand: "Marriott",
      image: "/images/pool-2.jpg"
    }
  ],
  rectangle: [
    {
      headline: "Travel Insurance",
      subline: "Protect your vacation from the unexpected",
      cta: "Get Quote",
      brand: "World Nomads",
      image: "/images/pool-3.jpg"
    },
    {
      headline: "Luxury Swimwear",
      subline: "Designer resort collections",
      cta: "Shop Now",
      brand: "REVOLVE",
      image: "/images/pool-4.jpg"
    }
  ],
  sidebar: [
    {
      headline: "Hotels.com Rewards",
      subline: "Stay 10 nights, get 1 free",
      cta: "Join Free",
      brand: "Hotels.com",
      image: "/images/pool-5.jpg"
    }
  ],
  inline: [
    {
      headline: "Flight + Hotel Deals",
      subline: "Save up to 40% when you bundle",
      cta: "Search Deals",
      brand: "Expedia",
      image: "/images/pool-6.jpg"
    },
    {
      headline: "Private Pool Villas",
      subline: "Exclusive vacation rentals worldwide",
      cta: "Explore",
      brand: "Vrbo",
      image: "/images/pool-7.jpg"
    }
  ]
}

const sizeStyles = {
  leaderboard: "w-full h-24 md:h-28",
  rectangle: "w-full aspect-[4/3] max-w-sm",
  sidebar: "w-full aspect-square max-w-xs",
  inline: "w-full h-20 md:h-24"
}

export function AdPlaceholder({ size, className = "" }: AdPlaceholderProps) {
  const [adIndex, setAdIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Randomize ad on mount
    const ads = adContent[size]
    setAdIndex(Math.floor(Math.random() * ads.length))
  }, [size])

  if (!mounted) {
    return (
      <div className={`${sizeStyles[size]} ${className} bg-muted/50 rounded-lg animate-pulse`} />
    )
  }

  const ad = adContent[size][adIndex]

  if (size === "leaderboard") {
    return (
      <div className={`${sizeStyles[size]} ${className} relative overflow-hidden rounded-xl border border-border bg-gradient-to-r from-secondary to-secondary/50 group cursor-pointer hover:border-primary/30 transition-colors`}>
        <div className="absolute inset-0 opacity-20">
          <Image
            src={ad.image}
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="relative h-full flex items-center justify-between px-6 md:px-10">
          <div className="flex-1">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Sponsored</p>
            <h4 className="font-semibold text-foreground text-lg md:text-xl">{ad.headline}</h4>
            <p className="text-sm text-muted-foreground hidden sm:block">{ad.subline}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground hidden md:block">{ad.brand}</span>
            <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full hover:bg-primary/90 transition-colors">
              {ad.cta}
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (size === "rectangle" || size === "sidebar") {
    return (
      <div className={`${sizeStyles[size]} ${className} relative overflow-hidden rounded-xl border border-border bg-card group cursor-pointer hover:border-primary/30 transition-colors`}>
        <div className="absolute inset-0">
          <Image
            src={ad.image}
            alt=""
            fill
            className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="text-[10px] text-white/60 uppercase tracking-wider mb-1">Sponsored · {ad.brand}</p>
          <h4 className="font-semibold text-white text-base mb-1">{ad.headline}</h4>
          <p className="text-xs text-white/80 mb-3">{ad.subline}</p>
          <button className="px-3 py-1.5 bg-white text-black text-xs font-medium rounded-full hover:bg-white/90 transition-colors">
            {ad.cta}
          </button>
        </div>
      </div>
    )
  }

  // Inline ad
  return (
    <div className={`${sizeStyles[size]} ${className} relative overflow-hidden rounded-lg border border-border bg-secondary/50 group cursor-pointer hover:border-primary/30 hover:bg-secondary transition-colors`}>
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32">
        <Image
          src={ad.image}
          alt=""
          fill
          className="object-cover"
        />
      </div>
      <div className="h-full flex items-center justify-between pl-28 md:pl-36 pr-4">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Sponsored · {ad.brand}</p>
          <h4 className="font-medium text-foreground text-sm truncate">{ad.headline}</h4>
          <p className="text-xs text-muted-foreground truncate hidden sm:block">{ad.subline}</p>
        </div>
        <button className="ml-3 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-medium rounded-full hover:bg-primary/90 transition-colors whitespace-nowrap">
          {ad.cta}
        </button>
      </div>
    </div>
  )
}
