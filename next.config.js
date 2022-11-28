/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['localhost','localhost:8000','images.unsplash.com', '127.0.0.1'],
    formats: ["image/avif", "image/webp"]
  },
}

module.exports = nextConfig
