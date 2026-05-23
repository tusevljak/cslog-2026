'use client'

import { useState, useRef, useCallback } from 'react'

const ACCENT = '#c5d000'
const DARK = '#0d0d0d'

type Post = {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  cover_image: string
  status: 'draft' | 'published'
  published_at: string | null
  meta_title: string
  meta_description: string
  created_at: string
}

type GalleryImage = {
  id: number
  url: string
  caption: string
  sort_order: number
}

const emptyPost = (): Partial<Post> => ({
  title: '', slug: '', excerpt: '', content: '',
  cover_image: '', status: 'draft', published_at: '',
  meta_title: '', meta_description: '',
})

function toSlug(title: string) {
  return title.toLowerCase()
    .replace(/[čć]/g, 'c').replace(/š/g, 's').replace(/ž/g, 'z').replace(/đ/g, 'd')
    .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '')
}

function formatDate(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('sr-RS', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function mdInsert(ref: React.RefObject<HTMLTextAreaElement | null>, before: string, after = '', setValue: (v: string) => void) {
  const ta = ref.current
  if (!ta) return
  const start = ta.selectionStart
  const end = ta.selectionEnd
  const sel = ta.value.substring(start, end)
  const next = ta.value.substring(0, start) + before + sel + after + ta.value.substring(end)
  setValue(next)
  setTimeout(() => {
    ta.focus()
    ta.selectionStart = start + before.length + sel.length
    ta.selectionEnd = start + before.length + sel.length
  }, 0)
}

const inp = (extra?: React.CSSProperties): React.CSSProperties => ({
  background: '#111', border: '1px solid #222', color: '#ccc',
  padding: '0.6rem 0.9rem', fontFamily: 'var(--font-inter)',
  fontSize: '0.875rem', outline: 'none', width: '100%', boxSizing: 'border-box',
  ...extra,
})

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState('')
  const [tab, setTab] = useState<'posts' | 'gallery'>('posts')
  const [seeding, setSeeding] = useState(false)
  const [seedMsg, setSeedMsg] = useState('')

  // Posts state
  const [posts, setPosts] = useState<Post[]>([])
  const [view, setView] = useState<'list' | 'editor'>('list')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<Partial<Post>>(emptyPost())
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [msg, setMsg] = useState('')
  const contentRef = useRef<HTMLTextAreaElement>(null)

  // Gallery state
  const [images, setImages] = useState<GalleryImage[]>([])
  const [imgUrl, setImgUrl] = useState('')
  const [imgCaption, setImgCaption] = useState('')
  const [imgSaving, setImgSaving] = useState(false)
  const [imgMsg, setImgMsg] = useState('')

  const headers = useCallback(() => ({
    'Content-Type': 'application/json',
    'x-admin-password': password,
  }), [password])

  async function login(e: React.FormEvent) {
    e.preventDefault()
    setAuthError('')
    const res = await fetch('/api/posts', { headers: { 'x-admin-password': password } })
    if (res.ok) {
      const data = await res.json()
      setPosts(data)
      const gRes = await fetch('/api/gallery', { headers: { 'x-admin-password': password } })
      if (gRes.ok) setImages(await gRes.json())
      setAuthed(true)
    } else {
      setAuthError('Pogrešna lozinka.')
    }
  }

  async function fetchPosts() {
    const res = await fetch('/api/posts', { headers: headers() })
    if (res.ok) setPosts(await res.json())
  }

  async function fetchImages() {
    const res = await fetch('/api/gallery', { headers: headers() })
    if (res.ok) setImages(await res.json())
  }

  function openNew() {
    setEditingId(null)
    setForm(emptyPost())
    setMsg('')
    setView('editor')
  }

  function openEdit(post: Post) {
    setEditingId(post.id)
    setForm({
      title: post.title, slug: post.slug,
      excerpt: post.excerpt || '', content: post.content || '',
      cover_image: post.cover_image || '', status: post.status,
      published_at: post.published_at ? post.published_at.slice(0, 10) : '',
      meta_title: post.meta_title || '', meta_description: post.meta_description || '',
    })
    setMsg('')
    setView('editor')
  }

  function field(key: keyof Post) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value = e.target.value
      setForm(f => {
        const next = { ...f, [key]: value }
        if (key === 'title' && !editingId) next.slug = toSlug(value)
        return next
      })
    }
  }

  async function save(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true); setMsg('')
    try {
      const body = { ...form, published_at: form.published_at || null }
      let res: Response
      if (editingId) {
        res = await fetch(`/api/posts/${editingId}`, { method: 'PUT', headers: headers(), body: JSON.stringify(body) })
      } else {
        res = await fetch('/api/posts', { method: 'POST', headers: headers(), body: JSON.stringify(body) })
      }
      if (!res.ok) throw new Error(await res.text())
      const saved = await res.json()
      await fetchPosts()
      setMsg('Sačuvano.')
      if (!editingId) setEditingId(saved.id)
    } catch (err) {
      setMsg('Greška: ' + err)
    } finally {
      setSaving(false)
    }
  }

  async function deletePost() {
    if (!editingId || !confirm('Obrisati ovaj post?')) return
    setDeleting(true)
    await fetch(`/api/posts/${editingId}`, { method: 'DELETE', headers: headers() })
    await fetchPosts()
    setDeleting(false)
    setView('list')
  }

  async function addImage(e: React.FormEvent) {
    e.preventDefault()
    if (!imgUrl.trim()) return
    setImgSaving(true); setImgMsg('')
    try {
      const res = await fetch('/api/gallery', {
        method: 'POST', headers: headers(),
        body: JSON.stringify({ url: imgUrl, caption: imgCaption }),
      })
      if (!res.ok) throw new Error(await res.text())
      setImgUrl(''); setImgCaption('')
      await fetchImages()
      setImgMsg('Dodato.')
    } catch (err) {
      setImgMsg('Greška: ' + err)
    } finally {
      setImgSaving(false)
    }
  }

  async function deleteImage(id: number) {
    if (!confirm('Obrisati sliku?')) return
    await fetch(`/api/gallery/${id}`, { method: 'DELETE', headers: headers() })
    await fetchImages()
  }

  function setContent(v: string) { setForm(f => ({ ...f, content: v })) }

  async function seedPosts() {
    if (!confirm('Uvesti sve postove sa originalnog sajta? Postojeći postovi neće biti prepisani.')) return
    setSeeding(true); setSeedMsg('')
    try {
      const res = await fetch('/api/seed', { method: 'POST', headers: headers() })
      const data = await res.json()
      await fetchPosts()
      setSeedMsg(`Uvezeno: ${data.inserted}, već postojalo: ${data.skipped}`)
    } catch {
      setSeedMsg('Greška pri uvozu.')
    } finally {
      setSeeding(false)
    }
  }

  // ── LOGIN ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: DARK, display: 'flex', flexDirection: 'column' }}>
        {/* Top hazard stripe */}
        <div style={{
          height: 10,
          background: 'repeating-linear-gradient(-45deg, #c5d000, #c5d000 12px, #0d0d0d 12px, #0d0d0d 24px)',
          flexShrink: 0,
        }} />

        {/* Center */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <form onSubmit={login} style={{ width: '100%', maxWidth: 360, padding: '2.5rem 2rem' }}>
            {/* Logo */}
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '3.5rem', color: ACCENT, letterSpacing: '0.12em', lineHeight: 1, margin: 0 }}>
                CSLOG
              </p>
              <p style={{ fontFamily: 'var(--font-inter)', color: '#444', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.3em', marginTop: '0.4rem' }}>
                Admin panel
              </p>
            </div>

            {/* Password */}
            <input
              type="password"
              placeholder="Lozinka"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoFocus
              style={{
                width: '100%', background: '#111', border: '1px solid #2a2a2a',
                borderBottom: `2px solid ${ACCENT}`, color: '#fff',
                padding: '0.85rem 1rem', fontFamily: 'var(--font-inter)',
                fontSize: '0.95rem', marginBottom: '0.75rem',
                boxSizing: 'border-box', outline: 'none',
              }}
            />
            {authError && (
              <p style={{ color: '#ff5555', fontFamily: 'var(--font-inter)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                {authError}
              </p>
            )}
            <button
              type="submit"
              style={{
                width: '100%', background: ACCENT, color: DARK, border: 'none',
                padding: '0.85rem', fontFamily: 'var(--font-inter)', fontWeight: 700,
                fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em',
                cursor: 'pointer',
              }}
            >
              Prijavi se
            </button>
          </form>
        </div>

        {/* Bottom hazard stripe */}
        <div style={{
          height: 10,
          background: 'repeating-linear-gradient(-45deg, #c5d000, #c5d000 12px, #0d0d0d 12px, #0d0d0d 24px)',
          flexShrink: 0,
        }} />
      </div>
    )
  }

  // ── ADMIN SHELL ────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'var(--font-inter)', color: '#ccc' }}>
      {/* Top bar */}
      <div style={{ background: DARK, borderBottom: '1px solid #1e1e1e', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 54 }}>
        <span style={{ fontFamily: 'var(--font-bebas)', color: ACCENT, fontSize: '1.4rem', letterSpacing: '0.12em' }}>
          CSLOG Admin
        </span>
        <button
          onClick={() => { setAuthed(false); setPassword('') }}
          style={{ background: 'none', border: '1px solid #2a2a2a', color: '#666', padding: '0.3rem 0.9rem', fontSize: '0.72rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}
        >
          Odjavi se
        </button>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: '1px solid #1a1a1a', padding: '0 2rem', display: 'flex' }}>
        {([['posts', '📝  Blog postovi'], ['gallery', '🖼  Galerija']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{
              padding: '0.8rem 1.25rem', background: 'none', border: 'none',
              borderBottom: tab === key ? `2px solid ${ACCENT}` : '2px solid transparent',
              color: tab === key ? ACCENT : '#555',
              fontFamily: 'var(--font-inter)', fontSize: '0.82rem',
              cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '2rem' }}>

        {/* ── POSTS TAB ── */}
        {tab === 'posts' && (
          <>
            {view === 'list' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div>
                    <h1 style={{ color: '#ddd', fontSize: '1rem', fontWeight: 600, margin: 0 }}>
                      Blog postovi ({posts.length})
                    </h1>
                    {seedMsg && <p style={{ margin: '0.25rem 0 0', fontSize: '0.72rem', color: ACCENT }}>{seedMsg}</p>}
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {posts.length === 0 && (
                      <button onClick={seedPosts} disabled={seeding} style={{ background: 'none', border: `1px solid ${ACCENT}`, color: ACCENT, padding: '0.5rem 1.1rem', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {seeding ? 'Uvoz...' : '↓ Uvezi postove'}
                      </button>
                    )}
                    <button onClick={openNew} style={{ background: ACCENT, color: DARK, border: 'none', padding: '0.55rem 1.2rem', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      + Novi post
                    </button>
                  </div>
                </div>

                {posts.length === 0 ? (
                  <p style={{ color: '#444', textAlign: 'center', padding: '4rem' }}>Nema postova.</p>
                ) : (
                  <div style={{ border: '1px solid #1a1a1a' }}>
                    {posts.map((post, i) => (
                      <div
                        key={post.id}
                        onClick={() => openEdit(post)}
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem 1.25rem', borderBottom: i < posts.length - 1 ? '1px solid #1a1a1a' : 'none', cursor: 'pointer' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#111')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ margin: 0, color: '#ddd', fontWeight: 500, fontSize: '0.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.title}</p>
                          <p style={{ margin: '0.1rem 0 0', color: '#444', fontSize: '0.72rem' }}>/{post.slug}</p>
                        </div>
                        <span style={{ background: post.status === 'published' ? '#1a2500' : '#1a1a1a', color: post.status === 'published' ? ACCENT : '#555', padding: '0.18rem 0.55rem', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em', flexShrink: 0 }}>
                          {post.status === 'published' ? 'Objavljeno' : 'Draft'}
                        </span>
                        <span style={{ color: '#3a3a3a', fontSize: '0.72rem', flexShrink: 0, minWidth: 80, textAlign: 'right' }}>{formatDate(post.published_at)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {view === 'editor' && (
              <form onSubmit={save}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <button type="button" onClick={() => setView('list')} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '0.82rem', padding: 0 }}>
                    ← Svi postovi
                  </button>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    {msg && <span style={{ fontSize: '0.78rem', color: msg.startsWith('Greška') ? '#f55' : ACCENT }}>{msg}</span>}
                    {editingId && (
                      <button type="button" onClick={deletePost} disabled={deleting} style={{ background: 'none', border: '1px solid #3a0000', color: '#c44', padding: '0.45rem 1rem', fontSize: '0.72rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {deleting ? '...' : 'Obriši'}
                      </button>
                    )}
                    <button type="submit" disabled={saving} style={{ background: ACCENT, color: DARK, border: 'none', padding: '0.5rem 1.5rem', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {saving ? 'Čuvanje...' : 'Sačuvaj'}
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 272px', gap: '1.5rem', alignItems: 'start' }}>
                  {/* Main */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input type="text" required placeholder="Naslov *" value={form.title} onChange={field('title')}
                      style={{ ...inp(), fontSize: '1.05rem', padding: '0.75rem 1rem' }} />

                    <div>
                      <label style={{ display: 'block', color: '#444', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.3rem' }}>Slug (URL)</label>
                      <input type="text" required value={form.slug} onChange={field('slug')} style={{ ...inp(), fontFamily: 'monospace', color: '#777' }} />
                    </div>

                    <div>
                      <label style={{ display: 'block', color: '#444', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.3rem' }}>Kratak opis</label>
                      <textarea rows={3} value={form.excerpt} onChange={field('excerpt')} placeholder="Prikazuje se u listi postova..."
                        style={{ ...inp(), resize: 'vertical' }} />
                    </div>

                    <div>
                      <label style={{ display: 'block', color: '#444', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.3rem' }}>Sadržaj (Markdown)</label>
                      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.3rem', flexWrap: 'wrap' }}>
                        {[['B','**','**'],['I','_','_'],['H2','## ',''],['H3','### ',''],['H4','#### ',''],['Link','[','](url)'],['Slika','![opis](',')']]
                          .map(([label, before, after]) => (
                            <button key={label} type="button"
                              onClick={() => mdInsert(contentRef, before, after, setContent)}
                              style={{ background: '#161616', border: '1px solid #222', color: '#888', padding: '0.22rem 0.55rem', fontSize: '0.7rem', cursor: 'pointer' }}>
                              {label}
                            </button>
                          ))}
                      </div>
                      <textarea ref={contentRef} rows={22} value={form.content} onChange={field('content')}
                        placeholder="## Naslov&#10;&#10;Tekst posta..."
                        style={{ ...inp(), fontFamily: 'monospace', lineHeight: 1.7, resize: 'vertical' }} />
                    </div>

                    <div style={{ border: '1px solid #1a1a1a', padding: '1rem' }}>
                      <p style={{ color: '#444', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 0.75rem' }}>SEO</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        <input type="text" placeholder="Meta naslov (50–60 karaktera)" value={form.meta_title} onChange={field('meta_title')} style={inp()} />
                        <textarea rows={2} placeholder="Meta opis (150–160 karaktera)" value={form.meta_description} onChange={field('meta_description')} style={{ ...inp(), resize: 'vertical' }} />
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ border: '1px solid #1a1a1a', padding: '1rem' }}>
                      <label style={{ display: 'block', color: '#444', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>Status</label>
                      <select value={form.status} onChange={field('status')} style={{ ...inp() }}>
                        <option value="draft">Radna verzija</option>
                        <option value="published">Objavljeno</option>
                      </select>
                    </div>

                    <div style={{ border: '1px solid #1a1a1a', padding: '1rem' }}>
                      <label style={{ display: 'block', color: '#444', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>Datum objave</label>
                      <input type="date" value={form.published_at || ''} onChange={field('published_at')}
                        style={{ ...inp(), colorScheme: 'dark' }} />
                    </div>

                    <div style={{ border: '1px solid #1a1a1a', padding: '1rem' }}>
                      <label style={{ display: 'block', color: '#444', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>Naslovna slika (URL)</label>
                      <input type="text" placeholder="/slike/naziv.jpg ili https://..." value={form.cover_image} onChange={field('cover_image')}
                        style={{ ...inp(), fontFamily: 'monospace', fontSize: '0.78rem' }} />
                      {form.cover_image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={form.cover_image} alt="" style={{ marginTop: '0.75rem', width: '100%', height: 110, objectFit: 'cover', opacity: 0.8 }} />
                      )}
                    </div>
                  </div>
                </div>
              </form>
            )}
          </>
        )}

        {/* ── GALLERY TAB ── */}
        {tab === 'gallery' && (
          <>
            {/* Add form */}
            <form onSubmit={addImage} style={{ border: '1px solid #1a1a1a', padding: '1.25rem', marginBottom: '2rem' }}>
              <p style={{ color: '#ddd', fontSize: '0.88rem', fontWeight: 600, margin: '0 0 1rem' }}>+ Dodaj sliku</p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
                <div style={{ flex: 2, minWidth: 220 }}>
                  <label style={{ display: 'block', color: '#444', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.3rem' }}>URL slike *</label>
                  <input type="text" placeholder="https://... ili /slike/..." value={imgUrl} onChange={e => setImgUrl(e.target.value)} required style={inp()} />
                </div>
                <div style={{ flex: 2, minWidth: 220 }}>
                  <label style={{ display: 'block', color: '#444', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.3rem' }}>Opis (opcionalno)</label>
                  <input type="text" placeholder="Transport Beograd–Tirol..." value={imgCaption} onChange={e => setImgCaption(e.target.value)} style={inp()} />
                </div>
                <button type="submit" disabled={imgSaving} style={{ background: ACCENT, color: DARK, border: 'none', padding: '0.6rem 1.2rem', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em', flexShrink: 0 }}>
                  {imgSaving ? '...' : 'Dodaj'}
                </button>
              </div>
              {imgMsg && <p style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: imgMsg.startsWith('Greška') ? '#f55' : ACCENT }}>{imgMsg}</p>}
            </form>

            {/* Image grid */}
            <p style={{ color: '#555', fontSize: '0.82rem', marginBottom: '1rem' }}>Ukupno: {images.length} slika</p>
            {images.length === 0 ? (
              <p style={{ color: '#333', textAlign: 'center', padding: '3rem' }}>Nema slika u galeriji.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {images.map(img => (
                  <div key={img.id} style={{ position: 'relative', border: '1px solid #1a1a1a', overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt={img.caption} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                    {img.caption && (
                      <p style={{ margin: 0, padding: '0.4rem 0.6rem', fontSize: '0.72rem', color: '#666', background: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {img.caption}
                      </p>
                    )}
                    <button
                      onClick={() => deleteImage(img.id)}
                      style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,0.7)', border: '1px solid #500', color: '#f44', width: 26, height: 26, cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
