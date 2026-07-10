import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAwards, getStats } from '@/lib/site'

export const dynamic = 'force-dynamic'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vipstudios.in'

const defaultAwards = [
  { year: '2010', title: 'Wedding Photographer of the Year', org: 'Kodak', description: 'Recognized as the top wedding photographer in India for exceptional candid wedding photography and storytelling through the lens.' },
  { year: '2009', title: 'National Award — Wedding Photography', org: 'Government of India', description: 'Prestigious national recognition for outstanding contribution to wedding photography and cinematography.' },
  { year: '2015', title: '15 Years of Excellence', org: 'VIP Studio', description: 'Celebrating a decade and a half of capturing beautiful wedding stories across Nellore and Andhra Pradesh.' },
  { year: '2020', title: '20+ Years of Service Excellence', org: 'VIP Studio', description: 'Two decades of trusted wedding photography services, earning the reputation as the best photographer in Nellore.' },
  { year: '2024', title: 'Top Rated Photographer Nellore', org: 'Google Reviews', description: 'Consistently rated 4.9 stars by couples and families for exceptional wedding photography and cinematography.' },
]

const defaultStats = [
  { number: '25+', label: 'Years of Experience', desc: 'Serving Nellore since 2000' },
  { number: '500+', label: 'Weddings Captured', desc: 'Trusted by families across Andhra' },
  { number: '4.9', label: 'Google Rating', desc: '180+ 5-star reviews' },
  { number: '15+', label: 'Award Wins', desc: 'National & industry recognition' },
]

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Best Photographer in Nellore — Vijay Kumar | Awards & Experience',
    description: 'Meet Vijay Kumar — the National Award Winning best photographer in Nellore. Wedding Photographer of the Year 2010 (Kodak), 25+ years of excellence, 500+ weddings. Award-winning candid wedding photography, cinematography & bridal portraits in Nellore, Andhra Pradesh.',
    openGraph: {
      title: 'Best Photographer in Nellore — Vijay Kumar | National Award Winning Photographer',
      description: 'Meet Vijay Kumar — National Award Winning best photographer in Nellore. Wedding Photographer of the Year 2010 (Kodak) with 25+ years and 500+ weddings.',
      url: '/about',
      siteName: 'VIP Studio — Best Photographer in Nellore',
      locale: 'en_IN',
      type: 'profile',
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'Vijay Kumar — Best Photographer in Nellore, VIP Studio' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Best Photographer in Nellore — Vijay Kumar | Award Winning',
      description: 'National Award Winning best photographer in Nellore. Wedding Photographer of the Year 2010. Meet Vijay Kumar.',
      images: ['/logo.png'],
    },
    alternates: {
      canonical: `${baseUrl}/about`,
    },
  }
}

export default async function AboutPage() {
  const [rawAwards, rawStats] = await Promise.all([getAwards(), getStats()])
  const awards = rawAwards.length > 0 ? rawAwards : defaultAwards
  const stats = rawStats.length > 0 ? rawStats : defaultStats
  const aboutImages = ['/unnamed.webp', '/unnamed (1).webp', '/unnamed (2).webp']

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
          { '@type': 'ListItem', position: 2, name: 'About — Best Photographer in Nellore', item: `${baseUrl}/about` },
        ],
      },
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#person`,
        name: 'Vijay Kumar',
        givenName: 'Vijay',
        familyName: 'Kumar',
        jobTitle: 'Best Photographer in Nellore | CEO & Wedding Photographer',
        description: 'National Award Winning best photographer in Nellore. 25+ years of experience in candid wedding photography.',
        image: `${baseUrl}/logo.png`,
        url: baseUrl,
        award: awards.map((a: any) => a.title),
      },
    ],
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />

      <section className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-red py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(204,0,0,0.2),transparent_60%)]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center text-white">
          <span className="text-red font-semibold text-sm uppercase tracking-widest">About</span>
          <h1 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight">
            Best Photographer in Nellore — Vijay Kumar
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            National Award Winning Wedding Photographer with 25+ years of experience.
            Wedding Photographer of the Year 2010 (Kodak). Trusted by 500+ families
            across Nellore and Andhra Pradesh for candid wedding photography, cinematography,
            bridal portraits, and engagement shoots.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 shadow-xl">
            <Image
              src={aboutImages[0]}
              alt="Vijay Kumar — Best Photographer in Nellore, VIP Studio"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <p className="text-white text-xl font-bold">Vijay Kumar</p>
              <p className="text-red text-sm">National Award Winning Photographer | Nellore</p>
            </div>
          </div>
          <div className="space-y-6">
            <span className="text-red font-semibold text-sm uppercase tracking-widest">The Photographer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Why I&apos;m Called the <span className="text-red">Best Photographer in Nellore</span>
            </h2>
            <div className="space-y-4 text-gray-500 leading-relaxed">
              <p>
                I&apos;m <strong className="text-gray-900">Vijay Kumar</strong>, the founder and lead photographer at{' '}
                <strong className="text-gray-900">VIP Studio</strong>. For over{' '}
                <strong className="text-gray-900">25 years</strong>, I&apos;ve been capturing
                wedding stories across Nellore, Andhra Pradesh, and beyond.
              </p>
              <p>
                Before VIP Studio, I earned a <strong className="text-gray-900">National Award</strong>{' '}
                for Wedding Photography — a recognition that set the foundation for my career as
                the <strong className="text-gray-900">best photographer in Nellore</strong>.
                In 2010, Kodak honored me as{' '}
                <strong className="text-gray-900">Wedding Photographer of the Year</strong>,
                a testament to my dedication to candid wedding photography and visual storytelling.
              </p>
              <p>
                I believe the best photographs come from capturing people exactly as they are —
                real emotions, real moments, and real stories. Whether it&apos;s a grand wedding,
                an intimate engagement, or a creative pre-wedding shoot, my approach combines
                technical excellence with genuine human connection.
              </p>
              <p>
                Today, I lead a team of passionate photographers and cinematographers who share
                my vision. Together, we&apos;ve photographed over{' '}
                <strong className="text-gray-900">500 weddings</strong>, earning the trust of
                families across Nellore and the title of the{' '}
                <strong className="text-gray-900">best photographer in Nellore</strong>.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/portfolio"
                className="bg-red text-white px-8 py-3.5 rounded-full font-medium hover:bg-red-dark transition shadow-lg shadow-red/30"
              >
                View Portfolio
              </Link>
              <Link
                href="/contact"
                className="border-2 border-red text-red px-8 py-3.5 rounded-full font-medium hover:bg-red hover:text-white transition"
              >
                Book a Session
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-red font-semibold text-sm uppercase tracking-widest">Recognition</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-gray-900">
              Awards & Achievements
            </h2>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
              Recognized as the best photographer in Nellore with national awards and industry accolades
              that reflect years of dedication to wedding photography excellence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award: any, i: number) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg hover:border-red/20 transition group"
              >
                <div className="text-red font-bold text-lg mb-2">{award.year}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-red transition">
                  {award.title}
                </h3>
                <p className="text-sm text-gray-500 mb-3">{award.org}</p>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {award.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-red font-semibold text-sm uppercase tracking-widest">By the Numbers</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 text-gray-900">
              Why I&apos;m the Best Photographer in Nellore
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat: any, i: number) => (
              <div key={i} className="text-center p-6 rounded-xl bg-surface border border-gray-200 hover:shadow-lg transition">
                <div className="text-3xl md:text-5xl font-bold text-red mb-2">{stat.number}</div>
                <div className="font-semibold text-gray-900 text-sm mb-1">{stat.label}</div>
                <div className="text-gray-500 text-xs">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-900 to-red relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(204,0,0,0.15),transparent_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Book the Best Photographer in Nellore
          </h2>
          <p className="text-lg text-gray-300 mb-10 leading-relaxed">
            Ready to have the best photographer in Nellore capture your wedding story?
            Vijay Kumar and the VIP Studio team are just a message away.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/919299950999"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red text-white px-10 py-4 rounded-full font-medium hover:bg-red-dark transition text-lg shadow-lg shadow-red/30 inline-flex items-center gap-2"
            >
              Book via WhatsApp
            </a>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-10 py-4 rounded-full font-medium hover:bg-white hover:text-gray-900 transition text-lg"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
