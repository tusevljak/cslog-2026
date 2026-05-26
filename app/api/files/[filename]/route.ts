import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'

type Params = { params: Promise<{ filename: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const { filename } = await params
    // Security: only allow safe filenames
    if (!/^[\w\-]+\.webp$/.test(filename)) {
      return NextResponse.json({ error: 'Invalid filename' }, { status: 400 })
    }
    const buffer = await readFile(join('/tmp/uploads', filename))
    return new NextResponse(buffer, {
      headers: { 'Content-Type': 'image/webp', 'Cache-Control': 'public, max-age=31536000' },
    })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
