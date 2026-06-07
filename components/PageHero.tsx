import React from 'react'

type Props = {
  eyebrow: string
  title: React.ReactNode
  subtitle?: string
  bgImage?: string
  height?: string  // CSS height/min-height value, default '50vh'
  tape?: boolean   // default true
  children?: React.ReactNode  // optional extra content (e.g. quote author block)
}

const HAZARD_TAPE = 'repeating-linear-gradient(-45deg, #c5d000 0px, #c5d000 14px, #0d0d0d 14px, #0d0d0d 28px, #ffffff 28px, #ffffff 42px, #0d0d0d 42px, #0d0d0d 56px)'

export default function PageHero({ eyebrow, title, subtitle, bgImage, height = '50vh', tape = true, children }: Props) {
  return (
    <section className="relative flex items-center overflow-hidden"
      style={{ background: '#0d0d0d', minHeight: height }}>

      {bgImage && (
        <div className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('${bgImage}')` }} />
      )}

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-28 w-full">
        <p className="text-[#c5d000] text-sm uppercase tracking-[0.3em] mb-6"
          style={{ fontFamily: 'var(--font-inter)' }}>
          {eyebrow}
        </p>
        <h1 className="text-white leading-tight mb-6 max-w-3xl"
          style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', letterSpacing: '0.02em' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/60 text-base max-w-xl leading-relaxed"
            style={{ fontFamily: 'var(--font-inter)' }}>
            {subtitle}
          </p>
        )}
        {children}
      </div>

      {tape && (
        <div className="absolute bottom-0 left-0 right-0 h-10"
          style={{ background: HAZARD_TAPE }} />
      )}
    </section>
  )
}
