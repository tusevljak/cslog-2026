import type { Metadata } from 'next'
import { sql, initDb } from '@/lib/db'
import GalleryGrid from '@/components/GalleryGrid'

export const metadata: Metadata = {
  title: 'Gallery | CSLOG',
  description: 'Photos of special transport operations and vehicles by Cargo Special Logistic.',
}

type GalleryImage = { id: number; url: string; caption: string }

export default async function GalleryPage() {
  await initDb()
  const images = await sql`
    SELECT id, url, caption FROM gallery_images ORDER BY sort_order ASC, created_at DESC
  ` as GalleryImage[]

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1280px] mx-auto px-6">
          <p className="uppercase tracking-[0.25em] text-xs mb-4"
            style={{ fontFamily: 'var(--font-inter)', color: '#c5d000' }}>
            CSLOG Gallery
          </p>
          <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '0.05em', color: 'var(--text)', lineHeight: 1 }}>
            Photos
          </h1>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <GalleryGrid images={images} />
        </div>
      </section>
    </div>
  )
}
