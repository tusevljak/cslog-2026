import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politika privatnosti | CSLOG',
  description: 'Politika privatnosti i zaštite podataka kompanije Cargo Special Logistic d.o.o.',
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '2.5rem' }}>
    <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.5rem', letterSpacing: '0.04em', color: 'var(--text)', marginBottom: '0.75rem' }}>
      {title}
    </h2>
    <div style={{ fontFamily: 'var(--font-inter)', fontSize: '0.925rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>
      {children}
    </div>
  </div>
)

export default function PolitikaPrivatnostiPage() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div className="max-w-[780px] mx-auto px-6 py-20">

        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#c5d000', marginBottom: '1rem' }}>
          Pravni dokumenti
        </p>
        <h1 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '0.04em', color: 'var(--text)', lineHeight: 1, marginBottom: '0.5rem' }}>
          Politika privatnosti
        </h1>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>
          Poslednje ažuriranje: juni 2026.
        </p>

        <div style={{ borderTop: '2px solid #c5d000', paddingTop: '2.5rem' }}>

          <Section title="1. Rukovalac podacima">
            <p>Cargo Special Logistic d.o.o.</p>
            <p>Jurija Gagarina 21 R, lokal DL4, 11070 Novi Beograd</p>
            <p>MB: 20045507 · PIB: 104025538</p>
            <p>Email: <a href="mailto:office@cslog.rs" style={{ color: '#c5d000' }}>office@cslog.rs</a></p>
          </Section>

          <Section title="2. Koje podatke prikupljamo">
            <p>Prikupljamo isključivo podatke koje vi dobrovoljno unesete putem kontakt forme ili forme za upit:</p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
              <li>Ime i naziv kompanije</li>
              <li>Email adresa</li>
              <li>Broj telefona (opciono)</li>
              <li>Opis tereta i ruta (opciono)</li>
              <li>Tekst poruke (opciono)</li>
            </ul>
          </Section>

          <Section title="3. Svrha obrade">
            <p>Vaši podaci se koriste isključivo za:</p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
              <li>Odgovaranje na vaš upit ili ponudu</li>
              <li>Uspostavljanje poslovne saradnje</li>
            </ul>
            <p style={{ marginTop: '0.75rem' }}>Vaši podaci se ne prodaju, ne daju trećim stranama niti se koriste u marketinške svrhe bez vaše izričite saglasnosti.</p>
          </Section>

          <Section title="4. Čuvanje podataka">
            <p>Podaci se čuvaju u sigurnoj bazi podataka (Neon PostgreSQL) i zadržavaju se onoliko dugo koliko je potrebno za poslovnu komunikaciju, a najduže 2 godine od poslednjeg kontakta.</p>
          </Section>

          <Section title="5. Vaša prava">
            <p>U skladu sa GDPR regulativom i Zakonom o zaštiti podataka o ličnosti RS, imate pravo da:</p>
            <ul style={{ paddingLeft: '1.25rem', marginTop: '0.5rem' }}>
              <li>Zatražite uvid u podatke koje čuvamo o vama</li>
              <li>Zatražite ispravku netačnih podataka</li>
              <li>Zatražite brisanje vaših podataka</li>
              <li>Povučete saglasnost za obradu</li>
            </ul>
            <p style={{ marginTop: '0.75rem' }}>Zahtev možete poslati na: <a href="mailto:office@cslog.rs" style={{ color: '#c5d000' }}>office@cslog.rs</a></p>
          </Section>

          <Section title="6. Kolačići (cookies)">
            <p>Ova web stranica ne koristi kolačiće za praćenje ni analitiku. Jedini kolačić koji se može koristiti je tehnički neophodan za pamćenje teme sajta (svetla/tamna).</p>
          </Section>

          <Section title="7. Kontakt">
            <p>Za sva pitanja vezana za zaštitu podataka, obratite se na: <a href="mailto:office@cslog.rs" style={{ color: '#c5d000' }}>office@cslog.rs</a></p>
          </Section>

        </div>
      </div>
    </div>
  )
}
