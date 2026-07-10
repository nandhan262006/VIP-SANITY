'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { Button, Card, Label, TextInput, Modal, ModalHeader, ModalBody, ModalFooter } from 'flowbite-react'
import FileUpload from '@/components/admin/FileUpload'
import DeleteConfirm from '@/components/admin/DeleteConfirm'
import Toast from '@/components/admin/Toast'

type Item = { id: number; src: string; galleryTitle: string; gallerySlug: string; srcPublicId?: string }

export default function GalleryPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ src: '', srcPublicId: '', galleryTitle: '', gallerySlug: '' })
  const [editId, setEditId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  useEffect(() => {
    fetch('/api/admin/gallery')
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(d => setItems(d))
      .catch(() => showToast('Failed to load gallery', 'error'))
      .finally(() => setLoading(false))
  }, [showToast])

  async function handleSave() {
    setSaving(true)
    try {
      const isEdit = !!editId
      const body = { src: form.src, srcPublicId: form.srcPublicId, galleryTitle: form.galleryTitle, gallerySlug: form.gallerySlug, order: 0 }
      const url = editId ? `/api/admin/gallery/${editId}` : '/api/admin/gallery'
      const method = editId ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error()
      setShowForm(false); setEditId(null); setForm({ src: '', srcPublicId: '', galleryTitle: '', gallerySlug: '' })
      const refreshed = await fetch('/api/admin/gallery')
      setItems(await refreshed.json())
      showToast(isEdit ? 'Image updated' : 'Image added')
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
      await fetch(`/api/admin/gallery/${deleteId}`, { method: 'DELETE' })
      if (item?.srcPublicId) {
        await fetch('/api/admin/delete-file', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ publicId: item.srcPublicId }) })
      }
      setItems(items.filter(i => i.id !== deleteId))
      showToast('Image deleted')
    } catch {
      showToast('Failed to delete', 'error')
    } finally {
      setDeleteId(null)
    }
  }

  function startEdit(s: Item) {
    setEditId(s.id)
    setForm({ src: s.src, srcPublicId: s.srcPublicId || '', galleryTitle: s.galleryTitle, gallerySlug: s.gallerySlug })
    setShowForm(true)
  }

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading...</div>

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
        <Button color="red" size="sm" onClick={() => { setShowForm(true); setEditId(null); setForm({ src: '', srcPublicId: '', galleryTitle: '', gallerySlug: '' }) }}>
          Add Image
        </Button>
      </div>

      <Modal show={showForm} onClose={() => setShowForm(false)} size="md">
        <ModalHeader>{editId ? 'Edit Image' : 'New Image'}</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <FileUpload currentUrl={form.src} onUpload={(url, publicId) => setForm(p => ({ ...p, src: url, srcPublicId: publicId || '' }))} />
            <div>
              <Label>Or Image URL</Label>
              <TextInput value={form.src} onChange={e => setForm(p => ({ ...p, src: e.target.value, srcPublicId: '' }))} />
            </div>
            <div>
              <Label>Gallery Title</Label>
              <TextInput value={form.galleryTitle} onChange={e => {
                const title = e.target.value
                setForm(p => ({ ...p, galleryTitle: title, gallerySlug: !editId ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : p.gallerySlug }))
              }} />
            </div>
            <div>
              <Label>Gallery Slug</Label>
              <TextInput value={form.gallerySlug} onChange={e => setForm(p => ({ ...p, gallerySlug: e.target.value }))} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="gray" onClick={() => setShowForm(false)} disabled={saving}>Cancel</Button>
          <Button color="red" onClick={handleSave} disabled={!form.src || !form.galleryTitle || !form.gallerySlug || saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </ModalFooter>
      </Modal>

      <DeleteConfirm open={deleteId !== null} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} itemName="this image" />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map(item => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative aspect-[4/3] bg-gray-100 -mx-4 -mt-4">
              <Image src={item.src} alt={item.galleryTitle} fill className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.galleryTitle}</p>
              <p className="text-xs text-gray-400 truncate">{item.gallerySlug}</p>
              <div className="mt-2 flex gap-2">
                <button type="button" className="text-red-600 text-xs font-medium" onClick={() => startEdit(item)}>Edit</button>
                <button type="button" className="text-gray-500 text-xs hover:text-red-600" onClick={() => setDeleteId(item.id)}>Delete</button>
              </div>
            </div>
          </Card>
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center text-gray-400 text-sm py-12">No gallery images yet</div>
        )}
      </div>
    </div>
  )
}
