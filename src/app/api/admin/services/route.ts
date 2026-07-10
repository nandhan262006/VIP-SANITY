import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const services = await prisma.service.findMany({ orderBy: { order: 'asc' } })
  return NextResponse.json(services)
}

export async function POST(req: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const data = await req.json()
    const service = await prisma.service.create({ data })
    return NextResponse.json(service, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}
