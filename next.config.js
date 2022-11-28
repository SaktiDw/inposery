/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['localhost','inposery-backend.herokuapp.com','images.unsplash.com', '127.0.0.1'],
    formats: ["image/avif", "image/webp"]
  },
  env: {
    API_URL: process.env.API_URL,
  },
}

module.exports = nextConfig
