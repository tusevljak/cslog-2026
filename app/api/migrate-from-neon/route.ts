import { NextRequest, NextResponse } from 'next/server'
import postgres from 'postgres'
import { sql, initDb } from '@/lib/db'

function isAdmin(req: NextRequest) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

/**
 * JEDNOKRATNI endpoint za migraciju sa Neon-a na Coolify Postgres.
 *
 * Preduslovi:
 *   - Coolify Application env: NEON_DATABASE_URL=<Neon unpooled URL>
 *   - Coolify Application env: ADMIN_PASSWORD=<postoji>
 *
 * Ovo je destruktivna operacija — briše sve u Coolify bazi pre importa!
 *
 * Pozovi:
 *   curl -X POST -H 'x-admin-password: PWD' https://.../api/migrate-from-neon
 *
 * NAKON MIGRACIJE: obriši NEON_DATABASE_URL env varijablu iz Coolify-ja.
 */
export async function POST(req: NextRequest) {
  if (!isAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const neonUrl = process.env.NEON_DATABASE_URL
  if (!neonUrl) {
    return NextResponse.json({
      error: 'NEON_DATABASE_URL nije postavljena. Dodaj je u Coolify Application env varijable.'
    }, { status: 400 })
  }

  await initDb() // osiguraj da tabele postoje na Coolify strani

  // Otvori zasebnu konekciju ka Neon-u samo za read
  const neon = postgres(neonUrl, { prepare: false, max: 2 })

  const stats = { posts: 0, gallery: 0, inquiries: 0 }

  try {
    // ── 1. BLOG POSTS ────────────────────────────────
    const posts = await neon`
      SELECT id, title, slug, content, excerpt, cover_image, status,
             published_at, meta_title, meta_description, lang,
             created_at, updated_at
      FROM blog_posts
      ORDER BY id
    `

    await sql`TRUNCATE blog_posts RESTART IDENTITY CASCADE`
    for (const p of posts) {
      await sql`
        INSERT INTO blog_posts (
          id, title, slug, content, excerpt, cover_image, status,
          published_at, meta_title, meta_description, lang,
          created_at, updated_at
        ) VALUES (
          ${p.id}, ${p.title}, ${p.slug}, ${p.content ?? ''}, ${p.excerpt ?? ''},
          ${p.cover_image ?? ''}, ${p.status ?? 'draft'}, ${p.published_at},
          ${p.meta_title ?? ''}, ${p.meta_description ?? ''}, ${p.lang ?? 'sr'},
          ${p.created_at}, ${p.updated_at}
        )
      `
    }
    // Reset SERIAL da nastavne inserte krenu od najvišeg id + 1
    if (posts.length > 0) {
      await sql`SELECT setval('blog_posts_id_seq', (SELECT MAX(id) FROM blog_posts))`
    }
    stats.posts = posts.length

    // ── 2. GALLERY IMAGES ───────────────────────────
    // Napomena: tabela mora da postoji (initDb je već pozvao)
    const gallery = await neon`
      SELECT id, url, caption, sort_order, created_at
      FROM gallery_images
      ORDER BY id
    `

    await sql`TRUNCATE gallery_images RESTART IDENTITY CASCADE`
    for (const g of gallery) {
      await sql`
        INSERT INTO gallery_images (id, url, caption, sort_order, created_at)
        VALUES (${g.id}, ${g.url}, ${g.caption ?? ''}, ${g.sort_order ?? 0}, ${g.created_at})
      `
    }
    if (gallery.length > 0) {
      await sql`SELECT setval('gallery_images_id_seq', (SELECT MAX(id) FROM gallery_images))`
    }
    stats.gallery = gallery.length

    // ── 3. CONTACT INQUIRIES ────────────────────────
    // Tabela se lazy-kreira u /api/contact — proveri da postoji na Neon strani
    type Inquiry = {
      id: number
      ime: string
      email: string
      telefon: string | null
      ruta: string | null
      teret: string | null
      poruka: string | null
      created_at: string
    }
    let inquiries: Inquiry[] = []
    try {
      const rows = await neon<Inquiry[]>`
        SELECT id, ime, email, telefon, ruta, teret, poruka, created_at
        FROM contact_inquiries
        ORDER BY id
      `
      inquiries = rows as Inquiry[]
    } catch {
      // tabela ne postoji na Neon-u — nema upita, preskoci
    }

    if (inquiries.length > 0) {
      await sql`
        CREATE TABLE IF NOT EXISTS contact_inquiries (
          id SERIAL PRIMARY KEY,
          ime TEXT NOT NULL,
          email TEXT NOT NULL,
          telefon TEXT DEFAULT '',
          ruta TEXT DEFAULT '',
          teret TEXT DEFAULT '',
          poruka TEXT DEFAULT '',
          created_at TIMESTAMPTZ DEFAULT NOW()
        )
      `
      await sql`TRUNCATE contact_inquiries RESTART IDENTITY CASCADE`
      for (const q of inquiries) {
        await sql`
          INSERT INTO contact_inquiries (id, ime, email, telefon, ruta, teret, poruka, created_at)
          VALUES (${q.id}, ${q.ime}, ${q.email}, ${q.telefon ?? ''}, ${q.ruta ?? ''},
                  ${q.teret ?? ''}, ${q.poruka ?? ''}, ${q.created_at})
        `
      }
      await sql`SELECT setval('contact_inquiries_id_seq', (SELECT MAX(id) FROM contact_inquiries))`
      stats.inquiries = inquiries.length
    }

    await neon.end()

    return NextResponse.json({
      ok: true,
      copied: stats,
      message: 'Migracija završena. Obriši NEON_DATABASE_URL env varijablu iz Coolify-ja.',
    })
  } catch (err) {
    await neon.end().catch(() => {})
    console.error('Migration error:', err)
    return NextResponse.json({
      error: 'Migration failed',
      details: String(err),
    }, { status: 500 })
  }
}
