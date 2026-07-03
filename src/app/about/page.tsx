import { sanityFetch } from '@/sanity/lib/live'
import { ABOUT_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'

type AboutData = {
  title?: string
  bio?: string
  story?: string
  photographerName?: string
  experience?: number
  awards?: string[]
  profileImage?: { url?: string; lqip?: string; dimensions?: { width: number; height: number } }
  stats?: { label: string; value: string }[]
}

export async function generateMetadata() {
  const { data } = await sanityFetch<AboutData>({ query: ABOUT_QUERY, stega: false })
  return {
    title: 'About',
    description: data?.bio || 'Learn about VIP Studio — National Award Winning Wedding Photography by Vijay in Nellore.',
    openGraph: {
      title: `About ${data?.photographerName || 'VIP Studio'} | Wedding Photography Nellore`,
      description: data?.bio?.slice(0, 160) || 'National Award Winning Wedding Photographer based in Nellore with 22+ years of experience.',
    },
  }
}

export default async function AboutPage() {
  const { data: about } = await sanityFetch<AboutData>({ query: ABOUT_QUERY })

  if (!about) {
    return (
      <div className="py-20 px-4 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">About</h1>
        <p className="text-gray-500">About page content coming soon.</p>
      </div>
    )
  }

  return (
    <div className="py-20 px-4 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">About</h1>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {about.profileImage?.url && (
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={urlFor(about.profileImage).width(600).height(800).url()}
              alt={about.photographerName || 'VIP Studio Photographer Vijay'}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div>
          {about.photographerName && (
            <h2 className="text-2xl font-semibold mb-4">{about.photographerName}</h2>
          )}
          {about.bio && (
            <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">{about.bio}</p>
          )}
          {about.story && (
            <p className="text-gray-600 leading-relaxed mb-6 whitespace-pre-line">{about.story}</p>
          )}

          {about.experience && (
            <p className="text-lg font-medium mb-4">{about.experience}+ Years Experience</p>
          )}

          {about.awards && about.awards.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Awards</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {about.awards.map((award: string, i: number) => (
                  <li key={i}>{award}</li>
                ))}
              </ul>
            </div>
          )}

          {about.stats && about.stats.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-8">
              {about.stats.map((stat: { label: string; value: string }, i: number) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
