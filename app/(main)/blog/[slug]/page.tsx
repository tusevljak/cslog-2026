import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { marked } from 'marked'
import { sql } from '@/lib/db'

type Post = {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  cover_image: string
  status: string
  published_at: string | null
  meta_title: string
  meta_description: string
  created_at: string
}

type Params = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const rows = await sql`
    SELECT title, excerpt, meta_title, meta_description, cover_image
    FROM blog_posts WHERE slug = ${slug} AND status = 'published'
  ` as Post[]
  const post = rows[0]
  if (!post) return {}
  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    openGraph: post.cover_image ? { images: [post.cover_image] } : undefined,
  }
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('sr-Latn-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params
  const rows = await sql`
    SELECT * FROM blog_posts WHERE slug = ${slug} AND status = 'published'
  ` as Post[]
  const post = rows[0]
  if (!post) notFound()

  const html = await marked(post.content || '', { gfm: true, breaks: true })

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Cover image */}
      {post.cover_image && (
        <div className="w-full overflow-hidden" style={{ maxHeight: '520px' }}>
          <Image
            src={post.cover_image}
            alt={post.title}
            width={1280}
            height={520}
            className="w-full object-cover"
            style={{ maxHeight: '520px' }}
            priority
            unoptimized={post.cover_image.startsWith('http')}
          />
        </div>
      )}

      {/* Article */}
      <article className="max-w-[780px] mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-10" aria-label="Breadcrumb">
          <Link
            href="/blog"
            className="text-xs uppercase tracking-widest hover:text-[#c5d000] transition-colors"
            style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}
          >
            Blog
          </Link>
          <span style={{ color: 'var(--text-muted)' }}>/</span>
          <span
            className="text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-inter)', color: '#c5d000' }}
          >
            {post.title}
          </span>
        </nav>

        {/* Date */}
        {post.published_at && (
          <p
            className="text-xs uppercase tracking-widest mb-4"
            style={{ fontFamily: 'var(--font-inter)', color: '#c5d000' }}
          >
            {formatDate(post.published_at)}
          </p>
        )}

        {/* Title */}
        <h1
          className="mb-6"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            letterSpacing: '0.05em',
            color: 'var(--text)',
            lineHeight: 1.05,
          }}
        >
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p
            className="text-lg leading-relaxed mb-10 pb-10 border-b border-white/10"
            style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)', fontStyle: 'italic' }}
          >
            {post.excerpt}
          </p>
        )}

        {/* Content */}
        <div
          className="prose-cslog"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Back link */}
        <div className="mt-16 pt-10 border-t border-white/10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#c5d000] text-sm uppercase tracking-widest hover:underline"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12,19 5,12 12,5" />
            </svg>
            Sve priče
          </Link>
        </div>
      </article>
    </div>
  )
}
