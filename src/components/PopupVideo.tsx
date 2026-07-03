'use client'

import { useState, useEffect, useRef } from 'react'

export default function PopupVideo() {
  const [show, setShow] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const playedRef = useRef(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!playedRef.current) {
        playedRef.current = true
        setShow(true)
      }
    }, 10000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [show])

  const handleClose = () => {
    setLeaving(true)
    setTimeout(() => {
      setShow(false)
      setLeaving(false)
    }, 500)
  }

  if (!show) return null

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all duration-500 ease-out ${
        leaving ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative max-w-3xl w-[90%] mx-auto transition-all duration-500 ease-out ${
          leaving ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute -top-10 right-0 text-white/80 hover:text-white transition z-10"
          aria-label="Close video"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <video
            src="/POPUP.mp4"
            autoPlay
            playsInline
            onEnded={handleClose}
            className="w-full h-auto max-h-[80vh] object-contain"
          />
        </div>
      </div>
    </div>
  )
}
