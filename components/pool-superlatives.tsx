"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Crown, Lock, Waves, Zap, Skull, ChevronRight, X, MapPin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

const superlatives = [
  {
    id: "largest",
    title: "Largest Pool",
    subtitle: "World Record",
    icon: Waves,
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-500/10",
    textColor: "text-cyan-500",
    image: "/images/superlative-largest.jpg",
    poolName: "Crystal Lagoon",
    hotel: "San Alfonso del Mar",
    location: "Algarrobo, Chile",
    stat: "1,013m",
    statLabel: "length",
    description: "Stretching over 1 kilometer, this man-made saltwater lagoon holds 250 million liters of water. It's so large you can sail boats across it.",
    funFact: "It took 5 years to build and costs $4 million per year to maintain.",
    websiteUrl: "https://www.sanalfonso.cl"
  },
  {
    id: "exclusive",
    title: "Most Exclusive",
    subtitle: "Ultra VIP",
    icon: Lock,
    color: "from-amber-500 to-yellow-600",
    bgColor: "bg-amber-500/10",
    textColor: "text-amber-500",
    image: "/images/superlative-exclusive.jpg",
    poolName: "Royal Suite Pool",
    hotel: "North Island Seychelles",
    location: "North Island, Seychelles",
    stat: "$5,000+",
    statLabel: "per night",
    description: "With only 11 villas on the entire private island, each with its own plunge pool, this is where royalty and A-listers escape. Prince William and Kate honeymooned here.",
    funFact: "Guests arrive by helicopter and have a dedicated 'barefoot butler' team.",
    websiteUrl: "https://www.north-island.com"
  },
  {
    id: "deepest",
    title: "Deepest Pool",
    subtitle: "World Record",
    icon: Crown,
    color: "from-indigo-500 to-purple-600",
    bgColor: "bg-indigo-500/10",
    textColor: "text-indigo-500",
    image: "/images/superlative-deepest.jpg",
    poolName: "Deep Dive Dubai",
    hotel: "Deep Dive Dubai",
    location: "Dubai, UAE",
    stat: "60m",
    statLabel: "depth",
    description: "The world's deepest diving pool plunges 60 meters down and contains a sunken city to explore. It holds 14 million liters of freshwater kept at a balmy 30°C.",
    funFact: "It has underwater habitats where divers can remove their masks and breathe.",
    websiteUrl: "https://www.deepdivedubai.com"
  },
  {
    id: "slide",
    title: "Tallest Slide",
    subtitle: "Adrenaline Rush",
    icon: Zap,
    color: "from-orange-500 to-red-600",
    bgColor: "bg-orange-500/10",
    textColor: "text-orange-500",
    image: "/images/superlative-slide.jpg",
    poolName: "Kilimanjaro",
    hotel: "Aldeia das Águas Park",
    location: "Barra do Piraí, Brazil",
    stat: "49m",
    statLabel: "drop",
    description: "The world's tallest operating water slide plunges 49 meters (164 feet) down at speeds exceeding 60 mph. Located in Brazil's stunning Aldeia das Águas water park, it's not for the faint of heart.",
    funFact: "The slide is so steep that riders experience brief moments of weightlessness during the descent.",
    websiteUrl: "https://youtu.be/dsCAUiBITQQ?si=LmmBN926ttQbMuXb"
  },
  {
    id: "notorious",
    title: "Most Notorious",
    subtitle: "Dark History",
    icon: Skull,
    color: "from-slate-600 to-slate-800",
    bgColor: "bg-slate-500/10",
    textColor: "text-slate-400",
    image: "/images/superlative-notorious.jpg",
    poolName: "The Black Pool",
    hotel: "Hearst Castle",
    location: "San Simeon, California",
    stat: "1920s",
    statLabel: "Hollywood era",
    description: "William Randolph Hearst's Neptune Pool hosted the wildest parties of the Golden Age. Legends say guests included Charlie Chaplin, Greta Garbo, and Winston Churchill.",
    funFact: "The pool was built three times because Hearst kept demanding it be bigger and grander.",
    websiteUrl: "https://hearstcastle.org"
  }
]

export function PoolSuperlatives() {
  const [selectedSuperlative, setSelectedSuperlative] = useState<typeof superlatives[0] | null>(null)

  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Pool World Records</Badge>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            The Superlatives
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The biggest, deepest, wildest, and most exclusive pools on Earth. These aren't just pools - they're legends.
          </p>
        </div>

        {/* Superlative Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {superlatives.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setSelectedSuperlative(item)}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                {/* Background Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-60 mix-blend-multiply`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-between">
                  {/* Top Badge */}
                  <div className="flex justify-end">
                    <span className={`${item.bgColor} ${item.textColor} text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm`}>
                      {item.subtitle}
                    </span>
                  </div>
                  
                  {/* Bottom Content */}
                  <div className="text-white">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 shadow-lg`}>
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <h3 className="font-bold text-base sm:text-lg leading-tight mb-1 drop-shadow-lg">
                      {item.title}
                    </h3>
                    <p className="text-white/80 text-xs sm:text-sm font-medium">
                      {item.stat} {item.statLabel}
                    </p>
                  </div>
                </div>
                
                {/* Hover Arrow */}
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight className="w-4 h-4 text-white" />
                </div>
              </button>
            )
          })}
        </div>

        {/* Modal */}
        {selectedSuperlative && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setSelectedSuperlative(null)}
          >
            <div 
              className="relative w-full max-w-2xl bg-card rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedSuperlative(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Image Header */}
              <div className="relative h-56 sm:h-72">
                <Image
                  src={selectedSuperlative.image}
                  alt={selectedSuperlative.title}
                  fill
                  className="object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${selectedSuperlative.color} opacity-40 mix-blend-multiply`} />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                
                {/* Floating Badge */}
                <div className="absolute bottom-4 left-6">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${selectedSuperlative.color} text-white font-bold shadow-lg`}>
                    {(() => {
                      const Icon = selectedSuperlative.icon
                      return <Icon className="w-5 h-5" />
                    })()}
                    {selectedSuperlative.title}
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground mb-1">
                      {selectedSuperlative.poolName}
                    </h3>
                    <p className="text-muted-foreground font-medium">
                      {selectedSuperlative.hotel}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${selectedSuperlative.textColor}`}>
                      {selectedSuperlative.stat}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {selectedSuperlative.statLabel}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <MapPin className="w-4 h-4" />
                  {selectedSuperlative.location}
                </div>
                
                <p className="text-foreground/80 mb-4 leading-relaxed">
                  {selectedSuperlative.description}
                </p>
                
                <div className={`${selectedSuperlative.bgColor} rounded-xl p-4 mb-6`}>
                  <p className="text-sm">
                    <span className={`font-bold ${selectedSuperlative.textColor}`}>Fun Fact:</span>{" "}
                    <span className="text-foreground/80">{selectedSuperlative.funFact}</span>
                  </p>
                </div>
                
                {selectedSuperlative.websiteUrl !== "#" && (
                  <a 
                    href={selectedSuperlative.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button className="w-full gap-2">
                      Learn More <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
