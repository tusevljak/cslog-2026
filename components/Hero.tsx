'use client'

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ height: 'calc(100vh - 136px)', minHeight: '600px' }}>

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/slike/NASLOVNA.jpg')" }}
      />

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(13,13,13,0.45) 0%, rgba(13,13,13,0.65) 50%, rgba(13,13,13,0.88) 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pb-20">
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
      <div className="absolute bottom-[56px] left-12 z-20">
        <div className="beacon-wrap">
          <div className="beacon-dot" />
          <div className="beacon-sweep-left" />
        </div>
      </div>

      {/* Beacon right */}
      <div className="absolute bottom-[56px] right-12 z-20">
        <div className="beacon-wrap">
          <div className="beacon-dot" />
          <div className="beacon-sweep-right" />
        </div>
      </div>

      {/* Hazard tape bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-14 hazard-tape-full z-10" />

      <style>{`
        .hazard-tape-full {
          background: repeating-linear-gradient(
            -45deg,
            #c5d000 0px,   #c5d000 18px,
            #0d0d0d 18px,  #0d0d0d 36px,
            #ffffff 36px,  #ffffff 54px,
            #0d0d0d 54px,  #0d0d0d 72px
          );
        }

        .beacon-wrap {
          position: relative;
          width: 16px;
          height: 16px;
        }

        .beacon-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #f59e0b;
          box-shadow: 0 0 8px 4px rgba(245,158,11,0.6);
          z-index: 2;
        }

        .beacon-sweep-left,
        .beacon-sweep-right {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 180px;
          height: 180px;
          margin-top: -90px;
          margin-left: -90px;
          border-radius: 50%;
          z-index: 1;
        }

        .beacon-sweep-left {
          background: conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            transparent 310deg,
            rgba(245,158,11,0.0) 310deg,
            rgba(245,158,11,0.5) 340deg,
            rgba(245,158,11,0.0) 360deg
          );
          animation: beacon-rotate 5s linear infinite;
        }

        .beacon-sweep-right {
          background: conic-gradient(
            from 180deg at 50% 50%,
            transparent 0deg,
            transparent 310deg,
            rgba(245,158,11,0.0) 310deg,
            rgba(245,158,11,0.5) 340deg,
            rgba(245,158,11,0.0) 360deg
          );
          animation: beacon-rotate-reverse 5s linear infinite;
        }

        @keyframes beacon-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes beacon-rotate-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </section>
  )
}
