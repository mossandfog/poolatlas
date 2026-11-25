"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "How are pools ranked on Pool Atlas?",
    answer: "Pool Atlas is an editors' ranking. We judge each pool on its setting, its design, the swim itself and the service around it, and we weigh what guests and the travel press have said about it over time. Every listing is checked against the hotel's own information and outlets like Condé Nast Traveler, Travel + Leisure and Forbes Travel Guide. Nobody can pay to be ranked."
  },
  {
    question: "How often are the rankings updated?",
    answer: "We review the rankings every season, add pools as they open or earn their place, and recheck closures and reopening dates through the year. Each pool page shows the months it's at its best."
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
    answer: "A pool is marked as kid-friendly if the hotel welcomes families, has appropriate safety features, and doesn't have adults-only policies."
  },
  {
    question: "What makes a pool rank highly?",
    answer: "We look at the design of the pool itself, its setting and view, how it feels to actually swim there, the service around it, and how guests and the travel press have rated it over time. A great pool needs more than a good photo."
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
