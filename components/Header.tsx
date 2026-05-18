'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from './ThemeProvider'
import { useState } from 'react'

const navLinks = [
  { href: '/usluge', label: 'Usluge' },
  { href: '/prikolice', label: 'Prikolice' },
  { href: '/galerija', label: 'Galerija' },
  { href: '/blog', label: 'Blog' },
  { href: '/o-nama', label: 'O nama' },
  { href: '/kontakt', label: 'Kontakt' },
]

export default function Header() {
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState<'sr' | 'en'>('sr')

  return (
    <header className="sticky top-0 z-50" style={{ background: 'var(--bg)' }}>

      {/* Top info bar */}
      <div style={{ background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-[1280px] mx-auto px-6 h-10 flex items-center justify-between">
          <div className="hidden md:flex items-center gap-6" style={{ color: 'var(--text-muted)' }}>
            <a href="mailto:boban.bicanin@cslog.rs" className="flex items-center gap-2 text-xs hover:text-[#c5d000] transition-colors" style={{ fontFamily: 'var(--font-inter)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              boban.bicanin@cslog.rs
            </a>
            <a href="tel:+38163209675" className="flex items-center gap-2 text-xs hover:text-[#c5d000] transition-colors" style={{ fontFamily: 'var(--font-inter)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +381 63 209 675
            </a>
            <span className="flex items-center gap-2 text-xs" style={{ fontFamily: 'var(--font-inter)' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              Jurija Gagarina 21R, Novi Beograd
            </span>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <button
              onClick={() => setLang(lang === 'sr' ? 'en' : 'sr')}
              style={{ color: 'var(--text-muted)', borderColor: 'var(--border)', fontFamily: 'var(--font-inter)' }}
              className="flex items-center gap-1 text-xs uppercase tracking-widest border px-2 py-0.5 hover:text-[#c5d000] hover:border-[#c5d000] transition-colors"
            >
              {lang === 'sr' ? 'EN' : 'SR'}
            </button>
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              style={{ color: 'var(--text-muted)' }}
              className="w-7 h-7 flex items-center justify-center hover:text-[#c5d000] transition-colors"
            >
              {theme === 'dark' ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-24">

          <Link href="/" className="flex-shrink-0 py-4">
            <Image
              src={theme === 'dark' ? '/logo/logo-light.svg' : '/logo/logo-dark.svg'}
              alt="Cargo Special Logistic"
              width={160}
              height={56}
              priority
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-inter)' }}
                className="text-sm tracking-wide uppercase hover:text-[#c5d000] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/kontakt"
              className="hidden sm:inline-flex items-center bg-[#c5d000] text-[#0d0d0d] font-semibold uppercase tracking-widest text-sm px-6 py-3 hover:bg-[#a8b200] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Besplatan upit
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              style={{ color: 'var(--text)' }}
              className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
            >
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }} className="lg:hidden px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{ color: 'var(--text)', fontFamily: 'var(--font-inter)' }}
              className="text-sm uppercase tracking-widest hover:text-[#c5d000] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/kontakt"
            className="inline-flex items-center justify-center bg-[#c5d000] text-[#0d0d0d] font-semibold uppercase tracking-widest text-sm px-5 py-3 mt-2"
            style={{ fontFamily: 'var(--font-inter)' }}
            onClick={() => setMenuOpen(false)}
          >
            Besplatan upit
          </Link>
        </nav>
      )}
    </header>
  )
}
