import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
// Static import: Next.js traces this and includes drizzle-kit in the serverless bundle.
// This bypasses the dynamic require('drizzle-kit/api') inside Payload's requireDrizzleKit.js
// which Next.js cannot trace and therefore does not bundle.
import { pushSchema } from 'drizzle-kit/api'

/**
 * One-time database initialization endpoint.
 * Creates all Payload tables in Neon without needing the CLI.
 *
 * Call once after a fresh deployment:
 *   curl https://cslog-2026.vercel.app/api/db-migrate?secret=<PAYLOAD_SECRET>
 */
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (!secret || secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config: configPromise })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const db = payload.db as any

    const { apply, warnings, hasDataLoss } = await pushSchema(
      db.schema,
      db.drizzle,
      db.schemaName ? [db.schemaName] : undefined,
      db.tablesFilter,
      db.extensions?.postgis ? ['postgis'] : undefined,
    )

    // Apply unconditionally — safe on a fresh empty database
    await apply()

    return NextResponse.json({
      ok: true,
      message: 'Database schema synced successfully.',
      warnings: warnings.length ? warnings : undefined,
      hasDataLoss: hasDataLoss || undefined,
    })
  } catch (err) {
    console.error('[db-migrate]', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
