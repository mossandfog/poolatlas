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
  description: 'The world\'s best hotel swimming pools, ranked by our editors and checked against the travel press. Infinity edges, rooftops, desert pools and tropical retreats in nearly 50 countries.',
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
    description: 'The definitive ranking of the world\'s most extraordinary hotel swimming pools. Pools in nearly 50 countries, checked against the world\'s leading travel publications.',
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Season tint: sets data-season on <html> before paint, from Pacific time, so the palette turns with the editorial calendar and never goes stale */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var m=+new Intl.DateTimeFormat('en-US',{timeZone:'America/Los_Angeles',month:'numeric'}).format(new Date())-1;document.documentElement.dataset.season=m>=2&&m<=4?'spring':m>=5&&m<=7?'summer':m>=8&&m<=10?'fall':'winter'}catch(e){}`,
          }}
        />
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
          {/* Stay22: turns hotel links into affiliate links (poolatlas.io script) */}
          <Script id="stay22-lma" strategy="afterInteractive">
            {`
              (function (s, t, a, y, twenty, two) {
                s.Stay22 = s.Stay22 || {};
                s.Stay22.params = { lmaID: '6adf8a4d2099d2edfdd59a17' };
                twenty = t.createElement(a);
                two = t.getElementsByTagName(a)[0];
                twenty.async = 1;
                twenty.src = y;
                two.parentNode.insertBefore(twenty, two);
              })(window, document, 'script', 'https://lma.stay22.com/letmeallez.js');
            `}
          </Script>
          <Analytics />
        </DreamListProvider>
      </body>
    </html>
  )
}
