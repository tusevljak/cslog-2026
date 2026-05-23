import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

function isAdmin(req: NextRequest) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const wpRes = await fetch(
    'https://cslog.rs/wp-json/wp/v2/posts?per_page=100&_embed=wp:featuredmedia&_fields=slug,_embedded',
    { headers: { 'User-Agent': 'Mozilla/5.0' } }
  )

  if (!wpRes.ok) return NextResponse.json({ error: 'Ne mogu da dohvatim slike sa cslog.rs' }, { status: 502 })

  const wpPosts = await wpRes.json()

  let updated = 0
  let skipped = 0

  for (const wp of wpPosts) {
    const slug = wp.slug
    const imageUrl = wp._embedded?.['wp:featuredmedia']?.[0]?.source_url

    if (!imageUrl) { skipped++; continue }

    const result = await sql`
      UPDATE blog_posts
      SET cover_image = ${imageUrl}, updated_at = NOW()
      WHERE slug = ${slug} AND (cover_image = '' OR cover_image IS NULL)
      RETURNING id
    `
    if (result.length > 0) updated++
    else skipped++
  }

  return NextResponse.json({ ok: true, updated, skipped })
}
