import Image from 'next/image'

export default function About() {
  return (
    <section className="py-20" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="flex justify-center">
            <Image
              src="/logo/logo-dark.svg"
              alt="Cargo Special Logistic"
              width={280}
              height={100}
              className="dark:invert opacity-80"
            />
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-base leading-relaxed mb-4">
              Cargo Special Logistic je kompaktni tim dobro uigranih profesionalaca u sferi transporta vangabaritnih i specijalnih tereta.
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-base leading-relaxed">
              Locirani smo u Beogradu, ali vangabaritni transport vršimo širom sveta uz pribavljanje svih neophodnih dozvola, stručnih mišljenja, elaborata i ispitivanja ruta.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
