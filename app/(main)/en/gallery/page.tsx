import type { Metadata } from 'next'
import { sql, initDb } from '@/lib/db'
import GalleryGrid from '@/components/GalleryGrid'
import PageHero from '@/components/PageHero'

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
      <PageHero
        eyebrow="CSLOG Gallery"
        title="Photos"
        subtitle={`${images.length} photographs from our most interesting transports — from regular routes to the most demanding oversized projects.`}
        bgImage={images[0]?.url}
      />
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <GalleryGrid images={images} />
        </div>
      </section>
    </div>
  )
}
