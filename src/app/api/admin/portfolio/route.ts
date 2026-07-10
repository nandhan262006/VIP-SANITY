import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const items = await prisma.portfolioItem.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(items)
}

export async function POST(req: Request) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const body = await req.json()
  const item = await prisma.portfolioItem.create({ data: body })
  return NextResponse.json(item)
}
