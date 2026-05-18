'use client'

import { useState } from 'react'

export default function QuoteForm() {
  const [contact, setContact] = useState<'email' | 'phone'>('email')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/slike/NASLOVNA.jpg')" }} />
      <div className="absolute inset-0" style={{ background: 'rgba(13,13,13,0.85)' }} />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6">
        <h2
          className="text-center text-white mb-2"
          style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '0.05em' }}
        >
          Popunite zahtev za besplatnu procenu
        </h2>
        <p className="text-center text-white/50 mb-12 text-sm" style={{ fontFamily: 'var(--font-inter)' }}>
          Kontaktiraćemo vas u najkraćem mogućem roku.
        </p>

        {submitted ? (
          <div className="max-w-lg mx-auto text-center py-12">
            <div className="w-16 h-16 rounded-full bg-[#c5d000] flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0d0d0d" strokeWidth="2.5">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
            </div>
            <h3 className="text-white text-xl mb-2" style={{ fontFamily: 'var(--font-bebas)', letterSpacing: '0.05em' }}>Zahtev je primljen</h3>
            <p className="text-white/60 text-sm" style={{ fontFamily: 'var(--font-inter)' }}>Javićemo vam se uskoro.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-white/60 text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)' }}>
                  Iz grada / Mesto utovara
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="Grad" required className="form-input" />
                  <select className="form-input">
                    <option value="">Država</option>
                    <option>Srbija</option><option>Hrvatska</option><option>Bosna i Hercegovina</option>
                    <option>Slovenija</option><option>Austrija</option><option>Nemačka</option>
                    <option>Italija</option><option>Mađarska</option><option>Rumunija</option>
                    <option>Bugarska</option><option>Grčka</option><option>Turska</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-white/60 text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)' }}>
                  U grad / Mesto istovara
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="Grad" required className="form-input" />
                  <select className="form-input">
                    <option value="">Država</option>
                    <option>Srbija</option><option>Hrvatska</option><option>Bosna i Hercegovina</option>
                    <option>Slovenija</option><option>Austrija</option><option>Nemačka</option>
                    <option>Italija</option><option>Mađarska</option><option>Rumunija</option>
                    <option>Bugarska</option><option>Grčka</option><option>Turska</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-white/60 text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)' }}>
                Opis tereta
              </label>
              <textarea placeholder="Dimenzije, težina, tip tereta..." rows={3} className="form-input resize-none" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white/60 text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--font-inter)' }}>
                Preferirani kontakt
              </label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setContact('email')}
                  className={`px-5 py-2 text-sm uppercase tracking-widest border transition-colors ${contact === 'email' ? 'bg-[#c5d000] text-[#0d0d0d] border-[#c5d000]' : 'text-white/60 border-white/20 hover:border-white/40'}`}
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setContact('phone')}
                  className={`px-5 py-2 text-sm uppercase tracking-widest border transition-colors ${contact === 'phone' ? 'bg-[#c5d000] text-[#0d0d0d] border-[#c5d000]' : 'text-white/60 border-white/20 hover:border-white/40'}`}
                  style={{ fontFamily: 'var(--font-inter)' }}
                >
                  Telefon
                </button>
              </div>
            </div>

            {contact === 'email' ? (
              <input type="email" placeholder="Vaša email adresa" required className="form-input" />
            ) : (
              <input type="tel" placeholder="Vaš broj telefona" required className="form-input" />
            )}

            <button
              type="submit"
              className="mt-2 bg-[#c5d000] text-[#0d0d0d] font-semibold uppercase tracking-widest text-sm py-4 hover:bg-[#a8b200] transition-colors duration-200"
              style={{ fontFamily: 'var(--font-inter)' }}
            >
              Pošaljite zahtev
            </button>
          </form>
        )}
      </div>

      <style>{`
        .form-input {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.15);
          color: white;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          font-family: var(--font-inter);
          width: 100%;
          outline: none;
          transition: border-color 0.2s;
        }
        .form-input:focus {
          border-color: #c5d000;
        }
        .form-input::placeholder {
          color: rgba(255,255,255,0.35);
        }
        .form-input option {
          background: #1a1a1a;
          color: white;
        }
      `}</style>
    </section>
  )
}
