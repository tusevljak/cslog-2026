import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { pushDevSchema } from '@payloadcms/drizzle'

/**
 * One-time database initialization endpoint.
 * Call after a fresh deployment to create all Payload tables in Neon.
 *
 * Usage:
 *   curl https://cslog-2026.vercel.app/api/db-migrate?secret=<PAYLOAD_SECRET>
 *
 * Protected by PAYLOAD_SECRET so it cannot be triggered by random visitors.
 */
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (!secret || secret !== process.env.PAYLOAD_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const payload = await getPayload({ config: configPromise })
    // pushDevSchema syncs the Payload schema to the database (create / alter tables)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await pushDevSchema(payload.db as any)
    return NextResponse.json({ ok: true, message: 'Database schema synced successfully.' })
  } catch (err) {
    console.error('[db-migrate]', err)
    return NextResponse.json(
      { error: String(err) },
      { status: 500 },
    )
  }
}
