import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'

export const metadata = {
  title: 'Services – CSLOG',
  description: 'Special and oversized cargo transport, technical escort and coordination, domestic and international haulage.',
}

const steps = [
  {
    tag: 'Your part',
    title: 'Request a free assessment',
    text: 'Send us an enquiry for a free assessment and receive a precise quote along with transport timelines for your cargo.',
  },
  {
    tag: 'Our part',
    title: 'We plan the route',
    text: 'Beyond the transport itself, most of our time goes into route planning. Before every loading, we obtain all necessary permits and plan every kilometre.',
  },
  {
    tag: 'Together',
    title: 'Contract signing',
    text: 'Once everything is planned and agreed, we sign a contract with all terms precisely defined.',
  },
  {
    tag: 'Our part',
    title: 'Execution of transport',
    text: 'After the contract is signed, we handle loading, transport and delivery — in the shortest possible time, safely and always on schedule.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title="CSLOG Services"
        subtitle="Special and oversized cargo transport, technical escort, coordination and international haulage — all under one roof."
        bgImage="/slike/usluge/pratnja.jpg"
      />

      {/* Anchor nav — sticky */}
      <nav style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 30 }}>
        <div className="max-w-[1280px] mx-auto px-6 flex gap-8 overflow-x-auto">
          {[
            ['transport', 'Oversized Cargo Transport'],
            ['escort', 'Technical Escort & Coordination'],
            ['international', 'Domestic & International Transport'],
          ].map(([id, label]) => (
            <a key={id} href={`#${id}`}
              className="py-4 text-sm uppercase tracking-widest whitespace-nowrap border-b-2 border-transparent hover:border-[#c5d000] hover:text-[#c5d000] transition-colors flex-shrink-0"
              style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* Service 1 */}
      <section id="transport" className="py-24" style={{ background: 'var(--bg)', scrollMarginTop: '60px' }}>
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-8 h-0.5 bg-[#c5d000] mb-6" />
            <h2 className="mb-6" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '0.03em', color: 'var(--text)' }}>
              Special & Oversized Cargo Transport
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-base leading-relaxed mb-4">
              We have been providing special cargo transport and escort services as CSLOG d.o.o. since 2005. Over the years we have successfully moved loads both domestically and internationally, backed by meticulous planning and a highly competent team.
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-base leading-relaxed mb-8">
              Our company symbol is the ant — a small yet extraordinarily industrious creature capable of carrying loads up to 10 times its own body weight.
            </p>
            <Link href="/en/contact"
              className="inline-flex items-center gap-3 bg-[#c5d000] text-[#0d0d0d] font-semibold uppercase tracking-widest text-sm px-6 py-3 hover:bg-[#a8b200] transition-colors"
              style={{ fontFamily: 'var(--font-inter)' }}>
              Request a quote
            </Link>
          </div>
          <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56.25%', background: '#0d0d0d' }}>
            <iframe className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/jn_DlTlkKLo"
              title="CSLOG in action"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen />
          </div>
        </div>
      </section>

      {/* Service 2 */}
      <section id="escort" className="py-24" style={{ background: 'var(--bg-subtle)', scrollMarginTop: '60px' }}>
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="overflow-hidden order-2 lg:order-1">
            <Image src="/slike/usluge/pratnja.jpg" alt="Technical escort" width={700} height={480}
              className="w-full object-cover hover:scale-105 transition-transform duration-500" style={{ height: '400px' }} />
          </div>
          <div className="order-1 lg:order-2">
            <div className="w-8 h-0.5 bg-[#c5d000] mb-6" />
            <h2 className="mb-6" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '0.03em', color: 'var(--text)' }}>
              Technical Escort & Coordination
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-base leading-relaxed mb-4">
              Special and oversized transport is always carried out with full technical escort and coordination. Our workflow includes detailed route planning, precise scheduling, and the definition of loading and delivery points.
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-base leading-relaxed mb-8">
              Only after all of this is in place does the safe execution of the transport begin — accompanied by CSLOG&apos;s dedicated escort vehicle.
            </p>
            <Link href="/en/contact"
              className="inline-flex items-center gap-3 border border-[#c5d000] text-[#c5d000] uppercase tracking-widest text-sm px-6 py-3 hover:bg-[#c5d000] hover:text-[#0d0d0d] transition-colors"
              style={{ fontFamily: 'var(--font-inter)' }}>
              Request a quote
            </Link>
          </div>
        </div>
      </section>

      {/* Service 3 */}
      <section id="international" className="py-24" style={{ background: 'var(--bg)', scrollMarginTop: '60px' }}>
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-8 h-0.5 bg-[#c5d000] mb-6" />
            <h2 className="mb-6" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '0.03em', color: 'var(--text)' }}>
              Domestic & International Transport
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-base leading-relaxed mb-4">
              Although specialised in oversized cargo, CSLOG handles all types of freight across Serbia and beyond. Our fleet consists of Renault trucks meeting EURO 6 emissions standards.
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-base leading-relaxed mb-8">
              Our extensive trailer selection allows us to transport virtually any load — domestically and internationally, from Serbia to the Middle East.
            </p>
            <Link href="/en/contact"
              className="inline-flex items-center gap-3 border border-[#c5d000] text-[#c5d000] uppercase tracking-widest text-sm px-6 py-3 hover:bg-[#c5d000] hover:text-[#0d0d0d] transition-colors"
              style={{ fontFamily: 'var(--font-inter)' }}>
              Request a quote
            </Link>
          </div>
          <div className="overflow-hidden">
            <Image src="/slike/viber_image_2026-04-24_10-27-03-123.jpg" alt="International transport" width={700} height={480}
              className="w-full object-cover hover:scale-105 transition-transform duration-500" style={{ height: '400px' }} />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24" style={{ background: 'var(--bg-subtle)' }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <p className="text-[#c5d000] text-sm uppercase tracking-[0.3em] mb-4 text-center" style={{ fontFamily: 'var(--font-inter)' }}>
            How we do it
          </p>
          <h2 className="text-center mb-4"
            style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.03em', color: 'var(--text)' }}>
            How does oversized cargo transport actually work?
          </h2>
          <p className="text-center max-w-2xl mx-auto mb-16 text-base leading-relaxed"
            style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>
            At CSLOG, we believe that thorough preparation is the key to everything. Since 2005, we have upheld the principle that every detail matters — from the tyres on the truck to the drivers themselves.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {steps.map((step, i) => (
              <div key={step.title} className="relative p-8 flex flex-col gap-4"
                style={{ borderLeft: i > 0 ? '1px solid var(--border)' : 'none' }}>
                <div className="w-10 h-10 flex items-center justify-center text-[#0d0d0d] font-bold text-sm flex-shrink-0"
                  style={{ background: '#c5d000', fontFamily: 'var(--font-bebas)', fontSize: '1.2rem', letterSpacing: '0.05em' }}>
                  {i + 1}
                </div>
                <span className="text-xs uppercase tracking-widest" style={{ color: '#c5d000', fontFamily: 'var(--font-inter)' }}>
                  {step.tag}
                </span>
                <h3 className="text-base font-semibold leading-snug" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text)' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
