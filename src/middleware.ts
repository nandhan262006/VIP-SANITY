import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

const ADMIN_LOGIN = '/admin/login'
const ADMIN_ROOT = '/admin'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAdminPage = pathname.startsWith('/admin')
  const isAdminApi = pathname.startsWith('/api/admin')

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next()
  }

  const token = request.cookies.get('admin_token')?.value
  const isAuthenticated = token && await verifyToken(token)

  if (pathname === ADMIN_LOGIN) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(ADMIN_ROOT, request.url))
    }
    return NextResponse.next()
  }

  if (!isAuthenticated) {
    if (isAdminApi) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.redirect(new URL(ADMIN_LOGIN, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
