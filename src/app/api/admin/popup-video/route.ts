import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const video = await prisma.popupVideo.findFirst({ orderBy: { id: 'asc' } })
  return NextResponse.json(video)
}

export async function PUT(req: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await req.json()
    const existing = await prisma.popupVideo.findFirst({ orderBy: { id: 'asc' } })
    if (existing) {
      const video = await prisma.popupVideo.update({ where: { id: existing.id }, data })
      return NextResponse.json(video)
    }
    const video = await prisma.popupVideo.create({ data })
    return NextResponse.json(video, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to update popup video' }, { status: 500 })
  }
}
