import { NextRequest, NextResponse } from 'next/server'
import { sql, initDb } from '@/lib/db'

export async function POST(req: NextRequest) {
  await initDb()
  const { ime, email, telefon, ruta, teret, poruka } = await req.json()

  if (!ime || !email) {
    return NextResponse.json({ error: 'Ime i email su obavezni.' }, { status: 400 })
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
