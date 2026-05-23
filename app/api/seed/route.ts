import { NextRequest, NextResponse } from 'next/server'
import { sql, initDb } from '@/lib/db'

function isAdmin(req: NextRequest) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[čć]/g, 'c').replace(/š/g, 's').replace(/ž/g, 'z').replace(/đ/g, 'd')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&#8211;/g, '–').replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"').trim()
}

function htmlToMarkdown(html: string) {
  return html
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '\n## $1\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '\n### $1\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '\n#### $1\n')
    .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b>(.*?)<\/b>/gi, '**$1**')
    .replace(/<em>(.*?)<\/em>/gi, '_$1_')
    .replace(/<i>(.*?)<\/i>/gi, '_$1_')
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
    .replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, '![]($1)')
    .replace(/<ul[^>]*>(.*?)<\/ul>/gis, (_, inner) =>
      inner.replace(/<li[^>]*>(.*?)<\/li>/gis, (_: string, item: string) => `- ${stripHtml(item)}\n`)
    )
    .replace(/<ol[^>]*>(.*?)<\/ol>/gis, (_, inner) => {
      let i = 0
      return inner.replace(/<li[^>]*>(.*?)<\/li>/gis, (_: string, item: string) => `${++i}. ${stripHtml(item)}\n`)
    })
    .replace(/<p[^>]*>(.*?)<\/p>/gis, '\n$1\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')
    .replace(/&#8211;/g, '–').replace(/&#8217;/g, "'").replace(/&#8220;/g, '"').replace(/&#8221;/g, '"')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  await initDb()

  // Fetch from WordPress REST API
  const wpRes = await fetch('https://cslog.rs/wp-json/wp/v2/posts?per_page=100&_fields=id,title,slug,date,excerpt,content', {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  })

  if (!wpRes.ok) {
    return NextResponse.json({ error: 'Ne mogu da dohvatim postove sa cslog.rs' }, { status: 502 })
  }

  const wpPosts = await wpRes.json()

  let inserted = 0
  let skipped = 0

  for (const wp of wpPosts) {
    const title = stripHtml(wp.title?.rendered || '')
    const slug = wp.slug || toSlug(title)
    const excerpt = stripHtml(wp.excerpt?.rendered || '')
    const content = htmlToMarkdown(wp.content?.rendered || '')
    const published_at = wp.date ? new Date(wp.date).toISOString() : null

    try {
      const result = await sql`
        INSERT INTO blog_posts (title, slug, content, excerpt, status, published_at, meta_title, meta_description)
        VALUES (
          ${title},
          ${slug},
          ${content},
          ${excerpt},
          'published',
          ${published_at},
          ${title},
          ${excerpt.slice(0, 160)}
        )
        ON CONFLICT (slug) DO NOTHING
        RETURNING id
      `
      if (result.length > 0) inserted++
      else skipped++
    } catch {
      skipped++
    }
  }

  return NextResponse.json({ ok: true, inserted, skipped, total: wpPosts.length })
}
