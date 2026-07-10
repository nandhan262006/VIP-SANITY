import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const slides = await prisma.heroSlide.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(slides)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch slides' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await req.json()
    const slide = await prisma.heroSlide.create({ data })
    return NextResponse.json(slide, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create slide' }, { status: 500 })
  }
}
