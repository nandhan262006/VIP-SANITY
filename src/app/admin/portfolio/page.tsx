'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { Button, Label, TextInput, Modal, ModalHeader, ModalBody, ModalFooter } from 'flowbite-react'
import FileUpload from '@/components/admin/FileUpload'
import DeleteConfirm from '@/components/admin/DeleteConfirm'
import Toast from '@/components/admin/Toast'

type GalleryImage = { url: string; publicId: string }
type Item = { id: number; slug: string; title: string; description?: string; category?: string; coverImage?: string; coverImagePublicId?: string; date?: string; images?: string }

const CATEGORIES = ['Bridal', 'Candid', 'Engagement', 'Wedding', 'Pre-Wedding', 'Events', 'Maternity', 'Fashion']

export default function PortfolioAdminPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ slug: '', title: '', description: '', category: '', coverImage: '', coverImagePublicId: '', date: '', images: '' as string })
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [editId, setEditId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  function resetForm() {
    setForm({ slug: '', title: '', description: '', category: '', coverImage: '', coverImagePublicId: '', date: '', images: '' })
    setGalleryImages([])
  }

  useEffect(() => {
    fetch('/api/admin/portfolio')
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(d => setItems(d))
      .catch(() => showToast('Failed to load portfolio', 'error'))
      .finally(() => setLoading(false))
  }, [showToast])

  function autoSlug(title: string) {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  async function handleSave() {
    setSaving(true)
    try {
      const isEdit = !!editId
      const body = { ...form, images: galleryImages.length > 0 ? JSON.stringify(galleryImages.map(g => g.url)) : form.images || null }
      const url = editId ? `/api/admin/portfolio/${editId}` : '/api/admin/portfolio'
      const method = editId ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error()
      setShowForm(false); setEditId(null); resetForm()
      const refreshed = await fetch('/api/admin/portfolio')
      setItems(await refreshed.json())
      showToast(isEdit ? 'Portfolio item updated' : 'Portfolio item created')
    } catch {
      showToast('Failed to save', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    const item = items.find(i => i.id === deleteId)
    try {
      await fetch(`/api/admin/portfolio/${deleteId}`, { method: 'DELETE' })
      if (item?.coverImagePublicId) {
        await fetch('/api/admin/delete-file', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ publicId: item.coverImagePublicId }) })
      }
      setItems(items.filter(i => i.id !== deleteId))
      showToast('Portfolio item deleted')
    } catch {
      showToast('Failed to delete', 'error')
    } finally {
      setDeleteId(null)
    }
  }

  function startEdit(s: Item) {
    setEditId(s.id)
    setForm({ slug: s.slug, title: s.title, description: s.description || '', category: s.category || '', coverImage: s.coverImage || '', coverImagePublicId: s.coverImagePublicId || '', date: s.date || '', images: s.images || '' })
    let parsed: string[] = []
    try { parsed = s.images ? JSON.parse(s.images) : [] } catch { parsed = [] }
    setGalleryImages(parsed.map((url: string) => ({ url, publicId: '' })))
    setShowForm(true)
  }

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading...</div>

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
        <Button color="red" size="sm" onClick={() => { setShowForm(true); setEditId(null); resetForm() }}>
          Add Item
        </Button>
      </div>

      <Modal show={showForm} onClose={() => setShowForm(false)} size="lg">
        <ModalHeader>{editId ? 'Edit Portfolio Item' : 'New Portfolio Item'}</ModalHeader>
        <ModalBody>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div>
              <Label>Title</Label>
              <TextInput value={form.title} onChange={e => {
                const title = e.target.value
                setForm(p => ({ ...p, title, slug: !editId ? autoSlug(title) : p.slug }))
              }} placeholder="e.g. Priya & Rahul Wedding" />
            </div>
            <div>
              <Label>Slug <span className="text-gray-400 font-normal">(URL-friendly id)</span></Label>
              <TextInput value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} placeholder="e.g. priya-rahul-wedding" />
              <p className="text-xs text-gray-400 mt-1">Auto-generated from title. Used in URL: /portfolio/{form.slug || '...'}</p>
            </div>
            <div>
              <Label>Category</Label>
              <div className="flex flex-wrap gap-2 mt-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setForm(p => ({ ...p, category: p.category === cat ? '' : cat }))}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                      form.category === cat ? 'bg-red text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Description</Label>
              <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="Brief description of this shoot..." />
            </div>
            <div>
              <Label>Date</Label>
              <TextInput value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} placeholder="e.g. 2025-12-01 or December 2025" />
            </div>

            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
              <Label className="text-base font-semibold">Cover Image <span className="text-gray-400 font-normal">(thumbnail on listing page)</span></Label>
              <div className="mt-2">
                <FileUpload currentUrl={form.coverImage} onUpload={(url, publicId) => setForm(p => ({ ...p, coverImage: url, coverImagePublicId: publicId || '' }))} />
              </div>
              <div className="mt-2">
                <Label className="text-xs text-gray-400">Or paste image URL</Label>
                <TextInput value={form.coverImage} onChange={e => setForm(p => ({ ...p, coverImage: e.target.value, coverImagePublicId: '' }))} placeholder="https://..." />
              </div>
              {form.coverImage && (
                <div className="relative w-full h-32 mt-2 rounded-lg overflow-hidden bg-gray-100">
                  <Image src={form.coverImage} alt="Cover preview" fill className="object-cover" />
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
              <Label className="text-base font-semibold">Gallery Images <span className="text-gray-400 font-normal">(shown on detail page /portfolio/{form.slug || '...'})</span></Label>
              <p className="text-xs text-gray-400 mt-1 mb-3">Upload multiple images for this portfolio gallery. They appear in order on the detail page.</p>
              <div className="space-y-2">
                {galleryImages.map((img, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="relative w-16 h-16 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image src={img.url} alt="" fill className="object-cover" />
                    </div>
                    <span className="text-xs text-gray-400 truncate flex-1">{img.url}</span>
                    <button type="button" onClick={() => setGalleryImages(p => p.filter((_, idx) => idx !== i))} className="text-xs text-red-500 hover:underline flex-shrink-0">Remove</button>
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <FileUpload
                  label="Add gallery image"
                  currentUrl=""
                  onUpload={(url, publicId) => setGalleryImages(p => [...p, { url, publicId: publicId || '' }])}
                />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="gray" onClick={() => setShowForm(false)} disabled={saving}>Cancel</Button>
          <Button color="red" onClick={handleSave} disabled={!form.title || !form.slug || saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </ModalFooter>
      </Modal>

      <DeleteConfirm open={deleteId !== null} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} itemName="this portfolio item" />

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Image</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Title</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Category</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Date</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600 dark:text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {items.map(item => (
                <tr key={item.id}>
                  <td className="px-4 py-3">
                    <div className="relative w-14 h-14 rounded overflow-hidden bg-gray-100">
                      {item.coverImage && <Image src={item.coverImage} alt="" fill className="object-cover" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{item.title}</td>
                  <td className="px-4 py-3 text-gray-500">{item.category || '—'}</td>
                  <td className="px-4 py-3 text-gray-400">{item.date || '—'}</td>
                  <td className="px-4 py-3 text-right">
                    <button type="button" className="text-red-600 text-xs font-medium hover:underline mr-3" onClick={() => startEdit(item)}>Edit</button>
                    <button type="button" className="text-gray-500 text-xs hover:text-red-600" onClick={() => setDeleteId(item.id)}>Delete</button>
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
    </div>
  )
}
