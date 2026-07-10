import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const awards = await prisma.award.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(awards)
}

export async function POST(req: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await req.json()
    const award = await prisma.award.create({ data })
    return NextResponse.json(award, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create award' }, { status: 500 })
  }
}
