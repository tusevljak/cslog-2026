'use client'

import { useState, useRef, useCallback } from 'react'

const ACCENT = '#c5d000'
const DARK = '#0d0d0d'

async function uploadFile(file: File, password: string, type: 'blog' | 'gallery'): Promise<string> {
  const fd = new FormData()
  fd.append('file', file)
  fd.append('type', type)
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: { 'x-admin-password': password },
    body: fd,
  })
  let data: { url?: string; error?: string }
  try { data = await res.json() } catch { throw new Error('Server nije vratio validan odgovor.') }
  if (!res.ok) throw new Error(data.error || 'Greška pri uploadu.')
  return data.url!
}

function ImageUpload({ value, onChange, password, type = 'blog' }: {
  value: string
  onChange: (url: string) => void
  password: string
  type?: 'blog' | 'gallery'
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true); setError('')
    try {
      const url = await uploadFile(file, password, type)
      onChange(url)
    } catch (err) {
      setError(String(err))
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div>
      <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: 'none' }} />
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem' }}>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          style={{ background: uploading ? '#1a1a1a' : ACCENT, color: uploading ? '#555' : DARK, border: 'none', padding: '0.5rem 1rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: uploading ? 'default' : 'pointer', fontFamily: 'var(--font-inter)', flexShrink: 0 }}
        >
          {uploading ? 'Konvertuje...' : '↑ Upload'}
        </button>
        {value && (
          <button type="button" onClick={() => onChange('')} style={{ background: 'none', border: '1px solid #3a0000', color: '#c44', padding: '0.4rem 0.75rem', fontSize: '0.72rem', cursor: 'pointer' }}>
            ×
          </button>
        )}
      </div>
      {error && <p style={{ color: '#f55', fontSize: '0.72rem', marginBottom: '0.5rem' }}>{error}</p>}
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" style={{ width: '100%', height: 130, objectFit: 'cover', marginTop: '0.5rem' }} />
      )}
    </div>
  )
}

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

function GalleryUploader({ password, onDone }: { password: string; onDone: () => void }) {
  const [items, setItems] = useState<{ file: File; status: 'pending' | 'uploading' | 'done' | 'err'; preview: string }[]>([])
  const [running, setRunning] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function runUpload(files: File[]) {
    const newItems = files.map(file => ({ file, status: 'pending' as const, preview: URL.createObjectURL(file) }))
    setItems(newItems)
    setRunning(true)
    for (let i = 0; i < newItems.length; i++) {
      setItems(prev => prev.map((it, j) => j === i ? { ...it, status: 'uploading' } : it))
      try {
        const url = await uploadFile(newItems[i].file, password, 'gallery')
        await fetch('/api/gallery', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-admin-password': password },
          body: JSON.stringify({ url, caption: '' }),
        })
        setItems(prev => prev.map((it, j) => j === i ? { ...it, status: 'done' } : it))
      } catch {
        setItems(prev => prev.map((it, j) => j === i ? { ...it, status: 'err' } : it))
      }
    }
    setRunning(false)
    onDone()
  }

  function pick(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    if (inputRef.current) inputRef.current.value = ''
    if (!files.length) return
    runUpload(files)
  }

  const allDone = items.length > 0 && items.every(it => it.status === 'done')
  const hasErr = items.some(it => it.status === 'err')

  return (
    <div style={{ border: '1px solid #1a1a1a', padding: '1.25rem', marginBottom: '2rem' }}>
      <p style={{ color: '#ddd', fontSize: '0.88rem', fontWeight: 600, margin: '0 0 1rem' }}>+ Dodaj slike u galeriju</p>

      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: items.length ? '1rem' : 0 }}>
        <input ref={inputRef} type="file" accept="image/*" multiple onChange={pick} style={{ display: 'none' }} />
        <button type="button" onClick={() => inputRef.current?.click()} disabled={running}
          style={{ background: running ? '#111' : '#1a1a1a', border: `1px solid ${running ? '#333' : ACCENT}`, color: running ? '#555' : ACCENT, padding: '0.55rem 1.1rem', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', cursor: running ? 'default' : 'pointer', fontFamily: 'var(--font-inter)' }}>
          {running ? 'Uploaduje...' : '↑ Izaberi i upload'}
        </button>
        <span style={{ fontSize: '0.72rem', color: '#444' }}>Možete odabrati više slika odjednom</span>
        {(allDone || hasErr) && (
          <button type="button" onClick={() => setItems([])}
            style={{ background: 'none', border: '1px solid #2a2a2a', color: '#666', padding: '0.4rem 0.8rem', fontSize: '0.72rem', cursor: 'pointer', marginLeft: 'auto' }}>
            Očisti
          </button>
        )}
      </div>

      {items.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.5rem' }}>
          {items.map((it, i) => (
            <div key={i} style={{ position: 'relative' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={it.preview} alt="" style={{ width: '100%', height: 90, objectFit: 'cover', display: 'block', opacity: it.status === 'uploading' ? 0.5 : 1 }} />
              <div style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.25rem',
                background: it.status === 'done' ? 'rgba(0,0,0,0.45)' : it.status === 'err' ? 'rgba(180,0,0,0.5)' : it.status === 'uploading' ? 'rgba(0,0,0,0.2)' : 'transparent',
              }}>
                {it.status === 'done' && <span style={{ color: ACCENT }}>✓</span>}
                {it.status === 'err' && '✗'}
                {it.status === 'uploading' && <span style={{ width: 20, height: 20, border: `2px solid ${ACCENT}`, borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />}
              </div>
            </div>
          ))}
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState('')
  const [tab, setTab] = useState<'posts' | 'gallery' | 'inquiries'>('posts')
  const [seeding, setSeeding] = useState(false)
  const [seedMsg, setSeedMsg] = useState('')
  const [syncing, setSyncing] = useState(false)

  // Posts state
  const [posts, setPosts] = useState<Post[]>([])
  const [view, setView] = useState<'list' | 'editor'>('list')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<Partial<Post>>(emptyPost())
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [msg, setMsg] = useState('')
  const contentRef = useRef<HTMLTextAreaElement>(null)

  // Inquiries state
  type Inquiry = { id: number; ime: string; email: string; telefon: string; ruta: string; teret: string; poruka: string; created_at: string }
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)

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
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      const [postsRes, galleryRes, inquiriesRes] = await Promise.all([
        fetch('/api/posts', { headers: { 'x-admin-password': password } }),
        fetch('/api/gallery', { headers: { 'x-admin-password': password } }),
        fetch('/api/inquiries', { headers: { 'x-admin-password': password } }),
      ])
      if (postsRes.ok) setPosts(await postsRes.json())
      if (galleryRes.ok) setImages(await galleryRes.json())
      if (inquiriesRes.ok) setInquiries(await inquiriesRes.json())
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

  async function moveImage(id: number, dir: 'up' | 'down') {
    const idx = images.findIndex(img => img.id === id)
    if (idx === -1) return
    const swapIdx = dir === 'up' ? idx - 1 : idx + 1
    if (swapIdx < 0 || swapIdx >= images.length) return

    const a = images[idx]
    const b = images[swapIdx]
    // Give sort_order values based on current array positions, then swap
    const orderA = idx
    const orderB = swapIdx

    await Promise.all([
      fetch(`/api/gallery/${a.id}`, { method: 'PUT', headers: headers(), body: JSON.stringify({ sort_order: orderB }) }),
      fetch(`/api/gallery/${b.id}`, { method: 'PUT', headers: headers(), body: JSON.stringify({ sort_order: orderA }) }),
    ])
    await fetchImages()
  }

  function setContent(v: string) { setForm(f => ({ ...f, content: v })) }

  async function syncImages() {
    setSyncing(true); setSeedMsg('Sinhronizacija slika...')
    try {
      const res = await fetch('/api/sync-images', { method: 'POST', headers: headers() })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Greška')
      await fetchPosts()
      setSeedMsg(`✓ Slike ažurirane: ${data.updated}, bez slike: ${data.skipped}`)
    } catch (err) {
      setSeedMsg('✗ Greška: ' + err)
    } finally {
      setSyncing(false)
    }
  }

  async function seedPosts() {
    setSeeding(true); setSeedMsg('Uvoz u toku...')
    try {
      const res = await fetch('/api/seed', { method: 'POST', headers: headers() })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Greška')
      await fetchPosts()
      setSeedMsg(`✓ Uvezeno: ${data.inserted}, preskočeno: ${data.skipped}`)
    } catch (err) {
      setSeedMsg('✗ Greška: ' + err)
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
        {([['posts', '📝  Blog postovi'], ['gallery', '🖼  Galerija'], ['inquiries', `📩  Upiti${inquiries.length ? ` (${inquiries.length})` : ''}`]] as const).map(([key, label]) => (
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
                    <button onClick={syncImages} disabled={syncing} style={{ background: 'none', border: '1px solid #333', color: '#888', padding: '0.5rem 1.1rem', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: syncing ? 0.5 : 1 }}>
                      {syncing ? '...' : '🖼 Slike'}
                    </button>
                    <button onClick={seedPosts} disabled={seeding} style={{ background: 'none', border: `1px solid ${ACCENT}`, color: ACCENT, padding: '0.5rem 1.1rem', fontWeight: 600, fontSize: '0.78rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: seeding ? 0.5 : 1 }}>
                      {seeding ? 'Uvoz...' : '↓ Uvezi sa cslog.rs'}
                    </button>
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
                      <label style={{ display: 'block', color: '#444', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>Naslovna slika</label>
                      <ImageUpload
                        value={form.cover_image || ''}
                        onChange={url => setForm(f => ({ ...f, cover_image: url }))}
                        password={password}
                        type="blog"
                      />
                    </div>
                  </div>
                </div>
              </form>
            )}
          </>
        )}

        {/* ── INQUIRIES TAB ── */}
        {tab === 'inquiries' && (
          <div style={{ display: 'grid', gridTemplateColumns: selectedInquiry ? '1fr 1fr' : '1fr', gap: '1.5rem', alignItems: 'start' }}>
            {/* List */}
            <div>
              <p style={{ color: '#555', fontSize: '0.82rem', marginBottom: '1rem' }}>
                Ukupno upita: {inquiries.length}
              </p>
              {inquiries.length === 0 ? (
                <p style={{ color: '#333', textAlign: 'center', padding: '4rem' }}>Nema upita.</p>
              ) : (
                <div style={{ border: '1px solid #1a1a1a' }}>
                  {inquiries.map((inq, i) => (
                    <div
                      key={inq.id}
                      onClick={() => setSelectedInquiry(selectedInquiry?.id === inq.id ? null : inq)}
                      style={{
                        padding: '1rem 1.25rem',
                        borderBottom: i < inquiries.length - 1 ? '1px solid #1a1a1a' : 'none',
                        cursor: 'pointer',
                        background: selectedInquiry?.id === inq.id ? '#111' : 'transparent',
                        borderLeft: selectedInquiry?.id === inq.id ? `2px solid ${ACCENT}` : '2px solid transparent',
                      }}
                      onMouseEnter={e => { if (selectedInquiry?.id !== inq.id) e.currentTarget.style.background = '#0d0d0d' }}
                      onMouseLeave={e => { if (selectedInquiry?.id !== inq.id) e.currentTarget.style.background = 'transparent' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                        <div style={{ minWidth: 0 }}>
                          <p style={{ margin: 0, color: '#ddd', fontWeight: 600, fontSize: '0.88rem' }}>{inq.ime}</p>
                          <p style={{ margin: '0.15rem 0 0', color: '#555', fontSize: '0.75rem' }}>{inq.email}{inq.telefon ? ` · ${inq.telefon}` : ''}</p>
                          {inq.ruta && <p style={{ margin: '0.15rem 0 0', color: ACCENT, fontSize: '0.72rem' }}>→ {inq.ruta}</p>}
                        </div>
                        <span style={{ color: '#333', fontSize: '0.68rem', flexShrink: 0, whiteSpace: 'nowrap' }}>
                          {new Date(inq.created_at).toLocaleDateString('sr-RS', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Detail */}
            {selectedInquiry && (
              <div style={{ border: '1px solid #1a1a1a', padding: '1.5rem', position: 'sticky', top: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2 style={{ color: '#ddd', fontSize: '1rem', fontWeight: 600, margin: 0 }}>{selectedInquiry.ime}</h2>
                  <button onClick={() => setSelectedInquiry(null)} style={{ background: 'none', border: 'none', color: '#444', cursor: 'pointer', fontSize: '1.2rem', lineHeight: 1 }}>×</button>
                </div>

                {[
                  { label: 'Email', value: selectedInquiry.email, href: `mailto:${selectedInquiry.email}` },
                  { label: 'Telefon', value: selectedInquiry.telefon, href: `tel:${selectedInquiry.telefon}` },
                  { label: 'Ruta', value: selectedInquiry.ruta },
                  { label: 'Teret', value: selectedInquiry.teret },
                ].map(({ label, value, href }) => value ? (
                  <div key={label} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #1a1a1a' }}>
                    <p style={{ color: '#444', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.3rem', fontFamily: 'var(--font-inter)' }}>{label}</p>
                    {href ? (
                      <a href={href} style={{ color: ACCENT, fontSize: '0.875rem', textDecoration: 'none', fontFamily: 'var(--font-inter)' }}>{value}</a>
                    ) : (
                      <p style={{ color: '#ccc', fontSize: '0.875rem', margin: 0, fontFamily: 'var(--font-inter)' }}>{value}</p>
                    )}
                  </div>
                ) : null)}

                {selectedInquiry.poruka && (
                  <div style={{ marginBottom: '1rem' }}>
                    <p style={{ color: '#444', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.3rem', fontFamily: 'var(--font-inter)' }}>Napomena</p>
                    <p style={{ color: '#aaa', fontSize: '0.875rem', lineHeight: 1.7, margin: 0, fontFamily: 'var(--font-inter)' }}>{selectedInquiry.poruka}</p>
                  </div>
                )}

                <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                  <a href={`mailto:${selectedInquiry.email}`} style={{ background: ACCENT, color: DARK, padding: '0.55rem 1.25rem', fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', display: 'inline-block' }}>
                    Odgovori →
                  </a>
                  {selectedInquiry.telefon && (
                    <a href={`tel:${selectedInquiry.telefon}`} style={{ background: 'none', border: '1px solid #2a2a2a', color: '#888', padding: '0.55rem 1.25rem', fontFamily: 'var(--font-inter)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', textDecoration: 'none', display: 'inline-block' }}>
                      Pozovi
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── GALLERY TAB ── */}
        {tab === 'gallery' && (
          <>
            {/* Add form */}
            <GalleryUploader password={password} onDone={fetchImages} />

            {/* Image grid */}
            <p style={{ color: '#555', fontSize: '0.82rem', marginBottom: '1rem' }}>Ukupno: {images.length} slika</p>
            {images.length === 0 ? (
              <p style={{ color: '#333', textAlign: 'center', padding: '3rem' }}>Nema slika u galeriji.</p>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {images.map((img, idx) => (
                  <div key={img.id} style={{ position: 'relative', border: '1px solid #1a1a1a', overflow: 'hidden' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.url} alt={img.caption} style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }} />
                    {img.caption && (
                      <p style={{ margin: 0, padding: '0.4rem 0.6rem', fontSize: '0.72rem', color: '#666', background: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {img.caption}
                      </p>
                    )}
                    {/* Delete */}
                    <button
                      onClick={() => deleteImage(img.id)}
                      style={{ position: 'absolute', top: 6, right: 6, background: 'rgba(0,0,0,0.75)', border: '1px solid #500', color: '#f44', width: 26, height: 26, cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      ×
                    </button>
                    {/* Sort order arrows */}
                    <div style={{ position: 'absolute', top: 6, left: 6, display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <button
                        onClick={() => moveImage(img.id, 'up')}
                        disabled={idx === 0}
                        title="Pomeri gore"
                        style={{ background: 'rgba(0,0,0,0.75)', border: '1px solid #333', color: idx === 0 ? '#333' : '#aaa', width: 24, height: 24, cursor: idx === 0 ? 'default' : 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveImage(img.id, 'down')}
                        disabled={idx === images.length - 1}
                        title="Pomeri dole"
                        style={{ background: 'rgba(0,0,0,0.75)', border: '1px solid #333', color: idx === images.length - 1 ? '#333' : '#aaa', width: 24, height: 24, cursor: idx === images.length - 1 ? 'default' : 'pointer', fontSize: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}
                      >
                        ▼
                      </button>
                    </div>
                    {/* Position number */}
                    <div style={{ background: '#111', padding: '0.2rem 0.6rem', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #1a1a1a' }}>
                      <span style={{ fontSize: '0.65rem', color: '#333' }}>#{idx + 1}</span>
                    </div>
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
