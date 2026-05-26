import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

function isAdmin(req: NextRequest) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const items: { id: number; sort_order: number }[] = await req.json()
  await Promise.all(
    items.map(({ id, sort_order }) =>
      sql`UPDATE gallery_images SET sort_order = ${sort_order} WHERE id = ${id}`
    )
  )
  return NextResponse.json({ ok: true })
}
