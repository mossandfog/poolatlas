import { Waves, Mail, MapPin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  return (
    <footer id="about" className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                <Waves className="w-5 h-5 text-primary-foreground" />
              </div>
              <Image
                src="/images/poolatlas-logotype.png"
                alt="Pool Atlas"
                width={120}
                height={24}
                className="h-5 w-auto dark:hidden"
              />
              <Image
                src="/images/poolatlas-logotype-white.png"
                alt="Pool Atlas"
                width={120}
                height={24}
                className="h-5 w-auto hidden dark:block"
              />
            </a>
            <p className="text-sm text-muted-foreground max-w-sm mb-4">
              The definitive guide to the world's most extraordinary hotel swimming pools. We research, rank, and share the best aquatic experiences on the planet.
            </p>
            <div className="flex items-center gap-3">
              <a 
                href="https://bsky.app/profile/thepoolatlas.bsky.social" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 568 501" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M123.121 33.6637C188.241 82.5526 258.281 181.681 284 234.873C309.719 181.681 379.759 82.5526 444.879 33.6637C491.866 -1.61183 568 -28.9064 568 57.9464C568 75.2916 558.055 203.659 552.222 224.501C531.947 296.954 458.067 315.434 392.347 304.249C507.222 323.8 536.444 388.56 473.333 453.32C353.473 576.312 301.061 422.461 287.631 383.039C285.169 375.812 284.017 372.431 284 375.306C283.983 372.431 282.831 375.812 280.369 383.039C266.939 422.461 214.527 576.312 94.6667 453.32C31.5556 388.56 60.7778 323.8 175.653 304.249C109.933 315.434 36.0535 296.954 15.7778 224.501C9.94525 203.659 0 75.2916 0 57.9464C0 -28.9064 76.1345 -1.61183 123.121 33.6637Z"/>
                </svg>
                <span className="sr-only">Bluesky</span>
              </a>
            </div>
          </div>

          {/* Rankings */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Rankings</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/#top-100" className="hover:text-primary transition-colors py-1 inline-block">Top 100 Pools</a></li>
              <li><a href="/#featured" className="hover:text-primary transition-colors py-1 inline-block">Pool of the Month</a></li>
              <li><a href="/#map" className="hover:text-primary transition-colors py-1 inline-block">By Region</a></li>
              <li><a href="/#explore" className="hover:text-primary transition-colors py-1 inline-block">By Award</a></li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Explore</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/blog" className="hover:text-primary transition-colors py-1 inline-block">The Deep End Blog</a></li>
              <li><a href="/#map" className="hover:text-primary transition-colors py-1 inline-block">World Map</a></li>
              <li><a href="/#featured" className="hover:text-primary transition-colors py-1 inline-block">Pool of the Month</a></li>
              <li><a href="/badges" className="hover:text-primary transition-colors py-1 inline-block">Hotel Badges</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="/about" className="hover:text-primary transition-colors py-1 inline-block">About Us</a></li>
              <li><a href="/press" className="hover:text-primary transition-colors py-1 inline-block">Press</a></li>
              <li><a href="/media-kit" className="hover:text-primary transition-colors py-1 inline-block">Media Kit</a></li>
              <li><a href="mailto:hello@poolatlas.io" className="hover:text-primary transition-colors py-1 inline-block">Partnerships</a></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-8 py-6 border-y border-border">
          <div className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            <a href="mailto:hello@poolatlas.io" className="text-foreground font-medium hover:text-primary transition-colors">hello@poolatlas.io</a>
          </div>
          <span className="text-muted-foreground hidden sm:inline">|</span>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Portland, Oregon</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © 2024–2026 Pool Atlas. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="/sitemap.xml" className="hover:text-primary transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
