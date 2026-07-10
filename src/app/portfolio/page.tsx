import Link from 'next/link'
import type { Metadata } from 'next'
import PortfolioGrid from '@/components/PortfolioGrid'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

const defaultGalleries = [
  { _id: '1', slug: 'bridal', title: 'Bridal Photography', categoryTitle: 'Bridal', image: '/BRIDAL.png', date: '2025-12-01' },
  { _id: '2', slug: 'candid', title: 'Candid Photography', categoryTitle: 'Candid', image: '/CANDID.png', date: '2025-11-15' },
  { _id: '3', slug: 'engagement', title: 'Engagement Photography', categoryTitle: 'Engagement', image: '/ENGAGEMENT.png', date: '2025-10-20' },
  { _id: '4', slug: 'wedding', title: 'Wedding Cinematography', categoryTitle: 'Wedding', image: '/WEDDING.png', date: '2025-09-10' },
  { _id: '5', slug: 'prewedding', title: 'Pre-Wedding Shoot', categoryTitle: 'Pre-Wedding', image: '/PREWEDDING.png', date: '2025-08-05' },
  { _id: '6', slug: 'events', title: 'Event Photography', categoryTitle: 'Events', image: '/CORPERATE.png', date: '2025-07-18' },
]

const defaultCategories = [
  { _id: 'c1', title: 'Bridal', slug: 'bridal' },
  { _id: 'c2', title: 'Candid', slug: 'candid' },
  { _id: 'c3', title: 'Engagement', slug: 'engagement' },
  { _id: 'c4', title: 'Wedding', slug: 'wedding' },
  { _id: 'c5', title: 'Pre-Wedding', slug: 'prewedding' },
  { _id: 'c6', title: 'Events', slug: 'events' },
]

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Portfolio',
    description: 'Explore our wedding photography and cinematography portfolio. Browse through bridal, engagement, candid, and event galleries by VIP Studio in Nellore.',
    openGraph: {
      title: 'Portfolio | VIP Studio Wedding Photography',
      description: 'Browse our wedding photography and cinematography portfolio in Nellore. Bridal, candid, engagement, and event photography by National Award Winner Vijay.',
      url: '/portfolio',
      siteName: 'VIP Studio',
      locale: 'en_IN',
      type: 'website',
      images: [{ url: '/BRIDAL.png', width: 800, height: 600, alt: 'VIP Studio Wedding Photography Portfolio' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Portfolio | VIP Studio Wedding Photography',
      description: 'Browse our wedding photography and cinematography portfolio in Nellore.',
      images: ['/BRIDAL.png'],
    },
  }
}

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category: categoryParam } = await searchParams
  const activeCategory = categoryParam || ''

  let galleryImages: any[]
  try {
    galleryImages = await prisma.galleryImage.findMany({ orderBy: { createdAt: 'desc' } })
  } catch { galleryImages = [] }
  const items = galleryImages.length > 0
    ? galleryImages.map(g => ({
        _id: String(g.id),
        slug: g.gallerySlug,
        title: g.galleryTitle,
        categoryTitle: g.galleryTitle,
        image: g.src,
        date: '',
      }))
    : defaultGalleries

  const cats = galleryImages.length > 0
    ? [...new Set(galleryImages.map(g => g.galleryTitle).filter(Boolean) as string[])].map((t, i) => ({
        _id: `c${i}`,
        title: t,
        slug: t.toLowerCase().replace(/\s+/g, ''),
      }))
    : defaultCategories

  const filtered = activeCategory
    ? items.filter((g: any) => g.slug === activeCategory || g.categoryTitle?.toLowerCase().replace(/\s+/g, '') === activeCategory)
    : items

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Portfolio</h1>
      <p className="text-gray-500 mb-8">Explore our work</p>

      <div className="flex flex-wrap gap-3 mb-12">
        <Link
          href="/portfolio"
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${
            !activeCategory
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </Link>
        {cats.map((cat: any) => (
          <Link
            key={cat._id}
            href={`/portfolio?category=${cat.slug}`}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              activeCategory === cat.slug
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat.title}
          </Link>
        ))}
      </div>

      {filtered.length > 0 ? (
        <PortfolioGrid items={filtered} single={filtered.length === 1} />
      ) : (
        <p className="text-gray-400 text-center py-20">No galleries found.</p>
      )}
    </div>
  )
}
