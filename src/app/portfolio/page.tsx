import { sanityFetch } from '@/sanity/lib/live'
import { GALLERIES_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'
import Image from 'next/image'
import { stegaClean } from '@sanity/client/stega'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Explore our wedding photography and cinematography portfolio. Browse through bridal, engagement, candid, and event galleries by VIP Studio.',
  openGraph: {
    title: 'Portfolio | VIP Studio Wedding Photography',
    description: 'Browse our wedding photography and cinematography portfolio in Nellore. Bridal, candid, engagement, and event photography.',
  },
}

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category: categoryParam } = await searchParams
  const { data } = await sanityFetch({ query: GALLERIES_QUERY })
  const { categories, galleries } = data || {}

  const activeCategory = stegaClean(categoryParam || '')

  const filtered = activeCategory
    ? galleries?.filter((g: any) => stegaClean(g.categorySlug) === activeCategory)
    : galleries

  return (
    <div className="py-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-2">Portfolio</h1>
      <p className="text-gray-500 mb-8">Explore our work</p>

      {categories && categories.length > 0 && (
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
          {categories.map((cat: any) => {
            const slug = stegaClean(cat.slug)
            return (
              <Link
                key={cat._id}
                href={`/portfolio?category=${slug}`}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                  activeCategory === slug
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.title}
              </Link>
            )
          })}
        </div>
      )}

      {filtered && filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item: any) => (
            <Link
              key={item._id}
              href={`/portfolio/${item.slug}`}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100"
            >
              {item.coverImage?.url && (
                <Image
                  src={urlFor(item.coverImage).width(600).height(450).url()}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-2 group-hover:translate-y-0 transition duration-300">
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-sm text-gray-300">{item.date?.slice(0, 10)}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-20">No galleries found.</p>
      )}
    </div>
  )
}
