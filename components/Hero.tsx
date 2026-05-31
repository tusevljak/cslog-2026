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
            <div className="beacon-lamp" />
            <div className="beacon-refl" />
          </div>
          <div className="beacon-rim" />
          <div className="beacon-body"><div className="beacon-body-line" /></div>
          <div className="beacon-foot" />
        </div>
      </div>

      {/* ── BEACON RIGHT ── */}
      <div className="beacon-wrap beacon-wrap-right">
        <div className="beacon-unit">
          <div className="beacon-dome">
            <div className="beacon-rotor beacon-rotor-rev" />
            <div className="beacon-lamp" />
            <div className="beacon-refl" />
          </div>
          <div className="beacon-rim" />
          <div className="beacon-body"><div className="beacon-body-line" /></div>
          <div className="beacon-foot" />
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
          filter: drop-shadow(0 0 18px rgba(245,158,11,0.7))
                  drop-shadow(0 0 40px rgba(245,158,11,0.35));
        }

        /* ─── GLASS DOME — semi-transparent, lamp visible inside ─ */
        .beacon-dome {
          position: relative;
          width:  clamp(42px, 5.2vw, 62px);
          height: clamp(54px, 6.8vw, 80px);
          border-radius: 50% 50% 30% 30% / 58% 58% 42% 42%;

          /* KEY: semi-transparent amber — looks like tinted glass */
          background: radial-gradient(ellipse at 50% 58%,
            rgba(255,230,80,0.82)  0%,
            rgba(245,158,11,0.62) 38%,
            rgba(160,75,0,0.45)   68%,
            rgba(80,30,0,0.28)    88%,
            rgba(30,10,0,0.15)   100%
          );
          border: 1.5px solid rgba(255,195,40,0.5);
          box-shadow:
            inset 0 -18px 28px rgba(0,0,0,0.5),
            inset 0  4px 14px rgba(255,230,100,0.18);
          overflow: hidden;
        }

        /* Rotating beam — mix-blend-mode:screen blends into amber naturally */
        .beacon-rotor {
          position: absolute; inset: 0;
          background: conic-gradient(
            from 0deg at 50% 58%,
            transparent  0deg,
            transparent  148deg,
            rgba(255,255,210,0.0)  148deg,
            rgba(255,255,210,0.95) 173deg,
            rgba(255,255,210,0.0)  198deg,
            transparent  198deg,
            transparent  360deg
          );
          animation: rotor-spin 1.8s linear infinite;
          mix-blend-mode: screen;
        }
        .beacon-rotor-rev { animation-direction: reverse; }
        @keyframes rotor-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Visible lamp/bulb — bright point seen through the glass */
        .beacon-lamp {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width:  clamp(8px, 1.1vw, 13px);
          height: clamp(8px, 1.1vw, 13px);
          border-radius: 50%;
          background: radial-gradient(circle,
            #ffffff 0%, #fffde7 35%, rgba(253,224,50,0.6) 65%, transparent 100%
          );
          box-shadow:
            0 0  6px 3px rgba(255,255,200,1),
            0 0 16px 7px rgba(245,158,11,0.9);
        }

        /* Glass reflection highlight — top-left, like polycarbonate lens */
        .beacon-refl {
          position: absolute;
          top: 7%; left: 9%;
          width: 28%; height: 18%;
          background: radial-gradient(ellipse,
            rgba(255,255,255,0.55) 0%, transparent 100%
          );
          border-radius: 50%;
          transform: rotate(-22deg);
          pointer-events: none;
        }

        /* ─── CHROME RIM — metallic collar, multi-stop to fake reflection ─ */
        .beacon-rim {
          width:  clamp(48px, 6vw, 72px);
          height: clamp(5px, 0.65vw, 8px);
          background: linear-gradient(90deg,
            #555f6b  0%, #c8cdd3 12%, #f0f1f2 26%,
            #a0a8b0 42%, #e2e4e6 55%, #c0c6cc 68%,
            #f0f1f2 80%, #8a9099 92%, #555f6b 100%
          );
          border-radius: 1px;
        }

        /* ─── BODY — dark metal housing ──────────────────── */
        .beacon-body {
          position: relative;
          width:  clamp(44px, 5.5vw, 66px);
          height: clamp(14px, 1.8vw, 22px);
          background: linear-gradient(to bottom,
            #3a424e 0%, #252d38 45%, #161d27 100%
          );
          border-radius: 2px 2px 5px 5px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.75);
          overflow: hidden;
        }
        /* Panel detail line */
        .beacon-body-line {
          position: absolute;
          top: 38%;
          left: 12%; right: 12%;
          height: 1px;
          background: rgba(255,255,255,0.07);
        }

        /* ─── FOOT — wide mounting base ──────────────────── */
        .beacon-foot {
          width:  clamp(54px, 6.8vw, 82px);
          height: clamp(6px, 0.8vw, 10px);
          background: linear-gradient(to bottom, #424d5a, #2a333e);
          border-radius: 2px;
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
