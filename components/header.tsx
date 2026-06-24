"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, Waves, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SubmitPoolModal } from "@/components/submit-pool-modal"
import { DreamListDrawer } from "@/components/dream-list-drawer"
import { useDreamList } from "@/lib/dream-list-context"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const [isDreamListOpen, setIsDreamListOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const { dreamList } = useDreamList()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      })
    } else {
      window.location.href = `/#${id}`
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card shadow-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a 
            href="/" 
            onClick={(e) => {
              if (isMounted && pathname === '/') {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
            className="flex items-center gap-2.5"
          >
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center shadow-sm">
              <Waves className="w-5 h-5 text-primary-foreground" />
            </div>
            <Image
              src="/images/poolatlas-logotype.png"
              alt="Pool Atlas"
              width={120}
              height={24}
              className="h-5 w-auto dark:hidden"
              priority
            />
            <Image
              src="/images/poolatlas-logotype-white.png"
              alt="Pool Atlas"
              width={120}
              height={24}
              className="h-5 w-auto hidden dark:block"
              priority
            />
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="/#top-100" 
              onClick={(e) => scrollToSection(e, "top-100")}
              className="text-sm text-foreground/80 hover:text-primary transition-colors font-semibold"
            >
              Rankings
            </a>
            <a 
              href="/#explore" 
              onClick={(e) => scrollToSection(e, "explore")}
              className="text-sm text-foreground/80 hover:text-primary transition-colors font-semibold"
            >
              Explore
            </a>
            <a href="/blog" className="text-sm text-foreground/80 hover:text-primary transition-colors font-semibold">
              The Deep End
            </a>
            <a href="/press" className="text-sm text-foreground/80 hover:text-primary transition-colors font-semibold">
              Press
            </a>
            <a href="/for-hotels" className="text-sm text-foreground/80 hover:text-primary transition-colors font-semibold">
              For Hotels
            </a>
            <ThemeToggle />
            <button
              onClick={() => setIsDreamListOpen(true)}
              className="relative p-2 rounded-full hover:bg-secondary transition-colors"
              aria-label="Open Dream List"
            >
              <Heart className="w-5 h-5 text-foreground/70 hover:text-rose-500 transition-colors" />
              {dreamList.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-[10px] font-bold text-white flex items-center justify-center">
                  {dreamList.length > 9 ? '9+' : dreamList.length}
                </span>
              )}
            </button>
            <Button 
              size="sm" 
              className="rounded-full shadow-sm"
              onClick={() => setIsSubmitModalOpen(true)}
            >
              Submit a Pool
            </Button>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border bg-card">
            <div className="flex flex-col gap-3">
              <a 
                href="/#top-100" 
                onClick={(e) => scrollToSection(e, "top-100")}
                className="text-base py-2 text-foreground hover:text-primary transition-colors font-semibold"
              >
                Rankings
              </a>
              <a 
                href="/#explore" 
                onClick={(e) => scrollToSection(e, "explore")}
                className="text-base py-2 text-foreground hover:text-primary transition-colors font-semibold"
              >
                Explore
              </a>
              <a href="/blog" className="text-base py-2 text-foreground hover:text-primary transition-colors font-semibold">
                The Deep End
              </a>
              <a href="/press" className="text-base py-2 text-foreground hover:text-primary transition-colors font-semibold">
                Press
              </a>
              <a href="/for-hotels" className="text-base py-2 text-foreground hover:text-primary transition-colors font-semibold">
                For Hotels
              </a>
              <div className="flex items-center gap-3 pt-3 mt-2 border-t border-border">
                <ThemeToggle />
                <button
                  onClick={() => {
                    setIsMenuOpen(false)
                    setIsDreamListOpen(true)
                  }}
                  className="relative p-2 rounded-full hover:bg-secondary transition-colors"
                  aria-label="Open Dream List"
                >
                  <Heart className="w-5 h-5 text-foreground/70" />
                  {dreamList.length > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-gradient-to-br from-rose-500 to-pink-500 text-[10px] font-bold text-white flex items-center justify-center">
                      {dreamList.length > 9 ? '9+' : dreamList.length}
                    </span>
                  )}
                </button>
                <Button 
                  className="flex-1 rounded-full shadow-sm"
                  onClick={() => {
                    setIsMenuOpen(false)
                    setIsSubmitModalOpen(true)
                  }}
                >
                  Submit a Pool
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
      
      {/* Submit Pool Modal */}
      <SubmitPoolModal 
        isOpen={isSubmitModalOpen} 
        onClose={() => setIsSubmitModalOpen(false)} 
      />
      
      {/* Dream List Drawer */}
      <DreamListDrawer
        isOpen={isDreamListOpen}
        onClose={() => setIsDreamListOpen(false)}
      />
    </header>
  )
}
