import { NextRequest, NextResponse } from 'next/server'
import { sql, initDb } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import fs from 'node:fs'
import path from 'node:path'

function isAdmin(req: NextRequest) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await initDb()

  const dir = path.join(process.cwd(), 'public', 'galerija')
  if (!fs.existsSync(dir)) {
    return NextResponse.json({ error: 'public/galerija/ ne postoji' }, { status: 400 })
  }

  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.webp'))
    .sort()

  // Get existing URLs to skip
  const existing = await sql`SELECT url FROM gallery_images` as { url: string }[]
  const existingUrls = new Set(existing.map(r => r.url))

  let inserted = 0
  let skipped = 0
  let order = existing.length

  for (const file of files) {
    const url = `/galerija/${file}`
    if (existingUrls.has(url)) { skipped++; continue }
    await sql`
      INSERT INTO gallery_images (url, caption, sort_order)
      VALUES (${url}, '', ${order})
    `
    order++
    inserted++
  }

  revalidatePath('/')
  revalidatePath('/galerija')
  revalidatePath('/en/gallery')

  return NextResponse.json({ inserted, skipped, total: files.length })
}
