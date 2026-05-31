import Link from 'next/link'

const copy = {
  sr: {
    label: 'Specijalni transport',
    h2a: 'Svi tipovi prikolica',
    h2b: 'za svaki teret',
    body: 'Nudimo najkraće rokove vangabaritnog transporta u Srbiji i svetu. Prevozimo gotovo svaki specijalni teret — bez obzira na težinu, visinu, širinu ili dužinu. Pribavljamo vangabaritne dozvole u Srbiji i svim državama na ruti.',
    cta: 'Pogledaj sve prikolice',
    href: '/prikolice',
    types: ['Niskoutovarne prikolice', 'Platformske prikolice', 'Teleskopske prikolice', 'Modularni transport'],
  },
  en: {
    label: 'Special transport',
    h2a: 'All trailer types',
    h2b: 'for any cargo',
    body: 'We offer the shortest lead times for oversized transport in Serbia and internationally. We carry virtually any special or oversized load — regardless of weight, height, width or length. We obtain all required permits in Serbia and every transit country along the route.',
    cta: 'View all trailers',
    href: '/en/trailers',
    types: ['Low-bed trailers', 'Platform trailers', 'Telescopic trailers', 'Modular transport'],
  },
}

export default function TrailersBanner({ lang = 'sr' }: { lang?: 'sr' | 'en' }) {
  const tx = copy[lang]
  return (
    <section className="relative overflow-hidden" style={{ background: '#0a0a0a', minHeight: 420 }}>

      {/* Background photo — one of the transport shots */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/slike/viber_image_2025-03-11_18-06-05-454.jpg')",
          opacity: 0.22,
        }}
      />

      {/* Hazard tape — top edge */}
      <div style={{
        height: 10,
        background: 'repeating-linear-gradient(-45deg, #ffffff 0px,#ffffff 8px, #0d0d0d 8px,#0d0d0d 16px, #c5d000 16px,#c5d000 24px, #0d0d0d 24px,#0d0d0d 32px)',
        backgroundSize: '45px 45px',
      }} />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — heading + CTA */}
          <div>
            <p style={{ fontFamily: 'var(--font-inter)', color: '#c5d000', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
              {tx.label}
            </p>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.8rem, 6vw, 5rem)', letterSpacing: '0.03em', color: '#f5f5f5', lineHeight: 1, margin: '0 0 2rem' }}>
              {tx.h2a}<br /><span style={{ color: '#c5d000' }}>{tx.h2b}</span>
            </h2>
            <Link href={tx.href}
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.18em', display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.85rem 2rem', background: '#c5d000', color: '#0d0d0d', textDecoration: 'none' }}
              className="hover:bg-[#a8b200] transition-colors duration-200"
            >
              {tx.cta}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
              </svg>
            </Link>
          </div>

          {/* RIGHT */}
          <div>
            <p style={{ fontFamily: 'var(--font-inter)', color: '#9ca3af', lineHeight: 1.8, fontSize: '0.925rem', marginBottom: '2rem' }}>
              {tx.body}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {tx.types.map((label, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 0', borderTop: i === 0 ? '1px solid #1f1f1f' : 'none', borderBottom: '1px solid #1f1f1f' }}>
                  <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '0.85rem', color: '#c5d000', letterSpacing: '0.08em', flexShrink: 0 }}>
                    0{i + 1}
                  </span>
                  <div style={{ width: 1, height: 16, background: '#2a2a2a', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: '#d1d5db' }}>{label}</span>
                  <svg style={{ marginLeft: 'auto', color: '#374151', flexShrink: 0 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
                  </svg>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Hazard tape — bottom edge */}
      <div style={{
        height: 10,
        background: 'repeating-linear-gradient(45deg, #ffffff 0px,#ffffff 8px, #0d0d0d 8px,#0d0d0d 16px, #c5d000 16px,#c5d000 24px, #0d0d0d 24px,#0d0d0d 32px)',
        backgroundSize: '45px 45px',
      }} />

    </section>
  )
}
