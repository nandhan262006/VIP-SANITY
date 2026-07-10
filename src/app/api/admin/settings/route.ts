import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const settings = await prisma.siteSetting.findMany()
  const map = Object.fromEntries(settings.map(s => [s.key, s.value]))
  return NextResponse.json(map)
}

export async function PUT(req: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const { key, value } = await req.json()
    if (!key || value === undefined) {
      return NextResponse.json({ error: 'key and value are required' }, { status: 400 })
    }
    const setting = await prisma.siteSetting.upsert({
      where: { key },
      update: { value },
      create: { key, value },
    })
    return NextResponse.json(setting)
  } catch {
    return NextResponse.json({ error: 'Failed to update setting' }, { status: 500 })
  }
}
