import {
  consumeStream,
  convertToModelMessages,
  streamText,
  UIMessage,
  tool,
} from 'ai'
import { z } from 'zod'
import { pools } from '@/lib/pool-data'

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: 'openai/gpt-4o-mini',
    system: `You are a friendly and enthusiastic pool concierge for Pool Atlas, the world's premier ranking of hotel swimming pools. You help travelers find their perfect pool experience.

You have access to a database of the world's 50 best hotel pools, curated from Travel + Leisure, Conde Nast Traveler, and other trusted sources.

When users ask about pools, use the searchPools tool to find relevant options. Always be warm, helpful, and excited about pools!

Key things you can help with:
- Finding kid-friendly pools
- Finding pools with specific features (waterslides, infinity edges, rooftops)
- Finding pools in specific countries or regions
- Recommending pools for honeymoons, family trips, or solo adventures
- Comparing pool ratings and reviews

Always provide specific pool recommendations with their rank, rating, and why they'd be great for the user's needs.`,
    messages: await convertToModelMessages(messages),
    abortSignal: req.signal,
    tools: {
      searchPools: tool({
        description: 'Search the pool database to find pools matching specific criteria',
        inputSchema: z.object({
          query: z.string().describe('Search query or keywords'),
          region: z.string().nullable().describe('Region filter: Europe, Asia, Americas, Africa, Middle East, Oceania'),
          country: z.string().nullable().describe('Country name to filter by'),
          kidFriendly: z.boolean().nullable().describe('Filter for kid-friendly pools'),
          features: z.array(z.string()).nullable().describe('Features to filter by like Infinity Edge, Rooftop, Waterslide, etc'),
          minRating: z.number().nullable().describe('Minimum rating (1-10)'),
          limit: z.number().nullable().describe('Maximum number of results to return')
        }),
        execute: async ({ query, region, country, kidFriendly, features: featureFilter, minRating, limit }) => {
          let results = [...pools]
          
          // Filter by region
          if (region) {
            results = results.filter(p => p.region.toLowerCase() === region.toLowerCase())
          }
          
          // Filter by country
          if (country) {
            results = results.filter(p => p.country.toLowerCase().includes(country.toLowerCase()))
          }
          
          // Filter by kid friendly
          if (kidFriendly !== null && kidFriendly !== undefined) {
            results = results.filter(p => p.kidFriendly === kidFriendly)
          }
          
          // Filter by features
          if (featureFilter && featureFilter.length > 0) {
            results = results.filter(p => 
              featureFilter.some(f => 
                p.features.some(pf => pf.toLowerCase().includes(f.toLowerCase()))
              )
            )
          }
          
          // Filter by rating
          if (minRating) {
            results = results.filter(p => p.rating >= minRating)
          }
          
          // Search by query in name, description, hotel
          if (query) {
            const q = query.toLowerCase()
            results = results.filter(p => 
              p.name.toLowerCase().includes(q) ||
              p.hotel.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q) ||
              p.country.toLowerCase().includes(q) ||
              p.location.toLowerCase().includes(q) ||
              p.features.some(f => f.toLowerCase().includes(q))
            )
          }
          
          // Sort by rank
          results.sort((a, b) => a.rank - b.rank)
          
          // Limit results
          const limitNum = limit || 10
          results = results.slice(0, limitNum)
          
          return {
            count: results.length,
            pools: results.map(p => ({
              rank: p.rank,
              name: p.name,
              hotel: p.hotel,
              location: `${p.location}, ${p.country}`,
              rating: p.rating,
              reviewCount: p.reviewCount,
              features: p.features,
              kidFriendly: p.kidFriendly,
              description: p.description,
              awards: p.awards || []
            }))
          }
        }
      })
    },
  })

  return result.toUIMessageStreamResponse({
    originalMessages: messages,
    consumeSseStream: consumeStream,
  })
}
