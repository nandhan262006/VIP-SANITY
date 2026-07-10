'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

type Item = { id: number; slug: string; title: string; description?: string; category?: string; coverImage?: string; date?: string }

export default function PortfolioAdminPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ slug: '', title: '', description: '', category: '', coverImage: '', date: '' })
  const [editId, setEditId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetch('/api/admin/portfolio').then(r => r.json()).then(d => { setItems(d); setLoading(false) })
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
    setForm(p => ({ ...p, coverImage: data.url }))
    setUploading(false)
  }

  async function handleSave() {
    if (editId) {
      await fetch(`/api/admin/portfolio/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    } else {
      await fetch('/api/admin/portfolio', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
    }
    setShowForm(false); setEditId(null); setForm({ slug: '', title: '', description: '', category: '', coverImage: '', date: '' }); setFile(null)
    const res = await fetch('/api/admin/portfolio')
    setItems(await res.json())
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this portfolio item?')) return
    await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' })
    setItems(items.filter(i => i.id !== id))
  }

  function startEdit(s: Item) {
    setEditId(s.id); setForm({ slug: s.slug, title: s.title, description: s.description || '', category: s.category || '', coverImage: s.coverImage || '', date: s.date || '' }); setShowForm(true)
  }

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm({ slug: '', title: '', description: '', category: '', coverImage: '', date: '' }); setFile(null) }} className="bg-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-dark transition">Add Item</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <h2 className="font-bold text-gray-900 mb-4">{editId ? 'Edit Portfolio Item' : 'New Portfolio Item'}</h2>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Title</label>
                <input value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Slug</label>
                <input value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Category</label>
                <input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Description</label>
                <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Date</label>
                <input value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="2025-12-01" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Upload Cover Image</label>
                <input type="file" accept="image/*" onChange={handleUpload} className="w-full text-sm" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Or Cover Image URL</label>
                <input value={form.coverImage} onChange={e => setForm(p => ({ ...p, coverImage: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              {form.coverImage && (
                <div className="relative w-full h-28 rounded-lg overflow-hidden bg-gray-100">
                  <Image src={form.coverImage} alt="" fill className="object-cover" />
                </div>
              )}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2 rounded-lg border border-gray-300 text-sm text-gray-600">Cancel</button>
              <button onClick={handleSave} disabled={!form.title || !form.slug || uploading} className="flex-1 py-2 rounded-lg bg-red text-white text-sm font-medium disabled:opacity-50">{uploading ? 'Uploading...' : 'Save'}</button>
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
              <th className="text-left px-4 py-3 font-medium text-gray-600">Category</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map(item => (
              <tr key={item.id}>
                <td className="px-4 py-3">
                  <div className="relative w-14 h-14 rounded overflow-hidden bg-gray-100">
                    {item.coverImage && <Image src={item.coverImage} alt="" fill className="object-cover" />}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{item.title}</td>
                <td className="px-4 py-3 text-gray-500">{item.category || '—'}</td>
                <td className="px-4 py-3 text-gray-400">{item.date || '—'}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => startEdit(item)} className="text-red text-xs font-medium hover:underline mr-3">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-gray-400 text-xs hover:text-red transition">Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-400 text-sm">No portfolio items yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
