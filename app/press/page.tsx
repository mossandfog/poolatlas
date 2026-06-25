"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Download, 
  Mail, 
  ExternalLink, 
  FileText, 
  Image as ImageIcon, 
  BarChart3, 
  Quote,
  Globe,
  Users,
  Award,
  TrendingUp,
  Copy,
  Check
} from "lucide-react"

const pressContacts = [
  {
    name: "Media Inquiries",
    email: "hello@poolatlas.io",
    description: "For journalists, publications, and media requests"
  },
  {
    name: "Partnership Inquiries",
    email: "hello@poolatlas.io",
    description: "For hotels, resorts, and brand collaborations"
  },
  {
    name: "General Contact",
    email: "hello@poolatlas.io",
    description: "For all questions, feedback, and submissions"
  }
]

const keyStats = [
  { label: "Countries Covered", value: "50+", icon: Globe },
  { label: "Pools Ranked", value: "World's Best", icon: Award },
  { label: "Continents", value: "6", icon: Users },
  { label: "Launch Year", value: "2024", icon: TrendingUp }
]

const brandAssets = [
  {
    name: "Pool Atlas Logo - Primary",
    description: "Full color logo on light backgrounds",
    format: "SVG, PNG",
    preview: "/images/hero-pool.jpg"
  },
  {
    name: "Pool Atlas Logo - White",
    description: "White logo for dark backgrounds",
    format: "SVG, PNG",
    preview: "/images/hero-pool.jpg"
  },
  {
    name: "Pool Atlas Icon",
    description: "Square icon for social media and apps",
    format: "SVG, PNG, ICO",
    preview: "/images/hero-pool.jpg"
  },
  {
    name: "Brand Guidelines",
    description: "Complete brand style guide with colors, typography, and usage",
    format: "PDF",
    preview: "/images/hero-pool.jpg"
  }
]

const pressReleases = [
  {
    date: "June 2026",
    title: "Pool Atlas Summer 2026 Update: Six New Openings Added to Rankings",
    excerpt: "The world's highest infinity pool, an underground lap pool in Paris, and four more landmark openings join the definitive rankings."
  },
  {
    date: "January 2026",
    title: "Pool Atlas Launches Interactive World Map Feature",
    excerpt: "Travelers can now explore pools by location with our new interactive global map."
  }
]

const pullQuotes: { quote: string; attribution: string }[] = []

const factSheet = {
  founded: "2024",
  headquarters: "Portland, Oregon",
  mission: "To help travelers discover the world's most exceptional hotel swimming pools through data-driven rankings and expert curation.",
  methodology: "Rankings are determined by aggregating reviews from major travel platforms, expert assessments from leading publications, guest satisfaction scores, and unique pool features.",
  coverage: "The world's best pools across 50+ countries on 6 continents"
}

export default function PressPage() {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

  const copyEmail = (email: string) => {
    navigator.clipboard.writeText(email)
    setCopiedEmail(email)
    setTimeout(() => setCopiedEmail(null), 2000)
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">Press & Media</span>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-foreground mb-4">
              Press Kit
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to write about Pool Atlas. Download brand assets, 
              access key statistics, and get in touch with our team.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {keyStats.map((stat) => (
              <Card key={stat.label} className="bg-card border-border text-center">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="about" className="mb-16">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="assets">Brand Assets</TabsTrigger>
              <TabsTrigger value="press">Press Releases</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            {/* About Tab */}
            <TabsContent value="about">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Fact Sheet */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="font-[family-name:var(--font-display)] text-xl flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      Fact Sheet
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Founded</p>
                      <p className="font-medium text-foreground">{factSheet.founded}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Headquarters</p>
                      <p className="font-medium text-foreground">{factSheet.headquarters}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Coverage</p>
                      <p className="font-medium text-foreground">{factSheet.coverage}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Mission</p>
                      <p className="font-medium text-foreground">{factSheet.mission}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Methodology</p>
                      <p className="font-medium text-foreground">{factSheet.methodology}</p>
                    </div>
                    <a href="/PoolAtlas-FactSheet.pdf" download className="block w-full mt-4">
                      <Button variant="outline" className="w-full rounded-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download Fact Sheet (PDF)
                      </Button>
                    </a>
                  </CardContent>
                </Card>

                {/* Pull Quotes */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="font-[family-name:var(--font-display)] text-xl flex items-center gap-2">
                      <Quote className="w-5 h-5 text-primary" />
                      Press Quotes
                    </CardTitle>
                    <CardDescription>
                      Quotes from media coverage
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {pullQuotes.length > 0 ? pullQuotes.map((item, idx) => (
                      <div key={idx} className="border-l-4 border-primary pl-4">
                        <p className="italic text-foreground mb-2">"{item.quote}"</p>
                        <p className="text-sm text-muted-foreground">— {item.attribution}</p>
                      </div>
                    )) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Quote className="w-8 h-8 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">Coverage quotes will appear here as they come in.</p>
                        <p className="text-xs mt-1">Reach out to <span className="text-primary">hello@poolatlas.io</span> for press inquiries.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Boilerplate */}
              <Card className="bg-card border-border mt-8">
                <CardHeader>
                  <CardTitle className="font-[family-name:var(--font-display)] text-xl">About Pool Atlas</CardTitle>
                  <CardDescription>Standard boilerplate for press use</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted/30 rounded-lg border border-border">
                    <p className="text-foreground leading-relaxed">
                      <strong>Pool Atlas</strong> is the definitive guide to the world's most extraordinary hotel swimming pools,
                      providing comprehensive rankings based on aggregated guest reviews,
                      on-site research, and proprietary evaluation criteria covering pool design, views,
                      exclusivity, and overall experience. Founded in 2024 in Portland, Oregon, Pool Atlas helps travelers
                      discover extraordinary aquatic experiences at hotels and resorts across 50+ countries.
                      For more information, visit <span className="text-primary">poolatlas.io</span>.
                    </p>
                  </div>
                  <Button variant="secondary" size="sm" className="mt-3">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Boilerplate
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Brand Assets Tab */}
            <TabsContent value="assets">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {brandAssets.map((asset) => (
                  <Card key={asset.name} className="bg-card border-border overflow-hidden">
                    <div className="h-32 bg-muted/30 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-primary-foreground" />
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="font-semibold text-foreground mb-1">{asset.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{asset.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{asset.format}</Badge>
                        <Button size="sm" variant="outline" className="rounded-full">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Download className="w-8 h-8 text-primary flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">Download Complete Press Kit</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Get all logos, brand guidelines, fact sheet, and high-resolution images in one ZIP file.
                      </p>
                    <a href="/PoolAtlas-PressKit.zip" download>
                      <Button className="rounded-full">
                        <Download className="w-4 h-4 mr-2" />
                        Download Press Kit (ZIP)
                      </Button>
                    </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Brand Colors */}
              <Card className="bg-card border-border mt-8">
                <CardHeader>
                  <CardTitle className="font-[family-name:var(--font-display)] text-xl">Brand Colors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <div className="h-20 rounded-lg bg-primary mb-2"></div>
                      <p className="text-sm font-medium text-foreground">Primary Teal</p>
                      <p className="text-xs text-muted-foreground">#0D9488</p>
                    </div>
                    <div>
                      <div className="h-20 rounded-lg bg-accent mb-2"></div>
                      <p className="text-sm font-medium text-foreground">Accent Gold</p>
                      <p className="text-xs text-muted-foreground">#D97706</p>
                    </div>
                    <div>
                      <div className="h-20 rounded-lg bg-foreground mb-2"></div>
                      <p className="text-sm font-medium text-foreground">Dark Navy</p>
                      <p className="text-xs text-muted-foreground">#1E293B</p>
                    </div>
                    <div>
                      <div className="h-20 rounded-lg bg-muted border border-border mb-2"></div>
                      <p className="text-sm font-medium text-foreground">Light Background</p>
                      <p className="text-xs text-muted-foreground">#F8FAFC</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Press Releases Tab */}
            <TabsContent value="press">
              <div className="space-y-4">
                {pressReleases.map((release, idx) => (
                  <Card key={idx} className="bg-card border-border">
                    <CardContent className="pt-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <Badge variant="secondary" className="mb-2">{release.date}</Badge>
                          <h3 className="font-semibold text-foreground text-lg mb-1">{release.title}</h3>
                          <p className="text-sm text-muted-foreground">{release.excerpt}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button variant="outline" size="sm" className="rounded-full">
                            <FileText className="w-4 h-4 mr-1" />
                            Read
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-full">
                            <Download className="w-4 h-4 mr-1" />
                            PDF
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-muted/30 border-border mt-8">
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    Subscribe to receive future press releases:
                  </p>
                  <div className="flex gap-2 max-w-md mx-auto mt-3">
                    <input 
                      type="email" 
                      placeholder="press@yourpublication.com"
                      className="flex-1 px-4 py-2 rounded-full border border-border bg-background text-foreground"
                    />
                    <Button className="rounded-full">Subscribe</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {pressContacts.map((contact) => (
                  <Card key={contact.email} className="bg-card border-border">
                    <CardContent className="pt-6 text-center">
                      <Mail className="w-10 h-10 text-primary mx-auto mb-3" />
                      <h3 className="font-semibold text-foreground mb-1">{contact.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{contact.description}</p>
                      <Button 
                        variant="outline" 
                        className="rounded-full"
                        onClick={() => copyEmail(contact.email)}
                      >
                        {copiedEmail === contact.email ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            {contact.email}
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="font-[family-name:var(--font-display)] text-xl">Interview Requests</CardTitle>
                  <CardDescription>
                    Our team is available for interviews on topics including luxury travel trends, 
                    hotel industry insights, and travel technology.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <Users className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Editorial Team</p>
                        <p className="text-sm text-muted-foreground">
                          Available for commentary on pool design trends, luxury hospitality, and travel industry analysis.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <BarChart3 className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Data & Research</p>
                        <p className="text-sm text-muted-foreground">
                          We can provide custom data analysis and statistics for your publication.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-3">
                      Response time: We aim to respond to all press inquiries within 24 hours.
                    </p>
                    <Button className="rounded-full">
                      <Mail className="w-4 h-4 mr-2" />
                      Request Interview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </div>
      </div>

      <Footer />
    </main>
  )
}
