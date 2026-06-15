import { ImageResponse } from 'next/og'
import { getBlogPost } from '@/lib/blog-data'

export const runtime = 'edge'

export const alt = 'Pool Atlas Blog'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)
  
  const title = post?.title || 'The Deep End'
  const category = post?.category || 'Blog'

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0c1220',
          backgroundImage: 'linear-gradient(to bottom right, #0c1220, #1a2744, #0c1220)',
          padding: 60,
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
            opacity: 0.15,
          }}
        />
        
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 40,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
            }}
          >
            <svg
              width="26"
              height="26"
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
          <div style={{ fontSize: 28, color: 'white', fontWeight: 600 }}>
            Pool Atlas
          </div>
          <div style={{ fontSize: 28, color: '#64748b' }}>
            /
          </div>
          <div style={{ fontSize: 28, color: '#14b8a6' }}>
            The Deep End
          </div>
        </div>
        
        {/* Category badge */}
        <div
          style={{
            display: 'flex',
            marginBottom: 24,
          }}
        >
          <div
            style={{
              padding: '8px 20px',
              backgroundColor: 'rgba(20, 184, 166, 0.2)',
              borderRadius: 100,
              fontSize: 18,
              color: '#14b8a6',
              fontWeight: 600,
            }}
          >
            {category}
          </div>
        </div>
        
        {/* Title */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: 'white',
            lineHeight: 1.2,
            maxWidth: 900,
            marginBottom: 'auto',
          }}
        >
          {title}
        </div>
        
        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            paddingTop: 24,
          }}
        >
          <div style={{ fontSize: 20, color: '#64748b' }}>
            poolatlas.io/blog
          </div>
          <div style={{ fontSize: 20, color: '#94a3b8' }}>
            {post?.readTime || ''}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
