import type { Metadata } from 'next'
import { sql, initDb } from '@/lib/db'
import GalleryGrid from '@/components/GalleryGrid'
import PageHero from '@/components/PageHero'

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
      <PageHero
        eyebrow="CSLOG Galerija"
        title="Fotografije"
        subtitle={`${images.length} fotografija sa najzanimljivijih transporta — od redovnih ruta do najizazovnijih vangabaritnih projekata.`}
        bgImage={images[0]?.url}
      />

      {/* Grid + Lightbox */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          <GalleryGrid images={images} />
        </div>
      </section>
    </div>
  )
}
