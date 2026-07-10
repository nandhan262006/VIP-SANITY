'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type Service = { id: number; title: string; description: string; imageUrl: string; order: number; active: boolean }

export default function ServicesPage() {
  const [items, setItems] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '' })
  const [editId, setEditId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetch('/api/admin/services').then(r => r.json()).then(d => { setItems(d); setLoading(false) })
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
    setForm(p => ({ ...p, imageUrl: data.url }))
    setUploading(false)
  }

  async function handleSave() {
    const body = { ...form, order: 0, active: true }
    if (editId) {
      await fetch(`/api/admin/services/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    } else {
      await fetch('/api/admin/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    }
    setShowForm(false); setEditId(null); setForm({ title: '', description: '', imageUrl: '' }); setFile(null)
    const res = await fetch('/api/admin/services')
    setItems(await res.json())
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this service?')) return
    await fetch(`/api/admin/services/${id}`, { method: 'DELETE' })
    setItems(items.filter(i => i.id !== id))
  }

  function startEdit(s: Service) {
    setEditId(s.id); setForm({ title: s.title, description: s.description, imageUrl: s.imageUrl }); setShowForm(true)
  }

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm({ title: '', description: '', imageUrl: '' }); setFile(null) }} className="bg-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-dark transition">Add Service</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <h2 className="font-bold text-gray-900 mb-4">{editId ? 'Edit Service' : 'New Service'}</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Title</label>
                <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Upload Image</label>
                <input type="file" accept="image/*" onChange={handleUpload} className="w-full text-sm" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Or Image URL</label>
                <input value={form.imageUrl} onChange={e => setForm(p => ({ ...p, imageUrl: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              {form.imageUrl && (
                <div className="relative w-full h-28 rounded-lg overflow-hidden bg-gray-100">
                  <Image src={form.imageUrl} alt="" fill className="object-cover" />
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2 rounded-lg border border-gray-300 text-sm text-gray-600">Cancel</button>
              <button onClick={handleSave} disabled={!form.title || !form.imageUrl || uploading} className="flex-1 py-2 rounded-lg bg-red text-white text-sm font-medium disabled:opacity-50">{uploading ? 'Uploading...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-medium text-gray-600">Image</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Description</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map(s => (
              <tr key={s.id}>
                <td className="px-4 py-3">
                  <div className="relative w-14 h-14 rounded overflow-hidden bg-gray-100">
                    <Image src={s.imageUrl} alt="" fill className="object-cover" />
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{s.title}</td>
                <td className="px-4 py-3 text-gray-500 truncate max-w-[250px]">{s.description}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => startEdit(s)} className="text-red text-xs font-medium hover:underline mr-3">Edit</button>
                  <button onClick={() => handleDelete(s.id)} className="text-gray-400 text-xs hover:text-red transition">Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400 text-sm">No services yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
