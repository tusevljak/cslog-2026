'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTheme } from './ThemeProvider'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

const navSr = [
  { href: '/', label: 'Početna' },
  { href: '/nase-usluge', label: 'Usluge' },
  { href: '/prikolice', label: 'Prikolice' },
  { href: '/galerija', label: 'Galerija' },
  { href: '/blog', label: 'Blog' },
  { href: '/o-nama', label: 'O nama' },
  { href: '/kontakt', label: 'Kontakt' },
]

const navEn = [
  { href: '/en', label: 'Home' },
  { href: '/en/services', label: 'Services' },
  { href: '/en/trailers', label: 'Trailers' },
  { href: '/en/gallery', label: 'Gallery' },
  { href: '/en/blog', label: 'Blog' },
  { href: '/en/about', label: 'About' },
  { href: '/en/contact', label: 'Contact' },
]

// Left half: diagonals lean right (-45deg)
const TAPE_LEFT = `repeating-linear-gradient(
  -45deg,
  #ffffff  0px, #ffffff 10px,
  #0d0d0d 10px, #0d0d0d 20px,
  #c5d000 20px, #c5d000 30px,
  #0d0d0d 30px, #0d0d0d 40px
)`
// Right half: mirror (+45deg)
const TAPE_RIGHT = `repeating-linear-gradient(
  45deg,
  #ffffff  0px, #ffffff 10px,
  #0d0d0d 10px, #0d0d0d 20px,
  #c5d000 20px, #c5d000 30px,
  #0d0d0d 30px, #0d0d0d 40px
)`
const TAPE_SIZE = '56px 56px'
const TAPE_H = 14   // stripe height in px

export default function Header() {
  const { theme, toggle } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isEn = pathname.startsWith('/en')
  const navLinks = isEn ? navEn : navSr

  const leftRef    = useRef<HTMLDivElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)
  const botLeftRef = useRef<HTMLDivElement>(null)
  const botRightRef= useRef<HTMLDivElement>(null)

  useEffect(() => {
    let lastY = window.scrollY
    let pos = 0

    function onScroll() {
      const y = window.scrollY
      const delta = y - lastY
      pos += delta * 0.55
      lastY = y

      if (leftRef.current)     leftRef.current.style.backgroundPosition     = `${pos}px 0`
      if (rightRef.current)    rightRef.current.style.backgroundPosition    = `${-pos}px 0`
      // Bottom tape: opposite direction — flee from triangle on scroll down
      if (botLeftRef.current)  botLeftRef.current.style.backgroundPosition  = `${-pos}px 0`
      if (botRightRef.current) botRightRef.current.style.backgroundPosition = `${pos}px 0`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50" style={{ background: 'var(--bg)' }}>

      {/* ── SPLIT HAZARD TAPE — mirror at center, viewport-anchored ──
           Both halves are full-width with pattern anchored at x=0,
           then clip-path hides one half each. This way the patterns
           share the same phase at the seam → perfect mirror at any width. */}
      <div style={{ position: 'relative', height: TAPE_H, flexShrink: 0, overflow: 'hidden' }}>
        {/* Left half — full width, clipped to left 50% */}
        <div ref={leftRef} style={{
          position: 'absolute', inset: 0,
          background: TAPE_LEFT, backgroundSize: TAPE_SIZE,
          clipPath: 'inset(0 50% 0 0)',
        }} />
        {/* Right half — full width, clipped to right 50%, same x=0 anchor */}
        <div ref={rightRef} style={{
          position: 'absolute', inset: 0,
          background: TAPE_RIGHT, backgroundSize: TAPE_SIZE,
          clipPath: 'inset(0 0 0 50%)',
        }} />
      </div>

      {/* ═══════════════════════════════════════════════
           MOBILE BAR  (< lg)
      ═══════════════════════════════════════════════ */}
      <div className="lg:hidden flex items-center justify-between px-4"
        style={{ borderBottom: '1px solid var(--border)', height: 60 }}>

        <Link href="/" onClick={() => setMenuOpen(false)}>
          <Image
            src={theme === 'dark' ? '/logo/logo-light.svg' : '/logo/logo-dark.svg'}
            alt="Cargo Special Logistic"
            width={120} height={42}
            priority
            style={{ width: 'auto', height: 42 }}
          />
        </Link>

        <div className="flex items-center gap-1">
          {/* Theme toggle */}
          <button onClick={toggle} aria-label="Toggle theme"
            style={{ color: 'var(--text-muted)' }}
            className="w-10 h-10 flex items-center justify-center hover:text-[#c5d000] transition-colors">
            {theme === 'dark' ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>

          {/* Hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu"
            style={{ color: 'var(--text)', background: menuOpen ? '#c5d000' : 'transparent' }}
            className="w-10 h-10 flex flex-col items-center justify-center gap-[5px] transition-colors">
            <span className={`block w-5 h-[2px] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px] bg-[#0d0d0d]' : 'bg-current'}`} />
            <span className={`block w-5 h-[2px] bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[2px] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px] bg-[#0d0d0d]' : 'bg-current'}`} />
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
           MOBILE MENU PANEL
      ═══════════════════════════════════════════════ */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-[600px]' : 'max-h-0'}`}
        style={{ background: 'var(--bg)', borderBottom: menuOpen ? '1px solid var(--border)' : 'none' }}>

        {/* Nav links */}
        <nav style={{ borderBottom: '1px solid var(--border)' }}>
          {navLinks.map((link, i) => (
            <Link key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0.95rem 1.5rem',
                borderBottom: i < navLinks.length - 1 ? '1px solid var(--border)' : 'none',
                fontFamily: 'var(--font-inter)', fontSize: '0.8rem',
                textTransform: 'uppercase', letterSpacing: '0.12em',
                color: 'var(--text)', textDecoration: 'none',
              }}
              className="hover:text-[#c5d000] hover:bg-[var(--bg-subtle)] transition-colors"
            >
              {link.label}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
              </svg>
            </Link>
          ))}
        </nav>

        {/* Contact + CTA */}
        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <a href="tel:+38163209675"
            className="flex items-center gap-3"
            style={{ fontFamily: 'var(--font-inter)', fontSize: '0.9rem', color: 'var(--text)', textDecoration: 'none' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c5d000" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            +381 63 209 675
          </a>
          <a href="mailto:office@cslog.rs"
            className="flex items-center gap-3"
            style={{ fontFamily: 'var(--font-inter)', fontSize: '0.9rem', color: 'var(--text)', textDecoration: 'none' }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#c5d000" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            office@cslog.rs
          </a>

          <a href="#upit" onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 mt-1"
            style={{
              fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: '0.8rem',
              textTransform: 'uppercase', letterSpacing: '0.15em',
              background: '#c5d000', color: '#0d0d0d',
              padding: '0.9rem', textDecoration: 'none',
            }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Besplatan upit
          </a>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
           DESKTOP LAYOUT  (≥ lg)
      ═══════════════════════════════════════════════ */}
      <div className="hidden lg:flex items-stretch"
        style={{ borderBottom: '1px solid var(--border)', maxWidth: 1280, margin: '0 auto' }}>

        {/* Logo */}
        <Link href="/" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '1rem 2rem', flexShrink: 0,
          borderRight: '1px solid var(--border)',
        }}>
          <Image
            src={theme === 'dark' ? '/logo/logo-light.svg' : '/logo/logo-dark.svg'}
            alt="Cargo Special Logistic"
            width={160} height={72} priority
            style={{ width: 'auto', height: 72 }}
          />
        </Link>

        {/* Right side */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>

          {/* Tier 1: contact + flags + theme */}
          <div style={{ borderBottom: '1px solid var(--border)', padding: '0.75rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem' }}>
            <div className="flex items-center gap-6 flex-1">
              <a href="tel:+38163209675" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c5d000" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span className="text-sm" style={{ color: '#c5d000', fontFamily: 'var(--font-inter)' }}>+381 63 209 675</span>
              </a>
              <a href="mailto:office@cslog.rs" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c5d000" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                <span className="text-sm" style={{ color: '#c5d000', fontFamily: 'var(--font-inter)' }}>office@cslog.rs</span>
              </a>
              <a href="https://maps.google.com/?q=Jurija+Gagarina+21R+Novi+Beograd" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#c5d000" strokeWidth="2">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                <span className="text-sm" style={{ color: '#c5d000', fontFamily: 'var(--font-inter)' }}>11070 Beograd, Srbija</span>
              </a>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link href={isEn ? pathname.replace(/^\/en/, '') || '/' : pathname}
                title="Srpski" className={`w-6 h-6 rounded-sm overflow-hidden transition-opacity block ${isEn ? 'opacity-60 hover:opacity-100' : 'opacity-90'}`}>
                <Image src="/flags/sr.svg" alt="Srpski" width={24} height={24} />
              </Link>
              <Link href={isEn ? pathname : `/en${pathname === '/' ? '' : pathname}`}
                title="English" className={`w-6 h-6 rounded-sm overflow-hidden transition-opacity block ${isEn ? 'opacity-90' : 'opacity-60 hover:opacity-100'}`}>
                <Image src="/flags/en.svg" alt="English" width={24} height={24} />
              </Link>
              <div className="w-px h-5 mx-1" style={{ background: 'var(--border)' }} />
              <button onClick={toggle} aria-label="Toggle theme"
                style={{ color: 'var(--text-muted)' }}
                className="w-8 h-8 flex items-center justify-center hover:text-[#c5d000] transition-colors">
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
            </div>
          </div>

          {/* Tier 2: nav + CTA */}
          <div className="flex items-center justify-between h-14" style={{ padding: '0 2rem' }}>
            <nav className="flex items-center gap-7">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}
                  style={{ fontFamily: 'var(--font-inter)', color: 'var(--text)' }}
                  className="text-sm tracking-wide uppercase hover:text-[#c5d000] transition-colors duration-200 first:text-[#c5d000]">
                  {link.label}
                </Link>
              ))}
            </nav>
            <a href="#upit"
              className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-xs px-5 py-2 transition-all duration-200 hover:bg-[#0d0d0d] hover:text-[#c5d000]"
              style={{ fontFamily: 'var(--font-inter)', background: '#c5d000', color: '#0d0d0d' }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Besplatan upit
            </a>
          </div>

        </div>
      </div>
      {/* ── BOTTOM TAPE — 180° rotation, same viewport-anchored mirror ── */}
      <div style={{ position: 'relative', height: TAPE_H, flexShrink: 0, transform: 'rotate(180deg)', overflow: 'hidden' }}>
        <div ref={botLeftRef} style={{
          position: 'absolute', inset: 0,
          background: TAPE_LEFT, backgroundSize: TAPE_SIZE,
          clipPath: 'inset(0 50% 0 0)',
        }} />
        <div ref={botRightRef} style={{
          position: 'absolute', inset: 0,
          background: TAPE_RIGHT, backgroundSize: TAPE_SIZE,
          clipPath: 'inset(0 0 0 50%)',
        }} />
      </div>

    </header>
  )
}
