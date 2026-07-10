import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://vipstudios.in'

const GALLERY_PAGES = [
  { slug: 'bridal', updated: new Date('2025-12-01') },
  { slug: 'candid', updated: new Date('2025-11-15') },
  { slug: 'engagement', updated: new Date('2025-10-20') },
  { slug: 'wedding', updated: new Date('2025-09-10') },
  { slug: 'prewedding', updated: new Date('2025-08-05') },
  { slug: 'events', updated: new Date('2025-07-18') },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 1 },
    { url: `${BASE_URL}/portfolio`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/gallery`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },

    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/build-your-quote`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ]

  const galleryPages = GALLERY_PAGES.map((g) => ({
    url: `${BASE_URL}/portfolio/${g.slug}`,
    lastModified: g.updated,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...galleryPages]
}
