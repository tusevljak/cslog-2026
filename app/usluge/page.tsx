import Image from 'next/image'
import Link from 'next/link'
import QuoteForm from '@/components/QuoteForm'

export const metadata = {
  title: 'Usluge – CSLOG',
  description: 'Prevoz specijalnih i vangabaritnih tereta, tehnička pratnja i koordinacija, unutrašnji i međunarodni transport.',
}

const steps = [
  {
    tag: 'Vaš deo posla',
    title: 'Upit za besplatnu procenu',
    text: 'Pošaljite nam upit za besplatnu procenu i dobićete vrlo preciznu cenu uz rokove transporta željenog tereta.',
  },
  {
    tag: 'Naš posao',
    title: 'Mi planiramo rutu',
    text: 'Pored samog prevoza, najviše vremena ode na planiranje rute. Pre svakog utovara pribavljamo sve neophodne dozvole i isplaniramo svaki kilometar.',
  },
  {
    tag: 'Zajednički posao',
    title: 'Zaključenje ugovora',
    text: 'Nakon što sve isplaniramo i dogovorimo, potpisujemo ugovor sa svim precizno definisanim stavkama.',
  },
  {
    tag: 'Naš posao',
    title: 'Izvršenje transporta',
    text: 'Nakon potpisivanja ugovora, vršimo utovar, transport i istovar — za najkraće moguće vreme, bezbedno i uvek u ugovorenom roku.',
  },
]

export default function UslugeKPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden" style={{ background: 'var(--ink, #0d0d0d)' }}>
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <p className="text-[#c5d000] text-sm uppercase tracking-[0.3em] mb-4" style={{ fontFamily: 'var(--font-inter)' }}>
            Šta radimo
          </p>
          <h1
            className="text-white leading-none"
            style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(3rem, 7vw, 7rem)', letterSpacing: '0.02em' }}
          >
            CSLOG usluge
          </h1>
        </div>
        {/* Hazard tape bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-10" style={{
          background: 'repeating-linear-gradient(-45deg, #c5d000 0px, #c5d000 14px, #0d0d0d 14px, #0d0d0d 28px, #ffffff 28px, #ffffff 42px, #0d0d0d 42px, #0d0d0d 56px)'
        }} />
      </section>

      {/* Anchor nav */}
      <nav style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-[1280px] mx-auto px-6 flex gap-8 overflow-x-auto">
          {[
            ['prevoz', 'Prevoz vangabaritnih tereta'],
            ['pratnja', 'Tehnička pratnja i koordinacija'],
            ['transport', 'Unutrašnji i međunarodni transport'],
          ].map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className="py-4 text-sm uppercase tracking-widest whitespace-nowrap border-b-2 border-transparent hover:border-[#c5d000] hover:text-[#c5d000] transition-colors flex-shrink-0"
              style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* Service 1: Prevoz */}
      <section id="prevoz" className="py-24" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-8 h-0.5 bg-[#c5d000] mb-6" />
            <h2
              className="mb-6"
              style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '0.03em', color: 'var(--text)' }}
            >
              Prevoz specijalnih i vangabaritnih tereta
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-base leading-relaxed mb-4">
              Prevoz i pratnju specijalnih tereta vršimo kao CSLOG d.o.o. od 2005. godine. Za to vreme smo uspeli da prevezemo terete u domaćem ali i međunarodnom saobraćaju, uz dobro planiranje i kompetentnu radnu snagu.
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-base leading-relaxed mb-8">
              Simbol naše kompanije je mrav — malo ali izuzetno marljivo živo biće koje može da prenese terete i do 10x teže od sopstvene težine.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-3 bg-[#c5d000] text-[#0d0d0d] font-semibold uppercase tracking-widest text-sm px-6 py-3 hover:bg-[#a8b200] transition-colors"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Zatražite procenu
            </Link>
          </div>

          {/* YouTube embed */}
          <div className="relative w-full overflow-hidden" style={{ paddingBottom: '56.25%', background: '#0d0d0d' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/jn_DlTlkKLo"
              title="CSLOG video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Service 2: Tehnička pratnja */}
      <section id="pratnja" className="py-24" style={{ background: 'var(--bg-subtle)' }}>
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="overflow-hidden order-2 lg:order-1">
            <Image
              src="/slike/usluge/pratnja.jpg"
              alt="Tehnička pratnja i koordinacija"
              width={700}
              height={480}
              className="w-full object-cover hover:scale-105 transition-transform duration-500"
              style={{ height: '400px' }}
            />
          </div>
          <div className="order-1 lg:order-2">
            <div className="w-8 h-0.5 bg-[#c5d000] mb-6" />
            <h2
              className="mb-6"
              style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '0.03em', color: 'var(--text)' }}
            >
              Tehnička pratnja i koordinacija
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-base leading-relaxed mb-4">
              Specijalni i vangabaritni transport se po pravilu odvija uvek uz tehničku pratnju i koordinaciju. Naš sistem rada podrazumeva detaljno planiranje transportne rute, zatim tačno određivanje i planiranje datuma i mesta preuzimanja i isporuke tereta.
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-base leading-relaxed mb-8">
              Tek nakon svega toga sledi bezbedno i sigurno izvršenje usluge transporta tereta uz pratnju tehničkog vozila kompanije CSLOG.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-3 border border-[#c5d000] text-[#c5d000] uppercase tracking-widest text-sm px-6 py-3 hover:bg-[#c5d000] hover:text-[#0d0d0d] transition-colors"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Zatražite procenu
            </Link>
          </div>
        </div>
      </section>

      {/* Service 3: Međunarodni transport */}
      <section id="transport" className="py-24" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="w-8 h-0.5 bg-[#c5d000] mb-6" />
            <h2
              className="mb-6"
              style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '0.03em', color: 'var(--text)' }}
            >
              Unutrašnji i međunarodni transport
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-base leading-relaxed mb-4">
              CSLOG, iako specijalizovan za vangabaritne terete, vrši transport i svih ostalih vrsta tereta širom Srbije, ali i sveta. U floti posedujemo kamione marke Renault, EURO 6 standarda izduvnih gasova.
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-base leading-relaxed mb-8">
              Širok izbor prikolica čini nas sposobnim da prevezemo gotovo bilo koji teret — u domaćem ali i međunarodnom saobraćaju, od Srbije do Bliskog istoka.
            </p>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-3 border border-[#c5d000] text-[#c5d000] uppercase tracking-widest text-sm px-6 py-3 hover:bg-[#c5d000] hover:text-[#0d0d0d] transition-colors"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Zatražite procenu
            </Link>
          </div>
          <div className="overflow-hidden">
            <Image
              src="/slike/viber_image_2026-04-24_10-27-03-123.jpg"
              alt="Međunarodni transport"
              width={700}
              height={480}
              className="w-full object-cover hover:scale-105 transition-transform duration-500"
              style={{ height: '400px' }}
            />
          </div>
        </div>
      </section>

      {/* Kako mi to radimo */}
      <section className="py-24" style={{ background: 'var(--bg-subtle)' }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <p className="text-[#c5d000] text-sm uppercase tracking-[0.3em] mb-4 text-center" style={{ fontFamily: 'var(--font-inter)' }}>
            Kako mi to radimo
          </p>
          <h2
            className="text-center mb-4"
            style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.03em', color: 'var(--text)' }}
          >
            Kako transport vangabaritnih tereta zapravo funkcioniše?
          </h2>
          <p className="text-center max-w-2xl mx-auto mb-16 text-base leading-relaxed" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>
            Mi u CSLOG timu verujemo da je ključ svega u dobroj pripremi. Još od 2005. smo usadili viziju da je svaki detalj bitan — od gume na kamionu do samih vozača.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0">
            {steps.map((step, i) => (
              <div
                key={step.title}
                className="relative p-8 flex flex-col gap-4"
                style={{ borderLeft: i > 0 ? '1px solid var(--border)' : 'none' }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center text-[#0d0d0d] font-bold text-sm flex-shrink-0"
                  style={{ background: '#c5d000', fontFamily: 'var(--font-bebas)', fontSize: '1.2rem', letterSpacing: '0.05em' }}
                >
                  {i + 1}
                </div>
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ color: '#c5d000', fontFamily: 'var(--font-inter)' }}
                >
                  {step.tag}
                </span>
                <h3
                  className="text-base font-semibold leading-snug"
                  style={{ fontFamily: 'var(--font-inter)', color: 'var(--text)' }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}
                >
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote form */}
      <QuoteForm />
    </>
  )
}
