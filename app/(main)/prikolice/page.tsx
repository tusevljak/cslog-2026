import type { Metadata } from 'next'
import Link from 'next/link'

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
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: '#0d0d0d', minHeight: '52vh', display: 'flex', alignItems: 'center' }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/slike/viber_image_2026-04-08_16-38-45-091.jpg')" }} />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-28 w-full">
          <p className="text-[#c5d000] text-sm uppercase tracking-[0.3em] mb-6"
            style={{ fontFamily: 'var(--font-inter)' }}>
            Flota
          </p>
          <h1 style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            letterSpacing: '0.02em',
            color: '#ffffff',
            lineHeight: 1,
            marginBottom: '1.5rem',
          }}>
            Naše prikolice
          </h1>
          <p style={{ fontFamily: 'var(--font-inter)', color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.75, maxWidth: 560 }}>
            Od niskoutovarne do modularnog transporta — CSLOG flota prikolica pokriva svaki gabarit,
            svaki teret i svaku rutu.
          </p>
        </div>

        {/* Hazard tape */}
        <div className="absolute bottom-0 left-0 right-0" style={{
          height: 10,
          background: 'repeating-linear-gradient(-45deg, #ffffff 0px,#ffffff 8px, #0d0d0d 8px,#0d0d0d 16px, #c5d000 16px,#c5d000 24px, #0d0d0d 24px,#0d0d0d 32px)',
          backgroundSize: '45px 45px',
        }} />
      </section>

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
