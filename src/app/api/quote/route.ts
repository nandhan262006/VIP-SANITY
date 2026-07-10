import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const { name, email, phone, date, venue, total, summary } = await req.json()
    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'name, email, phone are required' }, { status: 400 })
    }

    const summaryText = summary?.map((i: { name: string; qty: number; price: number }) =>
      `${i.name}${i.qty > 1 ? ` x${i.qty}` : ''}: ₹${i.price.toLocaleString('en-IN')}`
    ).join(', ') || ''

    const message = [
      `Wedding Quote Request`,
      date ? `Date: ${date}` : '',
      venue ? `Venue: ${venue}` : '',
      total ? `Total: ₹${total.toLocaleString('en-IN')}` : '',
      summaryText ? `Selected: ${summaryText}` : '',
    ].filter(Boolean).join('\n')

    const contact = await prisma.contactSubmission.create({
      data: { name, email, phone, message },
    })

    return NextResponse.json({ success: true, id: contact.id })
  } catch {
    return NextResponse.json({ error: 'Failed to save quote' }, { status: 500 })
  }
}
