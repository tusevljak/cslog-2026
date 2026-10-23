import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Prosleđuje putanju root layout-u (headers() čita REQUEST headere) da bi
// <html lang> bio "en" na /en stranicama.
export function proxy(req: NextRequest) {
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-pathname', req.nextUrl.pathname)
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next|api|favicon).*)'],
}
