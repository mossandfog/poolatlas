import { Megaphone, ArrowRight } from "lucide-react"

export function SponsorCTA() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <a 
          href="mailto:hello@poolatlas.io?subject=Sponsorship%20Inquiry%20-%20Pool%20Atlas"
          className="block group"
        >
          <div className="relative overflow-hidden rounded-2xl border border-dashed border-border bg-secondary/30 hover:bg-secondary/50 hover:border-primary/30 transition-all duration-300 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Megaphone className="w-5 h-5 text-primary" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-semibold text-foreground mb-1">
                    Partner with Pool Atlas
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Showcase your property to our growing audience of luxury travel enthusiasts and pool lovers.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-primary font-medium text-sm whitespace-nowrap group-hover:gap-3 transition-all">
                <span>Become a Sponsor</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </a>
      </div>
    </section>
  )
}
