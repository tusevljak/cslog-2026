import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

function isAdmin(req: NextRequest) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const rows = await sql`
      SELECT * FROM contact_inquiries ORDER BY created_at DESC
    `
    return NextResponse.json(rows)
  } catch {
    // Table might not exist yet
    return NextResponse.json([])
  }
}
