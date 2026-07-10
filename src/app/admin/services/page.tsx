'use client'

import { useEffect, useState } from 'react'
import { Button, Table, TableHead, TableBody, TableRow, TableCell, TableHeadCell, Label, TextInput, Textarea, Modal, ModalHeader, ModalBody, ModalFooter } from 'flowbite-react'
import FileUpload from '@/components/admin/FileUpload'
import DeleteConfirm from '@/components/admin/DeleteConfirm'

type Service = { id: number; title: string; description: string; imageUrl: string; order: number; active: boolean }

export default function ServicesPage() {
  const [items, setItems] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: '', description: '', imageUrl: '' })
  const [editId, setEditId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/admin/services').then(r => r.json()).then(d => { setItems(d); setLoading(false) })
  }, [])

  async function handleSave() {
    const body = { ...form, order: 0, active: true }
    if (editId) {
      await fetch(`/api/admin/services/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    } else {
      await fetch('/api/admin/services', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    }
    setShowForm(false); setEditId(null); setForm({ title: '', description: '', imageUrl: '' })
    const res = await fetch('/api/admin/services')
    setItems(await res.json())
  }

  async function handleDelete() {
    if (!deleteId) return
    await fetch(`/api/admin/services/${deleteId}`, { method: 'DELETE' })
    setItems(items.filter(i => i.id !== deleteId))
    setDeleteId(null)
  }

  function startEdit(s: Service) {
    setEditId(s.id); setForm({ title: s.title, description: s.description, imageUrl: s.imageUrl }); setShowForm(true)
  }

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Services</h1>
        <Button color="red" size="sm" onClick={() => { setShowForm(true); setEditId(null); setForm({ title: '', description: '', imageUrl: '' }) }}>
          Add Service
        </Button>
      </div>

      <Modal show={showForm} onClose={() => setShowForm(false)} size="lg">
        <ModalHeader>{editId ? 'Edit Service' : 'New Service'}</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <Label>Title</Label>
              <TextInput value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} />
            </div>
            <FileUpload currentUrl={form.imageUrl} onUpload={url => setForm(p => ({ ...p, imageUrl: url }))} />
            <div>
              <Label>Or Image URL</Label>
              <TextInput value={form.imageUrl} onChange={e => setForm(p => ({ ...p, imageUrl: e.target.value }))} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="gray" onClick={() => setShowForm(false)}>Cancel</Button>
          <Button color="red" onClick={handleSave} disabled={!form.title || !form.imageUrl}>Save</Button>
        </ModalFooter>
      </Modal>

      <DeleteConfirm open={deleteId !== null} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} itemName="this service" />

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Image</TableHeadCell>
              <TableHeadCell>Title</TableHeadCell>
              <TableHeadCell>Description</TableHeadCell>
              <TableHeadCell className="text-right">Actions</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {items.map(s => (
              <TableRow key={s.id}>
                <TableCell>
                  <div className="relative w-14 h-14 rounded overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.imageUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                </TableCell>
                <TableCell className="font-medium">{s.title}</TableCell>
                <TableCell className="truncate max-w-[250px] text-gray-500">{s.description}</TableCell>
                <TableCell className="text-right">
                  <button type="button" className="text-red-600 text-xs font-medium hover:underline mr-3" onClick={() => startEdit(s)}>Edit</button>
                  <button type="button" className="text-gray-500 text-xs hover:text-red-600" onClick={() => setDeleteId(s.id)}>Delete</button>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow><TableCell colSpan={4} className="text-center text-gray-400 py-8">No services yet</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
