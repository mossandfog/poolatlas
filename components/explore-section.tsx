import { Globe, Sparkles, Award, Users } from "lucide-react"

const categories = [
  {
    icon: Globe,
    title: "By Destination",
    description: "Explore pools by your dream travel destination",
    items: ["Maldives", "Greece", "Bali", "Italy"]
  },
  {
    icon: Sparkles,
    title: "By Feature",
    description: "Find pools with specific amenities",
    items: ["Infinity Edge", "Rooftop", "Private", "Heated"]
  },
  {
    icon: Award,
    title: "Award Winners",
    description: "Pools recognized by leading travel publications",
    items: ["Best Design", "Most Scenic", "Most Luxurious"]
  },
  {
    icon: Users,
    title: "By Traveler Type",
    description: "Perfect pools for your travel style",
    items: ["Honeymoon", "Family", "Solo", "Adventure"]
  }
]

export function ExploreSection() {
  return (
    <section id="explore" className="py-20 px-4 sm:px-6 lg:px-8 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-primary text-sm font-medium tracking-[0.2em] uppercase mb-2">
            Discover More
          </p>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Explore Our Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Navigate through our curated selection of extraordinary hotel pools using different lenses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, idx) => (
            <div 
              key={category.title}
              className="p-6 bg-card rounded-2xl border border-border hover:border-primary/50 hover:shadow-lg transition-all group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${
                idx === 0 ? 'bg-chart-1/20' : 
                idx === 1 ? 'bg-chart-2/20' : 
                idx === 2 ? 'bg-chart-3/20' : 'bg-chart-4/20'
              }`}>
                <category.icon className={`w-7 h-7 group-hover:scale-110 transition-transform ${
                  idx === 0 ? 'text-chart-1' : 
                  idx === 1 ? 'text-chart-2' : 
                  idx === 2 ? 'text-chart-3' : 'text-chart-4'
                }`} />
              </div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground mb-2">
                {category.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span 
                    key={item}
                    className="text-xs px-3 py-1.5 bg-secondary text-secondary-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
