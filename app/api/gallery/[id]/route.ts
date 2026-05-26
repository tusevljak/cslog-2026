import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

function isAdmin(req: NextRequest) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

type Params = { params: Promise<{ id: string }> }

export async function PUT(req: NextRequest, { params }: Params) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  if (typeof body.sort_order === 'number') {
    await sql`UPDATE gallery_images SET sort_order = ${body.sort_order} WHERE id = ${parseInt(id)}`
  }
  if (typeof body.caption === 'string') {
    await sql`UPDATE gallery_images SET caption = ${body.caption} WHERE id = ${parseInt(id)}`
  }
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest, { params }: Params) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await sql`DELETE FROM gallery_images WHERE id = ${parseInt(id)}`
  return NextResponse.json({ ok: true })
}
