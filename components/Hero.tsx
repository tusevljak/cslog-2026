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
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/slike/NASLOVNA.jpg')" }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(13,13,13,0.4) 0%, rgba(13,13,13,0.6) 50%, rgba(13,13,13,0.92) 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 py-32">
        <p
          className="text-[#c5d000] text-sm uppercase tracking-[0.3em] mb-6"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          Cargo Special Logistic · od 2005. godine
        </p>

        <h1
          className="text-white leading-none mb-8"
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(3rem, 9vw, 9rem)',
            letterSpacing: '0.02em',
          }}
        >
          Nema veze<br />
          koliko je<br />
          <span className="text-[#c5d000]">teško i veliko.</span>
        </h1>

        <p
          className="text-white/60 max-w-lg text-base mb-10 leading-relaxed"
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          Prevoz i pratnja specijalnih i vangabaritnih tereta — od Beograda do Bliskog istoka.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="/kontakt"
            className="inline-flex items-center bg-[#c5d000] text-[#0d0d0d] font-semibold uppercase tracking-widest text-sm px-8 py-4 hover:bg-[#a8b200] transition-colors duration-200"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Besplatan upit
          </a>
          <a
            href="/usluge"
            className="inline-flex items-center text-white/70 uppercase tracking-widest text-sm hover:text-[#c5d000] transition-colors duration-200 gap-2"
            style={{ fontFamily: 'var(--font-inter)' }}
          >
            Naše usluge
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12,5 19,12 12,19"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Beacon left */}
      <div className="absolute bottom-[56px] left-16 z-20 beacon-container">
        <div className="beacon-housing">
          <div className="beacon-lens" />
          <div className="beacon-rotor" />
        </div>
        <div className="beacon-cast-left" />
      </div>

      {/* Beacon right */}
      <div className="absolute bottom-[56px] right-16 z-20 beacon-container">
        <div className="beacon-housing">
          <div className="beacon-lens" />
          <div className="beacon-rotor beacon-rotor-reverse" />
        </div>
        <div className="beacon-cast-right" />
      </div>

      {/* Hazard tape bottom — scroll-driven */}
      <div ref={tapeRef} className="absolute bottom-0 left-0 right-0 h-14 z-10 tape-scroll" />

      <style>{`
        .beacon-container {
          position: absolute;
        }

        /* Physical beacon housing — amber dome */
        .beacon-housing {
          position: relative;
          width: 36px;
          height: 22px;
          background: radial-gradient(ellipse at 50% 40%, #fcd34d, #f59e0b 50%, #92400e);
          border-radius: 50% 50% 40% 40%;
          box-shadow:
            0 0 12px 6px rgba(245,158,11,0.5),
            0 0 30px 10px rgba(245,158,11,0.2);
          overflow: hidden;
        }

        /* Rotating reflector inside the dome */
        .beacon-rotor {
          position: absolute;
          inset: 0;
          background: conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            transparent 140deg,
            rgba(255,255,255,0.0) 140deg,
            rgba(255,255,255,0.7) 170deg,
            rgba(255,255,255,0.0) 200deg,
            transparent 200deg,
            transparent 360deg
          );
          animation: rotor-spin 1.8s linear infinite;
        }

        .beacon-rotor-reverse {
          animation-direction: reverse;
        }

        @keyframes rotor-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Light cast on the scene from the beacon */
        .beacon-cast-left {
          position: absolute;
          bottom: 11px;
          left: 18px;
          width: 220px;
          height: 220px;
          pointer-events: none;
          background: conic-gradient(
            from -10deg at 0% 50%,
            transparent 0deg,
            transparent 320deg,
            rgba(245,158,11,0.0) 320deg,
            rgba(245,158,11,0.18) 345deg,
            rgba(245,158,11,0.0) 360deg
          );
          animation: cast-spin 1.8s linear infinite;
          transform-origin: 0% 50%;
        }

        .beacon-cast-right {
          position: absolute;
          bottom: 11px;
          right: 18px;
          width: 220px;
          height: 220px;
          pointer-events: none;
          background: conic-gradient(
            from 170deg at 100% 50%,
            transparent 0deg,
            transparent 320deg,
            rgba(245,158,11,0.0) 320deg,
            rgba(245,158,11,0.18) 345deg,
            rgba(245,158,11,0.0) 360deg
          );
          animation: cast-spin-reverse 1.8s linear infinite;
          transform-origin: 100% 50%;
        }

        @keyframes cast-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes cast-spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        .tape-scroll {
          background: repeating-linear-gradient(
            -45deg,
            #c5d000 0px,   #c5d000 18px,
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
