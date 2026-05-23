import { neon } from '@neondatabase/serverless'

export const sql = neon(process.env.DATABASE_URL!)

export async function initDb() {
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
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
}
