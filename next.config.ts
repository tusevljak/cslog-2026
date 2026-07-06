import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Standalone output → potreban za Docker/Coolify deploy.
  // Vercel ignoriše ovaj flag, pa je bezbedno držati ga uvek.
  output: 'standalone',
}

export default nextConfig
