import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { sql, initDb } from '@/lib/db'

export const metadata: Metadata = {
  title: 'CSLOG Priče | Blog',
  description: 'Priče sa puta, specijalni transporti i novosti iz sveta teretnog transporta.',
}

type Post = {
  id: number
  title: string
  slug: string
  excerpt: string
  cover_image: string
  published_at: string | null
  created_at: string
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('sr-Latn-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogPage() {
  await initDb()
  const posts = await sql<Post>`
    SELECT id, title, slug, excerpt, cover_image, published_at, created_at
    FROM blog_posts
    WHERE status = 'published'
    ORDER BY published_at DESC NULLS LAST
  `

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-6">
          <p
            className="uppercase tracking-[0.25em] text-xs mb-4"
            style={{ fontFamily: 'var(--font-inter)', color: '#c5d000' }}
          >
            CSLOG Blog
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              letterSpacing: '0.05em',
              color: 'var(--text)',
              lineHeight: 1,
            }}
          >
            Priče sa puta
          </h1>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          {posts.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-center py-20">
              Uskoro — prve priče su na putu.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="group flex flex-col">
                  <Link href={`/blog/${post.slug}`} className="block overflow-hidden mb-4">
                    {post.cover_image ? (
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        width={600}
                        height={380}
                        className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        style={{ height: '220px' }}
                        unoptimized={post.cover_image.startsWith('http')}
                      />
                    ) : (
                      <div
                        className="w-full flex items-center justify-center"
                        style={{ height: '220px', background: '#1a1a1a' }}
                      >
                        <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '4rem', color: '#333' }}>CS</span>
                      </div>
                    )}
                  </Link>

                  {post.published_at && (
                    <p
                      className="text-xs uppercase tracking-widest mb-2"
                      style={{ fontFamily: 'var(--font-inter)', color: '#c5d000' }}
                    >
                      {formatDate(post.published_at)}
                    </p>
                  )}

                  <Link href={`/blog/${post.slug}`}>
                    <h2
                      className="mb-3 group-hover:text-[#c5d000] transition-colors"
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        color: 'var(--text)',
                        lineHeight: 1.4,
                      }}
                    >
                      {post.title}
                    </h2>
                  </Link>

                  {post.excerpt && (
                    <p
                      className="text-sm leading-relaxed mb-4 flex-1"
                      style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}
                    >
                      {post.excerpt}
                    </p>
                  )}

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[#c5d000] text-xs uppercase tracking-widest hover:underline flex items-center gap-2 mt-auto"
                    style={{ fontFamily: 'var(--font-inter)' }}
                  >
                    Pročitaj
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
