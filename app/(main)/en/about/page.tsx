import Image from 'next/image'
import Link from 'next/link'
import PageHero from '@/components/PageHero'

export const metadata = {
  title: 'About Us – CSLOG',
  description: 'From the moment of loading, transport is no longer the client\'s concern. Meet the team behind Cargo Special Logistic.',
}

const team = [
  { name: 'Boban Bićanin', role: 'CEO' },
  { name: 'Sanja Branković', role: 'Operations Team' },
  { name: 'Vladimir Mićić', role: 'Operations Team' },
  { name: 'Božana Bučevac', role: 'Administration' },
]

const stats = [
  { value: '20+', label: 'years of experience' },
  { value: '1M+', label: 'kilometres covered' },
  { value: 'EURO 6', label: 'fleet standard' },
  { value: 'ISO 9001', label: 'certified system' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={<span style={{ fontStyle: 'italic' }}>&ldquo;From the moment of loading, transport is no longer the client&rsquo;s concern&rdquo;</span>}
        bgImage="/slike/NASLOVNA.jpg"
        height="70vh"
      >
        <div style={{ marginTop: '2rem' }}>
          <p className="text-[#c5d000] text-lg italic" style={{ fontFamily: 'Georgia, serif', marginBottom: '0.25rem' }}>Boban Bićanin</p>
          <p className="text-white/50 text-sm uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)' }}>CEO</p>
        </div>
      </PageHero>

      {/* Video */}
      <section className="py-24" style={{ background: 'var(--bg-subtle)' }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <p className="text-[#c5d000] text-sm uppercase tracking-[0.3em] mb-4 text-center" style={{ fontFamily: 'var(--font-inter)' }}>In the field</p>
          <h2 className="text-center mb-4" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.03em', color: 'var(--text)' }}>
            See CSLOG in action
          </h2>
          <p className="text-center mb-12 text-sm" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>
            A convoy of 4 CSLOG trucks with full technical escort
          </p>
          <div className="relative w-full max-w-4xl mx-auto overflow-hidden" style={{ paddingBottom: '56.25%', background: '#0d0d0d' }}>
            <iframe className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/jn_DlTlkKLo"
              title="CSLOG in action"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen />
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="w-8 h-0.5 bg-[#c5d000] mb-6" />
            <h2 className="mb-8" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '0.03em', color: 'var(--text)' }}>
              Oversized & Special Cargo Transport Since 2005
            </h2>
            <div className="flex flex-col gap-4" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>
              <p className="text-base leading-relaxed">
                From a young age, Boban Bićanin developed a deep passion for the transport industry — and from his very first day on the job, he came face to face with its unpredictable realities.
              </p>
              <p className="text-base leading-relaxed">
                Missed deadlines, poor knowledge of domestic and international regulations, lapses in working and safety procedures — situations he witnessed time and again, causing transport companies significant losses.
              </p>
              <p className="text-base leading-relaxed">
                The cost was always greater for the clients. Sensitive assignments, such as moving complex machinery, leave no room for errors or delays.
              </p>
              <p className="text-base leading-relaxed">
                Determined to minimise the risks of the trade, he first mastered the languages of the countries he travels to, then acquired all necessary safety procedures, and established a seamless communication system with dispatchers, vendors and all parties involved.
              </p>
              <p className="text-base leading-relaxed">
                Since then, CSLOG has grown alongside the demands of the market and standards that rise higher day by day.
              </p>
            </div>
          </div>
          <div className="overflow-hidden">
            <Image src="/slike/viber_image_2026-03-17_10-41-20-622.jpg" alt="CSLOG truck on the road"
              width={700} height={500} className="w-full object-cover" style={{ height: '500px' }} />
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24" style={{ background: 'var(--bg-subtle)' }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="w-8 h-0.5 bg-[#c5d000] mb-6" />
          <h2 className="mb-4" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '0.03em', color: 'var(--text)' }}>
            The Team Behind CSLOG
          </h2>
          <p className="mb-12 max-w-xl text-base leading-relaxed" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>
            The &ldquo;first team&rdquo;: Boban, Sanja, Vladimir and Božana — united around a shared mission to keep the standards of oversized transport at the level of a science.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="p-8 flex flex-col gap-3" style={{ border: '1px solid var(--border)' }}>
                <div className="w-12 h-12 flex items-center justify-center text-[#0d0d0d] font-bold flex-shrink-0"
                  style={{ background: '#c5d000', fontFamily: 'var(--font-bebas)', fontSize: '1.5rem' }}>
                  {member.name[0]}
                </div>
                <p className="font-semibold text-base" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text)' }}>{member.name}</p>
                <p className="text-sm uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20" style={{ background: '#c5d000' }}>
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center gap-2">
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.5rem', letterSpacing: '0.05em' }} className="text-[#0d0d0d] leading-none">{stat.value}</p>
              <p className="text-[#0d0d0d]/70 text-sm uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Standards + CTA */}
      <section className="py-24" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="w-8 h-0.5 bg-[#c5d000] mb-6" />
            <h2 className="mb-6" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 3vw, 2.5rem)', letterSpacing: '0.03em', color: 'var(--text)' }}>
              Standards & Certifications
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>
              Our solutions and equipment comply with the highest quality standards required by international and domestic roads and regulations. We believe that only pre-defined timelines and clearly defined conditions guarantee optimal and safe transport from point A to point B.
            </p>
            <p className="text-base leading-relaxed mb-10" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>
              The CSLOG team will ensure safe, reliable transport of virtually any type of cargo — always on time, whether domestically or internationally.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/en/trailers"
                className="inline-flex items-center gap-3 bg-[#c5d000] text-[#0d0d0d] font-semibold uppercase tracking-widest text-sm px-6 py-3 hover:bg-[#a8b200] transition-colors"
                style={{ fontFamily: 'var(--font-inter)' }}>
                View our trailers
              </Link>
              <Link href="/en/contact"
                className="inline-flex items-center gap-3 border border-[#c5d000] text-[#c5d000] uppercase tracking-widest text-sm px-6 py-3 hover:bg-[#c5d000] hover:text-[#0d0d0d] transition-colors"
                style={{ fontFamily: 'var(--font-inter)' }}>
                Contact us
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <Image src="/sertifikat/sertifikat%20za%20svetle%20pozadine.jpg" alt="ISO 9001 Certificate"
              width={300} height={180} className="object-contain dark:hidden" style={{ width: 'auto', height: 180 }} />
            <Image src="/sertifikat/sertifikat%20za%20tamne%20pozadine.png" alt="ISO 9001 Certificate"
              width={300} height={180} className="object-contain hidden dark:block" style={{ width: 'auto', height: 180 }} />
          </div>
        </div>
      </section>
    </>
  )
}
