import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

function isAdmin(req: NextRequest) {
  return req.headers.get('x-admin-password') === process.env.ADMIN_PASSWORD
}

export async function POST(req: NextRequest) {
  try {
    if (!isAdmin(req)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) {
      return NextResponse.json({ error: 'Nema fajla.' }, { status: 400 })
    }

    const type = (formData.get('type') as string) || 'blog'
    const maxWidth = type === 'gallery' ? 1600 : 1920

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const webpBuffer = await sharp(buffer)
      .resize(maxWidth, undefined, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer()

    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.webp`

    // Try public/uploads (works on Hetzner/local), fall back to /tmp (Vercel)
    let url: string
    try {
      const dir = join(process.cwd(), 'public', 'uploads')
      await mkdir(dir, { recursive: true })
      await writeFile(join(dir, filename), webpBuffer)
      url = `/uploads/${filename}`
    } catch {
      // Vercel: write to /tmp and serve via /api/files
      const dir = '/tmp/uploads'
      await mkdir(dir, { recursive: true })
      await writeFile(join(dir, filename), webpBuffer)
      url = `/api/files/${filename}`
    }

    return NextResponse.json({ url })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
