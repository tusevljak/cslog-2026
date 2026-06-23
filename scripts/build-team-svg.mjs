import fs from 'node:fs'
import path from 'node:path'

const SIG_DIR = 'public/potpisi'
const OUT = 'public/kontakt-tim.svg'

const team = [
  {
    sig: 'Boban-Bićanin-email-potpis-beli.png',
    name: 'Boban Bićanin',
    role: 'Generalni direktor',
    phone: '+381 63 209 675',
    email: 'boban.bicanin@cslog.rs',
  },
  {
    sig: 'Sanja-Brankovic-email-potpis-beli.png',
    name: 'Sanja Branković',
    role: 'Operativni tim',
    phone: '+381 69 209 6753',
    email: 'sanja.brankovic@cslog.rs',
  },
  {
    sig: 'vladimir-micic-email-potpis-beli.png',
    name: 'Vladimir Mićić',
    role: 'Operativni tim',
    phone: '+381 63 261 105',
    email: 'vladimir.micic@cslog.rs',
  },
  {
    sig: 'bozana-bucevac-email-potpis-beli.png',
    name: 'Božana Bučevac',
    role: 'Administracija',
    phone: '+381 69 209 6751',
    email: 'bozana.bucevac@cslog.rs',
  },
]

const CARD_W = 460
const CARD_H = 340
const SIG_BOX_H = 110
const PAD = 36

const PHONE_PATH = 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.06 6.06l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z'

const MAIL_RECT = '<rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="#0d0d0d" stroke-width="2.5"/>'
const MAIL_PATH = '<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" fill="none" stroke="#0d0d0d" stroke-width="2.5" stroke-linecap="round"/>'

function card(member, i) {
  const x = i * CARD_W
  const sigPath = path.join(SIG_DIR, member.sig)
  const sigB64 = fs.readFileSync(sigPath).toString('base64')

  return `
  <g transform="translate(${x}, 0)">
    <!-- Signature -->
    <image xlink:href="data:image/png;base64,${sigB64}"
           href="data:image/png;base64,${sigB64}"
           x="${PAD}" y="${PAD}"
           width="${CARD_W - PAD * 2}" height="${SIG_BOX_H}"
           preserveAspectRatio="xMinYMax meet"/>

    <!-- Name -->
    <text x="${PAD}" y="190" font-family="Inter, Arial, sans-serif"
          font-size="22" font-weight="700" fill="#ffffff">${member.name}</text>

    <!-- Role -->
    <text x="${PAD}" y="214" font-family="Inter, Arial, sans-serif"
          font-size="10.5" font-weight="600" letter-spacing="2.2" fill="#c5d000">${member.role.toUpperCase()}</text>

    <!-- Phone -->
    <circle cx="${PAD + 14}" cy="252" r="14" fill="#c5d000"/>
    <g transform="translate(${PAD + 4}, 242) scale(0.83)">
      <path d="${PHONE_PATH}" fill="none" stroke="#0d0d0d" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    <text x="${PAD + 40}" y="257" font-family="Inter, Arial, sans-serif"
          font-size="14.5" fill="#ffffff">${member.phone}</text>

    <!-- Email -->
    <circle cx="${PAD + 14}" cy="292" r="14" fill="#c5d000"/>
    <g transform="translate(${PAD + 4}, 282) scale(0.83)">
      ${MAIL_RECT}
      ${MAIL_PATH}
    </g>
    <text x="${PAD + 40}" y="297" font-family="Inter, Arial, sans-serif"
          font-size="14.5" fill="#ffffff">${member.email}</text>
  </g>`
}

const totalW = team.length * CARD_W
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink"
     viewBox="0 0 ${totalW} ${CARD_H}"
     width="${totalW}" height="${CARD_H}">
  <title>CSLOG kontakt tim</title>
${team.map(card).join('\n')}
</svg>
`

fs.writeFileSync(OUT, svg)
console.log(`✓ ${OUT} (${(svg.length / 1024).toFixed(1)} KB)`)
