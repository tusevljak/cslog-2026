'use client'

import { useState } from 'react'
import Image from 'next/image'

const team = [
  {
    name: 'Boban Bićanin',
    role: 'Generalni direktor',
    phone: '+381 63 209 675',
    phoneHref: 'tel:+38163209675',
    email: 'boban.bicanin@cslog.rs',
    sigDark: '/potpisi/Boban-Bićanin-email-potpis.png',
    sigLight: '/potpisi/Boban-Bićanin-email-potpis-beli.png',
  },
  {
    name: 'Sanja Branković',
    role: 'Operativni tim',
    phone: '+381 69 209 6753',
    phoneHref: 'tel:+381692096753',
    email: 'sanja.brankovic@cslog.rs',
    sigDark: '/potpisi/Sanja-Brankovic-email-potpis.png',
    sigLight: '/potpisi/Sanja-Brankovic-email-potpis-beli.png',
  },
  {
    name: 'Vladimir Mićić',
    role: 'Operativni tim',
    phone: '+381 63 261 105',
    phoneHref: 'tel:+38163261105',
    email: 'vladimir.micic@cslog.rs',
    sigDark: '/potpisi/vladimir-micic-email-potpis.png',
    sigLight: '/potpisi/vladimir-micic-email-potpis-beli.png',
  },
  {
    name: 'Božana Bučevac',
    role: 'Administracija',
    phone: '+381 69 209 6751',
    phoneHref: 'tel:+381692096751',
    email: 'bozana.bucevac@cslog.rs',
    sigDark: '/potpisi/bozana-bucevac-email-potpis.png',
    sigLight: '/potpisi/bozana-bucevac-email-potpis-beli.png',
  },
]

export default function KontaktPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 800))
    setSent(true)
    setSending(false)
  }

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden" style={{ background: '#0d0d0d' }}>
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('/slike/NASLOVNA.jpg')" }} />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-28">
          <p className="text-[#c5d000] text-sm uppercase tracking-[0.3em] mb-6" style={{ fontFamily: 'var(--font-inter)' }}>
            Kontakt
          </p>
          <h1 className="text-white leading-tight mb-6 max-w-3xl"
            style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', letterSpacing: '0.02em' }}>
            Direktno do prave osobe
          </h1>
          <p className="text-white/60 text-base max-w-xl leading-relaxed" style={{ fontFamily: 'var(--font-inter)' }}>
            Kontaktirajte nas direktno — svaki član tima je dostupan i spreman da odgovori u najkraćem roku.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10" style={{
          background: 'repeating-linear-gradient(-45deg, #c5d000 0px, #c5d000 14px, #0d0d0d 14px, #0d0d0d 28px, #ffffff 28px, #ffffff 42px, #0d0d0d 42px, #0d0d0d 56px)',
        }} />
      </section>

      {/* Tim kartice */}
      <section className="py-20" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="w-8 h-0.5 bg-[#c5d000] mb-6" />
          <h2 className="mb-4" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 3vw, 2.5rem)', letterSpacing: '0.03em', color: 'var(--text)' }}>
            Tim za kontakt
          </h2>
          <p className="mb-12 text-sm" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>
            Svaki upit je lično pitanje — obratite se direktno osobi koja pokriva vašu oblast.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'var(--border)' }}>
            {team.map((member) => (
              <div key={member.name} className="flex flex-col" style={{ background: 'var(--bg)' }}>

                {/* Potpis */}
                <div style={{
                  padding: '2rem 2rem 1rem',
                  display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start',
                  minHeight: 120,
                  borderBottom: '1px solid var(--border)',
                }}>
                  {/* Svetla tema → crni potpis */}
                  <Image
                    src={member.sigDark}
                    alt={`${member.name} potpis`}
                    width={180} height={80}
                    className="dark:hidden"
                    style={{ width: 'auto', height: 64, objectFit: 'contain', objectPosition: 'left bottom' }}
                  />
                  {/* Tamna tema → beli potpis */}
                  <Image
                    src={member.sigLight}
                    alt={`${member.name} potpis`}
                    width={180} height={80}
                    className="hidden dark:block"
                    style={{ width: 'auto', height: 64, objectFit: 'contain', objectPosition: 'left bottom' }}
                  />
                </div>

                {/* Info */}
                <div style={{ padding: '1.5rem 2rem 2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: '0.25rem' }}>
                      {member.name}
                    </p>
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#c5d000' }}>
                      {member.role}
                    </p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <a href={member.phoneHref} className="group flex items-center gap-3 hover:text-[#c5d000] transition-colors"
                      style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: 'var(--text)', textDecoration: 'none' }}>
                      <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#c5d000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" strokeWidth="2.5">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                        </svg>
                      </span>
                      {member.phone}
                    </a>

                    <a href={`mailto:${member.email}`} className="group flex items-center gap-3 hover:text-[#c5d000] transition-colors"
                      style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: 'var(--text)', textDecoration: 'none', wordBreak: 'break-all' }}>
                      <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#c5d000', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" strokeWidth="2.5">
                          <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                        </svg>
                      </span>
                      {member.email}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forma + adresa */}
      <section className="py-20" style={{ background: 'var(--bg-subtle)' }}>
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">

          {/* Forma */}
          <div>
            <div className="w-8 h-0.5 bg-[#c5d000] mb-6" />
            <h2 className="mb-8" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 3vw, 2.5rem)', letterSpacing: '0.03em', color: 'var(--text)' }}>
              Pošaljite nam poruku
            </h2>

            {sent ? (
              <div className="p-8 flex flex-col gap-4" style={{ border: '1px solid #c5d000' }}>
                <div className="w-10 h-10 flex items-center justify-center bg-[#c5d000]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" strokeWidth="2.5">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                </div>
                <p className="font-semibold text-lg" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text)' }}>Poruka je poslata!</p>
                <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>
                  Hvala na poruci. Odgovorićemo vam u najkraćem roku.
                </p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}
                  className="text-[#c5d000] text-sm uppercase tracking-widest hover:underline self-start mt-2"
                  style={{ fontFamily: 'var(--font-inter)' }}>
                  Pošalji novu poruku
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>Ime i prezime</label>
                    <input id="name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Vaše ime i prezime"
                      className="px-4 py-3 text-sm outline-none focus:border-[#c5d000] transition-colors"
                      style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-inter)' }} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>Email adresa</label>
                    <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="vasa@email.com"
                      className="px-4 py-3 text-sm outline-none focus:border-[#c5d000] transition-colors"
                      style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-inter)' }} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>Vaše pitanje ili poruka</label>
                  <textarea id="message" required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Opišite vaš zahtev..."
                    className="px-4 py-3 text-sm outline-none focus:border-[#c5d000] transition-colors resize-none"
                    style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-inter)' }} />
                </div>
                <button type="submit" disabled={sending}
                  className="self-start inline-flex items-center gap-3 bg-[#c5d000] text-[#0d0d0d] font-semibold uppercase tracking-widest text-sm px-8 py-3.5 hover:bg-[#a8b200] transition-colors disabled:opacity-60"
                  style={{ fontFamily: 'var(--font-inter)' }}>
                  {sending ? 'Slanje...' : 'Pošalji poruku'}
                  {!sending && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
                    </svg>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Adresa + radno vreme */}
          <div className="flex flex-col gap-10">
            <div>
              <div className="w-8 h-0.5 bg-[#c5d000] mb-6" />
              <h2 className="mb-8" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 3vw, 2.5rem)', letterSpacing: '0.03em', color: 'var(--text)' }}>
                Naša lokacija
              </h2>
              <a href="https://maps.google.com/?q=Jurija+Gagarina+21R+Novi+Beograd" target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-4 group">
                <div className="w-10 h-10 flex items-center justify-center bg-[#c5d000] flex-shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" strokeWidth="2">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>Adresa</p>
                  <p className="text-base font-semibold group-hover:text-[#c5d000] transition-colors leading-snug" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text)' }}>
                    Jurija Gagarina 21 R, lokal DL4<br />11070 Novi Beograd
                  </p>
                </div>
              </a>
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>
                Radno vreme
              </p>
              <div className="flex flex-col gap-2" style={{ fontFamily: 'var(--font-inter)' }}>
                {[
                  ['Ponedeljak – Petak', '08:00 – 17:00'],
                  ['Subota', 'Po dogovoru'],
                  ['Nedelja', 'Zatvoreno'],
                ].map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span style={{ color: 'var(--text-muted)' }}>{day}</span>
                    <span style={{ color: hours === 'Zatvoreno' ? 'var(--text-muted)' : 'var(--text)' }}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section style={{ background: '#c5d000' }}>
        <div className="h-10" style={{
          background: 'repeating-linear-gradient(-45deg, #0d0d0d 0px, #0d0d0d 14px, #c5d000 14px, #c5d000 28px, #ffffff 28px, #ffffff 42px, #c5d000 42px, #c5d000 56px)',
        }} />
        <div className="max-w-[1280px] mx-auto px-6 py-16 flex flex-col items-center text-center gap-6">
          <blockquote style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '0.02em', color: '#0d0d0d' }}>
            &ldquo;Od momenta utovara, prevoz više nije briga klijenta&rdquo;
          </blockquote>
          <div>
            <p className="font-semibold text-[#0d0d0d] text-lg italic" style={{ fontFamily: 'Georgia, serif' }}>Boban Bićanin</p>
            <p className="text-[#0d0d0d]/60 text-xs uppercase tracking-widest mt-1" style={{ fontFamily: 'var(--font-inter)' }}>Generalni direktor</p>
          </div>
        </div>
        <div className="h-10" style={{
          background: 'repeating-linear-gradient(-45deg, #0d0d0d 0px, #0d0d0d 14px, #c5d000 14px, #c5d000 28px, #ffffff 28px, #ffffff 42px, #c5d000 42px, #c5d000 56px)',
        }} />
      </section>
    </>
  )
}
