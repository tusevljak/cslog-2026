import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import TrailersGrid from '@/components/TrailersGrid'

export const metadata: Metadata = {
  title: 'Trailers | CSLOG',
  description: 'The CSLOG trailer fleet — low-beds, platforms, telescopics and modular transport for any oversized load.',
}

const trailers = [
  { file: 'prikolice-01.webp', name: 'Faymonville', type: 'Low-bed trailer · 3 axles' },
  { file: 'prikolice-02.webp', name: 'Faymonville', type: 'Low-bed trailer · 4 axles' },
  { file: 'prikolice-03.webp', name: 'FWG',         type: 'Truck transporter' },
  { file: 'prikolice-04.webp', name: 'Kässbohrer',  type: 'Low-bed trailer' },
  { file: 'prikolice-05.webp', name: 'Krone',       type: 'Flatbed trailer · curtainsider' },
  { file: 'prikolice-06.webp', name: 'Nooteboom',   type: 'Telescopic trailer' },
  { file: 'prikolice-07.webp', name: 'Yalçın',      type: 'Flatbed trailer' },
  { file: 'prikolice-08.webp', name: 'Schmitz',     type: 'Flatbed trailer · curtainsider' },
  { file: 'prikolice-09.webp', name: 'Schmitz',     type: 'Flatbed trailer' },
  { file: 'prikolice-10.webp', name: 'Kögel',       type: 'Flatbed trailer' },
]

export default function TrailersPage() {
  return (
    <>
      <PageHero
        eyebrow="Fleet"
        title="Our Trailers"
        subtitle="From low-beds to modular transport — the CSLOG trailer fleet covers every dimension, every load and every route."
        bgImage="/slike/viber_image_2026-04-08_16-38-45-091.jpg"
      />

      {/* Grid */}
      <section className="py-20" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <TrailersGrid trailers={trailers} />
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }} className="py-16">
        <div className="max-w-[1280px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '0.04em', color: 'var(--text)', margin: 0 }}>
              Need special cargo transport?
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Contact us — we&apos;ll advise on the right trailer type for your load and route.
            </p>
          </div>
          <Link href="/en/contact"
            className="hover:bg-[#a8b200] transition-colors duration-200 whitespace-nowrap inline-flex items-center gap-3"
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.18em', background: '#c5d000', color: '#0d0d0d', padding: '0.9rem 2rem', textDecoration: 'none', flexShrink: 0 }}>
            Free Quote
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
