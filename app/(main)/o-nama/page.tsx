import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'O nama – CSLOG',
  description: 'Od momenta utovara, prevoz više nije briga klijenta. Upoznajte tim iza Cargo Special Logistic.',
}

const team = [
  { name: 'Boban Bićanin', role: 'Generalni direktor' },
  { name: 'Sanja Branković', role: 'Operativni tim' },
  { name: 'Vladimir Mićić', role: 'Operativni tim' },
  { name: 'Božana Bučevac', role: 'Administracija' },
]

const stats = [
  { value: '20+', label: 'godina iskustva' },
  { value: '1M+', label: 'pređenih kilometara' },
  { value: 'EURO 6', label: 'standard svih kamiona' },
  { value: 'ISO 9001', label: 'sertifikovan sistem' },
]

export default function ONamaPage() {
  return (
    <>
      {/* Hero — citat */}
      <section
        className="relative min-h-[70vh] flex items-center overflow-hidden"
        style={{ background: '#0d0d0d' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/slike/NASLOVNA.jpg')" }}
        />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-32">
          <p className="text-[#c5d000] text-sm uppercase tracking-[0.3em] mb-8" style={{ fontFamily: 'var(--font-inter)' }}>
            O nama
          </p>
          <blockquote
            className="text-white leading-tight mb-10 max-w-4xl"
            style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem, 6vw, 6rem)', letterSpacing: '0.02em' }}
          >
            &ldquo;Od momenta utovara, prevoz više nije briga klijenta&rdquo;
          </blockquote>
          <div>
            <p className="text-[#c5d000] text-lg italic mb-1" style={{ fontFamily: 'Georgia, serif' }}>
              Boban Bićanin
            </p>
            <p className="text-white/50 text-sm uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)' }}>
              Generalni direktor
            </p>
          </div>
        </div>
        {/* Hazard tape bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-10" style={{
          background: 'repeating-linear-gradient(-45deg, #c5d000 0px, #c5d000 14px, #0d0d0d 14px, #0d0d0d 28px, #ffffff 28px, #ffffff 42px, #0d0d0d 42px, #0d0d0d 56px)'
        }} />
      </section>

      {/* Video */}
      <section className="py-24" style={{ background: 'var(--bg-subtle)' }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <p className="text-[#c5d000] text-sm uppercase tracking-[0.3em] mb-4 text-center" style={{ fontFamily: 'var(--font-inter)' }}>
            Na terenu
          </p>
          <h2
            className="text-center mb-4"
            style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.03em', color: 'var(--text)' }}
          >
            Pogledajte CSLOG u akciji
          </h2>
          <p className="text-center mb-12 text-sm" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>
            Konvoj od 4 CSLOG kamiona, uz tehničku pratnju
          </p>
          <div className="relative w-full max-w-4xl mx-auto overflow-hidden" style={{ paddingBottom: '56.25%', background: '#0d0d0d' }}>
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/jn_DlTlkKLo"
              title="CSLOG u akciji"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Priča */}
      <section className="py-24" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="w-8 h-0.5 bg-[#c5d000] mb-6" />
            <h2
              className="mb-8"
              style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '0.03em', color: 'var(--text)' }}
            >
              Prevoz i pratnja specijalnih i vangabaritnih tereta od 2005. godine
            </h2>
            <div className="flex flex-col gap-4" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>
              <p className="text-base leading-relaxed">
                Takoreći od srednjoškolskih dana, Boban Bićanin je zaljubljen u transport industriju, a još od prvog radnog dana upoznat je s nepredvidivim aspektima branše.
              </p>
              <p className="text-base leading-relaxed">
                Nedopustivo probijanje ugovorenih rokova, nepoznavanje domaćih i inostranih regulativa, propusti u radnim i sigurnosnim procedurama — situacije kojima je svedočio nemalo puta i zbog kojih su transportne kompanije bile na velikim gubicima.
              </p>
              <p className="text-base leading-relaxed">
                Šteta je svakako bila veća za klijente. Delikatni nalozi, poput prevoza kompleksne mašinerije, ne dozvoljavaju greške i kašnjenja.
              </p>
              <p className="text-base leading-relaxed">
                U želji da rizik ove branše svede na minimum, prvo je savladao osnove jezika zemalja u koje putuje, potom sve neophodne bezbednosne procedure i uspostavio besprekoran sistem komunikacije s dispečerima, vendorima i svim uključenim stranama.
              </p>
              <p className="text-base leading-relaxed">
                Od tada se CSLOG razvija naporedo sa zahtevima tržišta i standardima koji su viši iz dana u dan.
              </p>
            </div>
          </div>
          <div className="overflow-hidden">
            <Image
              src="/slike/viber_image_2026-03-17_10-41-20-622.jpg"
              alt="CSLOG kamion na putu"
              width={700}
              height={500}
              className="w-full object-cover"
              style={{ height: '500px' }}
            />
          </div>
        </div>
      </section>

      {/* Tim */}
      <section className="py-24" style={{ background: 'var(--bg-subtle)' }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="w-8 h-0.5 bg-[#c5d000] mb-6" />
          <h2
            className="mb-4"
            style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', letterSpacing: '0.03em', color: 'var(--text)' }}
          >
            Tim iza CSLOG-a
          </h2>
          <p className="mb-12 max-w-xl text-base leading-relaxed" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>
            &ldquo;Prvi tim&rdquo;: Boban, Sanja, Vladimir i Božana — okupljeni oko zajedničke misije da standarde vangabaritnog transporta drže na nivou nauke.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="p-8 flex flex-col gap-3"
                style={{ border: '1px solid var(--border)' }}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center text-[#0d0d0d] font-bold flex-shrink-0"
                  style={{ background: '#c5d000', fontFamily: 'var(--font-bebas)', fontSize: '1.5rem' }}
                >
                  {member.name[0]}
                </div>
                <p className="font-semibold text-base" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text)' }}>
                  {member.name}
                </p>
                <p className="text-sm uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>
                  {member.role}
                </p>
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
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.5rem', letterSpacing: '0.05em' }} className="text-[#0d0d0d] leading-none">
                {stat.value}
              </p>
              <p className="text-[#0d0d0d]/70 text-sm uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Standardi + CTA */}
      <section className="py-24" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="w-8 h-0.5 bg-[#c5d000] mb-6" />
            <h2
              className="mb-6"
              style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 3vw, 2.5rem)', letterSpacing: '0.03em', color: 'var(--text)' }}
            >
              Standardi i sertifikati
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>
              Naša rešenja i oprema su podređeni visokim standardima kvaliteta, koje zahtevaju međunarodni i domaći putevi i propisi. Smatramo da samo unapred definisani rokovi i jasno definisani uslovi garantuju optimalan i bezbedan prevoz od tačke A do tačke B.
            </p>
            <p className="text-base leading-relaxed mb-10" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>
              CSLOG tim će vam omogućiti bezbedan, siguran transport praktično svih vrsta tereta, uvek u dogovorenom roku — kako u domaćem, tako i u međunarodnom saobraćaju.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/nase-prikolice"
                className="inline-flex items-center gap-3 bg-[#c5d000] text-[#0d0d0d] font-semibold uppercase tracking-widest text-sm px-6 py-3 hover:bg-[#a8b200] transition-colors"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Pogledajte naše prikolice
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-3 border border-[#c5d000] text-[#c5d000] uppercase tracking-widest text-sm px-6 py-3 hover:bg-[#c5d000] hover:text-[#0d0d0d] transition-colors"
                style={{ fontFamily: 'var(--font-inter)' }}
              >
                Kontaktirajte nas
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            {/* Svetla tema → tamni sertifikat */}
            <Image
              src="/sertifikat/sertifikat%20za%20svetle%20pozadine.jpg"
              alt="ISO 9001 sertifikat"
              width={300} height={180}
              className="object-contain dark:hidden"
              style={{ width: 'auto', height: 180 }}
            />
            {/* Tamna tema → svetli sertifikat */}
            <Image
              src="/sertifikat/sertifikat%20za%20tamne%20pozadine.png"
              alt="ISO 9001 sertifikat"
              width={300} height={180}
              className="object-contain hidden dark:block"
              style={{ width: 'auto', height: 180 }}
            />
          </div>
        </div>
      </section>
    </>
  )
}
