import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
import { DreamListProvider } from '@/lib/dream-list-context'
import './globals.css'

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: '--font-display',
  weight: ['500', '600', '700']
});
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'Pool Atlas | Best Hotel Swimming Pools Worldwide',
  description: 'Discover and explore the most stunning hotel swimming pools across the globe. Curated rankings of luxury infinity pools, rooftop oases, and tropical retreats.',
  generator: 'v0.app',
  other: {
    'websitelaunches-verification': 'd88d50454f7b69ceb9a4a741c6c2f1ef',
  },
  metadataBase: new URL('https://poolatlas.io'),
  keywords: ['hotel pools', 'luxury pools', 'infinity pools', 'best hotel swimming pools', 'travel', 'resorts'],
  authors: [{ name: 'Pool Atlas' }],
  creator: 'Pool Atlas',
  publisher: 'Pool Atlas',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://poolatlas.io',
    siteName: 'Pool Atlas',
    title: 'Pool Atlas | Best Hotel Swimming Pools Worldwide',
    description: 'The definitive ranking of the world\'s most extraordinary hotel swimming pools. Discover 150+ stunning pools across 50+ countries.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pool Atlas - Best Hotel Swimming Pools Worldwide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pool Atlas | Best Hotel Swimming Pools Worldwide',
    description: 'The definitive ranking of the world\'s most extraordinary hotel swimming pools.',
    images: ['/images/og-image.jpg'],
  },
  
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Pool Atlas',
  url: 'https://poolatlas.io',
  description: 'The definitive ranking of the world\'s most extraordinary hotel swimming pools.',
  publisher: {
    '@type': 'Organization',
    name: 'Pool Atlas',
    url: 'https://poolatlas.io',
    logo: {
      '@type': 'ImageObject',
      url: 'https://poolatlas.io/images/poolatlas-logotype.png'
    },
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Portland',
      addressRegion: 'OR',
      addressCountry: 'US'
    }
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://poolatlas.io/?search={search_term_string}',
    'query-input': 'required name=search_term_string'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5086388610472430"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased`}>
        <DreamListProvider>
          {children}
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-W7BH3WYNK7"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-W7BH3WYNK7');
            `}
          </Script>
          <Analytics />
        </DreamListProvider>
      </body>
    </html>
  )
}
