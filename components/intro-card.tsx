import { Waves } from "lucide-react"
import { InteractivePool } from "./interactive-pool"

export function IntroCard() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Interactive Pool Image */}
          <div className="order-2 md:order-1">
            <InteractivePool />
          </div>
          
          {/* Text Content */}
          <div className="order-1 md:order-2">
            <div className="relative bg-card border border-border rounded-2xl p-8 sm:p-10 shadow-sm">
              <div className="absolute -top-4 left-8 bg-primary text-primary-foreground p-2 rounded-full">
                <Waves className="w-5 h-5" />
              </div>
              <p className="text-lg sm:text-xl text-foreground leading-relaxed">
                <span className="font-semibold">What makes a great swimming pool?</span>{" "}
                <span className="text-muted-foreground">
                  Well, that all depends. But you can be sure we've scoured the most stunning, feature-packed, and unique pools across the globe. Take a look, and dive in.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
