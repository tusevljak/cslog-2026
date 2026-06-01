import { NextRequest, NextResponse } from 'next/server'

// In-memory rate limiter: max 5 attempts per IP per 15 minutes
const attempts = new Map<string, { count: number; reset: number }>()

function getIp(req: NextRequest) {
  return req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = attempts.get(ip)

  if (!entry || entry.reset < now) {
    attempts.set(ip, { count: 1, reset: now + 15 * 60 * 1000 })
    return false
  }

  entry.count++
  if (entry.count > 5) return true
  return false
}

function clearAttempts(ip: string) {
  attempts.delete(ip)
}

export async function POST(req: NextRequest) {
  const ip = getIp(req)

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Previše pokušaja. Pokušajte ponovo za 15 minuta.' },
      { status: 429 }
    )
  }

  const { password } = await req.json()

  if (password === process.env.ADMIN_PASSWORD) {
    clearAttempts(ip)
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Pogrešna lozinka.' }, { status: 401 })
}
