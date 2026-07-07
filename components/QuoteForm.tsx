'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

const borderStyle = 'rgba(255,255,255,0.12)'
const borderFocus = '#c5d000'

const copy = {
  sr: {
    eyebrow: 'Besplatan upit',
    h2a: 'Pošaljite nam',
    h2b: 'detalje transporta',
    body: 'U roku od 24 sata stižete odgovor sa besplatnom ponudom. Specijalizovani smo za vangabaritne i teške terete — bez obzira na dimenzije i destinaciju.',
    okTitle: 'Upit primljen!',
    okText: 'Javićemo vam se u roku od 24 sata sa besplatnom ponudom.',
    errText: 'Greška pri slanju. Pokušajte ponovo ili nas kontaktirajte direktno.',
    submit: 'Pošalji upit →',
    submitting: 'Slanje...',
    fields: {
      name: 'Ime i kompanija',
      phone: 'Telefon',
      email: 'Email',
      route: 'Ruta (od → do)',
      cargo: 'Opis tereta (dimenzije, masa)',
      notes: 'Dodatne napomene',
    },
    placeholders: {
      name: 'Petar / ABC d.o.o.',
      phone: '+381 ...',
      email: 'vas@email.com',
      route: 'Beograd → München',
      cargo: '5m × 3m × 2.5m, 20t',
      notes: 'Sve što smatrate važnim za procenu...',
    },
    address: 'Jurija Gagarina 21 R, lokal DL4, Novi Beograd',
  },
  en: {
    eyebrow: 'Free Quote',
    h2a: 'Send us the',
    h2b: 'transport details',
    body: 'You will receive a response with a free quote within 24 hours. We specialise in oversized and heavy loads — regardless of dimensions or destination.',
    okTitle: 'Enquiry received!',
    okText: 'We will get back to you with a free quote within 24 hours.',
    errText: 'Error sending. Please try again or contact us directly.',
    submit: 'Send enquiry →',
    submitting: 'Sending...',
    fields: {
      name: 'Name & company',
      phone: 'Phone',
      email: 'Email',
      route: 'Route (from → to)',
      cargo: 'Cargo description (dimensions, weight)',
      notes: 'Additional notes',
    },
    placeholders: {
      name: 'Peter / ABC Ltd.',
      phone: '+381 ...',
      email: 'you@email.com',
      route: 'Belgrade → Munich',
      cargo: '5m × 3m × 2.5m, 20t',
      notes: 'Anything you think is relevant for the estimate...',
    },
    address: 'Jurija Gagarina 21 R, unit DL4, Novi Beograd',
  },
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ paddingBottom: '1.75rem' }}>
      <label style={{ display: 'block', fontFamily: 'var(--font-inter)', fontSize: '0.65rem', textTransform: 'uppercase' as const, letterSpacing: '0.18em', color: '#555', marginBottom: '0.25rem' }}>
        {label}{required && ' *'}
      </label>
      {children}
    </div>
  )
}

const inputStyle = {
  width: '100%', background: 'transparent', border: 'none',
  borderBottom: `1px solid ${borderStyle}`, color: '#f0f0f0',
  padding: '0.65rem 0', fontSize: '0.9rem', outline: 'none',
  fontFamily: 'var(--font-inter)',
}

export default function QuoteForm() {
  const pathname = usePathname()
  const isEn = pathname.startsWith('/en')
  const tx = isEn ? copy.en : copy.sr

  const [form, setForm] = useState({ ime: '', email: '', telefon: '', ruta: '', teret: '', poruka: '', website: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle')

  function field(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }))
  }

  function focus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderBottomColor = borderFocus
  }
  function blur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    e.currentTarget.style.borderBottomColor = borderStyle
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'ok' : 'err')
    } catch {
      setStatus('err')
    }
  }

  return (
    <section id="upit" style={{ background: '#0d0d0d', scrollMarginTop: '100px' }}>
      {/* Hazard stripe */}
      <div style={{ height: 6, background: 'repeating-linear-gradient(-45deg, #c5d000, #c5d000 12px, #0d0d0d 12px, #0d0d0d 24px)' }} />

      <div className="max-w-[1280px] mx-auto px-6 py-20">
        <div style={{ display: 'grid', gap: 'clamp(3rem, 8vw, 7rem)', alignItems: 'start' }} className="grid-cols-1 md:grid-cols-2">

          {/* Left: copy */}
          <div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.25em', color: '#c5d000', marginBottom: '1rem' }}>
              {tx.eyebrow}
            </p>
            <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', letterSpacing: '0.04em', color: '#f5f5f5', lineHeight: 1.05, marginBottom: '1.5rem' }}>
              {tx.h2a}<br />{tx.h2b}
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.95rem', lineHeight: 1.8, color: '#666', marginBottom: '2.5rem', maxWidth: 380 }}>
              {tx.body}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { href: 'https://maps.google.com/?q=Jurija+Gagarina+21R+Novi+Beograd', text: tx.address },
                { href: 'mailto:office@cslog.rs', text: 'office@cslog.rs' },
                { href: 'tel:+38163209675', text: '+381 63 209 675' },
              ].map(({ href, text }) => (
                <a key={text} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                  style={{ fontFamily: 'var(--font-inter)', fontSize: '0.875rem', color: '#555', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#c5d000'}
                  onMouseLeave={e => e.currentTarget.style.color = '#555'}
                >
                  {text}
                </a>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div>
            {status === 'ok' ? (
              <div style={{ border: '1px solid rgba(197,208,0,0.25)', padding: '3rem 2rem', textAlign: 'center' }}>
                <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</p>
                <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.25rem', color: '#c5d000', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                  {tx.okTitle}
                </h3>
                <p style={{ fontFamily: 'var(--font-inter)', color: '#666', fontSize: '0.9rem', lineHeight: 1.7 }}>
                  {tx.okText}
                </p>
              </div>
            ) : (
              <form onSubmit={submit}>
                {/* Honeypot */}
                <input
                  type="text" name="website" value={form.website}
                  onChange={field('website')} tabIndex={-1} autoComplete="off"
                  style={{ position: 'absolute', opacity: 0, height: 0, pointerEvents: 'none' }}
                  aria-hidden="true"
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 2rem' }}>
                  <Field label={tx.fields.name} required>
                    <input type="text" required value={form.ime} onChange={field('ime')} placeholder={tx.placeholders.name} style={inputStyle} onFocus={focus} onBlur={blur} />
                  </Field>
                  <Field label={tx.fields.phone}>
                    <input type="tel" value={form.telefon} onChange={field('telefon')} placeholder={tx.placeholders.phone} style={inputStyle} onFocus={focus} onBlur={blur} />
                  </Field>
                </div>

                <Field label={tx.fields.email} required>
                  <input type="email" required value={form.email} onChange={field('email')} placeholder={tx.placeholders.email} style={inputStyle} onFocus={focus} onBlur={blur} />
                </Field>

                <Field label={tx.fields.route}>
                  <input type="text" value={form.ruta} onChange={field('ruta')} placeholder={tx.placeholders.route} style={inputStyle} onFocus={focus} onBlur={blur} />
                </Field>

                <Field label={tx.fields.cargo}>
                  <input type="text" value={form.teret} onChange={field('teret')} placeholder={tx.placeholders.cargo} style={inputStyle} onFocus={focus} onBlur={blur} />
                </Field>

                <Field label={tx.fields.notes}>
                  <textarea rows={4} value={form.poruka} onChange={field('poruka')} placeholder={tx.placeholders.notes} style={{ ...inputStyle, resize: 'none' }} onFocus={focus} onBlur={blur} />
                </Field>

                {status === 'err' && (
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#f55', marginBottom: '1rem' }}>
                    {tx.errText}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{ background: '#c5d000', color: '#0d0d0d', border: 'none', padding: '1rem 2.5rem', fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer', opacity: status === 'sending' ? 0.7 : 1, transition: 'background 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#f5f5f5' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#c5d000' }}
                >
                  {status === 'sending' ? tx.submitting : tx.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
