import { pools } from "@/lib/pool-data"
import { blogPosts } from "@/lib/blog-data"
import { destinations } from "@/lib/destinations"
import { MetadataRoute } from "next"

// Real change dates only. Google learns to ignore lastmod when every page says "today",
// so pages get the date their content last changed, and pages with no date leave it out.
// Bump these when you change pool listings or destination guides.
const POOLS_UPDATED = "2026-11-24"
const DESTINATIONS_UPDATED = "2026-11-22"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://poolatlas.io"
  const postDate = (p: { publishedAt: string; updatedAt?: string }) => new Date(p.updatedAt || p.publishedAt)
  const latestPost = new Date(Math.max(...blogPosts.map((p) => postDate(p).getTime())))
  // The homepage cover and picks turn over on the 1st of each month
  const now = new Date()
  const editionStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1))
  const homeDate = latestPost > editionStart ? latestPost : editionStart

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: homeDate,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: latestPost,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(POOLS_UPDATED),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/honeymoon`,
      lastModified: new Date(POOLS_UPDATED),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/advertise`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/press`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/badges`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]

  // Individual pool pages
  const poolPages = pools.map((pool) => ({
    url: `${baseUrl}/pools/${pool.slug}`,
    lastModified: new Date(POOLS_UPDATED),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Blog posts — were missing entirely before
  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: postDate(post),
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.9 : 0.8,
  }))

  // Destination guides
  const destinationPages = destinations.map((d) => ({
    url: `${baseUrl}/destinations/${d.slug}`,
    lastModified: new Date(DESTINATIONS_UPDATED),
    changeFrequency: "monthly" as const,
    priority: d.featured ? 0.9 : 0.8,
  }))

  return [...staticPages, ...destinationPages, ...poolPages, ...blogPages]
}
