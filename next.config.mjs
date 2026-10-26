import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Static, pre-sized photos; see lib/image-loader.ts and scripts/image-sizes.py
    loader: 'custom',
    loaderFile: './lib/image-loader.ts',
    deviceSizes: [640, 828, 1080, 1440, 1920],
    imageSizes: [256, 384],
  },
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      // Phum Baitang was listed twice; the duplicate folds into the original listing
      { source: '/pools/phum-baitang-95', destination: '/pools/zannier-hotels-phum-baitang-19', permanent: true },
      { source: '/for-hotels/phum-baitang-95', destination: '/for-hotels/zannier-hotels-phum-baitang-19', permanent: true },
      // COMO stopped managing Laucala in 2026; the listing now uses the island's own name
      { source: '/pools/como-laucala-island-20', destination: '/pools/laucala-island-20', permanent: true },
      { source: '/for-hotels/como-laucala-island-20', destination: '/for-hotels/laucala-island-20', permanent: true },
      { source: '/pools/the-last-hotel-48', destination: '/pools/hyatt-centric-downtown-st-louis-48', permanent: true },
      { source: '/for-hotels/the-last-hotel-48', destination: '/for-hotels/hyatt-centric-downtown-st-louis-48', permanent: true },
    ]
  },
}

export default nextConfig
