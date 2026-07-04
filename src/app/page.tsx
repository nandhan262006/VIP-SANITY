import Link from 'next/link'
import Image from 'next/image'
import ServicesStack from '@/components/ServicesStack'

const DEFAULT_SERVICES = [
  { _id: '1', title: 'Bridal Photography', description: 'Elegant bridal portraits that capture every detail of your special day, from the intricate jewellery to the joyous tears.', imageUrl: '/BRIDAL.png' },
  { _id: '2', title: 'Engagement Photography', description: 'Beautiful engagement shoots that tell your love story against stunning backdrops.', imageUrl: '/ENGAGEMENT.png' },
  { _id: '3', title: 'Candid Photography', description: 'Natural, unposed moments that reflect genuine emotions — the laughter, the tears, the pure joy.', imageUrl: '/CANDID.png' },
  { _id: '4', title: 'Wedding Cinematography', description: 'Cinematic wedding films that bring your most cherished memories to life with stunning visuals.', imageUrl: '/WEDDING.png' },
  { _id: '5', title: 'Pre-Wedding Shoot', description: 'Creative pre-wedding sessions at handpicked locations that capture your unique bond.', imageUrl: '/PREWEDDING.png' },
  { _id: '6', title: 'Event Photography', description: 'Professional coverage for engagements, receptions, and all your special celebrations.', imageUrl: '/CORPERATE.png' },
]

const WHATSAPP_NUMBER = '919299950999'

export default async function HomePage() {
  return (
    <div>
      <section className="relative h-screen flex items-center justify-center bg-black">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-red/20" />
        <div className="relative z-10 text-center px-4">
          <h1 className="sr-only">VIP Studio — Wedding Photography & Cinematography in Nellore</h1>
          <Image
            src="/logo.png"
            alt="VIP Studio — Wedding Photography & Cinematography"
            width={500}
            height={200}
            className="mx-auto !w-auto !h-auto brightness-0 invert"
            priority
          />
          <p className="text-gray-400 text-sm md:text-base mt-4 mb-2 tracking-wider">&ldquo;Director of Wedding Photography&rdquo; &mdash; Kodak</p>
          <p className="text-red font-semibold text-xs md:text-sm uppercase tracking-widest">National Award Winner in Wedding Photography 2010</p>
          <p className="text-gray-500 text-xs md:text-sm mt-2 mb-12">Vijay | CEO, <span className="text-red">VIP</span> STUDIOS</p>
          <div className="flex flex-wrap gap-4 justify-center">
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
              className="border-2 border-white text-white px-8 py-3.5 rounded-full font-medium hover:bg-white hover:text-black transition"
            >
              Book via WhatsApp
            </a>
          </div>
        </div>
      </section>

      <ServicesStack services={DEFAULT_SERVICES} />

      <section className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="text-red font-semibold text-sm uppercase tracking-widest">Portfolio</span>
              <h2 className="text-4xl font-bold mt-3 text-white">Our Work</h2>
            </div>
            <Link
              href="/portfolio"
              className="hidden md:inline-flex items-center gap-2 text-red font-medium hover:text-red-dark transition"
            >
              View All <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['/BRIDAL.png', '/CANDID.png', '/ENGAGEMENT.png', '/WEDDING.png', '/PREWEDDING.png', '/CORPERATE.png'].map((src, i) => (
              <Link
                key={i}
                href="/portfolio"
                className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-800"
              >
                <Image
                  src={src}
                  alt="Wedding Photography"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="font-semibold text-lg">
                    {['Bridal', 'Candid', 'Engagement', 'Cinematography', 'Pre-Wedding', 'Events'][i]}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-red font-medium hover:text-red-dark transition"
            >
              View All Galleries <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-red font-semibold text-sm uppercase tracking-widest">Location</span>
            <h2 className="text-4xl font-bold mt-3 text-white">Find Us</h2>
            <p className="text-gray-400 mt-3">26-1-1639, beside MGB Mall, Obulreddy Nagar, Dargamitta, Nellore — 524003</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-900">
            <iframe
              src="https://www.google.com/maps?q=26-1-1639+beside+MGB+Mall+Obulreddy+Nagar+Dargamitta+Nellore+Andhra+Pradesh+524003&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="VIP Studio Location in Nellore"
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gradient-to-br from-black via-black to-red relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(204,0,0,0.2),transparent_60%)]" />
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
              className="border-2 border-white text-white px-10 py-4 rounded-full font-medium hover:bg-white hover:text-black transition text-lg"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
