import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { sql, initDb } from '@/lib/db'

function isAdmin(req: NextRequest) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[čć]/g, 'c')
    .replace(/š/g, 's')
    .replace(/ž/g, 'z')
    .replace(/đ/g, 'd')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// GET /api/posts — public gets published only, admin gets all
export async function GET(req: NextRequest) {
  await initDb()
  const admin = isAdmin(req)

  const posts = admin
    ? await sql`SELECT * FROM blog_posts ORDER BY created_at DESC`
    : await sql`SELECT id, title, slug, excerpt, cover_image, status, published_at, created_at
                FROM blog_posts WHERE status = 'published'
                ORDER BY published_at DESC NULLS LAST`

  return NextResponse.json(posts)
}

// POST /api/posts — create (admin only)
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await initDb()

  const body = await req.json()
  const { title, slug, content, excerpt, cover_image, status, published_at, meta_title, meta_description, lang } = body

  const finalSlug = slug || toSlug(title)

  const [post] = await sql`
    INSERT INTO blog_posts (title, slug, content, excerpt, cover_image, status, published_at, meta_title, meta_description, lang)
    VALUES (${title}, ${finalSlug}, ${content || ''}, ${excerpt || ''}, ${cover_image || ''},
            ${status || 'draft'}, ${published_at || null}, ${meta_title || ''}, ${meta_description || ''}, ${lang || 'sr'})
    RETURNING *
  `
  revalidatePath('/')
  revalidatePath('/blog')
  return NextResponse.json(post)
}
