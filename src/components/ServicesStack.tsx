'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

export default function ServicesStack({ services }: { services: any[] }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIdx, setActiveIdx] = useState(0)
  const stateRef = useRef({ startX: 0, lastX: 0, velocity: 0, offset: 0, idx: 0, dragging: false, width: 0 })

  const snap = useCallback((idx: number, animate = true) => {
    const s = stateRef.current
    s.idx = Math.max(0, Math.min(services.length - 1, idx))
    if (animate) setActiveIdx(s.idx)
    else setActiveIdx(s.idx)
  }, [services.length])

  useEffect(() => {
    const el = containerRef.current
    if (!el || services.length === 0) return
    const s = stateRef.current
    s.width = el.clientWidth
    s.idx = 0

    const ro = new ResizeObserver(() => {
      s.width = el.clientWidth
    })
    ro.observe(el)

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const idx = s.idx + (e.deltaY > 0 ? 1 : -1)
      snap(idx)
    }
    el.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      ro.disconnect()
      el.removeEventListener('wheel', onWheel)
    }
  }, [services.length, snap])

  const onPointerDown = (e: React.PointerEvent) => {
    const s = stateRef.current
    s.startX = e.clientX
    s.lastX = e.clientX
    s.velocity = 0
    s.dragging = true
    const el = containerRef.current!
    el.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const s = stateRef.current
    if (!s.dragging) return
    const dx = e.clientX - s.lastX
    s.lastX = e.clientX
    s.velocity = dx * 0.4 + s.velocity * 0.6
    const threshold = s.width * 0.2
    if (Math.abs(dx) > threshold) {
      const dir = dx > 0 ? -1 : 1
      s.dragging = false
      e.currentTarget.releasePointerCapture(e.pointerId)
      snap(s.idx + dir)
    }
  }

  const onPointerUp = () => {
    const s = stateRef.current
    if (!s.dragging) return
    s.dragging = false
    if (Math.abs(s.velocity) > 0.3) {
      snap(s.idx + (s.velocity > 0 ? -1 : 1))
    }
  }

  return (
    <section id="services" className="relative bg-black overflow-hidden">
      <div className="grid md:grid-cols-2 gap-10 items-center max-w-5xl mx-auto px-4 pt-24 pb-16">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-800 order-1">
          <Image
            src="/HERO.png"
            alt="VIP Studio"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute bottom-0 right-0 bg-gradient-to-l from-black/70 to-transparent p-5 text-right">
            <p className="text-white text-lg font-medium">Vijay Kumar</p>
            <p className="text-red text-xs">CEO, VIP STUDIOS</p>
          </div>
        </div>
        <div className="order-2">
          <span className="text-red font-semibold text-sm uppercase tracking-widest">About</span>
          <h2 className="text-4xl font-bold mt-3 mb-4 text-white">VIP Studio</h2>
          <p className="text-gray-400 leading-relaxed mb-6">
            National Award Winning Wedding Photographer based in Nellore, specializing in candid wedding photography and cinematography with over 22+ years of excellence.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 rounded-xl bg-white/5">
              <div className="text-3xl font-bold text-red">22+</div>
              <div className="text-gray-400 text-sm mt-1">Years</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5">
              <div className="text-3xl font-bold text-red">500+</div>
              <div className="text-gray-400 text-sm mt-1">Weddings</div>
            </div>
            <div className="text-center p-4 rounded-xl bg-white/5">
              <div className="text-3xl font-bold text-red">Award</div>
              <div className="text-gray-400 text-sm mt-1">Winning</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center pt-16 pb-8 px-4 max-w-7xl mx-auto">
        <span className="text-red font-semibold text-sm uppercase tracking-widest">What We Offer</span>
        <h2 className="text-4xl font-bold mt-3 mb-4 text-white">Our Services</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Comprehensive wedding photography and cinematography services tailored to make your special day unforgettable.
        </p>
      </div>

      <div
        ref={containerRef}
        className="select-none pb-8"
        style={{ perspective: '1200px', touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="flex items-center justify-center h-[600px] md:h-[700px] relative">
          {services.map((service, i) => {
            const diff = i - activeIdx
            const abs = Math.abs(diff)
            const isActive = diff === 0

            const rotateY = diff * -25
            const translateZ = isActive ? 200 : abs === 1 ? 50 : -200
            const translateX = diff * 120
            const scale = 1 - abs * 0.12
            const opacity = 1 - abs * 0.25
            const zIndex = services.length - abs

            return (
              <div
                key={service._id}
                className="absolute w-[85%] md:w-[500px] transition-all duration-500 ease-out cursor-grab active:cursor-grabbing"
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity: opacity < 0 ? 0 : opacity,
                  zIndex,
                  transformStyle: 'preserve-3d',
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
                onClick={() => !isActive && snap(i)}
              >
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-gray-800">
                  {service.image?.url ? (
                    <Image
                      src={urlFor(service.image).width(1200).height(800).url()}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="90vw"
                      draggable={false}
                    />
                  ) : service.imageUrl ? (
                    <Image
                      src={service.imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="90vw"
                      draggable={false}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gray-800" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">{service.title}</h3>
                    <p className="text-gray-200 text-sm md:text-base leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-red text-sm font-medium">
                      <span className="w-6 h-px bg-red" />
                      Learn More
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex justify-center gap-2 pb-8">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => snap(i)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIdx ? 'bg-red w-6' : 'bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
