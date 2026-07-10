'use client'

import { useEffect, useState } from 'react'
import { Button, Card, Label, TextInput, Modal, ModalHeader, ModalBody, ModalFooter } from 'flowbite-react'
import DeleteConfirm from '@/components/admin/DeleteConfirm'

type Stat = { id: number; number: string; label: string; desc: string }

export default function StatsPage() {
  const [items, setItems] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ number: '', label: '', desc: '' })
  const [editId, setEditId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/admin/stats').then(r => r.json()).then(d => { setItems(d); setLoading(false) })
  }, [])

  async function handleSave() {
    const body = { ...form, order: 0 }
    if (editId) {
      await fetch(`/api/admin/stats/${editId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    } else {
      await fetch('/api/admin/stats', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    }
    setShowForm(false); setEditId(null); setForm({ number: '', label: '', desc: '' })
    const res = await fetch('/api/admin/stats')
    setItems(await res.json())
  }

  async function handleDelete() {
    if (!deleteId) return
    await fetch(`/api/admin/stats/${deleteId}`, { method: 'DELETE' })
    setItems(items.filter(i => i.id !== deleteId))
    setDeleteId(null)
  }

  function startEdit(s: Stat) {
    setEditId(s.id); setForm({ number: s.number, label: s.label, desc: s.desc }); setShowForm(true)
  }

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Stats</h1>
        <Button color="red" size="sm" onClick={() => { setShowForm(true); setEditId(null); setForm({ number: '', label: '', desc: '' }) }}>
          Add Stat
        </Button>
      </div>

      <Modal show={showForm} onClose={() => setShowForm(false)} size="md">
        <ModalHeader>{editId ? 'Edit Stat' : 'New Stat'}</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <Label>Number</Label>
              <TextInput value={form.number} onChange={e => setForm(p => ({ ...p, number: e.target.value }))} placeholder="e.g. 25+" />
            </div>
            <div>
              <Label>Label</Label>
              <TextInput value={form.label} onChange={e => setForm(p => ({ ...p, label: e.target.value }))} placeholder="e.g. Years of Experience" />
            </div>
            <div>
              <Label>Description</Label>
              <TextInput value={form.desc} onChange={e => setForm(p => ({ ...p, desc: e.target.value }))} placeholder="e.g. Serving Nellore since 2000" />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="gray" onClick={() => setShowForm(false)}>Cancel</Button>
          <Button color="red" onClick={handleSave} disabled={!form.number || !form.label}>Save</Button>
        </ModalFooter>
      </Modal>

      <DeleteConfirm open={deleteId !== null} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} itemName="this stat" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(s => (
          <Card key={s.id}>
            <div className="text-3xl font-bold text-red-600 mb-1">{s.number}</div>
            <div className="font-semibold text-gray-900 dark:text-white text-sm">{s.label}</div>
            <div className="text-gray-500 text-xs mt-1">{s.desc}</div>
            <div className="mt-3 flex gap-2">
              <button type="button" className="text-red-600 text-xs font-medium" onClick={() => startEdit(s)}>Edit</button>
              <button type="button" className="text-gray-500 text-xs hover:text-red-600" onClick={() => setDeleteId(s.id)}>Delete</button>
            </div>
          </Card>
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center text-gray-400 text-sm py-12">No stats yet</div>
        )}
      </div>
    </div>
  )
}
