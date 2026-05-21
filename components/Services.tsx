import Link from 'next/link'

const services = [
  {
    title: 'Prevoz specijalnih i vangabaritnih tereta',
    description: 'Transportujemo terete koji premašuju standardne gabarite — po visini, širini, dužini ili težini. Pribavljamo sve potrebne dozvole i odobrenja za svaku rutu.',
    href: '/nase-usluge',
  },
  {
    title: 'Tehnička pratnja i koordinacija',
    description: 'Obezbeđujemo pratnju specijalnih vozila na svim rutama. Naši koordinatori prate transport od utovara do istovara i reaguju u svakom momentu.',
    href: '/nase-usluge',
  },
  {
    title: 'Unutrašnji i međunarodni transport',
    description: 'Vršimo transport na teritoriji Srbije i međunarodni prevoz — kroz Evropu, pa sve do Bliskog Istoka, sa svim potrebnim carinskim i transportnim dokumentima.',
    href: '/nase-usluge',
  },
]

export default function Services() {
  return (
    <section className="py-20" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <h2
          className="text-center mb-16"
          style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.05em', color: 'var(--text)' }}
        >
          CSLOG usluge
        </h2>
        <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: 'var(--border)' }}>
          {services.map((service) => (
            <div key={service.title} className="px-8 py-6 first:pl-0 last:pr-0 flex flex-col gap-4">
              <div className="w-8 h-0.5 bg-[#c5d000]" />
              <h3
                style={{ fontFamily: 'var(--font-inter)', color: 'var(--text)' }}
                className="font-semibold text-base leading-snug"
              >
                {service.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-sm leading-relaxed flex-1">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="text-[#c5d000] text-sm uppercase tracking-widest hover:underline flex items-center gap-2 mt-2"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Saznaj više
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
