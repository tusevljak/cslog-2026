import Link from 'next/link'
import { sql, initDb } from '@/lib/db'

type Post = {
  id: number
  title: string
  slug: string
  excerpt: string
  cover_image: string
  published_at: string | null
}

function formatDate(iso: string | null) {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('sr-RS', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default async function BlogPreview() {
  await initDb()
  const posts = await sql`
    SELECT id, title, slug, excerpt, cover_image, published_at
    FROM blog_posts
    WHERE status = 'published'
    ORDER BY published_at DESC NULLS LAST
    LIMIT 3
  ` as Post[]

  return (
    <section style={{ background: '#0d0d0d' }} className="py-20">
      <div className="max-w-[1280px] mx-auto px-6">

        {/* ── Header: naslov levo, opis desno ── */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-14"
          style={{ borderBottom: '1px solid #1a1a1a', paddingBottom: '3rem' }}>
          <div className="flex-1">
            <p style={{
              fontFamily: 'var(--font-inter)', color: '#c5d000',
              fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              Priče sa puta
            </p>
            <h2 style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              letterSpacing: '0.04em',
              color: '#f5f5f5',
              lineHeight: 1,
              margin: 0,
            }}>
              CSLOG Priče
            </h2>
          </div>
          <div style={{ maxWidth: 480 }}>
            <p style={{ fontFamily: 'var(--font-inter)', color: '#6b7280', lineHeight: 1.8, fontSize: '0.925rem', margin: 0 }}>
              CSLOG sistem duple posade omogućava izuzetnu efikasnost pri postizanju zadatih rokova.
              Kada putujete maksimalnom brzinom od 90 km/h, a često i sporije — ljudi i događaji
              pored kojih prolazite dobijaju posebnu perspektivu.
            </p>
          </div>
        </div>

        {/* ── 3 karte ── */}
        {posts.length === 0 ? (
          <p style={{ fontFamily: 'var(--font-inter)', color: '#3a3a3a', textAlign: 'center' }} className="py-16">
            Uskoro — prve priče su na putu.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-px mb-12" style={{ background: '#1a1a1a' }}>
            {posts.map((post) => (
              <article key={post.id} style={{ background: '#0d0d0d', display: 'flex', flexDirection: 'column' }}>

                {/* Slika ili placeholder */}
                <Link href={`/blog/${post.slug}`} style={{ display: 'block', overflow: 'hidden', flexShrink: 0 }}>
                  {post.cover_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      style={{ width: '100%', height: 220, objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                      onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                      onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                  ) : (
                    <div style={{
                      width: '100%', height: 220, background: '#111',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '4rem', color: '#1e1e1e', letterSpacing: '0.1em' }}>
                        CS
                      </span>
                    </div>
                  )}
                </Link>

                {/* Sadržaj */}
                <div style={{ padding: '1.5rem', borderTop: '2px solid #c5d000', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {post.published_at && (
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.68rem', color: '#c5d000', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
                      {formatDate(post.published_at)}
                    </p>
                  )}
                  <h3 style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: '1rem', color: '#f0f0f0', lineHeight: 1.45, margin: 0 }}>
                    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}
                      onMouseOver={e => (e.currentTarget.style.color = '#c5d000')}
                      onMouseOut={e => (e.currentTarget.style.color = 'inherit')}>
                      {post.title}
                    </Link>
                  </h3>
                  {post.excerpt && (
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.84rem', color: '#6b7280', lineHeight: 1.7, margin: 0, flex: 1,
                      display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                      {post.excerpt}
                    </p>
                  )}
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', color: '#c5d000', textTransform: 'uppercase', letterSpacing: '0.15em', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: 'auto', paddingTop: '0.5rem' }}
                  >
                    Čitaj
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ── CTA dugme ── */}
        <div style={{ textAlign: 'center' }}>
          <Link
            href="/blog"
            style={{
              fontFamily: 'var(--font-inter)', fontWeight: 700,
              fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em',
              display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.85rem 2.5rem',
              border: '1px solid #c5d000', color: '#c5d000', textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseOver={e => { e.currentTarget.style.background = '#c5d000'; e.currentTarget.style.color = '#0d0d0d' }}
            onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c5d000' }}
          >
            Sve CSLOG priče
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}
