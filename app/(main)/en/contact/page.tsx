'use client'

import { useState } from 'react'
import Image from 'next/image'
import PageHero from '@/components/PageHero'
import QuoteBanner from '@/components/QuoteBanner'

const team = [
  { name: 'Boban Bićanin', role: 'CEO', phone: '+381 63 209 675', phoneHref: 'tel:+38163209675', email: 'boban.bicanin@cslog.rs', sigDark: '/potpisi/Boban-Bićanin-email-potpis.png', sigLight: '/potpisi/Boban-Bićanin-email-potpis-beli.png' },
  { name: 'Sanja Branković', role: 'Operations Team', phone: '+381 69 209 6753', phoneHref: 'tel:+381692096753', email: 'sanja.brankovic@cslog.rs', sigDark: '/potpisi/Sanja-Brankovic-email-potpis.png', sigLight: '/potpisi/Sanja-Brankovic-email-potpis-beli.png' },
  { name: 'Vladimir Mićić', role: 'Operations Team', phone: '+381 63 261 105', phoneHref: 'tel:+38163261105', email: 'vladimir.micic@cslog.rs', sigDark: '/potpisi/vladimir-micic-email-potpis.png', sigLight: '/potpisi/vladimir-micic-email-potpis-beli.png' },
  { name: 'Božana Bučevac', role: 'Administration', phone: '+381 69 209 6751', phoneHref: 'tel:+381692096751', email: 'bozana.bucevac@cslog.rs', sigDark: '/potpisi/bozana-bucevac-email-potpis.png', sigLight: '/potpisi/bozana-bucevac-email-potpis-beli.png' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ime: form.name, email: form.email, poruka: form.message, telefon: '', ruta: '', teret: '' }),
      })
      setSent(res.ok)
      if (!res.ok) throw new Error()
    } catch {
      setSent(false)
      alert('Error sending message. Please contact us directly.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Straight to the right person"
        subtitle="Contact us directly — every team member is available and ready to respond promptly."
        bgImage="/slike/NASLOVNA.jpg"
      />

      {/* Team */}
      <section className="py-20" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="w-8 h-0.5 bg-[#c5d000] mb-6" />
          <h2 className="mb-4" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 3vw, 2.5rem)', letterSpacing: '0.03em', color: 'var(--text)' }}>Our team</h2>
          <p className="mb-12 text-sm" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>Our team is always at your disposal.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: 'var(--border)' }}>
            {team.map((member) => (
              <div key={member.name} className="flex flex-col" style={{ background: 'var(--bg)' }}>
                <div style={{ padding: '2rem 2rem 1rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', minHeight: 120, borderBottom: '1px solid var(--border)' }}>
                  <Image src={member.sigDark} alt={`${member.name} signature`} width={180} height={80}
                    className="dark:hidden" style={{ width: 'auto', height: 64, objectFit: 'contain', objectPosition: 'left bottom' }} />
                  <Image src={member.sigLight} alt={`${member.name} signature`} width={180} height={80}
                    className="hidden dark:block" style={{ width: 'auto', height: 64, objectFit: 'contain', objectPosition: 'left bottom' }} />
                </div>
                <div style={{ padding: '1.5rem 2rem 2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <p style={{ fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: '0.25rem' }}>{member.name}</p>
                    <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#c5d000' }}>{member.role}</p>
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

      {/* Form + Location */}
      <section className="py-20" style={{ background: 'var(--bg-subtle)' }}>
        <div className="max-w-[1280px] mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">
          <div>
            <div className="w-8 h-0.5 bg-[#c5d000] mb-6" />
            <h2 className="mb-8" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 3vw, 2.5rem)', letterSpacing: '0.03em', color: 'var(--text)' }}>Send us a message</h2>
            {sent ? (
              <div className="p-8 flex flex-col gap-4" style={{ border: '1px solid #c5d000' }}>
                <div className="w-10 h-10 flex items-center justify-center bg-[#c5d000]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" strokeWidth="2.5"><polyline points="20,6 9,17 4,12"/></svg>
                </div>
                <p className="font-semibold text-lg" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text)' }}>Message sent!</p>
                <p className="text-sm leading-relaxed" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>Thank you for your message. We will get back to you shortly.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}
                  className="text-[#c5d000] text-sm uppercase tracking-widest hover:underline self-start mt-2" style={{ fontFamily: 'var(--font-inter)' }}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>Full name</label>
                    <input id="name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name"
                      className="px-4 py-3 text-sm outline-none focus:border-[#c5d000] transition-colors"
                      style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-inter)' }} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>Email address</label>
                    <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com"
                      className="px-4 py-3 text-sm outline-none focus:border-[#c5d000] transition-colors"
                      style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-inter)' }} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>Your question or message</label>
                  <textarea id="message" required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Describe your request..."
                    className="px-4 py-3 text-sm outline-none focus:border-[#c5d000] transition-colors resize-none"
                    style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)', fontFamily: 'var(--font-inter)' }} />
                </div>
                <button type="submit" disabled={sending}
                  className="self-start inline-flex items-center gap-3 bg-[#c5d000] text-[#0d0d0d] font-semibold uppercase tracking-widest text-sm px-8 py-3.5 hover:bg-[#a8b200] transition-colors disabled:opacity-60"
                  style={{ fontFamily: 'var(--font-inter)' }}>
                  {sending ? 'Sending...' : 'Send message'}
                  {!sending && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>}
                </button>
              </form>
            )}
          </div>
          <div className="flex flex-col gap-10">
            <div>
              <div className="w-8 h-0.5 bg-[#c5d000] mb-6" />
              <h2 className="mb-8" style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 3vw, 2.5rem)', letterSpacing: '0.03em', color: 'var(--text)' }}>Our location</h2>
              <a href="https://maps.google.com/?q=Jurija+Gagarina+21R+Novi+Beograd" target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                <div className="w-10 h-10 flex items-center justify-center bg-[#c5d000] flex-shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>Address</p>
                  <p className="text-base font-semibold group-hover:text-[#c5d000] transition-colors leading-snug" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text)' }}>
                    Jurija Gagarina 21 R, unit DL4<br />11070 Novi Beograd, Serbia
                  </p>
                </div>
              </a>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
              <p className="text-xs uppercase tracking-widest mb-4" style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }}>Availability</p>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.6rem' }}>
                <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.75rem, 5vw, 3.75rem)', letterSpacing: '0.04em', lineHeight: 1, color: '#c5d000' }}>24</span>
                <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.75rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>/</span>
                <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.75rem, 5vw, 3.75rem)', letterSpacing: '0.04em', lineHeight: 1, color: '#c5d000' }}>7</span>
                <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.75rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>/</span>
                <span style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.75rem, 5vw, 3.75rem)', letterSpacing: '0.04em', lineHeight: 1, color: '#c5d000' }}>365</span>
              </div>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', lineHeight: 1.7, color: 'var(--text-muted)' }}>
                We&apos;re available 24 hours a day, seven days a week, 365 days a year —
                no holidays, no downtime.
              </p>
            </div>
          </div>
        </div>
      </section>

      <QuoteBanner lang="en" />
    </>
  )
}
