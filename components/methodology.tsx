import { Award, BookOpen, Globe, Users } from "lucide-react"

const sources = [
  {
    name: "Conde Nast Traveler",
    description: "Gold List, Hot List & Readers' Choice Awards",
    icon: Award,
  },
  {
    name: "Travel + Leisure",
    description: "World's Best Awards & Luxury Awards",
    icon: Globe,
  },
  {
    name: "The Luxury Travel Expert",
    description: "Top 10 Most Beautiful Pools in the World",
    icon: BookOpen,
  },
  {
    name: "The Rooftop Guide",
    description: "50 Best Rooftop Pools 2025",
    icon: Users,
  },
]

export function Methodology() {
  return (
    <section id="methodology" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-2">
            Our Methodology
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-semibold text-foreground mb-4">
            Rankings Backed by Real Data
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Our rankings aggregate reviews and awards from the world's most trusted travel publications. 
            We combine editorial rankings, reader votes, and industry recognition to create 
            the definitive guide to hotel pools.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sources.map((source) => (
            <div
              key={source.name}
              className="bg-card border border-border rounded-2xl p-6 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <source.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground mb-1">
                {source.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {source.description}
              </p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 max-w-2xl mx-auto">
          Data compiled from publicly available rankings, reviews, and awards. 
          Ratings reflect aggregated scores from multiple sources. 
          Visit property websites for official photography and booking. Last updated March 2026.
        </p>
      </div>
    </section>
  )
}
