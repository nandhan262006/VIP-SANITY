'use client'

import { HiCheckCircle, HiExclamationCircle } from 'react-icons/hi2'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  onClose: () => void
}

export default function Toast({ message, type, onClose }: ToastProps) {
  return (
    <div className="fixed top-4 right-4 z-[9999] animate-in slide-in-from-top-2">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${
        type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
      }`}>
        {type === 'success' ? <HiCheckCircle className="h-5 w-5 text-green-500" /> : <HiExclamationCircle className="h-5 w-5 text-red-500" />}
        <span>{message}</span>
        <button onClick={onClose} className="ml-2 text-gray-400 hover:text-gray-600">&times;</button>
      </div>
    </div>
  )
}
