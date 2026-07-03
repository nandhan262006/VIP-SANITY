import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://vip-studio.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let galleries: { slug: string; updated: string }[] = []
  try {
    const { client } = await import('@/sanity/lib/client')
    galleries = await client().fetch<{ slug: string; updated: string }[]>(
      `*[_type == "gallery" && defined(slug.current)]{"slug": slug.current, "updated": _updatedAt} | order(date desc)`
    )
  } catch {
    // Sanity env vars not configured — return static pages only
  }

  const staticPages = [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 1 },
    { url: `${BASE_URL}/portfolio`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/gallery`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
  ]

  const galleryPages = galleries.map((g) => ({
    url: `${BASE_URL}/portfolio/${g.slug}`,
    lastModified: new Date(g.updated),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...galleryPages]
}
