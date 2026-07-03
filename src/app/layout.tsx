import type { Metadata } from 'next'
import { VisualEditing } from 'next-sanity/visual-editing'
import { draftMode } from 'next/headers'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PopupVideo from '@/components/PopupVideo'
import './globals.css'

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://vip-studio.vercel.app'),
    title: {
      default: 'VIP Studio — Wedding Photography & Cinematography in Nellore',
      template: '%s | VIP Studio',
    },
    description: 'National Award Winning Wedding Photography by Vijay. Based in Nellore, 22+ years of experience in candid wedding photography, cinematography, and event coverage.',
    keywords: ['wedding photography Nellore', 'wedding cinematography', 'candid photographer', 'VIP Studio', 'Vijay photographer', 'wedding photographer Andhra Pradesh'],
    openGraph: {
      title: 'VIP Studio — Wedding Photography & Cinematography',
      description: 'National Award Winning Wedding Photography by Vijay. Based in Nellore, serving with 22+ years of experience.',
      url: '/',
      siteName: 'VIP Studio',
      locale: 'en_IN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'VIP Studio — Wedding Photography & Cinematography',
      description: 'National Award Winning Wedding Photography in Nellore',
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: process.env.NEXT_PUBLIC_BASE_URL || 'https://vip-studio.vercel.app',
    },
  }
}

const WHATSAPP_NUMBER = '919299950999'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isDraftMode = (await draftMode()).isEnabled

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'VIP Studio',
    description: 'National Award Winning Wedding Photography & Cinematography',
    image: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://vip-studio.vercel.app'}/logo.png`,
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://vip-studio.vercel.app',
    telephone: '+91 92999 50999',
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
  }

  return (
    <html lang="en">
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

        {isDraftMode && <VisualEditing />}
      </body>
    </html>
  )
}
