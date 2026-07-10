'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { Button, Label, TextInput, Modal, ModalHeader, ModalBody, ModalFooter } from 'flowbite-react'
import FileUpload from '@/components/admin/FileUpload'
import DeleteConfirm from '@/components/admin/DeleteConfirm'
import Toast from '@/components/admin/Toast'

type Item = { id: number; slug: string; title: string; description?: string; category?: string; coverImage?: string; coverImagePublicId?: string; date?: string }

export default function PortfolioAdminPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ slug: '', title: '', description: '', category: '', coverImage: '', coverImagePublicId: '', date: '' })
  const [editId, setEditId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  useEffect(() => {
    fetch('/api/admin/portfolio')
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(d => setItems(d))
      .catch(() => showToast('Failed to load portfolio', 'error'))
      .finally(() => setLoading(false))
  }, [showToast])

  async function handleSave() {
    setSaving(true)
    try {
      const body = { ...form, order: 0 }
      const url = editId ? `/api/admin/portfolio/${editId}` : '/api/admin/portfolio'
      const method = editId ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error()
      setShowForm(false); setEditId(null); setForm({ slug: '', title: '', description: '', category: '', coverImage: '', coverImagePublicId: '', date: '' })
      const refreshed = await fetch('/api/admin/portfolio')
      setItems(await refreshed.json())
      showToast(editId ? 'Portfolio item updated' : 'Portfolio item created')
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
    setForm({ slug: s.slug, title: s.title, description: s.description || '', category: s.category || '', coverImage: s.coverImage || '', coverImagePublicId: s.coverImagePublicId || '', date: s.date || '' })
    setShowForm(true)
  }

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading...</div>

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Portfolio</h1>
        <Button color="red" size="sm" onClick={() => { setShowForm(true); setEditId(null); setForm({ slug: '', title: '', description: '', category: '', coverImage: '', coverImagePublicId: '', date: '' }) }}>
          Add Item
        </Button>
      </div>

      <Modal show={showForm} onClose={() => setShowForm(false)} size="lg">
        <ModalHeader>{editId ? 'Edit Portfolio Item' : 'New Portfolio Item'}</ModalHeader>
        <ModalBody>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div>
              <Label>Title</Label>
              <TextInput value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
            </div>
            <div>
              <Label>Slug</Label>
              <TextInput value={form.slug} onChange={e => setForm(p => ({ ...p, slug: e.target.value }))} />
            </div>
            <div>
              <Label>Category</Label>
              <TextInput value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} />
            </div>
            <div>
              <Label>Description</Label>
              <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <Label>Date</Label>
              <TextInput value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} placeholder="2025-12-01" />
            </div>
            <FileUpload currentUrl={form.coverImage} onUpload={(url, publicId) => setForm(p => ({ ...p, coverImage: url, coverImagePublicId: publicId || '' }))} />
            <div>
              <Label>Or Cover Image URL</Label>
              <TextInput value={form.coverImage} onChange={e => setForm(p => ({ ...p, coverImage: e.target.value, coverImagePublicId: '' }))} />
            </div>
            {form.coverImage && (
              <div className="relative w-full h-28 rounded-lg overflow-hidden bg-gray-100">
                <Image src={form.coverImage} alt="" fill className="object-cover" />
              </div>
            )}
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
