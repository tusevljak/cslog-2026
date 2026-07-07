'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const copy = {
  sr: {
    tagline: 'Specijalni transport od 2005. godine.',
    contact: 'Kontakt',
    address: <>Jurija Gagarina 21 R, lokal DL4<br />11070 Beograd, Srbija</>,
    availability: 'Dostupnost',
    availabilityText: <>Bez praznika i bez pauze.<br />Tu smo kad zatreba.</>,
    certificate: 'Sertifikat',
    rights: '© Cargo Special Logistic d.o.o. 2026 · Sva prava zadržana',
    privacy: 'Politika privatnosti',
    privacyHref: '/politika-privatnosti',
  },
  en: {
    tagline: 'Special transport since 2005.',
    contact: 'Contact',
    address: <>Jurija Gagarina 21 R, unit DL4<br />11070 Belgrade, Serbia</>,
    availability: 'Availability',
    availabilityText: <>No holidays, no downtime.<br />Here when you need us.</>,
    certificate: 'Certificate',
    rights: '© Cargo Special Logistic d.o.o. 2026 · All rights reserved',
    privacy: 'Privacy Policy',
    privacyHref: '/politika-privatnosti',
  },
}

export default function Footer() {
  const pathname = usePathname()
  const isEn = pathname.startsWith('/en')
  const tx = isEn ? copy.en : copy.sr

  return (
    <footer>
      {/* Hazard tape divider */}
      <div className="h-14" style={{
        background: 'repeating-linear-gradient(-45deg, #c5d000 0px, #c5d000 18px, #0d0d0d 18px, #0d0d0d 36px, #ffffff 36px, #ffffff 54px, #0d0d0d 54px, #0d0d0d 72px)'
      }} />

      {/* Main footer */}
      <div className="py-16" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start">

          {/* ── 1. LOGO ────────────────────────────── */}
          <div className="flex flex-col items-center lg:items-start gap-4">
            <Image
              src="/logo/logo-dark.svg"
              alt="Cargo Special Logistic"
              width={240}
              height={100}
              className="dark:invert"
              style={{ width: 'auto', height: 100 }}
            />
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)', fontSize: '0.78rem', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
              {tx.tagline}
            </p>
          </div>

          {/* ── 2. CONTACT + SOCIAL ───────────────── */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-5 font-semibold" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              {tx.contact}
            </p>
            <div className="flex flex-col gap-3">
              <a href="https://maps.google.com/?q=Jurija+Gagarina+21R+Novi+Beograd" target="_blank" rel="noopener noreferrer"
                className="flex items-start gap-2 text-sm hover:text-[#c5d000] transition-colors"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                <svg className="mt-0.5 flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{tx.address}</span>
              </a>
              <a href="mailto:office@cslog.rs"
                className="flex items-center gap-2 text-sm hover:text-[#c5d000] transition-colors"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                office@cslog.rs
              </a>
              <a href="tel:+38163209675"
                className="flex items-center gap-2 text-sm hover:text-[#c5d000] transition-colors"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                +381 63 209 675
              </a>

              {/* Social */}
              <div className="flex items-center gap-2 mt-3">
                <a href="https://www.facebook.com/cslogbeograd" target="_blank" rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 flex items-center justify-center bg-[#c5d000] text-[#0d0d0d] hover:bg-[#a8b200] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/channel/UCODJdGkhLTEt_CHmXIOUY3g" target="_blank" rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 flex items-center justify-center bg-[#c5d000] text-[#0d0d0d] hover:bg-[#a8b200] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 7s-.3-2-1.2-2.7c-1.1-1.2-2.4-1.2-3-1.3C16.6 3 12 3 12 3s-4.6 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.3.7 11.6v2.1C.7 16.1 1 18 1 18s.3 2 1.2 2.7c1.1 1.2 2.6 1.1 3.3 1.2C7.6 22 12 22 12 22s4.6 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.7 1.2-2.7 1.2-2.7s.3-2.3.3-4.6v-2.1C23.3 9.3 23 7 23 7zM9.7 15.5V8.4l8.2 3.6-8.2 3.5z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ── 3. AVAILABILITY ───────────────────── */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-5 font-semibold" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              {tx.availability}
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', marginBottom: '0.75rem' }}>
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.75rem', letterSpacing: '0.04em', lineHeight: 1, color: '#c5d000' }}>24</span>
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.4rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>/</span>
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.75rem', letterSpacing: '0.04em', lineHeight: 1, color: '#c5d000' }}>7</span>
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.4rem', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>/</span>
              <span style={{ fontFamily: 'var(--font-bebas)', fontSize: '2.75rem', letterSpacing: '0.04em', lineHeight: 1, color: '#c5d000' }}>365</span>
            </div>
            <p className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)', lineHeight: 1.7 }}>
              {tx.availabilityText}
            </p>
          </div>

          {/* ── 4. CERTIFICATE ────────────────────── */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-5 font-semibold" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              {tx.certificate}
            </p>
            <Image
              src="/sertifikat/sertifikat%20za%20svetle%20pozadine.jpg"
              alt="ISO 9001 certificate"
              width={180} height={90}
              className="object-contain dark:hidden"
              style={{ width: 'auto', height: 90 }}
            />
            <Image
              src="/sertifikat/sertifikat%20za%20tamne%20pozadine.png"
              alt="ISO 9001 certificate"
              width={180} height={90}
              className="object-contain hidden dark:block"
              style={{ width: 'auto', height: 90 }}
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

          {/* Copyright */}
          <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
            {tx.rights}
          </p>

          {/* Company data — inline (registration numbers, no translation needed) */}
          <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
            <span style={{ color: 'var(--text)' }}>MB</span> 20045507
            <span style={{ margin: '0 0.5rem', opacity: 0.4 }}>·</span>
            <span style={{ color: 'var(--text)' }}>PIB</span> 104025538
            <span style={{ margin: '0 0.5rem', opacity: 0.4 }}>·</span>
            <span style={{ color: 'var(--text)' }}>TIMOCOM</span> 238068
          </p>

          {/* Privacy */}
          <Link href={tx.privacyHref} className="text-xs hover:text-[#c5d000] transition-colors" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
            {tx.privacy}
          </Link>
        </div>
      </div>
    </footer>
  )
}
