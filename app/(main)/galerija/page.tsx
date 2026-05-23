import type { Metadata } from 'next'
import { sql, initDb } from '@/lib/db'

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

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-[1280px] mx-auto px-6">
          {images.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)', textAlign: 'center' }}
              className="py-20">
              Galerija se puni — uskoro.
            </p>
          ) : (
            <div style={{
              columns: '3 280px',
              gap: '0.75rem',
            }}>
              {images.map(img => (
                <div key={img.id} style={{ breakInside: 'avoid', marginBottom: '0.75rem', overflow: 'hidden' }}
                  className="group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.caption || 'CSLOG transport'}
                    style={{ width: '100%', display: 'block', transition: 'transform 0.4s ease' }}
                    className="group-hover:scale-105"
                  />
                  {img.caption && (
                    <p style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)',
                      padding: '0.4rem 0',
                    }}>
                      {img.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
