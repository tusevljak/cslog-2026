import type { Metadata } from 'next'
import Link from 'next/link'
import PageHero from '@/components/PageHero'

export const metadata: Metadata = {
  title: 'Prikolice | CSLOG',
  description: 'Flota CSLOG prikolica — niskoutovarne, platformske, teleskopske i modularni transport za svaki vangabaritni teret.',
}

const trailers = [
  { file: 'FAYMONVILLE_page-0001.jpg',      name: 'Faymonville',          type: 'Niskoutovarna' },
  { file: 'KASSBORHRER_page-0001.jpg',       name: 'Kassbohrer',           type: 'Platformska' },
  { file: 'KOGEL-SMITZKOGEL_page-0001.jpg', name: 'Kögel / Schmitz',      type: 'Platformska' },
  { file: 'KRONE-NA_page-0001.jpg',          name: 'Krone NA',             type: 'Cerada' },
  { file: 'LINTRAILER-OO-435-BG_page-0001.jpg', name: 'Lintrailer OO-435', type: 'Niskoutovarna' },
  { file: 'LINTRAILER-OO-436-BG_page-0001.jpg', name: 'Lintrailer OO-436', type: 'Niskoutovarna' },
  { file: 'MEUSBURGER_page-0001.jpg',        name: 'Meusburger',           type: 'Niskoutovarna' },
  { file: 'MEUSBURGER-MPG3_page-0001.jpg',   name: 'Meusburger MPG3',      type: 'Teleskopska' },
  { file: 'YALCIN_page-0001.jpg',            name: 'Yalçın',              type: 'Modularni transport' },
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--border)' }}>
            {trailers.map((t) => (
              <div key={t.file} style={{ background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
                {/* Slika */}
                <div style={{ overflow: 'hidden', background: 'var(--bg-subtle)', flexShrink: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/prikolice/${encodeURIComponent(t.file)}`}
                    alt={t.name}
                    style={{ width: '100%', height: 240, objectFit: 'contain', display: 'block', padding: '1rem' }}
                  />
                </div>

                {/* Info */}
                <div style={{ padding: '1.25rem 1.5rem', borderTop: '2px solid #c5d000', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.25rem', letterSpacing: '0.04em', color: 'var(--text)', lineHeight: 1.1 }}>
                      {t.name}
                    </p>
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#c5d000', marginTop: '0.2rem' }}>
                      {t.type}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
