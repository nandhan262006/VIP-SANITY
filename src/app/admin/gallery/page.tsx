'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type Item = { id: number; src: string; galleryTitle: string; gallerySlug: string }

export default function GalleryPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ src: '', galleryTitle: '', gallerySlug: '' })
  const [editId, setEditId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetch('/api/admin/gallery').then(r => r.json()).then(d => { setItems(d); setLoading(false) })
  }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setUploading(true)
    const fd = new FormData()
    fd.append('file', f)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()
    setForm(p => ({ ...p, src: data.url }))
    setUploading(false)
  }

  async function handleSave() {
    const body = { ...form, order: 0 }
    if (editId) {
      await fetch(`/api/admin/gallery/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    } else {
      await fetch('/api/admin/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    }
    setShowForm(false); setEditId(null); setForm({ src: '', galleryTitle: '', gallerySlug: '' }); setFile(null)
    const res = await fetch('/api/admin/gallery')
    setItems(await res.json())
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this image?')) return
    await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' })
    setItems(items.filter(i => i.id !== id))
  }

  function startEdit(s: Item) {
    setEditId(s.id); setForm({ src: s.src, galleryTitle: s.galleryTitle, gallerySlug: s.gallerySlug }); setShowForm(true)
  }

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm({ src: '', galleryTitle: '', gallerySlug: '' }); setFile(null) }} className="bg-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-dark transition">Add Image</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h2 className="font-bold text-gray-900 mb-4">{editId ? 'Edit Image' : 'New Image'}</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Upload Image</label>
                <input type="file" accept="image/*" onChange={handleUpload} className="w-full text-sm" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Or Image URL</label>
                <input value={form.src} onChange={e => setForm(p => ({ ...p, src: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              {form.src && (
                <div className="relative w-full h-28 rounded-lg overflow-hidden bg-gray-100">
                  <Image src={form.src} alt="" fill className="object-cover" />
                </div>
              )}
              <div>
                <label className="block text-sm text-gray-600 mb-1">Gallery Title</label>
                <input value={form.galleryTitle} onChange={e => setForm(p => ({ ...p, galleryTitle: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Gallery Slug</label>
                <input value={form.gallerySlug} onChange={e => setForm(p => ({ ...p, gallerySlug: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2 rounded-lg border border-gray-300 text-sm text-gray-600">Cancel</button>
              <button onClick={handleSave} disabled={!form.src || !form.galleryTitle || uploading} className="flex-1 py-2 rounded-lg bg-red text-white text-sm font-medium disabled:opacity-50">{uploading ? 'Uploading...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden group">
            <div className="relative aspect-[4/3] bg-gray-100">
              <Image src={item.src} alt={item.galleryTitle} fill className="object-cover" />
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-gray-900 truncate">{item.galleryTitle}</p>
              <p className="text-xs text-gray-400 truncate">{item.gallerySlug}</p>
              <div className="mt-2 flex gap-2">
                <button onClick={() => startEdit(item)} className="text-xs text-red font-medium">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-xs text-gray-400 hover:text-red">Delete</button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center text-gray-400 text-sm py-12">No gallery images yet</div>
        )}
      </div>
    </div>
  )
}
