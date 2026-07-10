'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

const DEFAULT_SLIDES = [
  '/BRIDAL.png',
  '/CANDID.png',
  '/ENGAGEMENT.png',
  '/WEDDING.png',
  '/PREWEDDING.png',
  '/MATERNITY.png',
  '/HERO.png',
]

export default function HeroSlider({ slides }: { slides?: { imageUrl: string }[] }) {
  const [current, setCurrent] = useState(0)
  const images = slides && slides.length > 0 ? slides.map((s) => s.imageUrl) : DEFAULT_SLIDES

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [images.length])

  return (
    <div className="absolute inset-0">
      {images.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            priority={i === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-red/20" />
    </div>
  )
}
