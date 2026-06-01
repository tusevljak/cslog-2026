import { NextRequest, NextResponse } from 'next/server'
import { sql, initDb } from '@/lib/db'

// Simple in-memory rate limiter: max 3 submissions per IP per 10 minutes
const submissions = new Map<string, { count: number; reset: number }>()

function getIp(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = submissions.get(ip)
  if (!entry || entry.reset < now) {
    submissions.set(ip, { count: 1, reset: now + 10 * 60 * 1000 })
    return false
  }
  entry.count++
  return entry.count > 3
}

export async function POST(req: NextRequest) {
  await initDb()

  const ip = getIp(req)
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Previše zahteva.' }, { status: 429 })
  }

  const body = await req.json()
  const { ime, email, telefon, ruta, teret, poruka, website } = body

  // Honeypot: bots fill the hidden "website" field, humans don't see it
  if (website) {
    return NextResponse.json({ ok: true }) // silently drop
  }

  if (!ime || !email) {
    return NextResponse.json({ error: 'Ime i email su obavezni.' }, { status: 400 })
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Nevažeća email adresa.' }, { status: 400 })
  }

  await sql`
    CREATE TABLE IF NOT EXISTS contact_inquiries (
      id SERIAL PRIMARY KEY,
      ime TEXT NOT NULL,
      email TEXT NOT NULL,
      telefon TEXT DEFAULT '',
      ruta TEXT DEFAULT '',
      teret TEXT DEFAULT '',
      poruka TEXT DEFAULT '',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `

  await sql`
    INSERT INTO contact_inquiries (ime, email, telefon, ruta, teret, poruka)
    VALUES (${ime}, ${email}, ${telefon || ''}, ${ruta || ''}, ${teret || ''}, ${poruka || ''})
  `

  return NextResponse.json({ ok: true })
}
