import Link from 'next/link'
import Image from 'next/image'

export default function BlogPreview() {
  return (
    <section className="py-20" style={{ background: 'var(--bg-subtle)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left: intro */}
          <div>
            <h2
              className="mb-6"
              style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.05em', color: 'var(--text)' }}
            >
              Jedna od CSLOG priča...
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-base leading-relaxed mb-4">
              CSLOG sistem duple posade omogućava izuzetnu efikasnost pri postizanju zadatih rokova, ali u svakom trenutku i jednog slobodnog vozača.
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-base leading-relaxed mb-8">
              Kada putujete maksimalnom brzinom od 90 km/h, a često i sporije, ljudi i događaji pored kojih prolazite dobijaju posebnu perspektivu. Čitajte više o tome u našim pričama sa putovanja.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-3 border border-[#c5d000] text-[#c5d000] uppercase tracking-widest text-sm px-6 py-3 hover:bg-[#c5d000] hover:text-[#0d0d0d] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Sve CSLOG priče
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
              </svg>
            </Link>
          </div>

          {/* Right: featured post */}
          <div>
            <div className="overflow-hidden mb-5">
              <Image
                src="/slike/viber_image_2026-04-24_10-27-03-123.jpg"
                alt="Transport tereta širine 5 metara"
                width={600}
                height={380}
                className="w-full object-cover hover:scale-105 transition-transform duration-500"
                style={{ height: '280px' }}
              />
            </div>
            <h3
              className="mb-3"
              style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: '1.125rem', color: 'var(--text)', lineHeight: 1.4 }}
            >
              Iz Srbije, do Tirola u Austriji, vangabaritni teret širine 5 metara
            </h3>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-sm leading-relaxed mb-6">
              Uspeli smo da realizujemo specijalni transport tereta širine 5 metara za svega 3 dana. Pogledajte kako se transport odvijao i kuda smo tačno vozili.
            </p>
            <Link
              href="/blog/tirola-austrija"
              className="text-[#c5d000] text-sm uppercase tracking-widest hover:underline flex items-center gap-2"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Pročitaj celu priču
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
