import Link from 'next/link'
import Image from 'next/image'
import ServicesStack from '@/components/ServicesStack'
import HeroSlider from '@/components/HeroSlider'
import { getHeroSlides, getServices, getSiteSetting } from '@/lib/site'

export const revalidate = 60

const WHATSAPP_NUMBER = '919299950999'
const PHONE_NUMBER = '+919299950999'

export default async function HomePage() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://vipstudios.in'

  const [slides, services] = await Promise.all([
    getHeroSlides(),
    getServices(),
  ])

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${baseUrl}/#services` },
      { '@type': 'ListItem', position: 3, name: 'Portfolio', item: `${baseUrl}/portfolio` },
      { '@type': 'ListItem', position: 4, name: 'Contact', item: `${baseUrl}/contact` },
    ],
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroSlider slides={slides} />
        <div className="relative z-10 text-center px-4">
          <h1 className="sr-only">Best Photographer in Nellore — VIP Studio | National Award Winning Wedding Photography & Cinematography by Vijay Kumar</h1>
          <Image
            src="/logo.png"
            alt="VIP Studio — Wedding Photography & Cinematography"
            width={500}
            height={200}
            className="mx-auto !w-auto !h-auto"
            priority
          />
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link
              href="/portfolio"
              className="bg-red text-white px-8 py-3.5 rounded-full font-medium hover:bg-red-dark transition shadow-lg shadow-red/30"
            >
              View Portfolio
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red text-white px-8 py-3.5 rounded-full font-medium hover:bg-red-dark transition shadow-lg shadow-red/30"
            >
              Book via WhatsApp
            </a>
          </div>
        </div>
      </section>


      <ServicesStack services={services} />

      <section className="py-24 px-4 bg-surface">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-red font-semibold text-sm uppercase tracking-widest">Portfolio</span>
              <h2 className="text-4xl font-bold mt-3 text-gray-900">Our Work</h2>
            </div>
            <Link
              href="/portfolio"
              className="hidden md:inline-flex items-center gap-2 text-red font-medium hover:text-red-dark transition"
            >
              View All <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[240px]">
            {[
              { src: '/BRIDAL.png', label: 'Bridal Wedding Photography', span: 'col-span-2 row-span-2 md:col-span-2 md:row-span-2' },
              { src: '/CANDID.png', label: 'Candid Wedding Photography', span: '' },
              { src: '/ENGAGEMENT.png', label: 'Engagement Photography', span: 'row-span-2' },
              { src: '/WEDDING.png', label: 'Wedding Cinematography', span: 'col-span-2 md:col-span-2' },
              { src: '/PREWEDDING.png', label: 'Pre-Wedding Photography', span: 'row-span-2 md:row-span-2' },
              { src: '/CORPERATE.png', label: 'Event Photography', span: '' },
              { src: '/MATERNITY.png', label: 'Maternity Photography', span: '' },
              { src: '/HERO.png', label: 'Fashion Photography', span: 'col-span-2 md:col-span-2' },
              { src: '/BRIDAL.png', label: 'Bridal Wedding Photography', span: '' },
              { src: '/CANDID.png', label: 'Candid Wedding Photography', span: '' },
            ].map((item, i) => (
              <Link
                key={i}
                href="/portfolio"
                className={`group relative overflow-hidden rounded-xl bg-gray-200 ${item.span}`}
              >
                <Image
                  src={item.src}
                  alt={item.label}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-2 group-hover:translate-y-0 transition duration-300 opacity-0 group-hover:opacity-100">
                  <h3 className="font-semibold text-base">{item.label}</h3>
                </div>
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition duration-300">
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10 space-y-4">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-red font-medium hover:text-red-dark transition"
            >
              View All Galleries <span aria-hidden="true">&rarr;</span>
            </Link>
            <div>
              <Link
                href="/build-your-quote"
                className="inline-block bg-red text-white px-10 py-4 rounded-full font-medium hover:bg-red-dark transition text-lg shadow-lg shadow-red/30"
              >
                Build Your Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-red font-semibold text-sm uppercase tracking-widest">Location</span>
            <h2 className="text-4xl font-bold mt-3 text-gray-900">Find Us</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div>
                <p className="font-medium text-gray-900">Address</p>
                <p className="text-gray-500 mt-1">26-1-1639, beside MGB Mall, Obulreddy Nagar, Dargamitta, Nellore — 524003</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Phone / WhatsApp</p>
                <a href="https://wa.me/919299950999" target="_blank" rel="noopener noreferrer" className="text-red hover:text-red-dark transition mt-1 block">
                  +91 92999 50999
                </a>
              </div>
              <div>
                <p className="font-medium text-gray-900">Instagram</p>
                <a href="https://www.instagram.com/vipevents_nellore/" target="_blank" rel="noopener noreferrer" className="text-red hover:text-red-dark transition mt-1 block">
                  @vipevents_nellore
                </a>
              </div>
              <div>
                <p className="font-medium text-gray-900">Facebook</p>
                <a href="https://www.facebook.com/VIPweddingsnellore" target="_blank" rel="noopener noreferrer" className="text-red hover:text-red-dark transition mt-1 block">
                  VIP Weddings Nellore
                </a>
              </div>
              <a
                href="https://maps.app.goo.gl/VEJbmw21SPY4QaDY9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-red font-medium hover:text-red-dark transition text-sm"
              >
                Open in Google Maps &rarr;
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-100">
              <iframe
                src="https://www.google.com/maps?q=26-1-1639+beside+MGB+Mall+Obulreddy+Nagar+Dargamitta+Nellore+Andhra+Pradesh+524003&output=embed"
                width="100%"
                height="350"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="VIP Studio Location in Nellore, Andhra Pradesh"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-red font-semibold text-sm uppercase tracking-widest">Awards & Recognition</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6 text-gray-900">
            Recognized as the <span className="text-red">Best Photographer in Nellore</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 rounded-xl bg-surface border border-gray-200">
              <div className="text-red font-bold text-lg">National Award</div>
              <p className="text-gray-900 font-semibold mt-2">Wedding Photography</p>
              <p className="text-gray-500 text-sm mt-1">Government of India</p>
            </div>
            <div className="p-6 rounded-xl bg-surface border border-gray-200">
              <div className="text-red font-bold text-lg">2010</div>
              <p className="text-gray-900 font-semibold mt-2">Wedding Photographer of the Year</p>
              <p className="text-gray-500 text-sm mt-1">Kodak</p>
            </div>
            <div className="p-6 rounded-xl bg-surface border border-gray-200">
              <div className="text-red font-bold text-lg">15+ Years</div>
              <p className="text-gray-900 font-semibold mt-2">Award-Winning Excellence</p>
              <p className="text-gray-500 text-sm mt-1">VIP Studio, Nellore</p>
            </div>
          </div>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-red font-medium hover:text-red-dark transition mt-8"
          >
            Meet the Best Photographer in Nellore <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-br from-gray-900 via-gray-900 to-red relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(204,0,0,0.15),transparent_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Capture Your Story?</h2>
          <p className="text-lg text-gray-300 mb-10">
            Let&apos;s create beautiful memories together. Reach out to us on WhatsApp or send us a message.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red text-white px-10 py-4 rounded-full font-medium hover:bg-red-dark transition text-lg shadow-lg shadow-red/30 inline-flex items-center gap-2"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
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
