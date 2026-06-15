import { TrendingUp, Rocket, Globe, Star } from "lucide-react"

export function StatsSection() {
  const stats = [
    {
      icon: Globe,
      value: "50+",
      label: "Countries",
      description: "Pools ranked globally"
    },
    {
      icon: Star,
      value: "2.4M",
      label: "Reviews Analyzed",
      description: "From trusted sources"
    },
    {
      icon: Rocket,
      value: "#1",
      label: "Fastest Growing",
      description: "Pool guide of its kind"
    },
    {
      icon: TrendingUp,
      value: "150+",
      label: "Pools Ranked",
      description: "Updated quarterly"
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div 
              key={stat.label}
              className="text-center p-6 bg-card rounded-2xl border border-border"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-1">
                {stat.value}
              </p>
              <p className="font-semibold text-foreground text-sm mb-1">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
