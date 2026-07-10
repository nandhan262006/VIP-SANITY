import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const contacts = await prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } })
  return NextResponse.json(contacts)
}

export async function PUT(req: Request) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id, read } = await req.json()
  const contact = await prisma.contactSubmission.update({ where: { id }, data: { read } })
  return NextResponse.json(contact)
}

export async function DELETE(req: Request) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  await prisma.contactSubmission.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
