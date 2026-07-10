'use client'

import { useState, useEffect, useRef } from 'react'

export default function PopupVideo({ videoUrl, enabled, delay }: { videoUrl?: string; enabled?: boolean; delay?: number }) {
  const [show, setShow] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const playedRef = useRef(false)

  useEffect(() => {
    if (enabled === false) return
    const ms = (delay || 10) * 1000
    const timer = setTimeout(() => {
      if (!playedRef.current) {
        playedRef.current = true
        setShow(true)
      }
    }, ms)
    return () => clearTimeout(timer)
  }, [enabled, delay])

  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [show])

  const handlePlay = () => {
    videoRef.current?.play()
    setPlaying(true)
  }

  const handleClose = () => {
    if (videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause()
    }
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
        <div className="rounded-2xl overflow-hidden shadow-2xl bg-black relative">
          <video
            ref={videoRef}
            src={videoUrl || '/POPUP.mp4'}
            playsInline
            preload="auto"
            onEnded={handleClose}
            className="w-full h-auto max-h-[80vh] object-contain"
          />
          {!playing && (
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition cursor-pointer"
              aria-label="Play video"
            >
              <div className="w-20 h-20 rounded-full bg-red flex items-center justify-center shadow-lg shadow-red/40 hover:scale-105 transition">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
