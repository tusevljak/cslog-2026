import nodemailer from 'nodemailer'

/**
 * SMTP transport — lenjo se pravi jednom po procesu.
 * Env varijable (postavljene u Coolify Application Environment):
 *   SMTP_HOST      — npr. mail.cslog.rs
 *   SMTP_PORT      — 587 (STARTTLS) ili 465 (SSL)
 *   SMTP_USER      — office@cslog.rs
 *   SMTP_PASSWORD  — lozinka mailbox-a
 *   SMTP_FROM      — office@cslog.rs (adresa sa koje ide mail)
 */
let _transport: ReturnType<typeof nodemailer.createTransport> | null = null

function getTransport() {
  if (!_transport) {
    const port = Number(process.env.SMTP_PORT) || 587
    _transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,       // 465 = SSL, 587 = STARTTLS (secure=false)
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      // Neki self-hosted mail serveri imaju self-signed sertifikate;
      // ova opcija dozvoljava konekciju ako je SMTP_TLS_INSECURE=1
      tls: process.env.SMTP_TLS_INSECURE === '1'
        ? { rejectUnauthorized: false }
        : undefined,
      logger: false,
    })
  }
  return _transport
}

/**
 * Šalje HTML mail. Ako SMTP nije konfigurisan, vraća `false` bez greške
 * (tako da /api/contact ne padne ako SMTP env nije postavljen).
 */
export async function sendMail(opts: {
  to: string
  subject: string
  html: string
  replyTo?: string
}): Promise<boolean> {
  const host = process.env.SMTP_HOST
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASSWORD

  if (!host || !user || !pass) {
    console.warn('[mail] SMTP env not fully configured. HOST=%s USER=%s PASS=%s',
      host ? '✓' : '✗missing',
      user ? '✓' : '✗missing',
      pass ? '✓' : '✗missing',
    )
    return false
  }

  console.log('[mail] sending to=%s subject="%s" via %s:%s user=%s',
    opts.to, opts.subject, host, process.env.SMTP_PORT ?? 587, user)

  try {
    const info = await getTransport().sendMail({
      from: process.env.SMTP_FROM ?? user,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    })
    console.log('[mail] SENT OK  messageId=%s response=%s', info.messageId, info.response)
    return true
  } catch (err) {
    console.error('[mail] SEND FAILED:', err)
    return false
  }
}
