import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Pool Atlas - Best Hotel Swimming Pools Worldwide'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0c1220',
          backgroundImage: 'linear-gradient(to bottom right, #0c1220, #1a2744, #0c1220)',
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
            opacity: 0.15,
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            left: -150,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
            opacity: 0.1,
          }}
        />
        
        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 40,
          }}
        >
          {/* Logo/Icon */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
              marginBottom: 24,
            }}
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
              <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
              <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
            </svg>
          </div>
          
          {/* Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              color: 'white',
              marginBottom: 16,
              textAlign: 'center',
            }}
          >
            Pool Atlas
          </div>
          
          {/* Subtitle */}
          <div
            style={{
              fontSize: 32,
              color: '#14b8a6',
              marginBottom: 32,
              textAlign: 'center',
            }}
          >
            Best Hotel Swimming Pools Worldwide
          </div>
          
          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: 48,
              marginTop: 24,
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 48, fontWeight: 700, color: 'white' }}>150+</div>
              <div style={{ fontSize: 18, color: '#94a3b8' }}>Pools Ranked</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 48, fontWeight: 700, color: 'white' }}>50+</div>
              <div style={{ fontSize: 18, color: '#94a3b8' }}>Countries</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 48, fontWeight: 700, color: 'white' }}>2.4M</div>
              <div style={{ fontSize: 18, color: '#94a3b8' }}>Reviews Analyzed</div>
            </div>
          </div>
        </div>
        
        {/* URL */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            fontSize: 24,
            color: '#64748b',
          }}
        >
          poolatlas.io
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
