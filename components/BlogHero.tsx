import Link from 'next/link'
import { snippet } from '@/lib/utils'

type Post = {
  id: number
  title: string
  slug: string
  content: string
  cover_image: string
  published_at: string | null
}

type Props = {
  post: Post | null
  lang?: 'sr' | 'en'
}

const HAZARD_TAPE = 'repeating-linear-gradient(-45deg, #c5d000 0px, #c5d000 14px, #0d0d0d 14px, #0d0d0d 28px, #ffffff 28px, #ffffff 42px, #0d0d0d 42px, #0d0d0d 56px)'

const tx = {
  sr: { eyebrow: 'Blog · Najnovija priča', read: 'Pročitaj celu priču', empty: 'Uskoro — prve priče su na putu.', latest: 'Najnovije' },
  en: { eyebrow: 'Blog · Latest story', read: 'Read the full story', empty: 'Coming soon — first stories are on the way.', latest: 'Latest' },
}

function formatDate(iso: string | null, lang: 'sr' | 'en') {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString(lang === 'en' ? 'en-GB' : 'sr-Latn-RS', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function BlogHero({ post, lang = 'sr' }: Props) {
  const t = tx[lang]

  if (!post) {
    return (
      <section className="relative flex items-center justify-center overflow-hidden"
        style={{ background: '#0d0d0d', minHeight: '40vh' }}>
        <p className="text-white/40 text-sm" style={{ fontFamily: 'var(--font-inter)' }}>{t.empty}</p>
        <div className="absolute bottom-0 left-0 right-0 h-10" style={{ background: HAZARD_TAPE }} />
      </section>
    )
  }

  return (
    <section className="relative overflow-hidden" style={{ background: '#0d0d0d', minHeight: '65vh' }}>
      <Link href={`/blog/${post.slug}`} className="block group relative h-full">
        <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 items-center min-h-[65vh] gap-0">

          {/* LEFT — text */}
          <div className="relative z-10 px-6 py-20 md:py-28">
            <p className="text-[#c5d000] text-sm uppercase tracking-[0.3em] mb-6"
              style={{ fontFamily: 'var(--font-inter)' }}>
              {t.eyebrow}
            </p>

            <div className="flex items-center gap-3 mb-5">
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.62rem', textTransform: 'uppercase', letterSpacing: '0.2em', background: '#c5d000', color: '#0d0d0d', padding: '0.2rem 0.55rem', fontWeight: 700 }}>
                {t.latest}
              </span>
              {post.published_at && (
                <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                  {formatDate(post.published_at, lang)}
                </span>
              )}
            </div>

            <h1 className="text-white leading-tight mb-6"
              style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '0.02em' }}>
              {post.title}
            </h1>

            {post.content && (
              <p className="text-white/60 max-w-md leading-relaxed mb-8"
                style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', lineHeight: 1.75 }}>
                {snippet(post.content, 180)}
              </p>
            )}

            <span className="inline-flex items-center gap-2 text-[#c5d000] text-sm uppercase tracking-widest"
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 600 }}>
              {t.read}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="transition-transform group-hover:translate-x-1">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
              </svg>
            </span>
          </div>

          {/* RIGHT — image */}
          <div className="relative h-full min-h-[40vh] md:min-h-[65vh] overflow-hidden">
            {post.cover_image ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.cover_image} alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                {/* Gradient seam between image and text on desktop */}
                <div className="hidden md:block absolute inset-y-0 left-0 w-32"
                  style={{ background: 'linear-gradient(to right, #0d0d0d, transparent)' }} />
              </>
            ) : (
              <div className="absolute inset-0" style={{
                background: 'repeating-linear-gradient(-45deg, #1a1a00, #1a1a00 16px, #0d0d0d 16px, #0d0d0d 32px)',
              }} />
            )}
          </div>
        </div>
      </Link>

      <div className="absolute bottom-0 left-0 right-0 h-10 z-20" style={{ background: HAZARD_TAPE }} />
    </section>
  )
}
