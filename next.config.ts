import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['drizzle-kit'],
  outputFileTracingIncludes: {
    // Force drizzle-kit + its runtime deps into the serverless bundle for the db-migrate route
    '/api/db-migrate': [
      './node_modules/drizzle-kit/**/*',
      './node_modules/drizzle-orm/**/*',
    ],
  },
}

export default withPayload(nextConfig)
