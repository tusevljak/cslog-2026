const TAPE = 'repeating-linear-gradient(-45deg, #0d0d0d 0px, #0d0d0d 14px, #c5d000 14px, #c5d000 28px, #ffffff 28px, #ffffff 42px, #c5d000 42px, #c5d000 56px)'

const copy = {
  sr: {
    quote: 'Od momenta utovara, prevoz više nije briga klijenta',
    role: 'Generalni direktor',
  },
  en: {
    quote: 'From the moment of loading, transport is no longer the client’s concern',
    role: 'CEO',
  },
}

export default function QuoteBanner({ lang = 'sr' }: { lang?: 'sr' | 'en' }) {
  const tx = copy[lang]
  return (
    <section style={{ background: '#c5d000' }}>
      <div className="h-10" style={{ background: TAPE }} />
      <div className="max-w-[1280px] mx-auto px-6 py-16 flex flex-col items-center text-center gap-6">
        <blockquote style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '0.02em', color: '#0d0d0d' }}>
          &ldquo;{tx.quote}&rdquo;
        </blockquote>
        <div>
          <p className="font-semibold text-[#0d0d0d] text-lg italic" style={{ fontFamily: 'Georgia, serif' }}>Boban Bićanin</p>
          <p className="text-[#0d0d0d]/60 text-xs uppercase tracking-widest mt-1" style={{ fontFamily: 'var(--font-inter)' }}>{tx.role}</p>
        </div>
      </div>
      <div className="h-10" style={{ background: TAPE }} />
    </section>
  )
}
