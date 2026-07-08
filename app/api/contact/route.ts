import { NextRequest, NextResponse } from 'next/server'
import { sql, initDb } from '@/lib/db'
import { sendMail } from '@/lib/mail'

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

  // Šalji notifikaciju na office@cslog.rs — ne blokiraj odgovor ako pukne
  const notifyTo = process.env.SMTP_NOTIFY_TO ?? process.env.SMTP_FROM ?? 'office@cslog.rs'

  const rows: Array<[string, string]> = [
    ['Ime', String(ime)],
    ['Email', String(email)],
    ['Telefon', String(telefon || '—')],
    ['Ruta', String(ruta || '—')],
    ['Teret', String(teret || '—')],
    ['Poruka', String(poruka || '—')],
  ]

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f5f5f5">
      <div style="background:#0d0d0d;padding:20px 24px;text-align:center">
        <div style="color:#c5d000;font-weight:700;font-size:18px;letter-spacing:0.15em">CSLOG</div>
        <div style="color:rgba(255,255,255,0.6);font-size:11px;letter-spacing:0.2em;text-transform:uppercase;margin-top:4px">Novi upit sa sajta</div>
      </div>
      <div style="background:#ffffff;padding:24px">
        <table style="width:100%;border-collapse:collapse">
          ${rows.map(([label, val]) => `
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:11px;text-transform:uppercase;letter-spacing:0.12em;color:#888;width:100px;vertical-align:top">${label}</td>
              <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:14px;color:#0d0d0d">${escapeHtml(val).replace(/\n/g, '<br>')}</td>
            </tr>
          `).join('')}
        </table>
        <div style="margin-top:24px;padding-top:16px;border-top:2px solid #c5d000">
          <a href="mailto:${escapeHtml(String(email))}" style="display:inline-block;background:#c5d000;color:#0d0d0d;padding:12px 24px;text-decoration:none;font-weight:700;font-size:12px;letter-spacing:0.15em;text-transform:uppercase">
            Odgovori →
          </a>
        </div>
      </div>
      <div style="text-align:center;padding:16px;font-size:11px;color:#888">
        Cargo Special Logistic · cslog.rs
      </div>
    </div>
  `

  // fire-and-forget — client dobija odgovor odmah, mail se šalje paralelno
  sendMail({
    to: notifyTo,
    subject: `Novi upit — ${ime}`,
    html,
    replyTo: String(email),
  }).catch(err => console.error('[contact] mail send failed:', err))

  return NextResponse.json({ ok: true })
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
