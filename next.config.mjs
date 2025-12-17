import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

const pwaConfig = withPWA({
  dest: 'public',
  // You might want to disable PWA in development for faster rebuilds
  // disable: process.env.NODE_ENV === 'development',
})

export default pwaConfig(nextConfig)
