'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from './ThemeProvider'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Početna' },
  { href: '/nase-usluge', label: 'Usluge' },
  { href: '/prikolice', label: 'Prikolice' },
  { href: '/galerija', label: 'Galerija' },
  { href: '/blog', label: 'Blog' },
  { href: '/o-nama', label: 'O nama' },
  { href: '/kontakt', label: 'Kontakt' },
]

export default function Header() {
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50" style={{ background: 'var(--bg)' }}>

      {/* Hazard tape top */}
      <div className="h-4 hazard-tape" />

      {/* Row 2: Logo + contact + flags + theme */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src={theme === 'dark' ? '/logo/logo-light.svg' : '/logo/logo-dark.svg'}
              alt="Cargo Special Logistic"
              width={150}
              height={52}
              priority
            />
          </Link>

          {/* Contact info */}
          <div className="hidden md:flex items-center gap-8 flex-1 justify-center">
            <a
              href="https://maps.google.com/?q=Jurija+Gagarina+21R+Novi+Beograd"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-2 hover:opacity-80 transition-opacity"
            >
              <svg className="mt-0.5 flex-shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c5d000" strokeWidth="2">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <span className="text-sm leading-snug" style={{ color: '#c5d000', fontFamily: 'var(--font-inter)' }}>
                Jurija Gagarina 21 R, lokal DL4,<br />11070 Novi Beograd
              </span>
            </a>

            <a
              href="mailto:boban.bicanin@cslog.rs"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c5d000" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              <span className="text-sm" style={{ color: '#c5d000', fontFamily: 'var(--font-inter)' }}>
                boban.bicanin@cslog.rs
              </span>
            </a>

            <a
              href="tel:+38163209675"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c5d000" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span className="text-sm" style={{ color: '#c5d000', fontFamily: 'var(--font-inter)' }}>
                +381 63 209 675
              </span>
            </a>
          </div>

          {/* Flags + theme toggle */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button title="Srpski" className="w-6 h-6 rounded-sm overflow-hidden opacity-90 hover:opacity-100 transition-opacity">
              <Image src="/flags/sr.svg" alt="Srpski" width={24} height={24} />
            </button>
            <button title="English" className="w-6 h-6 rounded-sm overflow-hidden opacity-60 hover:opacity-100 transition-opacity">
              <Image src="/flags/en.svg" alt="English" width={24} height={24} />
            </button>
            <div className="w-px h-5 mx-1" style={{ background: 'var(--border)' }} />
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              style={{ color: 'var(--text-muted)' }}
              className="w-8 h-8 flex items-center justify-center hover:text-[#c5d000] transition-colors"
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              style={{ color: 'var(--text)' }}
              className="lg:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            >
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Row 3: Nav + CTA */}
      <div style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="max-w-[1280px] mx-auto px-6 hidden lg:flex items-center justify-between h-14">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ fontFamily: 'var(--font-inter)', color: 'var(--text)' }}
                className="text-sm tracking-wide uppercase hover:text-[#c5d000] transition-colors duration-200 first:text-[#c5d000]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href="#upit"
            className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-sm px-6 py-2.5 transition-all duration-200"
            style={{ fontFamily: 'var(--font-inter)', background: '#c5d000', color: '#0d0d0d' }}
            onMouseEnter={e => { e.currentTarget.style.background = '#0d0d0d'; e.currentTarget.style.color = '#c5d000' }}
            onMouseLeave={e => { e.currentTarget.style.background = '#c5d000'; e.currentTarget.style.color = '#0d0d0d' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Besplatan upit
          </a>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }} className="lg:hidden px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}
              style={{ color: 'var(--text)', fontFamily: 'var(--font-inter)' }}
              className="text-sm uppercase tracking-widest hover:text-[#c5d000] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a href="#upit"
            className="inline-flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-sm px-5 py-3 mt-2"
            style={{ fontFamily: 'var(--font-inter)', background: '#c5d000', color: '#0d0d0d' }}
            onClick={() => setMenuOpen(false)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Besplatan upit
          </a>
        </nav>
      )}
    </header>
  )
}
