import type { Metadata, Viewport } from 'next'
import { ThemeModeScript } from 'flowbite-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PopupVideo from '@/components/PopupVideo'
import { getPopupVideo } from '@/lib/site'
import './globals.css'

export const dynamic = 'force-dynamic'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#CC0000',
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vipstudios.in'
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: 'Best Photographer in Nellore | Vijay — VIP Studio Wedding Photography',
      template: '%s | VIP Studio — Best Photographer in Nellore',
    },
    description: 'National Award Winning Best Photographer in Nellore — Vijay Kumar of VIP Studio. 25+ years experience in candid wedding photography, cinematography, bridal portraits & event coverage. Wedding Photographer of the Year 2010 (Kodak). Book the top-rated photographer in Nellore, Andhra Pradesh.',
    keywords: [
      'best photographer in Nellore',
      'best wedding photographer Nellore',
      'top photographer Nellore',
      'candid photographer Nellore',
      'wedding photography Nellore',
      'wedding cinematography Nellore',
      'VIP Studio Nellore',
      'Vijay photographer Nellore',
      'National Award winning photographer Andhra Pradesh',
      'wedding photographer Andhra Pradesh',
      'photography services Nellore',
      'bridal photography Nellore',
      'engagement photographer Nellore',
      'pre-wedding shoot Nellore',
      'event photographer Nellore',
      'traditional wedding photography Andhra',
      'wedding films Nellore',
      'cineamatography Nellore',
      'best wedding photographer',
      'wedding photographer near me',
      'photographer in Nellore',
      'Vijay wedding photographer',
      'Kodak award photographer India',
    ],
    applicationName: 'VIP Studio - Best Photographer in Nellore',
    category: 'Wedding Photography & Cinematography',
    classification: 'Photography Services',
    openGraph: {
      title: 'Best Photographer in Nellore — VIP Studio | National Award Winning Wedding Photography',
      description: 'National Award Winning Best Photographer in Nellore. Vijay Kumar, Wedding Photographer of the Year 2010 (Kodak), 25+ years capturing wedding stories across Andhra Pradesh.',
      url: '/',
      siteName: 'VIP Studio - Best Photographer in Nellore',
      locale: 'en_IN',
      type: 'website',
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'VIP Studio — Best Photographer in Nellore | Wedding Photography' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Best Photographer in Nellore — VIP Studio | Award Winning Wedding Photography',
      description: 'National Award Winning Best Photographer in Nellore. Wedding Photographer of the Year 2010. Book Vijay Kumar for candid wedding photography.',
      images: ['/logo.png'],
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
    alternates: {
      canonical: baseUrl,
    },
    other: {
      'geo.region': 'IN-AP',
      'geo.placename': 'Nellore',
      'geo.position': '14.4426;79.9865',
      'ICBM': '14.4426, 79.9865',
    },
  }
}

const WHATSAPP_NUMBER = '919299950999'
const PHONE_NUMBER = '+919299950999'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vipstudios.in'
  const popup = await getPopupVideo()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'VIP Studio — Best Photographer in Nellore',
        description: 'National Award Winning Best Photographer in Nellore. Wedding Photography & Cinematography by Vijay Kumar.',
        publisher: { '@id': `${baseUrl}/#organization` },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'Person',
        '@id': `${baseUrl}/#person`,
        name: 'Vijay Kumar',
        givenName: 'Vijay',
        familyName: 'Kumar',
        jobTitle: 'Best Photographer in Nellore | CEO & Wedding Photographer',
        description: 'National Award Winning best photographer in Nellore with 25+ years of experience. Specialist in candid wedding photography, bridal portraits, and cinematography.',
        image: `${baseUrl}/logo.png`,
        url: baseUrl,
        telephone: '+919299950999',
        email: 'contact@vipstudio.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '26-1-1639, beside MGB Mall, Obulreddy Nagar, Dargamitta',
          addressLocality: 'Nellore',
          addressRegion: 'Andhra Pradesh',
          postalCode: '524003',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 14.4426,
          longitude: 79.9865,
        },
        award: [
          'National Award — Wedding Photography (India)',
          'Wedding Photographer of the Year 2010 — Kodak',
          '15 Years of Excellence — VIP Studio',
        ],
        knowsAbout: [
          'Wedding Photography',
          'Candid Photography',
          'Bridal Photography',
          'Wedding Cinematography',
          'Engagement Photography',
          'Pre-Wedding Shoots',
          'Event Photography',
        ],
        sameAs: [
          'https://www.instagram.com/vipevents_nellore/',
          'https://www.facebook.com/VIPweddingsnellore',
          'https://www.youtube.com/channel/UCtNRNNFqPvOB_4SK7',
        ],
        foundingDate: '2008',
        affiliation: {
          '@type': 'Organization',
          name: 'VIP Studio',
        },
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${baseUrl}/#organization`,
        name: 'VIP Studio — Best Photographer in Nellore',
        description: 'National Award Winning Best Photographer in Nellore. Specializing in candid wedding photography, cinematography, bridal & engagement shoots. 25+ years of award-winning service.',
        image: `${baseUrl}/logo.png`,
        url: baseUrl,
        telephone: '+91 92999 50999',
        email: 'contact@vipstudio.com',
        founder: {
          '@type': 'Person',
          '@id': `${baseUrl}/#person`,
          name: 'Vijay Kumar',
          jobTitle: 'Best Photographer in Nellore | CEO & Wedding Photographer',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: '26-1-1639, beside MGB Mall, Obulreddy Nagar, Dargamitta',
          addressLocality: 'Nellore',
          addressRegion: 'Andhra Pradesh',
          postalCode: '524003',
          addressCountry: 'IN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 14.4426,
          longitude: 79.9865,
        },
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Monday', opens: '09:30', closes: '20:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday', opens: '09:30', closes: '20:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '09:30', closes: '20:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '09:30', closes: '20:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday', opens: '09:30', closes: '20:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:30', closes: '20:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '09:30', closes: '14:00' },
        ],
        sameAs: [
          'https://www.instagram.com/vipevents_nellore/',
          'https://www.facebook.com/VIPweddingsnellore',
          'https://www.youtube.com/channel/UCtNRNNFqPvOB_4SK7',
        ],
        areaServed: ['Nellore', 'Andhra Pradesh', 'India'],
        priceRange: '₹₹',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          bestRating: '5',
          ratingCount: '180',
          reviewCount: '180',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Photography Services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wedding Photography' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wedding Cinematography' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Bridal Photography' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Candid Photography' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Engagement Photography' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pre-Wedding Shoot' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Event Photography' } },
          ],
        },
      },
      {
        '@type': 'Service',
        '@id': `${baseUrl}/#service`,
        name: 'Wedding Photography Services by Best Photographer in Nellore',
        provider: { '@id': `${baseUrl}/#organization` },
        areaServed: ['Nellore', 'Andhra Pradesh', 'India'],
        serviceType: [
          'Wedding Photography',
          'Wedding Cinematography',
          'Bridal Photography',
          'Engagement Photography',
          'Candid Photography',
          'Pre-Wedding Shoot',
          'Event Photography',
        ],
        awards: [
          'National Award — Wedding Photography',
          'Wedding Photographer of the Year 2010 — Kodak',
        ],
      },
    ],
  }

  const sanitized = JSON.stringify(jsonLd).replace(/</g, '\\u003c')

  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: sanitized }}
        />
        <Header />
        <main>{children}</main>
        <Footer />

        <PopupVideo
          videoUrl={popup?.videoUrl || undefined}
          enabled={popup?.enabled}
          delay={popup?.delay}
        />

        <a
          href={`tel:${PHONE_NUMBER}`}
          className="fixed bottom-20 right-6 z-50 bg-red text-white p-3.5 rounded-full shadow-lg hover:bg-red-dark transition shadow-red/40 hover:shadow-xl hover:shadow-red/50"
          aria-label="Call VIP Studio"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.24.2 2.45.57 3.57a1 1 0 01-.25 1.01l-2.2 2.2z" />
          </svg>
        </a>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-red text-white p-3.5 rounded-full shadow-lg hover:bg-red-dark transition shadow-red/40 hover:shadow-xl hover:shadow-red/50"
          aria-label="Chat on WhatsApp"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>

      </body>
    </html>
  )
}
