'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const tapeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let pos = 0
    let lastY = window.scrollY

    function onScroll() {
      const currentY = window.scrollY
      const delta = currentY - lastY
      pos += delta * 0.4
      lastY = currentY
      if (tapeRef.current) {
        tapeRef.current.style.backgroundPosition = `${pos}px 0`
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '90vh' }}>

      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/slike/NASLOVNA.jpg')" }} />

      {/* Dark overlay */}
      <div className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(13,13,13,0.4) 0%, rgba(13,13,13,0.6) 50%, rgba(13,13,13,0.92) 100%)' }} />

      {/* ── SCREEN FLASH OVERLAYS — amber sweep left → right, alternating ── */}
      <div className="hero-flash hero-flash-left" />
      <div className="hero-flash hero-flash-right" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 py-32">
        <p className="text-[#c5d000] text-sm uppercase tracking-[0.3em] mb-6"
          style={{ fontFamily: 'var(--font-inter)' }}>
          Cargo Special Logistic · od 2005. godine
        </p>

        <h1 className="text-white leading-none mb-8"
          style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(3rem, 9vw, 9rem)', letterSpacing: '0.02em' }}>
          Nema veze<br />
          koliko je<br />
          <span className="text-[#c5d000]">teško i veliko.</span>
        </h1>

        <p className="text-white/60 max-w-lg text-base mb-10 leading-relaxed"
          style={{ fontFamily: 'var(--font-inter)' }}>
          Prevoz i pratnja specijalnih i vangabaritnih tereta — od Beograda do Bliskog istoka.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a href="/kontakt"
            className="inline-flex items-center bg-[#c5d000] text-[#0d0d0d] font-semibold uppercase tracking-widest text-sm px-8 py-4 hover:bg-[#a8b200] transition-colors duration-200"
            style={{ fontFamily: 'var(--font-inter)' }}>
            Besplatan upit
          </a>
          <a href="/usluge"
            className="inline-flex items-center text-white/70 uppercase tracking-widest text-sm hover:text-[#c5d000] transition-colors duration-200 gap-2"
            style={{ fontFamily: 'var(--font-inter)' }}>
            Naše usluge
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12,5 19,12 12,19"/>
            </svg>
          </a>
        </div>
      </div>

      {/* ── BEACON LEFT ── */}
      <div className="beacon-wrap beacon-wrap-left">
        <div className="beacon-cast beacon-cast-left" />
        <div className="beacon-unit">
          <div className="beacon-dome">
            <div className="beacon-rotor" />
            <div className="beacon-shine" />
          </div>
          <div className="beacon-base" />
        </div>
      </div>

      {/* ── BEACON RIGHT ── */}
      <div className="beacon-wrap beacon-wrap-right">
        <div className="beacon-cast beacon-cast-right" />
        <div className="beacon-unit">
          <div className="beacon-dome">
            <div className="beacon-rotor beacon-rotor-rev" />
            <div className="beacon-shine" />
          </div>
          <div className="beacon-base" />
        </div>
      </div>

      {/* Hazard tape — scroll-driven */}
      <div ref={tapeRef} className="absolute bottom-0 left-0 right-0 h-14 z-10 tape-scroll" />

      <style>{`
        /* ─── SCREEN FLASH ─────────────────────────────── */
        .hero-flash {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 6;
          opacity: 0;
        }
        .hero-flash-left {
          background: linear-gradient(
            to right,
            rgba(245,158,11,0.22) 0%,
            rgba(245,158,11,0.08) 25%,
            transparent 55%
          );
          animation: flash-sweep 1.8s linear infinite;
        }
        .hero-flash-right {
          background: linear-gradient(
            to left,
            rgba(245,158,11,0.22) 0%,
            rgba(245,158,11,0.08) 25%,
            transparent 55%
          );
          animation: flash-sweep 1.8s linear infinite;
          animation-delay: -0.9s;
        }
        @keyframes flash-sweep {
          0%          { opacity: 0; }
          6%          { opacity: 1; }
          20%         { opacity: 0; }
          100%        { opacity: 0; }
        }

        /* ─── BEACON POSITIONING ───────────────────────── */
        .beacon-wrap {
          position: absolute;
          bottom: 70px;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .beacon-wrap-left  { left:  clamp(1.5rem, 5vw, 4rem); }
        .beacon-wrap-right { right: clamp(1.5rem, 5vw, 4rem); }

        /* ─── BEACON STRUCTURE ─────────────────────────── */
        .beacon-unit {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        /* Dome — amber hemisphere, real beacon proportions */
        .beacon-dome {
          position: relative;
          width:  clamp(38px, 5vw, 58px);
          height: clamp(26px, 3.5vw, 42px);
          background: radial-gradient(
            ellipse at 50% 90%,
            #78350f  0%,
            #b45309 22%,
            #f59e0b 50%,
            #fde68a 72%,
            #fef9c3 88%
          );
          border-radius: 50% 50% 35% 35%;
          box-shadow:
            0 0  18px  7px rgba(245,158,11,0.70),
            0 0  45px 18px rgba(245,158,11,0.30),
            0 0  80px 30px rgba(245,158,11,0.12),
            inset 0 -6px 10px rgba(0,0,0,0.25);
          overflow: hidden;
        }

        /* Specular highlight — looks like real polycarbonate lens */
        .beacon-shine {
          position: absolute;
          top: 14%;
          left: 14%;
          width: 32%;
          height: 28%;
          background: radial-gradient(ellipse, rgba(255,255,255,0.75) 0%, transparent 100%);
          border-radius: 50%;
          transform: rotate(-20deg);
          pointer-events: none;
        }

        /* Rotating reflector beam inside dome */
        .beacon-rotor {
          position: absolute;
          inset: 0;
          background: conic-gradient(
            from 0deg at 50% 60%,
            transparent    0deg,
            transparent  145deg,
            rgba(255,255,255,0.0) 145deg,
            rgba(255,255,255,0.8) 172deg,
            rgba(255,255,255,0.0) 200deg,
            transparent  200deg,
            transparent  360deg
          );
          animation: rotor-spin 1.8s linear infinite;
        }
        .beacon-rotor-rev {
          animation-direction: reverse;
        }
        @keyframes rotor-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Base / nožica */
        .beacon-base {
          width: clamp(14px, 2vw, 20px);
          height: clamp(6px, 1vw, 10px);
          background: linear-gradient(to bottom, #374151, #111827);
          border-radius: 0 0 4px 4px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.6);
        }

        /* ─── LIGHT CAST ON SCENE ──────────────────────── */
        .beacon-cast {
          position: absolute;
          bottom: 100%;
          width: 280px;
          height: 280px;
          pointer-events: none;
          z-index: 1;
        }
        .beacon-cast-left {
          left: 0;
          background: conic-gradient(
            from -8deg at 5% 55%,
            transparent   0deg,
            transparent 310deg,
            rgba(245,158,11,0.00) 310deg,
            rgba(245,158,11,0.20) 340deg,
            rgba(245,158,11,0.00) 360deg
          );
          animation: cast-left 1.8s linear infinite;
          transform-origin: 5% 55%;
        }
        .beacon-cast-right {
          right: 0;
          background: conic-gradient(
            from 172deg at 95% 55%,
            transparent   0deg,
            transparent 310deg,
            rgba(245,158,11,0.00) 310deg,
            rgba(245,158,11,0.20) 340deg,
            rgba(245,158,11,0.00) 360deg
          );
          animation: cast-right 1.8s linear infinite;
          transform-origin: 95% 55%;
        }
        @keyframes cast-left  { from { transform: rotate(0deg); } to { transform: rotate( 360deg); } }
        @keyframes cast-right { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }

        /* ─── TAPE ─────────────────────────────────────── */
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
