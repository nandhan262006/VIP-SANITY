import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({ orderBy: { order: 'asc' } })
    if (images.length === 0) {
      const defaultImages = [
        { src: '/BRIDAL.png', galleryTitle: 'Bridal Photography', gallerySlug: 'bridal' },
        { src: '/CANDID.png', galleryTitle: 'Candid Photography', gallerySlug: 'candid' },
        { src: '/ENGAGEMENT.png', galleryTitle: 'Engagement Photography', gallerySlug: 'engagement' },
        { src: '/WEDDING.png', galleryTitle: 'Wedding Cinematography', gallerySlug: 'wedding' },
        { src: '/PREWEDDING.png', galleryTitle: 'Pre-Wedding Shoot', gallerySlug: 'prewedding' },
        { src: '/CORPERATE.png', galleryTitle: 'Event Photography', gallerySlug: 'events' },
        { src: '/HERO.png', galleryTitle: 'Bridal Photography', gallerySlug: 'bridal' },
        { src: '/MATERNITY.png', galleryTitle: 'Candid Photography', gallerySlug: 'candid' },
        { src: '/BRIDAL.png', galleryTitle: 'Bridal Photography', gallerySlug: 'bridal' },
      ]
      return NextResponse.json(defaultImages)
    }
    return NextResponse.json(images.map(g => ({ src: g.src, galleryTitle: g.galleryTitle, gallerySlug: g.gallerySlug })))
  } catch {
    return NextResponse.json([], { status: 500 })
  }
}
