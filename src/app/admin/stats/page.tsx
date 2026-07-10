'use client'

import { useEffect, useState, useCallback } from 'react'
import { Button, Card, Label, TextInput, Modal, ModalHeader, ModalBody, ModalFooter } from 'flowbite-react'
import DeleteConfirm from '@/components/admin/DeleteConfirm'
import Toast from '@/components/admin/Toast'

type Stat = { id: number; number: string; label: string; desc: string }

export default function StatsPage() {
  const [items, setItems] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ number: '', label: '', desc: '' })
  const [editId, setEditId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(d => setItems(d))
      .catch(() => showToast('Failed to load stats', 'error'))
      .finally(() => setLoading(false))
  }, [showToast])

  async function handleSave() {
    setSaving(true)
    try {
      const body = { ...form, order: 0 }
      const url = editId ? `/api/admin/stats/${editId}` : '/api/admin/stats'
      const method = editId ? 'PUT' : 'POST'
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      if (!res.ok) throw new Error()
      setShowForm(false); setEditId(null); setForm({ number: '', label: '', desc: '' })
      const refreshed = await fetch('/api/admin/stats')
      setItems(await refreshed.json())
      showToast(editId ? 'Stat updated' : 'Stat created')
    } catch {
      showToast('Failed to save', 'error')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    try {
      await fetch(`/api/admin/stats/${deleteId}`, { method: 'DELETE' })
      setItems(items.filter(i => i.id !== deleteId))
      showToast('Stat deleted')
    } catch {
      showToast('Failed to delete', 'error')
    } finally {
      setDeleteId(null)
    }
  }

  function startEdit(s: Stat) {
    setEditId(s.id); setForm({ number: s.number, label: s.label, desc: s.desc }); setShowForm(true)
  }

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading...</div>

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

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
          <Button color="gray" onClick={() => setShowForm(false)} disabled={saving}>Cancel</Button>
          <Button color="red" onClick={handleSave} disabled={!form.number || !form.label || saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
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
