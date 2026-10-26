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
    unoptimized: true,
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
