"use client"

import Image from "next/image"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    quote: "Pool Atlas helped us discover the most incredible infinity pool in Bali. The rankings were spot-on and the research saved us hours of planning.",
    author: "Jessica M.",
    location: "Los Angeles, CA",
    rating: 5,
    poolVisited: "Amankila, Bali",
    avatar: "/images/avatars/jessica.jpg"
  },
  {
    id: 2,
    quote: "As a travel blogger, I rely on accurate information. Pool Atlas has become my go-to resource for finding photogenic pools around the world.",
    author: "David Chen",
    location: "Singapore",
    rating: 5,
    poolVisited: "Marina Bay Sands",
    avatar: "/images/avatars/david.jpg"
  },
  {
    id: 3,
    quote: "We planned our entire honeymoon around Pool Atlas recommendations. Every single pool exceeded our expectations!",
    author: "Sophie & James",
    location: "London, UK",
    rating: 5,
    poolVisited: "Grace Santorini",
    avatar: "/images/avatars/sophie-james.jpg"
  }
]

export function Testimonials() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Trusted by Pool Enthusiasts
          </h2>
          <p className="text-muted-foreground">
            See what travelers are saying about Pool Atlas
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="p-6 bg-card rounded-2xl border border-border"
            >
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-foreground mb-4 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <div className="pt-4 border-t border-border flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  <p className="text-xs text-primary">Visited: {testimonial.poolVisited}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
