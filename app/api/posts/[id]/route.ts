import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { sql } from '@/lib/db'

function isAdmin(req: NextRequest) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

type Params = { params: Promise<{ id: string }> }

// GET /api/posts/[id] — single post by id or slug
export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params
  const isNumeric = /^\d+$/.test(id)

  const posts = isNumeric
    ? await sql`SELECT * FROM blog_posts WHERE id = ${parseInt(id)}`
    : await sql`SELECT * FROM blog_posts WHERE slug = ${id} AND status = 'published'`

  if (!posts.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(posts[0])
}

// PUT /api/posts/[id] — update (admin only)
export async function PUT(req: NextRequest, { params }: Params) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const { title, slug, content, excerpt, cover_image, status, published_at, meta_title, meta_description } = body

  const [post] = await sql`
    UPDATE blog_posts SET
      title = ${title},
      slug = ${slug},
      content = ${content || ''},
      excerpt = ${excerpt || ''},
      cover_image = ${cover_image || ''},
      status = ${status || 'draft'},
      published_at = ${published_at || null},
      meta_title = ${meta_title || ''},
      meta_description = ${meta_description || ''},
      updated_at = NOW()
    WHERE id = ${parseInt(id)}
    RETURNING *
  `
  revalidatePath('/')
  revalidatePath('/blog')
  revalidatePath(`/blog/${slug}`)
  return NextResponse.json(post)
}

// DELETE /api/posts/[id] — delete (admin only)
export async function DELETE(req: NextRequest, { params }: Params) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await params
  await sql`DELETE FROM blog_posts WHERE id = ${parseInt(id)}`
  revalidatePath('/')
  revalidatePath('/blog')
  return NextResponse.json({ ok: true })
}
