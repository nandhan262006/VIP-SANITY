import { sanityFetch } from '@/sanity/lib/live'
import { GALLERY_QUERY, GALLERY_SLUGS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { stegaClean } from '@sanity/client/stega'

export async function generateStaticParams() {
  try {
    const { data } = await sanityFetch({ query: GALLERY_SLUGS_QUERY, perspective: 'published', stega: false })
    return (data || []).map((g: any) => ({ slug: g.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  try {
    const { data } = await sanityFetch({ query: GALLERY_QUERY, params: { slug }, stega: false })
    if (!data) return {}
    return {
      title: `${data.title} | VIP Studio`,
      description: data.description,
    }
  } catch {
    return { title: 'Portfolio | VIP Studio' }
  }
}

export default async function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  let gallery: any = null
  try {
    const res = await sanityFetch({ query: GALLERY_QUERY, params: { slug } })
    gallery = res.data
  } catch {
    gallery = null
  }

  if (!gallery) notFound()

  const allImages = gallery.images || []

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <Link
        href="/portfolio"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8"
      >
        &larr; Back to Portfolio
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">{gallery.title}</h1>
        {gallery.categoryTitle && (
          <span className="inline-block text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {gallery.categoryTitle}
          </span>
        )}
        {gallery.description && (
          <p className="text-gray-600 mt-4 max-w-2xl">{gallery.description}</p>
        )}
        {gallery.date && (
          <p className="text-sm text-gray-400 mt-2">{gallery.date.slice(0, 10)}</p>
        )}
      </div>

      <div className="space-y-6">
        {allImages.map((img: any, i: number) => (
          <div key={i} className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-gray-100">
            {img?.url && (
              <Image
                src={urlFor(img).width(1200).height(750).url()}
                alt={`${gallery.title} - Image ${i + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority={i === 0}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
