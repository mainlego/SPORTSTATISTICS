/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
    ],
  },
  // Оптимизация для Render
  experimental: {
    serverComponentsExternalPackages: ['firebase-admin']
  },
  // Отключаем статическую оптимизацию для API routes
  trailingSlash: false,
  // Конфигурация для продакшена
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,

  // Service-specific configuration based on SERVICE_TYPE environment variable
  ...(process.env.SERVICE_TYPE === 'backend' ? {
    // Backend service: redirect all root paths to API
    rewrites: async () => [
      {
        source: '/:path*',
        destination: '/api/:path*',
      },
    ],
  } : process.env.SERVICE_TYPE === 'frontend' ? {
    // Frontend service: proxy API calls to backend
    rewrites: async () => [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ],
  } : {}),
}

module.exports = nextConfig