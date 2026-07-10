import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const stats = await prisma.stat.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(stats)
}

export async function POST(req: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await req.json()
    const stat = await prisma.stat.create({ data })
    return NextResponse.json(stat, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create stat' }, { status: 500 })
  }
}
