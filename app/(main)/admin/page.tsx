'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

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

const emptyForm = (): Partial<Post> => ({
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

// Insert markdown syntax at cursor in textarea
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

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState('')
  const [posts, setPosts] = useState<Post[]>([])
  const [view, setView] = useState<'list' | 'editor'>('list')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [form, setForm] = useState<Partial<Post>>(emptyForm())
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [msg, setMsg] = useState('')
  const [tab, setTab] = useState<'posts'>('posts')
  const contentRef = useRef<HTMLTextAreaElement>(null)

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
      setAuthed(true)
    } else {
      setAuthError('Pogrešna lozinka.')
    }
  }

  async function fetchPosts() {
    const res = await fetch('/api/posts', { headers: headers() })
    if (res.ok) setPosts(await res.json())
  }

  function openNew() {
    setEditingId(null)
    setForm(emptyForm())
    setMsg('')
    setView('editor')
  }

  function openEdit(post: Post) {
    setEditingId(post.id)
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content || '',
      cover_image: post.cover_image || '',
      status: post.status,
      published_at: post.published_at ? post.published_at.slice(0, 10) : '',
      meta_title: post.meta_title || '',
      meta_description: post.meta_description || '',
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
    setSaving(true)
    setMsg('')
    try {
      const body = { ...form, published_at: form.published_at || null }
      const res = editingId
        ? await fetch(`/api/posts/${editingId}`, { method: 'PUT', headers: headers(), body: JSON.stringify(body) })
        : await fetch('/api/posts', { method: 'POST', headers: headers(), body: JSON.stringify(body) })
      if (!res.ok) throw new Error(await res.text())
      await fetchPosts()
      setMsg('Sačuvano.')
      if (!editingId) {
        const created = await res.json()
        setEditingId(created.id)
      }
    } catch (err) {
      setMsg('Greška: ' + err)
    } finally {
      setSaving(false)
    }
  }

  async function deletePost() {
    if (!editingId) return
    if (!confirm('Obrisati ovaj post?')) return
    setDeleting(true)
    await fetch(`/api/posts/${editingId}`, { method: 'DELETE', headers: headers() })
    await fetchPosts()
    setDeleting(false)
    setView('list')
  }

  function setContent(v: string) {
    setForm(f => ({ ...f, content: v }))
  }

  if (!authed) {
    return (
      <div style={{ minHeight: '100vh', background: DARK, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <form onSubmit={login} style={{ width: '100%', maxWidth: 380, padding: '2.5rem', border: '1px solid #222' }}>
          <p style={{ fontFamily: 'var(--font-bebas)', fontSize: '2rem', color: ACCENT, letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
            CSLOG
          </p>
          <p style={{ fontFamily: 'var(--font-inter)', color: '#666', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '2rem' }}>
            Admin panel
          </p>
          <input
            type="password"
            placeholder="Lozinka"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoFocus
            style={{ width: '100%', background: '#111', border: '1px solid #333', color: '#fff', padding: '0.75rem 1rem', fontFamily: 'var(--font-inter)', fontSize: '0.9rem', marginBottom: '0.75rem', boxSizing: 'border-box', outline: 'none' }}
          />
          {authError && <p style={{ color: '#f55', fontFamily: 'var(--font-inter)', fontSize: '0.8rem', marginBottom: '0.75rem' }}>{authError}</p>}
          <button
            type="submit"
            style={{ width: '100%', background: ACCENT, color: DARK, border: 'none', padding: '0.75rem', fontFamily: 'var(--font-inter)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer' }}
          >
            Prijavi se
          </button>
        </form>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'var(--font-inter)', color: '#ccc' }}>
      {/* Top bar */}
      <div style={{ background: DARK, borderBottom: '1px solid #222', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 56 }}>
        <span style={{ fontFamily: 'var(--font-bebas)', color: ACCENT, fontSize: '1.4rem', letterSpacing: '0.1em' }}>CSLOG Admin</span>
        <button
          onClick={() => { setAuthed(false); setPassword('') }}
          style={{ background: 'none', border: '1px solid #333', color: '#888', padding: '0.3rem 1rem', fontSize: '0.75rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}
        >
          Odjavi se
        </button>
      </div>

      {/* Tab bar */}
      <div style={{ borderBottom: '1px solid #1a1a1a', padding: '0 2rem', display: 'flex', gap: 0 }}>
        {([['posts', 'Blog postovi']] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            style={{ padding: '0.85rem 1.25rem', background: 'none', border: 'none', borderBottom: tab === key ? `2px solid ${ACCENT}` : '2px solid transparent', color: tab === key ? ACCENT : '#666', fontFamily: 'var(--font-inter)', fontSize: '0.85rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem' }}>
        {tab === 'posts' && (
          <>
            {view === 'list' && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h1 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>
                    Blog postovi ({posts.length})
                  </h1>
                  <button onClick={openNew} style={{ background: ACCENT, color: DARK, border: 'none', padding: '0.6rem 1.25rem', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    + Novi post
                  </button>
                </div>

                {posts.length === 0 ? (
                  <p style={{ color: '#555', textAlign: 'center', padding: '3rem' }}>Nema postova. Kreirajte prvi.</p>
                ) : (
                  <div style={{ border: '1px solid #1a1a1a', borderRadius: 2 }}>
                    {posts.map((post, i) => (
                      <div
                        key={post.id}
                        onClick={() => openEdit(post)}
                        style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem 1.25rem', borderBottom: i < posts.length - 1 ? '1px solid #1a1a1a' : 'none', cursor: 'pointer', background: 'transparent', transition: 'background 0.1s' }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#111')}
                        onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ margin: 0, color: '#ddd', fontWeight: 500, fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.title}</p>
                          <p style={{ margin: '0.15rem 0 0', color: '#555', fontSize: '0.75rem' }}>/{post.slug}</p>
                        </div>
                        <span style={{ background: post.status === 'published' ? '#1a2a00' : '#1a1a1a', color: post.status === 'published' ? ACCENT : '#666', padding: '0.2rem 0.6rem', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', flexShrink: 0 }}>
                          {post.status === 'published' ? 'Objavljeno' : 'Radna verzija'}
                        </span>
                        <span style={{ color: '#444', fontSize: '0.75rem', flexShrink: 0, minWidth: 80, textAlign: 'right' }}>{formatDate(post.published_at)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {view === 'editor' && (
              <form onSubmit={save}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <button type="button" onClick={() => setView('list')} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.85rem', padding: 0, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    ← Svi postovi
                  </button>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    {msg && <span style={{ fontSize: '0.8rem', color: msg.startsWith('Greška') ? '#f55' : ACCENT }}>{msg}</span>}
                    {editingId && (
                      <button type="button" onClick={deletePost} disabled={deleting} style={{ background: 'none', border: '1px solid #400', color: '#f44', padding: '0.5rem 1rem', fontSize: '0.75rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        {deleting ? '...' : 'Obriši'}
                      </button>
                    )}
                    <button type="submit" disabled={saving} style={{ background: ACCENT, color: DARK, border: 'none', padding: '0.55rem 1.5rem', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {saving ? 'Čuvanje...' : 'Sačuvaj'}
                    </button>
                  </div>
                </div>

                {/* Two-column layout: main + sidebar */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem', alignItems: 'start' }}>
                  {/* Main column */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Title */}
                    <input
                      type="text" required placeholder="Naslov posta *"
                      value={form.title} onChange={field('title')}
                      style={{ background: '#111', border: '1px solid #222', color: '#fff', padding: '0.75rem 1rem', fontSize: '1.1rem', fontFamily: 'var(--font-inter)', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                    />

                    {/* Slug */}
                    <div>
                      <label style={{ display: 'block', color: '#555', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.35rem' }}>URL (slug)</label>
                      <input
                        type="text" required value={form.slug} onChange={field('slug')}
                        style={{ background: '#111', border: '1px solid #222', color: '#888', padding: '0.55rem 1rem', fontSize: '0.85rem', fontFamily: 'monospace', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                      />
                    </div>

                    {/* Excerpt */}
                    <div>
                      <label style={{ display: 'block', color: '#555', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.35rem' }}>Kratak opis (excerpt)</label>
                      <textarea
                        rows={3} value={form.excerpt} onChange={field('excerpt')}
                        placeholder="Prikazuje se u listi postova..."
                        style={{ background: '#111', border: '1px solid #222', color: '#ccc', padding: '0.75rem 1rem', fontSize: '0.875rem', fontFamily: 'var(--font-inter)', outline: 'none', width: '100%', boxSizing: 'border-box', resize: 'vertical' }}
                      />
                    </div>

                    {/* Content */}
                    <div>
                      <label style={{ display: 'block', color: '#555', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.35rem' }}>Sadržaj (Markdown)</label>
                      {/* Toolbar */}
                      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                        {[
                          ['B', '**', '**', 'Bold'],
                          ['I', '_', '_', 'Italic'],
                          ['H2', '## ', '', 'Heading 2'],
                          ['H3', '### ', '', 'Heading 3'],
                          ['H4', '#### ', '', 'Heading 4'],
                          ['Link', '[', '](url)', 'Link'],
                          ['Slika', '![opis](', ')', 'Slika URL'],
                        ].map(([label, before, after, title]) => (
                          <button
                            key={label} type="button" title={title}
                            onClick={() => mdInsert(contentRef, before, after, setContent)}
                            style={{ background: '#1a1a1a', border: '1px solid #2a2a2a', color: '#aaa', padding: '0.25rem 0.6rem', fontSize: '0.72rem', cursor: 'pointer', fontFamily: label === 'B' || label === 'I' ? 'serif' : 'var(--font-inter)', fontWeight: label === 'B' ? 700 : 400, fontStyle: label === 'I' ? 'italic' : 'normal' }}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                      <textarea
                        ref={contentRef}
                        rows={20} value={form.content} onChange={field('content')}
                        placeholder="## Naslov sekcije&#10;&#10;Tekst posta u Markdown formatu...&#10;&#10;**Podebljano** i _kurziv_&#10;&#10;![Opis slike](/slike/ime-slike.jpg)"
                        style={{ background: '#111', border: '1px solid #222', color: '#ccc', padding: '0.75rem 1rem', fontSize: '0.875rem', fontFamily: 'monospace', lineHeight: 1.7, outline: 'none', width: '100%', boxSizing: 'border-box', resize: 'vertical' }}
                      />
                    </div>

                    {/* SEO */}
                    <div style={{ border: '1px solid #1a1a1a', padding: '1rem' }}>
                      <p style={{ color: '#555', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 0.75rem' }}>SEO</p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <input
                          type="text" placeholder="Meta naslov (50–60 karaktera)"
                          value={form.meta_title} onChange={field('meta_title')}
                          style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', color: '#ccc', padding: '0.6rem 1rem', fontSize: '0.85rem', fontFamily: 'var(--font-inter)', outline: 'none', width: '100%', boxSizing: 'border-box' }}
                        />
                        <textarea
                          rows={2} placeholder="Meta opis (150–160 karaktera)"
                          value={form.meta_description} onChange={field('meta_description')}
                          style={{ background: '#0d0d0d', border: '1px solid #1a1a1a', color: '#ccc', padding: '0.6rem 1rem', fontSize: '0.85rem', fontFamily: 'var(--font-inter)', outline: 'none', width: '100%', boxSizing: 'border-box', resize: 'vertical' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Status */}
                    <div style={{ border: '1px solid #1a1a1a', padding: '1rem' }}>
                      <label style={{ display: 'block', color: '#555', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>Status</label>
                      <select
                        value={form.status} onChange={field('status')}
                        style={{ background: '#111', border: '1px solid #222', color: '#ccc', padding: '0.55rem 0.75rem', width: '100%', fontFamily: 'var(--font-inter)', fontSize: '0.85rem', outline: 'none' }}
                      >
                        <option value="draft">Radna verzija</option>
                        <option value="published">Objavljeno</option>
                      </select>
                    </div>

                    {/* Published at */}
                    <div style={{ border: '1px solid #1a1a1a', padding: '1rem' }}>
                      <label style={{ display: 'block', color: '#555', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>Datum objave</label>
                      <input
                        type="date" value={form.published_at || ''} onChange={field('published_at')}
                        style={{ background: '#111', border: '1px solid #222', color: '#ccc', padding: '0.55rem 0.75rem', width: '100%', fontFamily: 'var(--font-inter)', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box', colorScheme: 'dark' }}
                      />
                    </div>

                    {/* Cover image */}
                    <div style={{ border: '1px solid #1a1a1a', padding: '1rem' }}>
                      <label style={{ display: 'block', color: '#555', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.5rem' }}>Naslovna slika (URL)</label>
                      <input
                        type="text" placeholder="/slike/naziv-slike.jpg"
                        value={form.cover_image} onChange={field('cover_image')}
                        style={{ background: '#111', border: '1px solid #222', color: '#ccc', padding: '0.55rem 0.75rem', width: '100%', fontFamily: 'monospace', fontSize: '0.8rem', outline: 'none', boxSizing: 'border-box' }}
                      />
                      {form.cover_image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={form.cover_image} alt="" style={{ marginTop: '0.75rem', width: '100%', height: 120, objectFit: 'cover', opacity: 0.8 }} />
                      )}
                    </div>
                  </div>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  )
}
