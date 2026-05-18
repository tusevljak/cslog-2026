import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      {/* Hazard tape divider */}
      <div className="h-14" style={{
        background: 'repeating-linear-gradient(-45deg, #c5d000 0px, #c5d000 18px, #0d0d0d 18px, #0d0d0d 36px, #ffffff 36px, #ffffff 54px, #0d0d0d 54px, #0d0d0d 72px)'
      }} />

      {/* Main footer */}
      <div className="py-14" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1280px] mx-auto px-6 grid md:grid-cols-3 gap-12 items-start">

          {/* Company data */}
          <div>
            <p className="text-xs uppercase tracking-widest mb-4 font-semibold" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
              Podaci firme
            </p>
            <div className="flex flex-col gap-1.5">
              {[
                ['MB', '20045507'],
                ['PIB', '104025538'],
                ['TIMOCOM', '238068'],
              ].map(([k, v]) => (
                <p key={k} className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
                  <span style={{ color: 'var(--text)' }}>{k}:</span> {v}
                </p>
              ))}
            </div>
          </div>

          {/* ISO + Social */}
          <div className="flex flex-col items-center gap-6">
            <Image
              src="/iso9001.png"
              alt="ISO 9001 sertifikat"
              width={140}
              height={70}
              className="object-contain opacity-80"

            />
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-[#c5d000] text-[#0d0d0d] hover:bg-[#a8b200] transition-colors"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center bg-[#c5d000] text-[#0d0d0d] hover:bg-[#a8b200] transition-colors"
                aria-label="YouTube"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" fill="#0d0d0d"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <Image
              src="/logo/logo-dark.svg"
              alt="Cargo Special Logistic"
              width={140}
              height={48}
              className="dark:invert mb-2"
            />
            <a href="https://maps.google.com/?q=Jurija+Gagarina+21R+Novi+Beograd" target="_blank" rel="noopener noreferrer"
              className="flex items-start gap-2 text-sm hover:text-[#c5d000] transition-colors"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
            >
              <svg className="mt-0.5 flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Jurija Gagarina 21 R, lokal DL4, 11070 Novi Beograd
            </a>
            <a href="mailto:boban.bicanin@cslog.rs"
              className="flex items-center gap-2 text-sm hover:text-[#c5d000] transition-colors"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              boban.bicanin@cslog.rs
            </a>
            <a href="tel:+38163209675"
              className="flex items-center gap-2 text-sm hover:text-[#c5d000] transition-colors"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              +381 63 209 675
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ background: 'var(--bg-subtle)', borderTop: '1px solid var(--border)' }}>
        <div className="max-w-[1280px] mx-auto px-6 h-12 flex items-center justify-between">
          <p className="text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
            © Cargo Special Logistic d.o.o. 2026 · Sva prava zadržana
          </p>
          <Link href="/politika-privatnosti" className="text-xs hover:text-[#c5d000] transition-colors" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}>
            Politika privatnosti
          </Link>
        </div>
      </div>
    </footer>
  )
}
