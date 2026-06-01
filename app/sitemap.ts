import type { MetadataRoute } from 'next'
import { sql, initDb } from '@/lib/db'

const BASE = 'https://cslog.rs'

const staticSr = ['/', '/nase-usluge', '/prikolice', '/galerija', '/blog', '/o-nama', '/kontakt']
const staticEn = ['/en', '/en/services', '/en/trailers', '/en/gallery', '/en/blog', '/en/about', '/en/contact']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await initDb()

  const posts = await sql`
    SELECT slug, lang, published_at, updated_at
    FROM blog_posts WHERE status = 'published'
  ` as { slug: string; lang: string; published_at: string | null; updated_at: string }[]

  const postUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: p.updated_at ?? p.published_at ?? new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const staticUrls: MetadataRoute.Sitemap = [
    ...staticSr.map((path) => ({
      url: `${BASE}${path}`,
      changeFrequency: 'weekly' as const,
      priority: path === '/' ? 1.0 : 0.8,
    })),
    ...staticEn.map((path) => ({
      url: `${BASE}${path}`,
      changeFrequency: 'weekly' as const,
      priority: path === '/en' ? 0.9 : 0.7,
    })),
  ]

  return [...staticUrls, ...postUrls]
}
