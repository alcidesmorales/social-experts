/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,  
  },
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
  },  
}

module.exports = nextConfig
