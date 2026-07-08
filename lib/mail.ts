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
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn('[mail] SMTP not configured — skipping send')
    return false
  }

  try {
    await getTransport().sendMail({
      from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      replyTo: opts.replyTo,
    })
    return true
  } catch (err) {
    console.error('[mail] send failed:', err)
    return false
  }
}
