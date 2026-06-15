"use client"

import Image from "next/image"
import { Clock, ChevronRight } from "lucide-react"

const historyTimeline = [
  {
    era: "2600 BCE",
    title: "The Great Bath of Mohenjo-daro",
    description: "The world's earliest known public water tank, discovered in present-day Pakistan. This sophisticated brick-lined pool measured 12 meters long and featured a complex drainage system, revealing humanity's ancient desire for communal bathing spaces.",
    image: "/images/history/mohenjo-daro-bath.jpg",
    fact: "The Great Bath was waterproofed with natural tar"
  },
  {
    era: "1st Century BCE",
    title: "Roman Thermae",
    description: "The Romans elevated swimming pools to an art form with their elaborate thermae (public baths). These architectural marvels featured heated pools (caldarium), warm rooms (tepidarium), and cold plunge pools (frigidarium), establishing the blueprint for modern spas.",
    image: "/images/history/ancient-roman-bath.jpg",
    fact: "Rome's Baths of Caracalla could accommodate 1,600 bathers"
  },
  {
    era: "1920s",
    title: "The Golden Age of Swimming",
    description: "The roaring twenties brought swimming into the mainstream. Grand hotels built ornate pools as symbols of luxury and modernity. Swimming became fashionable, and poolside culture emerged as a social phenomenon among the elite.",
    image: "/images/history/1920s-pool-party.jpg",
    fact: "The first Olympic-sized pool was built for the 1924 Paris Games"
  },
  {
    era: "1950s-60s",
    title: "The Resort Pool Revolution",
    description: "Post-war prosperity and the rise of leisure travel transformed hotel pools into destinations themselves. Palm Springs, Miami, and the French Riviera pioneered the glamorous poolside lifestyle that continues to define luxury hospitality today.",
    image: "/images/history/1950s-hotel-pool.jpg",
    fact: "The kidney-shaped pool became an icon of mid-century design"
  }
]

export function PoolHistory() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary border-y border-border">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-semibold">Through the Ages</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Dive Into the History of Swimming Pools
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From ancient civilizations to modern luxury resorts, the swimming pool has been 
            a symbol of relaxation, status, and human ingenuity for over 4,000 years.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 sm:left-1/2 top-0 bottom-0 w-px bg-border transform sm:-translate-x-1/2" />
          
          <div className="space-y-12 sm:space-y-16">
            {historyTimeline.map((item, index) => (
              <div 
                key={item.era}
                className={`relative flex flex-col sm:flex-row gap-6 sm:gap-12 ${
                  index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Era marker */}
                <div className="absolute left-0 sm:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-secondary transform -translate-x-1/2 z-10" />
                
                {/* Content */}
                <div className={`flex-1 pl-8 sm:pl-0 ${index % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                  <span className="inline-block text-primary font-mono text-sm font-bold mb-2">
                    {item.era}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                    {item.description}
                  </p>
                  <div className={`inline-flex items-center gap-2 text-xs text-primary ${
                    index % 2 === 0 ? 'sm:flex-row-reverse' : ''
                  }`}>
                    <ChevronRight className="w-3 h-3" />
                    <span className="italic">{item.fact}</span>
                  </div>
                </div>

                {/* Image */}
                <div className={`flex-1 pl-8 sm:pl-0 ${index % 2 === 0 ? 'sm:pl-12' : 'sm:pr-12'}`}>
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-border shadow-md">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover sepia hover:sepia-0 transition-all duration-700"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Today's luxury hotel pools carry forward this rich legacy, combining ancient principles 
            of relaxation with cutting-edge design and sustainability.
          </p>
        </div>
      </div>
    </section>
  )
}
