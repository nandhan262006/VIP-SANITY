'use client'

import { useState } from 'react'
import Image from 'next/image'
import { FileInput, Label } from 'flowbite-react'

interface FileUploadProps {
  accept?: string
  currentUrl?: string
  onUpload: (url: string, publicId?: string) => void
  label?: string
}

export default function FileUpload({ accept = 'image/*', currentUrl, onUpload, label = 'Upload file' }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(false)

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError(false)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      onUpload(data.url, data.publicId)
    } catch {
      setError(true)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <FileInput accept={accept} onChange={handleChange} disabled={uploading} color={error ? 'failure' : undefined} />
      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
      {error && <p className="text-sm text-red-500">Upload failed. Try again.</p>}
      {currentUrl && accept === 'image/*' && (
        <div className="relative w-full h-32 rounded-lg overflow-hidden bg-gray-100">
          <Image src={currentUrl} alt="Preview" fill className="object-cover" />
        </div>
      )}
      {currentUrl && accept === 'video/*' && (
        <video src={currentUrl} className="w-full h-32 object-cover rounded-lg" controls />
      )}
    </div>
  )
}
