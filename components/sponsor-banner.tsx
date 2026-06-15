"use client"

import { X } from "lucide-react"
import { useState } from "react"

interface SponsorBannerProps {
  variant?: "top" | "inline" | "sidebar"
  className?: string
}

export function SponsorBanner({ variant = "inline", className = "" }: SponsorBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  if (variant === "top") {
    return (
      <div className={`bg-secondary border-b border-border ${className}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Sponsored</span>
              <div className="h-4 w-px bg-border" />
              <p className="text-sm text-foreground">
                <span className="font-semibold">Luxury Escapes</span> — Save up to 65% on 5-star hotels with incredible pools. 
                <a href="mailto:hello@poolatlas.io" className="text-primary hover:underline ml-1">Become a sponsor</a>
              </p>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (variant === "sidebar") {
    return (
      <div className={`bg-card border border-border rounded-2xl p-6 ${className}`}>
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-4">Advertisement</div>
        <div className="aspect-[4/5] bg-secondary rounded-xl flex items-center justify-center mb-4">
          <div className="text-center p-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl font-bold text-primary">LE</span>
            </div>
            <p className="font-[family-name:var(--font-display)] font-bold text-lg text-foreground mb-1">Luxury Escapes</p>
            <p className="text-sm text-muted-foreground mb-3">Dream pools, dreamy prices</p>
            <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">Up to 65% off</span>
          </div>
        </div>
        <a href="mailto:hello@poolatlas.io" className="block w-full text-center text-sm font-semibold text-primary hover:underline">
          Become a Sponsor
        </a>
      </div>
    )
  }

  // Inline banner (default)
  return (
    <div className={`bg-card border border-border rounded-2xl overflow-hidden ${className}`}>
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/3 bg-secondary aspect-[16/9] md:aspect-auto md:h-full flex items-center justify-center p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl font-bold text-primary">HG</span>
            </div>
            <p className="font-[family-name:var(--font-display)] font-bold text-xl text-foreground">Hotels.com</p>
          </div>
        </div>
        <div className="flex-1 p-6 md:p-8">
          <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Sponsored Partner</div>
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold text-foreground mb-2">
            Book Your Pool Paradise
          </h3>
          <p className="text-muted-foreground mb-4">
            Earn rewards on every booking. Collect 10 nights, get 1 free at hotels with world-class pools.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="mailto:hello@poolatlas.io" className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors">
              Become a Sponsor
            </a>
            <a href="/media-kit" className="inline-flex items-center px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold hover:bg-secondary/80 transition-colors">
              View Media Kit
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
