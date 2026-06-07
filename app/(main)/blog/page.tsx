import Link from 'next/link'
import type { Metadata } from 'next'
import { sql, initDb } from '@/lib/db'
import { snippet } from '@/lib/utils'
import BlogHero from '@/components/BlogHero'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Priče sa puta | CSLOG Blog',
  description: 'Specijalni transporti, priče vozača i novosti iz CSLOG-a — dvadeset godina na putu.',
}

type Post = {
  id: number
  title: string
  slug: string
  content: string
  cover_image: string
  published_at: string | null
  created_at: string
}

function formatDate(d: string | null) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('sr-Latn-RS', { day: 'numeric', month: 'long', year: 'numeric' })
}

function PostImage({ src, alt, height = 240 }: { src: string; alt: string; height?: number }) {
  if (!src) return (
    <div style={{ height, background: 'repeating-linear-gradient(-45deg, #1a1a00, #1a1a00 12px, #0d0d0d 12px, #0d0d0d 24px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '3rem', color: '#c5d000', opacity: 0.3, letterSpacing: '0.1em' }}>CSLOG</span>
    </div>
  )
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} style={{ width: '100%', height, objectFit: 'cover', display: 'block' }} />
}

export default async function BlogPage() {
  await initDb()
  const posts = await sql`
    SELECT id, title, slug, content, cover_image, published_at, created_at
    FROM blog_posts
    WHERE status = 'published' AND (lang = 'sr' OR lang IS NULL)
    ORDER BY published_at DESC NULLS LAST
  ` as Post[]

  const [featured, ...rest] = posts

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <BlogHero post={featured || null} lang="sr" />

      {rest.length > 0 && (
        <section className="py-16">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex items-baseline justify-between mb-10">
              <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', letterSpacing: '0.04em', color: 'var(--text)' }}>
                Sve priče
              </h2>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {posts.length} {posts.length === 1 ? 'priča' : posts.length < 5 ? 'priče' : 'priča'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2px', border: '1px solid var(--border)' }}>
              {rest.map((post) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block" style={{ borderRight: '1px solid var(--border)' }}>
                  <article>
                    <div style={{ overflow: 'hidden' }}>
                      <div style={{ transition: 'transform 0.5s ease' }} className="group-hover:scale-[1.03]">
                        <PostImage src={post.cover_image} alt={post.title} height={200} />
                      </div>
                    </div>
                    <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border)' }}>
                      {post.published_at && (
                        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#c5d000', marginBottom: '0.6rem' }}>
                          {formatDate(post.published_at)}
                        </p>
                      )}
                      <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.4rem', letterSpacing: '0.04em', color: 'var(--text)', lineHeight: 1.15, marginBottom: '0.6rem', transition: 'color 0.2s' }} className="group-hover:text-[#c5d000]">
                        {post.title}
                      </h3>
                      {post.content && (
                        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.85rem', lineHeight: 1.65, color: 'var(--text-muted)' }}>
                          {snippet(post.content)}
                        </p>
                      )}
                      <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-inter)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#c5d000' }}>
                        Pročitaj
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition: 'transform 0.2s' }} className="group-hover:translate-x-1">
                          <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
                        </svg>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
