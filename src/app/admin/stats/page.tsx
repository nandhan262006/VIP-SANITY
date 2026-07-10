'use client'

import { useEffect, useState } from 'react'

type Stat = { id: number; number: string; label: string; desc: string }

export default function StatsPage() {
  const [items, setItems] = useState<Stat[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ number: '', label: '', desc: '' })
  const [editId, setEditId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)

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

  async function handleDelete(id: number) {
    if (!confirm('Delete this stat?')) return
    await fetch(`/api/admin/stats/${id}`, { method: 'DELETE' })
    setItems(items.filter(i => i.id !== id))
  }

  function startEdit(s: Stat) {
    setEditId(s.id); setForm({ number: s.number, label: s.label, desc: s.desc }); setShowForm(true)
  }

  function updateField(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Stats</h1>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm({ number: '', label: '', desc: '' }) }} className="bg-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-dark transition">Add Stat</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <h2 className="font-bold text-gray-900 mb-4">{editId ? 'Edit Stat' : 'New Stat'}</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Number</label>
                <input value={form.number} onChange={e => updateField('number', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="e.g. 25+" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Label</label>
                <input value={form.label} onChange={e => updateField('label', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="e.g. Years of Experience" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Description</label>
                <input value={form.desc} onChange={e => updateField('desc', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="e.g. Serving Nellore since 2000" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2 rounded-lg border border-gray-300 text-sm text-gray-600">Cancel</button>
              <button onClick={handleSave} disabled={!form.number || !form.label} className="flex-1 py-2 rounded-lg bg-red text-white text-sm font-medium disabled:opacity-50">Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map(s => (
          <div key={s.id} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-3xl font-bold text-red mb-1">{s.number}</div>
            <div className="font-semibold text-gray-900 text-sm">{s.label}</div>
            <div className="text-gray-500 text-xs mt-1">{s.desc}</div>
            <div className="mt-3 flex gap-2">
              <button onClick={() => startEdit(s)} className="text-xs text-red font-medium">Edit</button>
              <button onClick={() => handleDelete(s.id)} className="text-xs text-gray-400 hover:text-red">Delete</button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center text-gray-400 text-sm py-12">No stats yet</div>
        )}
      </div>
    </div>
  )
}
