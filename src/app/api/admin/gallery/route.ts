import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const images = await prisma.galleryImage.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(images)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch gallery images' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await req.json()
    const image = await prisma.galleryImage.create({ data })
    return NextResponse.json(image, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create gallery image' }, { status: 500 })
  }
}
