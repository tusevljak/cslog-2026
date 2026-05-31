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

      {/* ── BEACON LEFT ── */}
      <div className="beacon-wrap beacon-wrap-left">
        <div className="beacon-unit">
          <div className="beacon-dome">
            <div className="beacon-rotor" />
            <div className="beacon-glint beacon-glint-1" />
            <div className="beacon-glint beacon-glint-2" />
          </div>
          <div className="beacon-collar" />
          <div className="beacon-housing" />
        </div>
      </div>

      {/* ── BEACON RIGHT ── */}
      <div className="beacon-wrap beacon-wrap-right">
        <div className="beacon-unit">
          <div className="beacon-dome">
            <div className="beacon-rotor beacon-rotor-rev" />
            <div className="beacon-glint beacon-glint-1" />
            <div className="beacon-glint beacon-glint-2" />
          </div>
          <div className="beacon-collar" />
          <div className="beacon-housing" />
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

        /* ─── BEACON LAYOUT ─────────────────────────────── */
        .beacon-wrap {
          position: absolute;
          bottom: clamp(42px, 7.5vh, 70px);
          z-index: 20;
        }
        .beacon-wrap-left  { left:  clamp(1.25rem, 4.5vw, 4.5rem); }
        .beacon-wrap-right { right: clamp(1.25rem, 4.5vw, 4.5rem); }

        .beacon-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* ─── GLASS DOME — taller than wide, like photo ──── */
        .beacon-dome {
          position: relative;
          width:  clamp(30px, 4vw, 50px);
          height: clamp(40px, 5.5vw, 68px); /* taller than wide */
          background: radial-gradient(
            ellipse at 42% 22%,
            rgba(255,252,180,0.98)  0%,
            rgba(253,224,50,0.92)   10%,
            rgba(245,158,11,0.88)   38%,
            rgba(146,64,14,0.92)    68%,
            rgba(60,25,0,0.90)      100%
          );
          /* egg/bullet shape — rounder at top, slightly tapered at base */
          border-radius: 50% 50% 28% 28% / 58% 58% 42% 42%;
          box-shadow:
            0 0  16px  6px rgba(245,158,11,0.75),
            0 0  40px 15px rgba(245,158,11,0.35),
            0 0  80px 30px rgba(245,158,11,0.15),
            inset 0 6px 18px rgba(255,255,255,0.12),
            inset 0 -8px 16px rgba(0,0,0,0.30);
          overflow: hidden;
        }

        /* Internal rotating reflector */
        .beacon-rotor {
          position: absolute; inset: 0;
          background: conic-gradient(
            from 0deg at 50% 55%,
            transparent 0deg,
            transparent 148deg,
            rgba(255,255,255,0.0) 148deg,
            rgba(255,255,255,0.85) 174deg,
            rgba(255,255,255,0.0) 200deg,
            transparent 200deg,
            transparent 360deg
          );
          animation: rotor-spin 1.8s linear infinite;
        }
        .beacon-rotor-rev { animation-direction: reverse; }
        @keyframes rotor-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Two specular glint dots visible through glass, like in photo */
        .beacon-glint {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.95) 0%, transparent 100%);
          pointer-events: none;
        }
        .beacon-glint-1 {
          top: 12%; left: 26%;
          width: 18%; height: 14%;
        }
        .beacon-glint-2 {
          top: 9%; left: 52%;
          width: 13%; height: 10%;
        }

        /* ─── CHROME COLLAR (ring between dome and housing) ─ */
        .beacon-collar {
          width:  clamp(34px, 4.5vw, 56px);
          height: clamp(4px, 0.6vw, 7px);
          background: linear-gradient(to bottom,
            #f3f4f6, #d1d5db 40%, #9ca3af 70%, #6b7280
          );
          border-radius: 2px 2px 0 0;
        }

        /* ─── CHROME HOUSING (body) ─────────────────────── */
        .beacon-housing {
          width:  clamp(40px, 5.2vw, 64px);
          height: clamp(10px, 1.4vw, 18px);
          background: linear-gradient(to bottom,
            #d1d5db 0%, #9ca3af 35%, #6b7280 65%, #4b5563 100%
          );
          border-radius: 2px 2px 4px 4px;
          box-shadow: 0 3px 8px rgba(0,0,0,0.6);
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
