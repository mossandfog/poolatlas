"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronDown, Waves } from "lucide-react"
import { PoolSearch } from "@/components/pool-search"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-pool.jpg"
          alt="Stunning infinity pool overlooking the ocean"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto py-20">
        <div 
          className={`inline-flex items-center gap-2 px-4 py-2 bg-black rounded-full mb-6 transition-all duration-700 shadow-lg ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Waves className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-medium">
            Powered by Travel + Leisure, Conde Nast Traveler & More
          </span>
        </div>
        
        <h1 
          className={`font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Discover the World&apos;s <span className="text-primary">Best Pools</span>
        </h1>
        
        <p 
          className={`text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 text-pretty transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Find your perfect pool paradise. Search 109 stunning hotel pools ranked by experts and travelers worldwide.
        </p>

        {/* AI Search Bar */}
        <div 
          className={`mb-12 transition-all duration-700 delay-450 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <PoolSearch />
        </div>

        <a 
          href="#top-100" 
          className={`inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-all duration-700 delay-500 font-medium ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Browse All Rankings
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </a>
      </div>

      {/* Stats */}
      <div className="absolute bottom-0 left-0 right-0 bg-card/80 backdrop-blur-md border-t border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex justify-center gap-6 sm:gap-8 md:gap-16 text-center">
            <div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">109</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Pools Ranked</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">50+</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Countries</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">6</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Continents</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">9.5</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">Avg Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
