'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from './ThemeProvider'
import { useState } from 'react'

const navLinks = [
  { href: '/', label: 'Početna' },
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
    <header
      style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-20">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src={theme === 'dark' ? '/logo/logo-light.svg' : '/logo/logo-dark.svg'}
            alt="Cargo Special Logistic"
            width={140}
            height={48}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ color: 'var(--text-muted)' }}
              className="text-sm tracking-wide uppercase hover:text-[#c5d000] transition-colors duration-200 font-[var(--font-inter)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-4">

          {/* Lang switch */}
          <button
            onClick={() => setLang(lang === 'sr' ? 'en' : 'sr')}
            style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}
            className="hidden sm:flex items-center gap-1 text-xs uppercase tracking-widest border rounded px-2 py-1 hover:text-[#c5d000] hover:border-[#c5d000] transition-colors duration-200"
          >
            {lang === 'sr' ? 'EN' : 'SR'}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            style={{ color: 'var(--text-muted)' }}
            className="w-9 h-9 flex items-center justify-center rounded hover:text-[#c5d000] transition-colors duration-200"
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* CTA */}
          <Link
            href="/kontakt"
            className="hidden sm:inline-flex items-center bg-[#c5d000] text-[#0d0d0d] text-sm font-semibold uppercase tracking-widest px-5 py-2.5 hover:bg-[#a8b200] transition-colors duration-200"
          >
            Besplatan upit
          </Link>

          {/* Mobile hamburger */}
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

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)' }}
          className="lg:hidden px-6 py-6 flex flex-col gap-5"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ color: 'var(--text)' }}
              className="text-sm uppercase tracking-widest hover:text-[#c5d000] transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center bg-[#c5d000] text-[#0d0d0d] text-sm font-semibold uppercase tracking-widest px-5 py-3 mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Besplatan upit
          </Link>
        </nav>
      )}
    </header>
  )
}
