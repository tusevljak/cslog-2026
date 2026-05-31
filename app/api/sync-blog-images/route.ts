import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'
import { revalidatePath } from 'next/cache'

function isAdmin(req: NextRequest) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

// Encode filename for use in URL / markdown
function b(filename: string) {
  return '/blog/' + encodeURIComponent(filename)
}

// YouTube iframe embed (works in markdown via marked())
function yt(videoId: string) {
  return `\n\n<iframe width="100%" style="aspect-ratio:16/9;border:0;margin:2rem 0" src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>\n\n`
}

// Image markdown lines
function imgs(filenames: string[]) {
  return '\n\n' + filenames.map(f => `![](${b(f)})`).join('\n\n') + '\n'
}

type PostMap = {
  cover: string
  textImages?: string[]
  youtube?: string
}

const MAP: Record<string, PostMap> = {
  'od-beograda-do-kostolca': {
    cover: 'Od Beograda do Kostolca.jpg',
    textImages: [
      'Od Beograda do Kostolca tekst slika 1.jpg',
      'Od Beograda do Kostolca tekst slika 2.jpg',
    ],
  },
  'srbija-tirol-austrija-teret-sirine-5-m': {
    cover: 'Srbija - Tirol, Austrija - Teret širine 5 m.jpeg',
    textImages: [
      'Srbija - Tirol, Austrija - Teret širine 5 m tekst slika 1.jpeg',
      'Srbija - Tirol, Austrija - Teret širine 5 m tekst slika 2.jpeg',
    ],
    youtube: 'MDeyrpHU0HM',
  },
  '2215': {
    cover: 'CSLOG vesti Novi tegljač, šasija.jpeg',
    textImages: [
      'CSLOG vesti Novi tegljač, šasija tekst slika 1.jpeg',
      'CSLOG vesti Novi tegljač, šasija tekst slika 2.jpeg',
    ],
  },
  'kada-je-transpot-zaista-specijalan': {
    cover: 'Kada je transpot zaista specijalan.jpg',
    textImages: [
      'Kada je transpot zaista specijalan tekst slika 1.jpeg',
    ],
    youtube: '7Q93KYqwyao',
  },
  'cslog-vesti-novi-tegljac-i-prikolica': {
    cover: 'CSLOG VESTI Novi tegljač i prikolica.jpg',
    textImages: [
      'CSLOG VESTI Novi tegljač i prikolica tekst slika 1.jpg',
      'CSLOG VESTI Novi tegljač i prikolica tekst slika 2.jpg',
    ],
  },
  'od-antverpena-do-beograda': {
    cover: 'Od Antverpena do Beograda.jpg',
  },
  'od-beograda-do-pavlodara': {
    cover: 'Od Beograda do Pavlodara.jpg',
  },
  'od-beograda-do-kazahstana': {
    cover: 'Og Beograda do Kazahstana.jpg',
  },
}

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let updated = 0
  let skipped = 0

  for (const [slug, data] of Object.entries(MAP)) {
    // Fetch current post
    const rows = await sql`
      SELECT id, content, cover_image FROM blog_posts WHERE slug = ${slug}
    ` as { id: number; content: string; cover_image: string }[]

    if (!rows.length) { skipped++; continue }

    const post = rows[0]
    const coverUrl = b(data.cover)

    // Build content additions (only if not already present)
    let newContent = post.content ?? ''
    const MARKER = '<!-- synced -->'

    if (!newContent.includes(MARKER)) {
      let addition = ''

      if (data.youtube) {
        addition += yt(data.youtube)
      }

      if (data.textImages?.length) {
        addition += imgs(data.textImages)
      }

      if (addition) {
        newContent = newContent + '\n\n' + MARKER + addition
      }
    }

    await sql`
      UPDATE blog_posts
      SET cover_image = ${coverUrl},
          content     = ${newContent}
      WHERE id = ${post.id}
    `
    updated++
  }

  revalidatePath('/')
  revalidatePath('/blog')

  return NextResponse.json({ updated, skipped })
}
