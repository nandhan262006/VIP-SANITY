import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

const ADMIN_LOGIN = '/admin/login'
const ADMIN_ROOT = '/admin'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  if (pathname === ADMIN_LOGIN) {
    const token = request.cookies.get('admin_token')?.value
    if (token && await verifyToken(token)) {
      return NextResponse.redirect(new URL(ADMIN_ROOT, request.url))
    }
    return NextResponse.next()
  }

  const token = request.cookies.get('admin_token')?.value
  if (!token || !(await verifyToken(token))) {
    return NextResponse.redirect(new URL(ADMIN_LOGIN, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
