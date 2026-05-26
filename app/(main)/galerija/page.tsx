import type { Metadata } from 'next'
import { sql, initDb } from '@/lib/db'
import GalleryGrid from '@/components/GalleryGrid'

export const metadata: Metadata = {
  title: 'Galerija | CSLOG',
  description: 'Fotografije specijalnih transporta i vozila CSLOG kompanije.',
}

type GalleryImage = {
  id: number
  url: string
  caption: string
}

export default async function GalerijaPage() {
  await initDb()
  const images = await sql`
    SELECT id, url, caption FROM gallery_images ORDER BY sort_order ASC, created_at DESC
  ` as GalleryImage[]

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-6">
          <p className="uppercase tracking-[0.25em] text-xs mb-4"
            style={{ fontFamily: 'var(--font-inter)', color: '#c5d000' }}>
            CSLOG Galerija
          </p>
          <h1 style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            letterSpacing: '0.05em',
            color: 'var(--text)',
            lineHeight: 1,
          }}>
            Fotografije
          </h1>
        </div>
      </section>

      {/* Grid + Lightbox */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <GalleryGrid images={images} />
        </div>
      </section>
    </div>
  )
}
