'use client'

import { useEffect, useState } from 'react'

type Contact = { id: number; name: string; email: string; phone: string | null; message: string; read: boolean; createdAt: string }

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/contacts').then(r => r.json()).then(d => { setContacts(d); setLoading(false) })
  }, [])

  async function toggleRead(c: Contact) {
    await fetch('/api/admin/contacts', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: c.id, read: !c.read }) })
    setContacts(contacts.map(x => x.id === c.id ? { ...x, read: !x.read } : x))
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this contact submission?')) return
    await fetch('/api/admin/contacts', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setContacts(contacts.filter(x => x.id !== id))
  }

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Contact Submissions</h1>

      {contacts.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-400 text-sm">No contact submissions yet</div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Phone</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Message</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contacts.map(c => (
                <tr key={c.id} className={!c.read ? 'bg-red-50/50' : ''}>
                  <td className="px-4 py-3">
                    <span className="font-medium text-gray-900">{c.name}</span>
                    {!c.read && <span className="ml-2 inline-block w-2 h-2 bg-red rounded-full" />}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{c.email}</td>
                  <td className="px-4 py-3 text-gray-600">{c.phone || '—'}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{c.message}</td>
                  <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">
                    <button onClick={() => toggleRead(c)} className="text-xs text-gray-500 hover:text-red transition mr-3">
                      {c.read ? 'Mark unread' : 'Mark read'}
                    </button>
                    <button onClick={() => handleDelete(c.id)} className="text-xs text-gray-400 hover:text-red transition">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
