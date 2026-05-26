'use client'

import { useState, useEffect, useCallback } from 'react'

type GalleryImage = {
  id: number
  url: string
  caption: string
}

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const close = useCallback(() => setLightbox(null), [])

  const prev = useCallback(() =>
    setLightbox(i => (i === null ? null : (i - 1 + images.length) % images.length)),
    [images.length]
  )

  const next = useCallback(() =>
    setLightbox(i => (i === null ? null : (i + 1) % images.length)),
    [images.length]
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

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  if (images.length === 0) {
    return (
      <p style={{ fontFamily: 'var(--font-inter)', color: 'var(--text-muted)', textAlign: 'center' }}
        className="py-20">
        Galerija se puni — uskoro.
      </p>
    )
  }

  const current = lightbox !== null ? images[lightbox] : null

  return (
    <>
      {/* Masonry grid */}
      <div style={{ columns: '3 280px', gap: '0.75rem' }}>
        {images.map((img, idx) => (
          <div
            key={img.id}
            onClick={() => setLightbox(idx)}
            style={{ breakInside: 'avoid', marginBottom: '0.75rem', overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}
            className="group"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.url}
              alt={img.caption || 'CSLOG transport'}
              style={{ width: '100%', display: 'block', transition: 'transform 0.4s ease' }}
              className="group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0)',
              transition: 'background 0.3s',
              display: 'flex', alignItems: 'flex-end',
            }}
              className="group-hover:[background:rgba(0,0,0,0.35)]"
            >
              {img.caption && (
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.75rem',
                  color: '#fff',
                  padding: '0.5rem 0.75rem',
                  margin: 0,
                  opacity: 0,
                  transition: 'opacity 0.3s',
                }}
                  className="group-hover:opacity-100"
                >
                  {img.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {current && (
        <div
          onClick={close}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.93)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          {/* Prev */}
          <button
            onClick={e => { e.stopPropagation(); prev() }}
            style={{
              position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', width: 48, height: 48, borderRadius: 2,
              fontSize: '1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 10,
            }}
          >
            ‹
          </button>

          {/* Image */}
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: 'min(92vw, 1200px)', maxHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.url}
              alt={current.caption || 'CSLOG'}
              style={{ maxWidth: '100%', maxHeight: 'calc(90vh - 3rem)', objectFit: 'contain', display: 'block' }}
            />
            {current.caption && (
              <p style={{ fontFamily: 'var(--font-inter)', color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', margin: 0, textAlign: 'center' }}>
                {current.caption}
              </p>
            )}
            <p style={{ fontFamily: 'var(--font-inter)', color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem', margin: 0 }}>
              {(lightbox ?? 0) + 1} / {images.length}
            </p>
          </div>

          {/* Next */}
          <button
            onClick={e => { e.stopPropagation(); next() }}
            style={{
              position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', width: 48, height: 48, borderRadius: 2,
              fontSize: '1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              zIndex: 10,
            }}
          >
            ›
          </button>

          {/* Close */}
          <button
            onClick={close}
            style={{
              position: 'absolute', top: 16, right: 16,
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff', width: 40, height: 40, borderRadius: 2,
              fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>
      )}
    </>
  )
}
