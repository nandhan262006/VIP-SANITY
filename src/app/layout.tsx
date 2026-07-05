import type { Metadata, Viewport } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PopupVideo from '@/components/PopupVideo'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#CC0000',
}

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vip-studio.vercel.app'
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: 'VIP Studio — Wedding Photography & Cinematography in Nellore',
      template: '%s | VIP Studio',
    },
    description: 'National Award Winning Wedding Photography by Vijay. Based in Nellore, 22+ years of experience in candid wedding photography, cinematography, and event coverage.',
    keywords: [
      'wedding photography Nellore',
      'wedding cinematography',
      'candid photographer Nellore',
      'VIP Studio',
      'Vijay photographer',
      'wedding photographer Andhra Pradesh',
      'best wedding photographer',
      'wedding films Nellore',
      'engagement photography',
      'bridal photography',
    ],
    applicationName: 'VIP Studio',
    category: 'Wedding Photography & Cinematography',
    classification: 'Photography Services',
    openGraph: {
      title: 'VIP Studio — Wedding Photography & Cinematography',
      description: 'National Award Winning Wedding Photography by Vijay. Based in Nellore, serving with 22+ years of experience.',
      url: '/',
      siteName: 'VIP Studio',
      locale: 'en_IN',
      type: 'website',
      images: [{ url: '/logo.png', width: 512, height: 512, alt: 'VIP Studio Logo' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'VIP Studio — Wedding Photography & Cinematography',
      description: 'National Award Winning Wedding Photography in Nellore',
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
  }
}

const WHATSAPP_NUMBER = '919299950999'
const PHONE_NUMBER = '+919299950999'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vip-studio.vercel.app'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: 'VIP Studio',
        description: 'National Award Winning Wedding Photography & Cinematography',
        publisher: { '@id': `${baseUrl}/#organization` },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${baseUrl}/#organization`,
        name: 'VIP Studio',
        description: 'National Award Winning Wedding Photography & Cinematography',
        image: `${baseUrl}/logo.png`,
        url: baseUrl,
        telephone: '+91 92999 50999',
        email: 'contact@vipstudio.com',
        founder: {
          '@type': 'Person',
          name: 'Vijay Kumar',
          jobTitle: 'CEO & Wedding Photographer',
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
        areaServed: 'Nellore, Andhra Pradesh, India',
        priceRange: '₹₹',
      },
      {
        '@type': 'Service',
        '@id': `${baseUrl}/#service`,
        name: 'Wedding Photography Services',
        provider: { '@id': `${baseUrl}/#organization` },
        areaServed: 'Nellore, Andhra Pradesh, India',
        serviceType: [
          'Wedding Photography',
          'Wedding Cinematography',
          'Bridal Photography',
          'Engagement Photography',
          'Candid Photography',
          'Pre-Wedding Shoot',
          'Event Photography',
        ],
      },
    ],
  }

  return (
    <html lang="en-IN">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />

        <PopupVideo />

        <a
          href={`tel:${PHONE_NUMBER}`}
          className="fixed bottom-6 right-20 z-50 bg-red text-white p-3.5 rounded-full shadow-lg hover:bg-red-dark transition shadow-red/40 hover:shadow-xl hover:shadow-red/50"
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
