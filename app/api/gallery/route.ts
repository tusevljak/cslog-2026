import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { sql, initDb } from '@/lib/db'

function isAdmin(req: NextRequest) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  await initDb()
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const rows = await sql`SELECT * FROM gallery_images ORDER BY sort_order ASC, created_at DESC`
  return NextResponse.json(rows)
}

export async function POST(req: NextRequest) {
  await initDb()
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { url, caption } = await req.json()
  const [row] = await sql`
    INSERT INTO gallery_images (url, caption)
    VALUES (${url}, ${caption || ''})
    RETURNING *
  `
  revalidatePath('/galerija')
  return NextResponse.json(row)
}
