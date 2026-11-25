// RSS feed for The Deep End, so readers (and Flipboard, Feedly and friends) can follow new posts.
import { blogPosts } from "@/lib/blog-data"

export const revalidate = 3600

const SITE = "https://poolatlas.io"
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

export async function GET() {
  const posts = [...blogPosts]
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
    .slice(0, 30)
  const items = posts
    .map((p) => {
      const url = `${SITE}/blog/${p.slug}`
      const img = p.image ? (p.image.startsWith("http") ? p.image : `${SITE}${p.image}`) : null
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <description>${esc(p.excerpt)}</description>${p.category ? `\n      <category>${esc(p.category)}</category>` : ""}${img ? `\n      <enclosure url="${esc(img)}" type="image/jpeg" length="0" />\n      <media:content url="${esc(img)}" medium="image" />` : ""}
    </item>`
    })
    .join("\n")
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>The Deep End by Pool Atlas</title>
    <link>${SITE}/blog</link>
    <description>Hotel pool guides and stories from Pool Atlas, the editors' ranking of the world's best hotel pools.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(posts[0].updatedAt || posts[0].publishedAt).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <image><url>${SITE}/icon.png</url><title>The Deep End by Pool Atlas</title><link>${SITE}/blog</link></image>
${items}
  </channel>
</rss>`
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, s-maxage=3600" },
  })
}
