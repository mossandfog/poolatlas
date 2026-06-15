"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { MapPin, Navigation, Loader2, Star, ChevronRight, AlertCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { pools } from "@/lib/pool-data"
import { poolCoordinates, calculateDistance, formatDistance } from "@/lib/pool-coordinates"

interface NearbyPool {
  pool: typeof pools[0]
  distance: number
}

export function NearbyPools() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "denied">("idle")
  const [nearbyPools, setNearbyPools] = useState<NearbyPool[]>([])
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [isExpanded, setIsExpanded] = useState(false)

  const findNearbyPools = () => {
    setStatus("loading")
    
    if (!navigator.geolocation) {
      setStatus("error")
      setErrorMessage("Geolocation is not supported by your browser")
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setUserLocation({ lat: latitude, lng: longitude })
        
        // Calculate distances for all pools with coordinates
        const poolsWithDistance: NearbyPool[] = pools
          .filter(pool => poolCoordinates[pool.id])
          .map(pool => {
            const coords = poolCoordinates[pool.id]
            const distance = calculateDistance(latitude, longitude, coords.lat, coords.lng)
            return { pool, distance }
          })
          .sort((a, b) => a.distance - b.distance)
          .slice(0, 6) // Get 6 nearest pools
        
        setNearbyPools(poolsWithDistance)
        setStatus("success")
        setIsExpanded(true)
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setStatus("denied")
          setErrorMessage("Location access was denied. Enable location to find pools near you.")
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setStatus("error")
          setErrorMessage("Location information is unavailable.")
        } else if (error.code === error.TIMEOUT) {
          setStatus("error")
          setErrorMessage("Location request timed out. Please try again.")
        } else {
          setStatus("error")
          setErrorMessage("An unknown error occurred.")
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000 // Cache for 5 minutes
      }
    )
  }

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 left-4 w-32 h-32 rounded-full border-2 border-primary" />
            <div className="absolute top-8 left-8 w-24 h-24 rounded-full border border-primary" />
            <div className="absolute bottom-4 right-4 w-20 h-20 rounded-full border-2 border-primary" />
          </div>
          
          <div className="relative p-6 sm:p-8">
            {status === "idle" && (
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Navigation className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Find Amazing Pools Near You
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Discover the world's best hotel pools closest to your location
                  </p>
                  <Button onClick={findNearbyPools} className="gap-2">
                    <MapPin className="w-4 h-4" />
                    Use My Location
                  </Button>
                </div>
              </div>
            )}

            {status === "loading" && (
              <div className="flex items-center justify-center gap-4 py-8">
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
                <span className="text-muted-foreground">Finding pools near you...</span>
              </div>
            )}

            {(status === "error" || status === "denied") && (
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-destructive/20 flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-destructive" />
                  </div>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Location Access Needed
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {errorMessage}
                  </p>
                  <Button onClick={findNearbyPools} variant="outline" className="gap-2">
                    <MapPin className="w-4 h-4" />
                    Try Again
                  </Button>
                </div>
              </div>
            )}

            {status === "success" && nearbyPools.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">
                        Pools Nearest You
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {nearbyPools.length} pools, sorted by distance
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-muted-foreground"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {isExpanded && (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {nearbyPools.map(({ pool, distance }, index) => (
                      <button
                        key={pool.id}
                        onClick={() => {
                          const element = document.getElementById('top-100')
                          element?.scrollIntoView({ behavior: 'smooth' })
                        }}
                        className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all text-left"
                      >
                        <div className="relative h-28 overflow-hidden">
                          <Image
                            src={pool.image}
                            alt={pool.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm text-xs">
                              #{pool.rank}
                            </Badge>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-primary text-primary-foreground text-xs">
                              {formatDistance(distance)}
                            </Badge>
                          </div>
                        </div>
                        <div className="p-3">
                          <h4 className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
                            {pool.hotel}
                          </h4>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{pool.location}, {pool.country}</span>
                          </div>
                          <div className="flex items-center gap-1 mt-2">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span className="text-xs font-medium">{pool.rating}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {!isExpanded && (
                  <button
                    onClick={() => setIsExpanded(true)}
                    className="w-full py-3 text-center text-sm text-primary hover:text-primary/80 transition-colors flex items-center justify-center gap-2"
                  >
                    Show {nearbyPools.length} nearby pools
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
