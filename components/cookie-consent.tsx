"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Cookie, X, Settings, Shield } from "lucide-react"
import Link from "next/link"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
    personalization: true,
  })

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      // Delay showing banner for better UX
      const timer = setTimeout(() => setShowBanner(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      personalization: true,
      timestamp: new Date().toISOString()
    }))
    setShowBanner(false)
  }

  const acceptSelected = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      ...preferences,
      timestamp: new Date().toISOString()
    }))
    setShowBanner(false)
    setShowSettings(false)
  }

  const rejectAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      personalization: false,
      timestamp: new Date().toISOString()
    }))
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-sm z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden">
        {!showSettings ? (
          // Compact Banner
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Cookie className="w-4 h-4 text-primary flex-shrink-0" />
              <p className="text-sm text-muted-foreground">
                We use cookies to improve your experience.{" "}
                <Link href="/privacy" className="text-primary hover:underline">Learn more</Link>
              </p>
              <button 
                onClick={rejectAll}
                className="text-muted-foreground hover:text-foreground transition-colors ml-auto flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={acceptAll} className="rounded-full flex-1 h-9 text-xs shadow-sm">
                Accept All
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowSettings(true)} className="rounded-full h-9 text-xs gap-1">
                <Settings className="w-3 h-3" />
                Settings
              </Button>
            </div>
          </div>
        ) : (
            // Compact Settings Panel
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Cookie Settings</span>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between py-1.5">
                <span className="text-xs text-muted-foreground">Essential</span>
                <span className="text-xs text-primary">Always on</span>
              </div>
              
              <label className="flex items-center justify-between py-1.5 cursor-pointer">
                <span className="text-xs text-muted-foreground">Analytics</span>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
              </label>

              <label className="flex items-center justify-between py-1.5 cursor-pointer">
                <span className="text-xs text-muted-foreground">Marketing</span>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                />
              </label>
            </div>

            <div className="flex gap-2">
              <Button size="sm" onClick={acceptSelected} className="rounded-full flex-1 h-8 text-xs">
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={acceptAll} className="rounded-full h-8 text-xs">
                Accept All
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
