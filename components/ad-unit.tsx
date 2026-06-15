"use client"

import { useEffect, useRef } from "react"

interface AdUnitProps {
  slot?: string
  format?: "auto" | "horizontal" | "vertical" | "rectangle"
  className?: string
}

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

export function AdUnit({ slot = "auto", format = "horizontal", className = "" }: AdUnitProps) {
  const adRef = useRef<HTMLModElement>(null)
  const isAdLoaded = useRef(false)

  useEffect(() => {
    if (adRef.current && !isAdLoaded.current) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
        isAdLoaded.current = true
      } catch (err) {
        console.error("AdSense error:", err)
      }
    }
  }, [])

  return (
    <div className={`ad-container w-full flex justify-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ 
          display: "block",
          width: "100%",
          minHeight: format === "horizontal" ? "90px" : "250px"
        }}
        data-ad-client="ca-pub-5086388610472430"
        data-ad-slot={slot}
        data-ad-format={format === "auto" ? "auto" : undefined}
        data-full-width-responsive="true"
      />
    </div>
  )
}

// Wrapper component for consistent styling
export function AdBanner({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full py-6 ${className}`}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-xl overflow-hidden bg-secondary/30 border border-border/50">
          <AdUnit format="horizontal" />
        </div>
        <p className="text-[10px] text-muted-foreground/50 text-center mt-1">Advertisement</p>
      </div>
    </div>
  )
}
