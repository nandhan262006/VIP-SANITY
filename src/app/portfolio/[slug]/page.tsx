import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { prisma } from '@/lib/prisma'

const fallbackGalleries: Record<string, { title: string; categoryTitle: string; description: string; date: string; images: string[] }> = {
  bridal: { title: 'Bridal Photography', categoryTitle: 'Bridal', description: 'Elegant bridal portraits that capture every detail of your special day, from the intricate jewellery to the joyous tears.', date: '2025-12-01', images: ['/BRIDAL.png', '/BRIDAL.png', '/HERO.png'] },
  candid: { title: 'Candid Photography', categoryTitle: 'Candid', description: 'Natural, unposed moments that reflect genuine emotions — the laughter, the tears, the pure joy.', date: '2025-11-15', images: ['/CANDID.png', '/CANDID.png', '/HERO.png'] },
  engagement: { title: 'Engagement Photography', categoryTitle: 'Engagement', description: 'Beautiful engagement shoots that tell your love story against stunning backdrops.', date: '2025-10-20', images: ['/ENGAGEMENT.png', '/ENGAGEMENT.png', '/HERO.png'] },
  wedding: { title: 'Wedding Cinematography', categoryTitle: 'Wedding', description: 'Cinematic wedding films that bring your most cherished memories to life with stunning visuals.', date: '2025-09-10', images: ['/WEDDING.png', '/WEDDING.png', '/HERO.png'] },
  prewedding: { title: 'Pre-Wedding Shoot', categoryTitle: 'Pre-Wedding', description: 'Creative pre-wedding sessions at handpicked locations that capture your unique bond.', date: '2025-08-05', images: ['/PREWEDDING.png', '/PREWEDDING.png', '/HERO.png'] },
  events: { title: 'Event Photography', categoryTitle: 'Events', description: 'Professional coverage for engagements, receptions, and all your special celebrations.', date: '2025-07-18', images: ['/CORPERATE.png', '/CORPERATE.png', '/HERO.png'] },
}

export async function generateStaticParams() {
  const items = await prisma.portfolioItem.findMany({ select: { slug: true } })
  if (items.length > 0) {
    return items.map(p => ({ slug: p.slug }))
  }
  return Object.keys(fallbackGalleries).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vipstudios.in'

  const item = await prisma.portfolioItem.findUnique({ where: { slug } })
  if (item) {
    return {
      title: `${item.title} | VIP Studio`,
      description: item.description || '',
      openGraph: {
        title: `${item.title} | VIP Studio Wedding Photography`,
        description: item.description || '',
        url: `${baseUrl}/portfolio/${slug}`,
        siteName: 'VIP Studio',
        locale: 'en_IN',
        type: 'website',
        images: [{ url: item.coverImage || '/logo.png', width: 800, height: 600, alt: item.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${item.title} | VIP Studio`,
        description: item.description || '',
        images: [item.coverImage || '/logo.png'],
      },
    }
  }

  const gallery = fallbackGalleries[slug]
  if (!gallery) return {}
  return {
    title: `${gallery.title} | VIP Studio`,
    description: gallery.description,
    openGraph: {
      title: `${gallery.title} | VIP Studio Wedding Photography`,
      description: gallery.description,
      url: `${baseUrl}/portfolio/${slug}`,
      siteName: 'VIP Studio',
      locale: 'en_IN',
      type: 'website',
      images: [{ url: gallery.images[0], width: 800, height: 600, alt: gallery.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${gallery.title} | VIP Studio`,
      description: gallery.description,
      images: [gallery.images[0]],
    },
  }
}

export default async function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vipstudios.in'

  const item = await prisma.portfolioItem.findUnique({ where: { slug } })

  let title: string, categoryTitle: string, description: string, date: string, images: string[]

  if (item) {
    title = item.title
    categoryTitle = item.category || ''
    description = item.description || ''
    date = item.date || ''
    const parsed = item.images ? JSON.parse(item.images) : []
    images = parsed.length > 0 ? parsed : item.coverImage ? [item.coverImage] : []
  } else {
    const fallback = fallbackGalleries[slug]
    if (!fallback) notFound()
    title = fallback.title
    categoryTitle = fallback.categoryTitle
    description = fallback.description
    date = fallback.date
    images = fallback.images
  }

  const imageGalleryJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: `${title} by VIP Studio`,
    description,
    url: `${baseUrl}/portfolio/${slug}`,
    author: { '@type': 'Organization', name: 'VIP Studio' },
    image: images.map((img) => img.startsWith('http') || img.startsWith('/') ? `${img.startsWith('http') ? '' : baseUrl}${img}` : img),
  }

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGalleryJsonLd) }}
      />

      <Link
        href="/portfolio"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8"
      >
        &larr; Back to Portfolio
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        <span className="inline-block text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          {categoryTitle}
        </span>
        <p className="text-gray-600 mt-4 max-w-2xl">{description}</p>
        <p className="text-sm text-gray-400 mt-2">{date}</p>
      </div>

      <div className="space-y-6">
        {images.filter(Boolean).map((img, i) => (
          <div key={i} className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={img}
              alt={`${title} - ${categoryTitle} photography by VIP Studio`}
              fill
              className="object-contain"
              sizes="100vw"
              priority={i === 0}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
