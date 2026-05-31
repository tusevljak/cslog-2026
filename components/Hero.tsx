'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const tapeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let pos = 0
    let lastY = window.scrollY
    function onScroll() {
      const y = window.scrollY
      pos += (y - lastY) * 0.4
      lastY = y
      if (tapeRef.current) tapeRef.current.style.backgroundPosition = `${pos}px 0`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '100svh' }}>

      {/* BG image */}
      <div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/slike/NASLOVNA.jpg')" }} />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(13,13,13,0.35) 0%, rgba(13,13,13,0.55) 45%, rgba(13,13,13,0.94) 100%)' }} />

      {/* ── SCREEN FLASH — amber sweep left/right, alternating ── */}
      <div className="hero-flash hero-flash-left" />
      <div className="hero-flash hero-flash-right" />

      {/* ── CONTENT — vertically centered, compact ── */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6"
        style={{ paddingBottom: 'clamp(90px, 14vh, 130px)' }}>

        <p className="text-[#c5d000] uppercase tracking-[0.28em] mb-3"
          style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(0.6rem, 1.2vw, 0.8rem)' }}>
          Cargo Special Logistic · od 2005. godine
        </p>

        <h1 className="text-white leading-none mb-4"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(2.4rem, 7.5vw, 7.5rem)',
            letterSpacing: '0.02em',
          }}>
          Nema veze<br />
          koliko je<br />
          <span className="text-[#c5d000]">teško i veliko.</span>
        </h1>

        <p className="text-white/60 max-w-md leading-relaxed mb-7"
          style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(0.8rem, 1.5vw, 1rem)' }}>
          Prevoz i pratnja specijalnih i vangabaritnih tereta —<br className="hidden sm:block" />
          od Beograda do Bliskog istoka.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a href="/kontakt"
            className="inline-flex items-center bg-[#c5d000] text-[#0d0d0d] font-semibold uppercase tracking-widest px-7 py-3 hover:bg-[#a8b200] transition-colors duration-200"
            style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(0.7rem, 1.1vw, 0.82rem)' }}>
            Besplatan upit
          </a>
          <a href="/usluge"
            className="inline-flex items-center text-white/70 uppercase tracking-widest hover:text-[#c5d000] transition-colors duration-200 gap-2"
            style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(0.7rem, 1.1vw, 0.82rem)' }}>
            Naše usluge
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
            </svg>
          </a>
        </div>
      </div>


      {/* Hazard tape bottom */}
      <div ref={tapeRef} className="absolute bottom-0 left-0 right-0 z-10 tape-scroll"
        style={{ height: 'clamp(36px, 5.5vh, 56px)' }} />

      <style>{`
        /* ─── FLASH ─────────────────────────────────────── */
        .hero-flash {
          position: absolute; inset: 0;
          pointer-events: none; z-index: 6; opacity: 0;
        }
        .hero-flash-left {
          background: linear-gradient(
            to right,
            rgba(245,158,11,0.50) 0%,
            rgba(245,158,11,0.18) 30%,
            transparent 65%
          );
          animation: flash-sweep 1.8s linear infinite;
        }
        .hero-flash-right {
          background: linear-gradient(
            to left,
            rgba(245,158,11,0.50) 0%,
            rgba(245,158,11,0.18) 30%,
            transparent 65%
          );
          animation: flash-sweep 1.8s linear infinite;
          animation-delay: -0.9s;
        }
        @keyframes flash-sweep {
          0%   { opacity: 0; }
          7%   { opacity: 1; }
          22%  { opacity: 0; }
          100% { opacity: 0; }
        }

        /* ─── TAPE ──────────────────────────────────────── */
        .tape-scroll {
          background: repeating-linear-gradient(
            -45deg,
            #c5d000  0px,  #c5d000 18px,
            #0d0d0d 18px,  #0d0d0d 36px,
            #ffffff 36px,  #ffffff 54px,
            #0d0d0d 54px,  #0d0d0d 72px
          );
          background-size: 102px 102px;
          background-position: 0 0;
        }
      `}</style>
    </section>
  )
}
