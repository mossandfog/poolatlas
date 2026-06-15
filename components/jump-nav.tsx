"use client"

import { useState, useEffect } from "react"
import { ChevronUp, List, X, Trophy, TrendingUp, Map, Sparkles, Scale, BookOpen, HelpCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const sections = [
  { id: "featured", label: "Featured Pool", icon: Star },
  { id: "trending", label: "Trending", icon: TrendingUp },
  { id: "methodology", label: "How We Rank", icon: BookOpen },
  { id: "categories", label: "Categories", icon: Sparkles },
  { id: "compare", label: "Compare", icon: Scale },
  { id: "top-100", label: "Rankings", icon: Trophy },
  { id: "map", label: "World Map", icon: Map },
  { id: "faq", label: "FAQ", icon: HelpCircle },
]

export function JumpNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero
      setShowNav(window.scrollY > 600)

      // Determine active section
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      })
    }
    setIsOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setIsOpen(false)
  }

  if (!showNav) return null

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
      {/* Expanded menu */}
      {isOpen && (
        <div className="bg-card border border-border rounded-xl shadow-xl p-2 mb-2 animate-in slide-in-from-bottom-2 duration-200">
          <nav className="flex flex-col gap-1">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors text-left"
            >
              <ChevronUp className="w-4 h-4" />
              <span>Back to Top</span>
            </button>
            <div className="h-px bg-border my-1" />
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors text-left ${
                    activeSection === section.id 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{section.label}</span>
                </button>
              )
            })}
          </nav>
        </div>
      )}

      {/* Toggle button */}
      <Button
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <List className="w-5 h-5" />}
      </Button>
    </div>
  )
}
