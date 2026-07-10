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
  try {
    const { id, read } = await req.json()
    if (typeof id !== 'number' || typeof read !== 'boolean') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    const contact = await prisma.contactSubmission.update({ where: { id }, data: { read } })
    return NextResponse.json(contact)
  } catch {
    return NextResponse.json({ error: 'Failed to update contact' }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  if (!(await getSession())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { id } = await req.json()
    if (typeof id !== 'number') {
      return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
    }
    await prisma.contactSubmission.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to delete contact' }, { status: 500 })
  }
}
