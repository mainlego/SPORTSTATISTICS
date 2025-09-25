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
}

module.exports = nextConfig