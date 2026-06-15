"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ThumbsUp, CheckCircle, ChevronDown, Filter, Quote } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { pools } from "@/lib/pool-data"

interface Review {
  id: number
  poolId: number
  author: string
  avatar: string
  country: string
  rating: number
  date: string
  title: string
  content: string
  helpful: number
  verified: boolean
  tripType: "Honeymoon" | "Family" | "Solo" | "Business" | "Friends"
  photos?: string[]
}

// Sample reviews data
const reviews: Review[] = [
  {
    id: 1,
    poolId: 1,
    author: "Sarah M.",
    avatar: "/images/pool-1.jpg",
    country: "United Kingdom",
    rating: 5,
    date: "February 2026",
    title: "Absolutely breathtaking - worth every penny",
    content: "The infinity pool at Grace Santorini exceeded all expectations. Watching the sunset from the pool with a glass of champagne was the highlight of our honeymoon. The water is heated to perfection, and the views of the caldera are unmatched. Staff brought us cold towels and refreshments without even asking. A truly once-in-a-lifetime experience.",
    helpful: 234,
    verified: true,
    tripType: "Honeymoon"
  },
  {
    id: 2,
    poolId: 2,
    author: "James T.",
    avatar: "/images/pool-2.jpg",
    country: "Australia",
    rating: 5,
    date: "January 2026",
    title: "The most iconic pool in the world",
    content: "Swimming at Marina Bay Sands' infinity pool felt surreal. 57 floors up, looking over Singapore's skyline - it's exactly what you see in photos, but even more impressive in person. Go at sunrise to avoid crowds and get the best photos. The pool is only accessible to hotel guests, which keeps it exclusive.",
    helpful: 189,
    verified: true,
    tripType: "Solo"
  },
  {
    id: 3,
    poolId: 3,
    author: "Emma & David",
    avatar: "/images/pool-3.jpg",
    country: "Germany",
    rating: 5,
    date: "December 2025",
    title: "Bali paradise found",
    content: "Amankila's three-tier pool is a masterpiece of design. Each level offers a different perspective of the ocean and coastline. We spent entire days moving between pools, reading, swimming, and enjoying the incredible Balinese hospitality. The private beach club below is equally stunning.",
    helpful: 156,
    verified: true,
    tripType: "Honeymoon"
  },
  {
    id: 4,
    poolId: 5,
    author: "Michael R.",
    avatar: "/images/pool-4.jpg",
    country: "USA",
    rating: 5,
    date: "November 2025",
    title: "Desert oasis beyond imagination",
    content: "Amangiri is otherworldly. The pool wrapping around the natural sandstone rock formation is unlike anything I've ever experienced. The contrast of the cool blue water against the orange desert landscape is photographer's heaven. Perfect for those seeking solitude and connection with nature.",
    helpful: 203,
    verified: true,
    tripType: "Friends"
  },
  {
    id: 5,
    poolId: 4,
    author: "Claire B.",
    avatar: "/images/pool-5.jpg",
    country: "France",
    rating: 5,
    date: "August 2025",
    title: "French Riviera at its finest",
    content: "Hotel du Cap-Eden-Roc represents old-world glamour at its best. The saltwater pool carved into the rocks with the Mediterranean spread before you is simply magical. The service is impeccable - they remember your drink order from the day before. A must for anyone who appreciates classic luxury.",
    helpful: 178,
    verified: true,
    tripType: "Business"
  },
  {
    id: 6,
    poolId: 11,
    author: "Jennifer K.",
    avatar: "/images/pool-11.jpg",
    country: "Canada",
    rating: 5,
    date: "March 2026",
    title: "The Pitons view is unreal",
    content: "Jade Mountain's open-air infinity pool in our sanctuary suite made us feel like we were floating towards the Pitons. No fourth wall means you're completely immersed in the St. Lucian landscape. We watched hummingbirds visit while swimming! Truly the most romantic pool experience possible.",
    helpful: 267,
    verified: true,
    tripType: "Honeymoon"
  },
  {
    id: 7,
    poolId: 8,
    author: "Raj P.",
    avatar: "/images/pool-8.jpg",
    country: "India",
    rating: 5,
    date: "October 2025",
    title: "Royal treatment in Udaipur",
    content: "The Oberoi Udaivilas pool overlooking Lake Pichola with the City Palace in the distance is pure magic. Swimming at sunset while palace lights begin to twinkle is an experience that captures the essence of Indian royalty. The spa and dining are equally impressive.",
    helpful: 145,
    verified: true,
    tripType: "Family"
  },
  {
    id: 8,
    poolId: 9,
    author: "Anna S.",
    avatar: "/images/pool-9.jpg",
    country: "Sweden",
    rating: 5,
    date: "September 2025",
    title: "Unlike any pool on Earth",
    content: "The geothermal lagoon at The Retreat at Blue Lagoon is otherworldly. The milky blue water, steam rising, volcanic landscape - it feels like another planet. The private changing suite and in-water treatments take it to another level. Go during Northern Lights season for maximum magic.",
    helpful: 312,
    verified: true,
    tripType: "Solo"
  }
]

export function UserReviews() {
  const [sortBy, setSortBy] = useState("recent")
  const [filterRating, setFilterRating] = useState("all")
  const [showAll, setShowAll] = useState(false)

  const filteredReviews = reviews
    .filter(review => filterRating === "all" || review.rating === parseInt(filterRating))
    .sort((a, b) => {
      if (sortBy === "helpful") return b.helpful - a.helpful
      if (sortBy === "rating") return b.rating - a.rating
      return 0 // recent - keep original order
    })

  const displayedReviews = showAll ? filteredReviews : filteredReviews.slice(0, 4)

  const averageRating = (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4">Traveler Reviews</Badge>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-foreground mb-4">
            What Guests Are Saying
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real reviews from verified travelers who've experienced these incredible pools firsthand.
          </p>
        </div>

        {/* Review Stats - Just average rating */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-accent text-accent" />
              ))}
            </div>
            <span className="font-medium text-foreground">{averageRating}</span>
            <span>average rating</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] rounded-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="helpful">Most Helpful</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Select value={filterRating} onValueChange={setFilterRating}>
            <SelectTrigger className="w-[140px] rounded-full">
              <SelectValue placeholder="All Ratings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              <SelectItem value="5">5 Stars</SelectItem>
              <SelectItem value="4">4 Stars</SelectItem>
              <SelectItem value="3">3 Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedReviews.map((review) => {
            const pool = pools.find(p => p.id === review.poolId)
            
            return (
              <Card key={review.id} className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-secondary">
                      <div className="w-full h-full flex items-center justify-center text-lg font-bold text-muted-foreground">
                        {review.author.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{review.author}</span>
                        {review.verified && (
                          <span className="flex items-center gap-1 text-xs text-chart-3">
                            <CheckCircle className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{review.country} • {review.date}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {review.tripType}
                  </Badge>
                </div>

                {/* Pool Reference */}
                {pool && (
                  <div className="flex items-center gap-2 mb-3 p-2 bg-secondary/50 rounded-lg">
                    <div className="relative w-10 h-10 rounded overflow-hidden">
                      <Image src={pool.image} alt={pool.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{pool.name}</p>
                      <p className="text-xs text-muted-foreground">{pool.hotel}</p>
                    </div>
                  </div>
                )}

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? "fill-accent text-accent" : "text-muted"
                      }`}
                    />
                  ))}
                </div>

                {/* Content */}
                <h4 className="font-semibold text-foreground mb-2">{review.title}</h4>
                <div className="relative">
                  <Quote className="absolute -top-1 -left-1 w-6 h-6 text-primary/20" />
                  <p className="text-sm text-muted-foreground leading-relaxed pl-4">
                    {review.content}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                  <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <ThumbsUp className="w-4 h-4" />
                    Helpful ({review.helpful})
                  </button>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Show More */}
        {filteredReviews.length > 4 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => setShowAll(!showAll)}
              className="rounded-full gap-2"
            >
              {showAll ? "Show Less" : `Show All ${filteredReviews.length} Reviews`}
              <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? "rotate-180" : ""}`} />
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
