import { NextResponse } from 'next/server'
import { createToken, validatePassword } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    const { password } = await req.json()
    if (!validatePassword(password)) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
    }

    const token = await createToken()
    const cookieStore = await cookies()
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
