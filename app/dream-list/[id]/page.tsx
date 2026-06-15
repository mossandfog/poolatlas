import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Star, ExternalLink, Heart, ArrowLeft, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { pools } from "@/lib/pool-data"
import { ShareableDreamListActions } from "./actions"

// Decode the shareable ID back to pool IDs
function decodeShareId(id: string): number[] {
  try {
    const decoded = atob(id)
    return decoded.split(',').map(Number).filter(n => !isNaN(n) && n > 0)
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const poolIds = decodeShareId(id)
  const sharedPools = pools.filter(p => poolIds.includes(p.id))
  
  const poolCount = sharedPools.length
  const destinations = [...new Set(sharedPools.map(p => p.country))].slice(0, 3).join(', ')
  
  return {
    title: `Dream List: ${poolCount} Amazing Pools | Pool Atlas`,
    description: `Check out this curated list of ${poolCount} stunning hotel pools${destinations ? ` in ${destinations}` : ''}. Discover the world's best pools on Pool Atlas.`,
    openGraph: {
      title: `Dream List: ${poolCount} Amazing Pools`,
      description: `Check out this curated list of ${poolCount} stunning hotel pools. Discover the world's best pools on Pool Atlas.`,
    }
  }
}

export default async function SharedDreamListPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const poolIds = decodeShareId(id)
  const sharedPools = pools.filter(p => poolIds.includes(p.id))
  
  // Sort by the order they were added (preserve the order from the encoded list)
  const orderedPools = poolIds
    .map(id => sharedPools.find(p => p.id === id))
    .filter((p): p is NonNullable<typeof p> => p !== undefined)

  const regions = [...new Set(orderedPools.map(p => p.region))]
  const countries = [...new Set(orderedPools.map(p => p.country))]

  if (orderedPools.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Header />
        <div className="pt-24 pb-16">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">Dream List Not Found</h1>
            <p className="text-muted-foreground mb-6">
              This dream list link appears to be invalid or expired.
            </p>
            <Link href="/">
              <Button className="rounded-full">
                Explore Top Pools
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Pool Atlas
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 rounded-full mb-4">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span className="text-rose-600 dark:text-rose-400 text-sm font-medium">Shared Dream List</span>
            </div>
            
            <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {orderedPools.length} Dream {orderedPools.length === 1 ? 'Pool' : 'Pools'}
            </h1>
            
            <p className="text-muted-foreground max-w-xl mx-auto mb-6">
              {countries.length === 1 
                ? `A curated selection of stunning pools in ${countries[0]}.`
                : `A curated selection spanning ${countries.length} countries across ${regions.length} ${regions.length === 1 ? 'region' : 'regions'}.`
              }
            </p>

            <ShareableDreamListActions poolIds={poolIds} />
          </div>

          {/* Pool Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orderedPools.map((pool, index) => (
              <div 
                key={pool.id}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={pool.image}
                    alt={pool.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
                      <span className="text-xs font-bold text-primary-foreground">#{pool.rank}</span>
                    </div>
                  </div>

                  <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full px-2.5 py-1">
                      <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                      <span className="text-sm font-semibold">{pool.rating}</span>
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-semibold text-white text-lg mb-0.5 drop-shadow-md">{pool.name}</h3>
                    <p className="text-white/90 text-sm drop-shadow-md">{pool.hotel}</p>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{pool.location}, {pool.country}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {pool.features.slice(0, 3).map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {pool.features.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{pool.features.length - 3}
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {pool.description}
                  </p>

                  <a
                    href={pool.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Visit Property
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <div className="inline-block p-8 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20">
              <h2 className="text-xl font-semibold text-foreground mb-2">Create Your Own Dream List</h2>
              <p className="text-muted-foreground mb-4">
                Save your favorite pools and share them with friends.
              </p>
              <Link href="/#top-100">
                <Button className="rounded-full">
                  Explore All Pools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
