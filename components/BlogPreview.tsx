import Link from 'next/link'
import Image from 'next/image'
import { sql, initDb } from '@/lib/db'

type Post = {
  id: number
  title: string
  slug: string
  excerpt: string
  cover_image: string
  published_at: string | null
}

export default async function BlogPreview() {
  await initDb()
  const [post] = await sql<Post>`
    SELECT id, title, slug, excerpt, cover_image, published_at
    FROM blog_posts
    WHERE status = 'published'
    ORDER BY published_at DESC NULLS LAST
    LIMIT 1
  `

  return (
    <section className="py-20" style={{ background: 'var(--bg-subtle)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left: intro */}
          <div>
            <h2
              className="mb-6"
              style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.05em', color: 'var(--text)' }}
            >
              {post ? 'Jedna od CSLOG priča...' : 'CSLOG Priče'}
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-base leading-relaxed mb-4">
              CSLOG sistem duple posade omogućava izuzetnu efikasnost pri postizanju zadatih rokova, ali u svakom trenutku i jednog slobodnog vozača.
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-base leading-relaxed mb-8">
              Kada putujete maksimalnom brzinom od 90 km/h, a često i sporije, ljudi i događaji pored kojih prolazite dobijaju posebnu perspektivu. Čitajte više o tome u našim pričama sa putovanja.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 border border-[#c5d000] text-[#c5d000] uppercase tracking-widest text-sm px-6 py-3 hover:bg-[#c5d000] hover:text-[#0d0d0d] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Sve CSLOG priče
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
              </svg>
            </Link>
          </div>

          {/* Right: featured post */}
          <div>
            {post ? (
              <>
                <Link href={`/blog/${post.slug}`} className="block overflow-hidden mb-5">
                  {post.cover_image ? (
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      width={600}
                      height={380}
                      className="w-full object-cover hover:scale-105 transition-transform duration-500"
                      style={{ height: '280px' }}
                      unoptimized={post.cover_image.startsWith('http')}
                    />
                  ) : (
                    <div
                      className="w-full flex items-center justify-center hover:scale-105 transition-transform duration-500"
                      style={{ height: '280px', background: '#1a1a1a' }}
                    >
                      <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '5rem', color: '#333' }}>CS</span>
                    </div>
                  )}
                </Link>
                <h3
                  className="mb-3"
                  style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: '1.125rem', color: 'var(--text)', lineHeight: 1.4 }}
                >
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-sm leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                )}
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-[#c5d000] text-sm uppercase tracking-widest hover:underline flex items-center gap-2"
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Pročitaj celu priču
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
                  </svg>
                </Link>
              </>
            ) : (
              <div
                className="flex items-center justify-center"
                style={{ height: '280px', background: '#1a1a1a' }}
              >
                <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  Uskoro — prve priče su na putu.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
