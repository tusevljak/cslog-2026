export default function Stats() {
  const items = [
    {
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
        </svg>
      ),
      value: 'Milioni',
      label: 'pređenih kilometara',
    },
    {
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
      value: 'EURO 6',
      label: 'kamioni',
    },
    {
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/>
        </svg>
      ),
      value: 'COD 95',
      label: 'vozači sa licencom',
    },
    {
      icon: (
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
        </svg>
      ),
      value: '20+',
      label: 'godina iskustva',
    },
  ]

  return (
    <section style={{ background: '#c5d000' }} className="py-16">
      <div className="max-w-[1280px] mx-auto px-6">
        <h2
          className="text-center text-[#0d0d0d] mb-2"
          style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', letterSpacing: '0.05em' }}
        >
          Cargo Special Logistic stiže dokle kopno seže
        </h2>
        <p className="text-center text-[#0d0d0d]/70 mb-12 text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
          S iskustvom od 20 godina i milionima pređenih kilometara, Cargo Special Logistic vrši transport vangabaritnog tereta odavde pa do Bliskog Istoka.
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center gap-3">
              <div className="text-[#0d0d0d]/80">{item.icon}</div>
              <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '2rem', letterSpacing: '0.05em' }} className="text-[#0d0d0d] leading-none">
                {item.value}
              </div>
              <div style={{ fontFamily: 'var(--font-inter)' }} className="text-[#0d0d0d]/80 text-sm uppercase tracking-widest">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
