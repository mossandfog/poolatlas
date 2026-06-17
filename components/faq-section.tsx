"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "How are pools ranked on Pool Atlas?",
    answer: "Our rankings are based on aggregated data from multiple authoritative travel publications including Conde Nast Traveler, Travel + Leisure, TripAdvisor, and expert reviews. We analyze factors like guest ratings, review count, awards received, unique features, and editorial mentions to create our comprehensive rankings."
  },
  {
    question: "How often are the rankings updated?",
    answer: "We update our rankings monthly, incorporating new reviews, awards, and notable hotel openings from the world's leading travel publications. New pools are added as they earn recognition — which means the list is always evolving."
  },
  {
    question: "Can I submit a pool to be considered for ranking?",
    answer: "Yes! We welcome submissions from hotels, resorts, and travelers. Click the 'Submit a Pool' button in the navigation to nominate a pool. Our editorial team reviews all submissions against our ranking criteria."
  },
  {
    question: "Are the pools actually accessible to the public?",
    answer: "Most pools in our rankings are located at hotels and resorts, meaning they're typically available to hotel guests. Some properties offer day passes or pool access for non-guests. We recommend contacting the hotel directly for access policies."
  },
  {
    question: "How do you determine if a pool is kid-friendly?",
    answer: "A pool is marked as kid-friendly if the hotel welcomes families, has appropriate safety features, and doesn't have adults-only policies. We also consider user reviews mentioning family experiences."
  },
  {
    question: "What makes a pool 'world-class'?",
    answer: "World-class pools typically feature exceptional design, stunning views or settings, high-quality amenities, excellent service, and consistent positive reviews. Recognition from major travel publications is also a key indicator."
  }
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/20 rounded-full mb-3">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">FAQ</span>
          </div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Everything you need to know about Pool Atlas
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-card rounded-2xl border border-border overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-foreground pr-4 text-left">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-5">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
