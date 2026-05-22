import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['drizzle-kit'],
  outputFileTracingIncludes: {
    // Force drizzle-kit into the serverless bundle for the db-migrate route
    '/api/db-migrate': ['./node_modules/drizzle-kit/**/*'],
  },
}

export default withPayload(nextConfig)
