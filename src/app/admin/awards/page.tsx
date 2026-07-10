'use client'

import { useEffect, useState } from 'react'
import { Button, Table, TableHead, TableBody, TableRow, TableCell, TableHeadCell, Label, TextInput, Textarea, Modal, ModalHeader, ModalBody, ModalFooter } from 'flowbite-react'
import DeleteConfirm from '@/components/admin/DeleteConfirm'

type Award = { id: number; year: string; title: string; org: string; description: string }

export default function AwardsPage() {
  const [items, setItems] = useState<Award[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ year: '', title: '', org: '', description: '' })
  const [editId, setEditId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/admin/awards').then(r => r.json()).then(d => { setItems(d); setLoading(false) })
  }, [])

  async function handleSave() {
    const body = { ...form, order: 0 }
    if (editId) {
      await fetch(`/api/admin/awards/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    } else {
      await fetch('/api/admin/awards', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    }
    setShowForm(false); setEditId(null); setForm({ year: '', title: '', org: '', description: '' })
    const res = await fetch('/api/admin/awards')
    setItems(await res.json())
  }

  async function handleDelete() {
    if (!deleteId) return
    await fetch(`/api/admin/awards/${deleteId}`, { method: 'DELETE' })
    setItems(items.filter(i => i.id !== deleteId))
    setDeleteId(null)
  }

  function startEdit(s: Award) {
    setEditId(s.id); setForm({ year: s.year, title: s.title, org: s.org, description: s.description }); setShowForm(true)
  }

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Awards</h1>
        <Button color="red" size="sm" onClick={() => { setShowForm(true); setEditId(null); setForm({ year: '', title: '', org: '', description: '' }) }}>
          Add Award
        </Button>
      </div>

      <Modal show={showForm} onClose={() => setShowForm(false)} size="lg">
        <ModalHeader>{editId ? 'Edit Award' : 'New Award'}</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <Label>Year</Label>
              <TextInput value={form.year} onChange={e => setForm(p => ({ ...p, year: e.target.value }))} />
            </div>
            <div>
              <Label>Title</Label>
              <TextInput value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
            </div>
            <div>
              <Label>Organization</Label>
              <TextInput value={form.org} onChange={e => setForm(p => ({ ...p, org: e.target.value }))} />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="gray" onClick={() => setShowForm(false)}>Cancel</Button>
          <Button color="red" onClick={handleSave} disabled={!form.title}>Save</Button>
        </ModalFooter>
      </Modal>

      <DeleteConfirm open={deleteId !== null} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} itemName="this award" />

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Year</TableHeadCell>
              <TableHeadCell>Title</TableHeadCell>
              <TableHeadCell>Organization</TableHeadCell>
              <TableHeadCell className="text-right">Actions</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {items.map(a => (
              <TableRow key={a.id}>
                <TableCell className="font-bold text-red-600">{a.year}</TableCell>
                <TableCell className="font-medium">{a.title}</TableCell>
                <TableCell className="text-gray-500">{a.org}</TableCell>
                <TableCell className="text-right">
                  <button type="button" className="text-red-600 text-xs font-medium hover:underline mr-3" onClick={() => startEdit(a)}>Edit</button>
                  <button type="button" className="text-gray-500 text-xs hover:text-red-600" onClick={() => setDeleteId(a.id)}>Delete</button>
                </TableCell>
              </TableRow>
            ))}
            {items.length === 0 && (
              <TableRow><TableCell colSpan={4} className="text-center text-gray-400 py-8">No awards yet</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
