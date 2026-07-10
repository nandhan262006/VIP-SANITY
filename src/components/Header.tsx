'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

const WHATSAPP_NUMBER = '919299950999'
const PHONE_NUMBER = '+919299950999'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="VIP Studio" width={200} height={100} className="h-16 w-auto object-contain" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm text-gray-600 hover:text-red transition">Home</Link>
          <Link href="/#services" className="text-sm text-gray-600 hover:text-red transition">Services</Link>
          <Link href="/about" className="text-sm text-gray-600 hover:text-red transition">About</Link>
          <Link href="/portfolio" className="text-sm text-gray-600 hover:text-red transition">Portfolio</Link>
          <Link href="/build-your-quote" className="text-sm text-gray-600 hover:text-red transition">Build Your Quote</Link>
          <Link href="/contact" className="text-sm text-gray-600 hover:text-red transition">Contact</Link>
          <Link href="/admin" className="text-sm text-gray-600 hover:text-red transition">Admin</Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red text-white text-sm px-5 py-2 rounded-full font-medium hover:bg-red-dark transition"
          >
            WhatsApp
          </a>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="border-2 border-red text-red text-sm px-5 py-2 rounded-full font-medium hover:bg-red hover:text-white transition"
          >
            Call Now
          </a>
        </nav>

        <button
          className="md:hidden p-2 text-gray-900"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white/95 px-4 py-4 space-y-3">
          <Link href="/" className="block text-sm text-gray-600 hover:text-red" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/#services" className="block text-sm text-gray-600 hover:text-red" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link href="/about" className="block text-sm text-gray-600 hover:text-red" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/portfolio" className="block text-sm text-gray-600 hover:text-red" onClick={() => setMenuOpen(false)}>Portfolio</Link>
          <Link href="/build-your-quote" className="block text-sm text-gray-600 hover:text-red" onClick={() => setMenuOpen(false)}>Build Your Quote</Link>
          <Link href="/contact" className="block text-sm text-gray-600 hover:text-red" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link href="/admin" className="block text-sm text-gray-600 hover:text-red" onClick={() => setMenuOpen(false)}>Admin</Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block text-sm text-red font-medium"
            onClick={() => setMenuOpen(false)}
          >
            WhatsApp Booking
          </a>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="block text-sm text-red font-medium"
            onClick={() => setMenuOpen(false)}
          >
            Call Now
          </a>
        </div>
      )}
    </header>
  )
}
