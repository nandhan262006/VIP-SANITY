import type { Metadata } from 'next'
import Image from 'next/image'
import QuoteBuilder from '@/components/QuoteBuilder'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Build Your Quote',
    description: 'Build your own wedding photography & cinematography quote. Select events, albums, and more to get an instant price estimate.',
  }
}

export default function BuildYourQuotePage() {
  return (
    <div>
      <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center bg-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/WEDDING.png"
            alt="Wedding Photography"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ready to build your own wedding Quotation?</h1>
          <p className="text-lg text-gray-200 mb-8">
            Select what you love and see instant pricing with a real-time quote that updates as you make your selections.
          </p>
          <a
            href="#builder"
            className="inline-block bg-[#dc143c] text-white px-10 py-3.5 rounded-full font-medium hover:brightness-110 transition shadow-lg"
          >
            Build Your Quote
          </a>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#F6F1E6]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '/quotes/camera.png',
              title: 'Discover our services',
              desc: 'including candid photography, traditional photography, albums, and more.',
            },
            {
              icon: '/quotes/photo.png',
              title: 'Build Your Quote',
              desc: 'Select what you love and see instant pricing with a real-time quote that updates as you make your selections.',
            },
            {
              icon: '/quotes/surprise.png',
              title: 'Seal the Deal and Save the Date',
              desc: 'Enter your details to receive a personalized quote via email, connect with our team to finalize the details, and reserve your spot with a 30% deposit to secure your special day.',
            },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center">
              <div className="relative w-16 h-16 mx-auto mb-4">
                <Image src={item.icon} alt="" fill className="object-contain" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div id="builder">
        <QuoteBuilder />
      </div>
    </div>
  )
}

