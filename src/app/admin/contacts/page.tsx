'use client'

import { useEffect, useState, useCallback } from 'react'
import { Button, Table, TableHead, TableBody, TableRow, TableCell, TableHeadCell, Badge } from 'flowbite-react'
import DeleteConfirm from '@/components/admin/DeleteConfirm'
import Toast from '@/components/admin/Toast'

type Contact = { id: number; name: string; email: string; phone: string | null; message: string; read: boolean; createdAt: string }

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  const showToast = useCallback((message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }, [])

  useEffect(() => {
    fetch('/api/admin/contacts')
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(d => setContacts(d))
      .catch(() => showToast('Failed to load contacts', 'error'))
      .finally(() => setLoading(false))
  }, [showToast])

  async function toggleRead(c: Contact) {
    try {
      await fetch('/api/admin/contacts', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: c.id, read: !c.read }) })
      setContacts(contacts.map(x => x.id === c.id ? { ...x, read: !x.read } : x))
      showToast(c.read ? 'Marked as unread' : 'Marked as read')
    } catch {
      showToast('Failed to update', 'error')
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    try {
      await fetch('/api/admin/contacts', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: deleteId }) })
      setContacts(contacts.filter(x => x.id !== deleteId))
      showToast('Contact deleted')
    } catch {
      showToast('Failed to delete', 'error')
    } finally {
      setDeleteId(null)
    }
  }

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading...</div>

  return (
    <div>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Submissions</h1>

      <DeleteConfirm open={deleteId !== null} onConfirm={handleDelete} onCancel={() => setDeleteId(null)} itemName="this contact submission" />

      {contacts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center text-gray-400 text-sm">
          No contact submissions yet
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <Table>
            <TableHead>
              <TableRow>
                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Email</TableHeadCell>
                <TableHeadCell>Phone</TableHeadCell>
                <TableHeadCell>Message</TableHeadCell>
                <TableHeadCell>Date</TableHeadCell>
                <TableHeadCell className="text-right">Actions</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {contacts.map(c => (
                <TableRow key={c.id} className={!c.read ? 'bg-red-50 dark:bg-red-900/10' : ''}>
                  <TableCell>
                    <span className="font-medium">{c.name}</span>
                    {!c.read && <Badge color="red" size="sm" className="ml-2">New</Badge>}
                  </TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.phone || '—'}</TableCell>
                  <TableCell className="max-w-xs truncate">{c.message}</TableCell>
                  <TableCell className="whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <button type="button" className="text-gray-500 text-xs hover:text-red-600 mr-3" onClick={() => toggleRead(c)}>
                      {c.read ? 'Mark unread' : 'Mark read'}
                    </button>
                    <button type="button" className="text-gray-500 text-xs hover:text-red-600" onClick={() => setDeleteId(c.id)}>Delete</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
