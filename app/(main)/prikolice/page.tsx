import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'
import TrailersGrid from '@/components/TrailersGrid'

export const metadata: Metadata = {
  title: 'Prikolice | CSLOG',
  description: 'Flota CSLOG prikolica — niskoutovarne, platformske, teleskopske i modularni transport za svaki vangabaritni teret.',
}

const trailers = [
  { file: 'prikolice-01.webp', name: 'Faymonville', type: 'Niskoutovarna · 3 osovine' },
  { file: 'prikolice-02.webp', name: 'Faymonville', type: 'Niskoutovarna · 4 osovine' },
  { file: 'prikolice-03.webp', name: 'FWG',         type: 'Auto-transporter' },
  { file: 'prikolice-04.webp', name: 'Kässbohrer',  type: 'Niskoutovarna' },
  { file: 'prikolice-05.webp', name: 'Krone',       type: 'Cerada' },
  { file: 'prikolice-06.webp', name: 'Nooteboom',   type: 'Niskoutovarna teleskopska' },
  { file: 'prikolice-07.webp', name: 'Yalçın',      type: 'Platformska' },
  { file: 'prikolice-08.webp', name: 'Schmitz',     type: 'Cerada' },
  { file: 'prikolice-09.webp', name: 'Schmitz',     type: 'Platformska' },
  { file: 'prikolice-10.webp', name: 'Kögel',       type: 'Platformska' },
]

export default function PrikolicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Flota"
        title="Naše prikolice"
        subtitle="Od niskoutovarne do modularnog transporta — CSLOG flota prikolica pokriva svaki gabarit, svaki teret i svaku rutu."
        bgImage="/slike/viber_image_2026-04-08_16-38-45-091.jpg"
      />

      {/* Grid prikolica */}
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
              Trebate prevoz specijalnog tereta?
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              Kontaktirajte nas — procenićemo koji tip prikolice odgovara vašem teretu i ruti.
            </p>
          </div>
          <Link href="/kontakt"
            className="hover:bg-[#a8b200] transition-colors duration-200 whitespace-nowrap inline-flex items-center gap-3"
            style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.18em', background: '#c5d000', color: '#0d0d0d', padding: '0.9rem 2rem', textDecoration: 'none', flexShrink: 0 }}>
            Besplatan upit
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
            </svg>
          </Link>
        </div>
      </section>
    </>
  )
}
