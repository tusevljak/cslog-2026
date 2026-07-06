import postgres from 'postgres'

/**
 * Postgres client — works with any PostgreSQL server (Coolify, Neon, RDS, local).
 * postgres.js supports the same tagged-template API as @neondatabase/serverless,
 * so query call-sites don't need to change.
 *
 * SSL is auto-detected from the connection string (sslmode= param). For Coolify
 * internal Postgres over the private network SSL is not required and connection
 * string should NOT contain sslmode=.
 */
export const sql = postgres(process.env.DATABASE_URL!, {
  prepare: false,     // safer with connection poolers (pgbouncer)
  max: 10,            // reasonable pool size for a small VPS
  idle_timeout: 30,   // seconds
})

/**
 * Cached init — DDL statements run only ONCE per process, no matter how many
 * routes call initDb() in parallel. Prevents CREATE TABLE + ALTER TABLE race
 * conditions during Next.js parallel static-page generation.
 */
let _initPromise: Promise<void> | null = null

async function doInit() {
  await sql`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT DEFAULT '',
      excerpt TEXT DEFAULT '',
      cover_image TEXT DEFAULT '',
      status TEXT DEFAULT 'draft',
      published_at TIMESTAMPTZ,
      meta_title TEXT DEFAULT '',
      meta_description TEXT DEFAULT '',
      lang TEXT DEFAULT 'sr',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
  await sql`ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS lang TEXT DEFAULT 'sr'`
  await sql`
    CREATE TABLE IF NOT EXISTS gallery_images (
      id SERIAL PRIMARY KEY,
      url TEXT NOT NULL,
      caption TEXT DEFAULT '',
      sort_order INTEGER DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
}

export function initDb(): Promise<void> {
  if (!_initPromise) _initPromise = doInit()
  return _initPromise
}
