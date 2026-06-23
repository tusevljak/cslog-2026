'use client'

import { useState, useEffect, useCallback } from 'react'

type Trailer = {
  file: string
  name: string
  type: string
}

export default function TrailersGrid({ trailers }: { trailers: Trailer[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const close = useCallback(() => setLightbox(null), [])
  const prev = useCallback(() =>
    setLightbox(i => (i === null ? null : (i - 1 + trailers.length) % trailers.length)),
    [trailers.length]
  )
  const next = useCallback(() =>
    setLightbox(i => (i === null ? null : (i + 1) % trailers.length)),
    [trailers.length]
  )

  useEffect(() => {
    if (lightbox === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, close, prev, next])

  useEffect(() => {
    if (lightbox !== null) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const current = lightbox !== null ? trailers[lightbox] : null

  return (
    <>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'var(--border)' }}>
        {trailers.map((t, idx) => (
          <button key={t.file}
            onClick={() => setLightbox(idx)}
            style={{ background: 'var(--bg)', display: 'flex', flexDirection: 'column', textAlign: 'left', border: 'none', padding: 0, cursor: 'zoom-in', font: 'inherit', color: 'inherit' }}
            className="group">
            <div style={{ overflow: 'hidden', flexShrink: 0, background: '#ffffff' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/prikolice/${t.file}`}
                alt={t.name}
                style={{ width: '100%', height: 240, objectFit: 'contain', display: 'block', padding: '0.5rem', transition: 'transform 0.4s ease' }}
                className="group-hover:scale-[1.03]"
              />
            </div>
            <div style={{ padding: '1.25rem 1.5rem', borderTop: '2px solid #c5d000', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div>
                <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.25rem', letterSpacing: '0.04em', color: 'var(--text)', lineHeight: 1.1 }}>{t.name}</p>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.14em', color: '#c5d000', marginTop: '0.2rem' }}>{t.type}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c5d000" strokeWidth="2.5"
                style={{ flexShrink: 0, opacity: 0.6 }} className="group-hover:opacity-100">
                <path d="M15 3h6v6"/><path d="m10 14 11-11"/><path d="M21 14v7H3V3h7"/>
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* ── LIGHTBOX ── */}
      {current && (
        <div onClick={close}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(13,13,13,0.96)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 'clamp(1rem, 3vw, 3rem)',
          }}>

          {/* Prev */}
          <button onClick={e => { e.stopPropagation(); prev() }}
            style={{
              position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', width: 52, height: 52, borderRadius: 2,
              fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 10,
            }}>
            ‹
          </button>

          {/* Content */}
          <div onClick={e => e.stopPropagation()}
            style={{
              maxWidth: 'min(95vw, 1400px)', maxHeight: '90vh',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
            }}>

            {/* Image — white bg so technical drawing is readable */}
            <div style={{ background: '#ffffff', padding: 'clamp(1rem, 3vw, 2.5rem)', width: '100%' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/prikolice/${current.file}`}
                alt={current.name}
                style={{ width: '100%', maxHeight: 'calc(85vh - 8rem)', objectFit: 'contain', display: 'block', margin: '0 auto' }}
              />
            </div>

            {/* Caption */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '1.5rem', letterSpacing: '0.05em', color: '#fff', margin: 0 }}>
                {current.name}
              </p>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#c5d000', margin: 0 }}>
                {current.type}
              </p>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', margin: '0.5rem 0 0' }}>
                {(lightbox ?? 0) + 1} / {trailers.length}
              </p>
            </div>
          </div>

          {/* Next */}
          <button onClick={e => { e.stopPropagation(); next() }}
            style={{
              position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', width: 52, height: 52, borderRadius: 2,
              fontSize: '1.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 10,
            }}>
            ›
          </button>

          {/* Close */}
          <button onClick={close}
            style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', width: 44, height: 44, borderRadius: 2,
              fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            ✕
          </button>
        </div>
      )}
    </>
  )
}
