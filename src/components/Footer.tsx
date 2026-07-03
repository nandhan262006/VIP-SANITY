import Link from 'next/link'

const WHATSAPP_NUMBER = '919299950999'

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg text-white mb-4">VIP Studio</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              National Award Winning Wedding Photography & Cinematography. Based in Nellore, serving with 22+ years of excellence.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-white mb-4">Quick Links</h4>
            <nav className="space-y-2.5 text-sm text-gray-400">
              <Link href="/" className="block hover:text-red transition">Home</Link>
              <Link href="/#services" className="block hover:text-red transition">Services</Link>
              <Link href="/portfolio" className="block hover:text-red transition">Portfolio</Link>
              <Link href="/about" className="block hover:text-red transition">About</Link>
              <Link href="/contact" className="block hover:text-red transition">Contact</Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-white mb-4">Services</h4>
            <nav className="space-y-2.5 text-sm text-gray-400">
              <Link href="/portfolio" className="block hover:text-red transition">Bridal Photography</Link>
              <Link href="/portfolio" className="block hover:text-red transition">Engagement</Link>
              <Link href="/portfolio" className="block hover:text-red transition">Candid Photography</Link>
              <Link href="/portfolio" className="block hover:text-red transition">Cinematography</Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-white mb-4">Connect</h4>
            <div className="space-y-2.5 text-sm text-gray-400">
              <a href="https://www.instagram.com/vipevents_nellore/" target="_blank" rel="noopener noreferrer" className="block hover:text-red transition">
                Instagram
              </a>
              <a href="https://www.facebook.com/VIPweddingsnellore" target="_blank" rel="noopener noreferrer" className="block hover:text-red transition">
                Facebook
              </a>
              <a href="https://www.youtube.com/channel/UCtNRNNFqPvOB_4SK7" target="_blank" rel="noopener noreferrer" className="block hover:text-red transition">
                YouTube
              </a>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="block hover:text-red transition">
                WhatsApp
              </a>
              <a href="https://maps.app.goo.gl/VEJbmw21SPY4QaDY9" target="_blank" rel="noopener noreferrer" className="block hover:text-red transition">
                Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} VIP Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://maps.app.goo.gl/VEJbmw21SPY4QaDY9" target="_blank" rel="noopener noreferrer" className="hover:text-red transition">
              Nellore, Andhra Pradesh
            </a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hover:text-red transition">
              +91 92999 50999
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
