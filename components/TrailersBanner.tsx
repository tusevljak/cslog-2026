import Link from 'next/link'

export default function TrailersBanner() {
  return (
    <>
      {/* Hazard tape divider */}
      <div className="h-14" style={{
        background: 'repeating-linear-gradient(-45deg, #c5d000 0px, #c5d000 18px, #0d0d0d 18px, #0d0d0d 36px, #ffffff 36px, #ffffff 54px, #0d0d0d 54px, #0d0d0d 72px)'
      }} />

      <section className="py-20" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="max-w-2xl">
            <h2
              className="mb-6"
              style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '0.05em', color: '#c5d000' }}
            >
              Svi tipovi prikolica za bilo koji teret, bilo koju rutu
            </h2>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-base leading-relaxed mb-4">
              Nudimo vam najkraće rokove vangabaritnog transporta u Srbiji i svetu. U stanju smo da prevezemo gotovo bilo kakav specijalni ili vangabaritni teret, ma koliko god da je težak, visok, širok ili dugačak.
            </p>
            <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)' }} className="text-base leading-relaxed mb-10">
              Posebnu pažnju poklanjamo bezbednosti i papirologiji. Pribavljamo vangabaritne dozvole i odobrenja državnih organa u Srbiji i svim državama na predviđenoj ruti do cilja.
            </p>
            <Link
              href="/prikolice"
              className="inline-flex items-center gap-3 border border-[#c5d000] text-[#c5d000] uppercase tracking-widest text-sm px-6 py-3 hover:bg-[#c5d000] hover:text-[#0d0d0d] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Sve naše prikolice
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
