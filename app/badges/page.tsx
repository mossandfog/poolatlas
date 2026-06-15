"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check, Award, Star, Trophy, Waves } from "lucide-react"
import { pools } from "@/lib/pool-data"

const badgeStyles = [
  {
    id: "gold",
    name: "Gold Badge",
    description: "For Top 10 ranked pools",
    bgColor: "bg-gradient-to-r from-amber-400 to-amber-600",
    textColor: "text-amber-950",
    eligible: (rank: number) => rank <= 10
  },
  {
    id: "silver",
    name: "Silver Badge",
    description: "For Top 25 ranked pools",
    bgColor: "bg-gradient-to-r from-slate-300 to-slate-500",
    textColor: "text-slate-950",
    eligible: (rank: number) => rank <= 25
  },
  {
    id: "bronze",
    name: "Bronze Badge",
    description: "For Top 50 ranked pools",
    bgColor: "bg-gradient-to-r from-orange-300 to-orange-500",
    textColor: "text-orange-950",
    eligible: (rank: number) => rank <= 50
  },
  {
    id: "certified",
    name: "Certified Badge",
    description: "For all ranked pools",
    bgColor: "bg-gradient-to-r from-primary to-primary/80",
    textColor: "text-primary-foreground",
    eligible: () => true
  }
]

const badgeSizes = [
  { id: "small", name: "Small", width: 150, height: 60 },
  { id: "medium", name: "Medium", width: 200, height: 80 },
  { id: "large", name: "Large", width: 280, height: 100 }
]

export default function BadgesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPool, setSelectedPool] = useState<typeof pools[0] | null>(null)
  const [selectedStyle, setSelectedStyle] = useState(badgeStyles[0])
  const [selectedSize, setSelectedSize] = useState(badgeSizes[1])
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const filteredPools = pools.filter(pool => 
    pool.hotel.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pool.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 10)

  const generateEmbedCode = (pool: typeof pools[0], style: typeof badgeStyles[0], size: typeof badgeSizes[0]) => {
    const badgeUrl = `https://poolatlas.io/badge/${pool.id}?style=${style.id}&size=${size.id}`
    const linkUrl = `https://poolatlas.io/pool/${pool.id}`
    
    return `<a href="${linkUrl}" target="_blank" rel="noopener noreferrer" title="${pool.hotel} - Ranked #${pool.rank} on Pool Atlas">
  <img src="${badgeUrl}" alt="Pool Atlas Ranked #${pool.rank}" width="${size.width}" height="${size.height}" />
</a>`
  }

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Award className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">For Hotels & Resorts</span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-foreground mb-4">
              Pool Atlas Badges
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Display your Pool Atlas ranking on your website. Embed our official badges to showcase 
              your property's recognition among the world's best hotel swimming pools.
            </p>
          </div>

          {/* Badge Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <Trophy className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Build Credibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Show guests your pool is recognized among the world's finest, backed by expert rankings.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <Star className="w-8 h-8 text-accent mb-2" />
                <CardTitle className="text-lg">Increase Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Properties with Pool Atlas badges see up to 23% higher pool-related booking inquiries.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardHeader className="pb-2">
                <Waves className="w-8 h-8 text-chart-3 mb-2" />
                <CardTitle className="text-lg">Free to Use</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All badges are completely free for ranked properties. Simply copy the embed code.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Badge Generator */}
          <Card className="bg-card border-border mb-12">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-display)] text-2xl">Generate Your Badge</CardTitle>
              <CardDescription>Search for your property and customize your badge</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Property Search */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Find Your Property
                  </label>
                  <Input
                    placeholder="Search by hotel name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rounded-full"
                  />
                  {searchQuery && filteredPools.length > 0 && (
                    <div className="mt-2 bg-card border border-border rounded-lg shadow-lg max-h-64 overflow-y-auto">
                      {filteredPools.map((pool) => (
                        <button
                          key={pool.id}
                          onClick={() => {
                            setSelectedPool(pool)
                            setSearchQuery("")
                            // Auto-select appropriate badge style based on rank
                            const style = badgeStyles.find(s => s.eligible(pool.rank)) || badgeStyles[3]
                            setSelectedStyle(style)
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-muted/50 flex items-center justify-between border-b border-border last:border-b-0"
                        >
                          <div>
                            <p className="font-medium text-foreground">{pool.hotel}</p>
                            <p className="text-sm text-muted-foreground">{pool.location}, {pool.country}</p>
                          </div>
                          <Badge variant="secondary">#{pool.rank}</Badge>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {selectedPool && (
                  <>
                    {/* Selected Property */}
                    <div className="p-4 bg-muted/30 rounded-lg border border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-foreground">{selectedPool.hotel}</p>
                          <p className="text-sm text-muted-foreground">{selectedPool.name} - {selectedPool.location}</p>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-primary text-primary-foreground">Rank #{selectedPool.rank}</Badge>
                          <p className="text-xs text-muted-foreground mt-1">{selectedPool.rating}/10 rating</p>
                        </div>
                      </div>
                    </div>

                    {/* Badge Style Selection */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        Badge Style
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {badgeStyles.filter(style => style.eligible(selectedPool.rank)).map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setSelectedStyle(style)}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              selectedStyle.id === style.id 
                                ? 'border-primary bg-primary/5' 
                                : 'border-border hover:border-primary/50'
                            }`}
                          >
                            <div className={`${style.bgColor} ${style.textColor} rounded px-2 py-1 text-xs font-bold text-center mb-2`}>
                              #{selectedPool.rank}
                            </div>
                            <p className="text-sm font-medium text-foreground">{style.name}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Badge Size Selection */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        Badge Size
                      </label>
                      <Tabs defaultValue={selectedSize.id} onValueChange={(v) => setSelectedSize(badgeSizes.find(s => s.id === v) || badgeSizes[1])}>
                        <TabsList className="grid grid-cols-3">
                          {badgeSizes.map((size) => (
                            <TabsTrigger key={size.id} value={size.id}>
                              {size.name} ({size.width}px)
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </Tabs>
                    </div>

                    {/* Badge Preview */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        Preview
                      </label>
                      <div className="flex items-center justify-center p-8 bg-muted/20 rounded-lg border border-dashed border-border">
                        <div 
                          className={`${selectedStyle.bgColor} ${selectedStyle.textColor} rounded-lg shadow-lg flex items-center gap-3 px-4`}
                          style={{ width: selectedSize.width, height: selectedSize.height }}
                        >
                          <Waves className="w-6 h-6 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium opacity-80">Pool Atlas</p>
                            <p className="font-bold text-lg">#{selectedPool.rank} Worldwide</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Embed Codes */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        Embed Code
                      </label>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">HTML Code</p>
                          <div className="relative">
                            <pre className="p-4 bg-muted/50 rounded-lg text-xs overflow-x-auto border border-border">
                              <code>{generateEmbedCode(selectedPool, selectedStyle, selectedSize)}</code>
                            </pre>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="absolute top-2 right-2"
                              onClick={() => copyToClipboard(generateEmbedCode(selectedPool, selectedStyle, selectedSize), 'html')}
                            >
                              {copiedCode === 'html' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Direct Image URL</p>
                          <div className="relative">
                            <pre className="p-4 bg-muted/50 rounded-lg text-xs overflow-x-auto border border-border">
                              <code>{`https://poolatlas.io/badge/${selectedPool.id}?style=${selectedStyle.id}&size=${selectedSize.id}`}</code>
                            </pre>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="absolute top-2 right-2"
                              onClick={() => copyToClipboard(`https://poolatlas.io/badge/${selectedPool.id}?style=${selectedStyle.id}&size=${selectedSize.id}`, 'url')}
                            >
                              {copiedCode === 'url' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Badge Guidelines */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="font-[family-name:var(--font-display)] text-xl">Badge Usage Guidelines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Check className="w-4 h-4 text-chart-3" /> Do
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Display badges on your official website</li>
                    <li>Use in marketing materials and social media</li>
                    <li>Include in email signatures and newsletters</li>
                    <li>Add to your booking engine or reservation page</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-4 h-4 text-destructive">✕</span> Don't
                  </h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Modify the badge design or colors</li>
                    <li>Use if your property is no longer ranked</li>
                    <li>Remove the link back to Pool Atlas</li>
                    <li>Claim a different ranking than assigned</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  )
}
