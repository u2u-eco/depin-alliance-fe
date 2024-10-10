/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  output: 'standalone',
  experimental: {
    missingSuspenseWithCSRBailout: false
  },
  async rewrites() {
    return [
      {
        source: '/games/puzzle',
        destination: '/games/puzzle/index.html'
      },
      {
        source: '/games/monster',
        destination: '/games/monster/index.html'
      },
      {
        source: '/games/solve-math',
        destination: '/games/solve-math/index.html'
      }
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  }
}

export default nextConfig
