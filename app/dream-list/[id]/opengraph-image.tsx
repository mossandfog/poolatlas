import { ImageResponse } from 'next/og'
import { pools } from '@/lib/pool-data'

export const runtime = 'edge'
export const alt = 'Pool Atlas Dream List'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

function decodeShareId(id: string): number[] {
  try {
    const decoded = atob(id)
    return decoded.split(',').map(Number).filter(n => !isNaN(n) && n > 0)
  } catch {
    return []
  }
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const poolIds = decodeShareId(id)
  const sharedPools = pools.filter(p => poolIds.includes(p.id)).slice(0, 4)
  const totalPools = poolIds.length
  const countries = [...new Set(sharedPools.map(p => p.country))]

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0a0a0a',
          padding: 60,
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 28,
              background: 'linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)',
              marginRight: 16,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#f43f5e', fontSize: 20, fontWeight: 600 }}>Shared Dream List</span>
            <span style={{ color: '#71717a', fontSize: 16 }}>poolatlas.io</span>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: 'white',
              margin: 0,
              marginBottom: 16,
              lineHeight: 1.1,
            }}
          >
            {totalPools} Dream {totalPools === 1 ? 'Pool' : 'Pools'}
          </h1>
          
          <p
            style={{
              fontSize: 24,
              color: '#a1a1aa',
              margin: 0,
              marginBottom: 40,
            }}
          >
            {countries.length === 1 
              ? `Stunning pools in ${countries[0]}`
              : `Spanning ${countries.length} countries`
            }
          </p>

          {/* Pool Names */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {sharedPools.map((pool, i) => (
              <div
                key={pool.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: '#14b8a6',
                  }}
                >
                  <span style={{ color: 'white', fontSize: 14, fontWeight: 700 }}>#{pool.rank}</span>
                </div>
                <span style={{ color: 'white', fontSize: 22 }}>{pool.name}</span>
                <span style={{ color: '#71717a', fontSize: 18 }}>— {pool.hotel}</span>
              </div>
            ))}
            {totalPools > 4 && (
              <span style={{ color: '#71717a', fontSize: 18, marginLeft: 44 }}>
                +{totalPools - 4} more pools
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 40,
            paddingTop: 24,
            borderTop: '1px solid #27272a',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2">
              <path d="M2 12h2a8 8 0 018-8v2a6 6 0 00-6 6H4z" />
              <path d="M2 12h2a8 8 0 008 8v-2a6 6 0 01-6-6H4z" />
              <circle cx="12" cy="12" r="3" fill="#14b8a6" />
            </svg>
            <span style={{ color: 'white', fontSize: 24, fontWeight: 700 }}>Pool Atlas</span>
          </div>
          <span style={{ color: '#71717a', fontSize: 16 }}>The world&apos;s best hotel pools, ranked</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
