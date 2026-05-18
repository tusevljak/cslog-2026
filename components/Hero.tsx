'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: 'calc(100vh - 80px)', minHeight: '600px' }}>

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/slike/NASLOVNA.jpg')" }}
      />

      {/* Dark overlay — heavier at bottom, lighter at top */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.75) 60%, rgba(13,13,13,0.95) 100%)' }}
      />

      {/* Beacon sweep */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="beacon-sweep" />
      </div>

      {/* Hazard tape top */}
      <div className="absolute top-0 left-0 right-0 h-3 hazard-tape opacity-90" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">

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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-40">
        <div className="w-px h-12 bg-white animate-pulse" />
      </div>

      <style>{`
        .beacon-sweep {
          position: absolute;
          width: 250%;
          height: 250%;
          top: -75%;
          left: -75%;
          background: conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            transparent 330deg,
            rgba(245, 158, 11, 0.0) 330deg,
            rgba(245, 158, 11, 0.12) 348deg,
            rgba(245, 158, 11, 0.0) 360deg
          );
          animation: beacon-rotate 8s linear infinite;
          transform-origin: center center;
        }

        @keyframes beacon-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
