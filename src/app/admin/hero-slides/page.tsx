'use client'

import { useEffect, useState, useCallback } from 'react'
import { Button, Table, TableHead, TableBody, TableRow, TableCell, TableHeadCell, Badge, Label, TextInput, Modal, ModalHeader, ModalBody, ModalFooter } from 'flowbite-react'
import FileUpload from '@/components/admin/FileUpload'
import DeleteConfirm from '@/components/admin/DeleteConfirm'
import Toast from '@/components/admin/Toast'

type Slide = { id: number; imageUrl: string; active: boolean; order: number }

export default function HeroSlidesPage() {
  const [slides, setSlides] = useState<Slide[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [imageUrl, setImageUrl] = useState('')
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  useEffect(() => {
    fetch('/api/admin/hero-slides')
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(d => setSlides(d))
      .catch(() => showToast('Failed to load slides', 'error'))
      .finally(() => setLoading(false))
  }, [showToast])

  async function handleSave() {
    setSaving(true)
    try {
      const isEdit = !!editId
      const body = { imageUrl, active: true, order: 0 }
      const url = editId ? `/api/admin/hero-slides/${editId}` : '/api/admin/hero-slides'
      const method = editId ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error()
      setShowForm(false); setEditId(null); setImageUrl('')
      const refreshed = await fetch('/api/admin/hero-slides')
      setSlides(await refreshed.json())
      showToast(isEdit ? 'Slide updated' : 'Slide created')
    } catch {
      showToast('Failed to save', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    try {
      await fetch(`/api/admin/hero-slides/${deleteId}`, { method: 'DELETE' })
      setSlides(slides.filter(s => s.id !== deleteId))
      showToast('Slide deleted')
    } catch {
      showToast('Failed to delete', 'error')
    } finally {
      setDeleteId(null)
    }
  }

  function startEdit(s: Slide) {
    setEditId(s.id); setImageUrl(s.imageUrl); setShowForm(true)
  }

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading...</div>

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Hero Slides</h1>
        <Button color="red" size="sm" onClick={() => { setShowForm(true); setEditId(null); setImageUrl('') }}>
          Add Slide
        </Button>
      </div>

      <Modal show={showForm} onClose={() => setShowForm(false)} size="md">
        <ModalHeader>{editId ? 'Edit Slide' : 'New Slide'}</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <FileUpload currentUrl={imageUrl} onUpload={setImageUrl} label="Upload Image" />
            <div>
              <Label>Or Image URL</Label>
              <TextInput value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="gray" onClick={() => setShowForm(false)} disabled={saving}>Cancel</Button>
          <Button color="red" onClick={handleSave} disabled={!imageUrl || saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </ModalFooter>
      </Modal>

      <DeleteConfirm open={deleteId !== null} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} itemName="this slide" />

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Image</TableHeadCell>
              <TableHeadCell>URL</TableHeadCell>
              <TableHeadCell>Active</TableHeadCell>
              <TableHeadCell className="text-right">Actions</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {slides.map(s => (
              <TableRow key={s.id}>
                <TableCell>
                  <div className="relative w-20 h-14 rounded overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                </TableCell>
                <TableCell className="truncate max-w-[200px] text-gray-500">{s.imageUrl}</TableCell>
                <TableCell>
                  <Badge color={s.active ? 'success' : 'gray'}>{s.active ? 'Active' : 'Inactive'}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <button type="button" className="text-red-600 text-xs font-medium hover:underline mr-3" onClick={() => startEdit(s)}>Edit</button>
                  <button type="button" className="text-gray-500 text-xs hover:text-red-600" onClick={() => setDeleteId(s.id)}>Delete</button>
                </TableCell>
              </TableRow>
            ))}
            {slides.length === 0 && (
              <TableRow><TableCell colSpan={4} className="text-center text-gray-400 py-8">No slides yet</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
