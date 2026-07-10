'use client'

import { useEffect, useState } from 'react'

type Award = { id: number; year: string; title: string; org: string; description: string }

export default function AwardsPage() {
  const [items, setItems] = useState<Award[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ year: '', title: '', org: '', description: '' })
  const [editId, setEditId] = useState<number | null>(null)
  const [showForm, setShowForm] = useState(false)

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

  async function handleDelete(id: number) {
    if (!confirm('Delete this award?')) return
    await fetch(`/api/admin/awards/${id}`, { method: 'DELETE' })
    setItems(items.filter(i => i.id !== id))
  }

  function startEdit(s: Award) {
    setEditId(s.id); setForm({ year: s.year, title: s.title, org: s.org, description: s.description }); setShowForm(true)
  }

  function updateField(field: keyof typeof form, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading...</div>

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Awards</h1>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm({ year: '', title: '', org: '', description: '' }) }} className="bg-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-dark transition">Add Award</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <h2 className="font-bold text-gray-900 mb-4">{editId ? 'Edit Award' : 'New Award'}</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Year</label>
                <input value={form.year} onChange={e => updateField('year', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Title</label>
                <input value={form.title} onChange={e => updateField('title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Organization</label>
                <input value={form.org} onChange={e => updateField('org', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Description</label>
                <textarea value={form.description} onChange={e => updateField('description', e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2 rounded-lg border border-gray-300 text-sm text-gray-600">Cancel</button>
              <button onClick={handleSave} disabled={!form.title} className="flex-1 py-2 rounded-lg bg-red text-white text-sm font-medium disabled:opacity-50">Save</button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-medium text-gray-600">Year</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Organization</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {items.map(a => (
              <tr key={a.id}>
                <td className="px-4 py-3 font-bold text-red">{a.year}</td>
                <td className="px-4 py-3 font-medium text-gray-900">{a.title}</td>
                <td className="px-4 py-3 text-gray-500">{a.org}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => startEdit(a)} className="text-red text-xs font-medium hover:underline mr-3">Edit</button>
                  <button onClick={() => handleDelete(a.id)} className="text-gray-400 text-xs hover:text-red transition">Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-400 text-sm">No awards yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
