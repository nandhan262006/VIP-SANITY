'use client'

import { useEffect, useState } from 'react'
import { Button, Table, TableHead, TableBody, TableRow, TableCell, TableHeadCell, TextInput } from 'flowbite-react'

type Setting = { key: string; value: string }

const SETTING_LABELS: Record<string, string> = {
  whatsapp: 'WhatsApp Number',
  phone: 'Phone Number',
  address: 'Address',
  instagram: 'Instagram URL',
  facebook: 'Facebook URL',
  youtube: 'YouTube URL',
  google_maps: 'Google Maps URL',
  email: 'Email Address',
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([])
  const [loading, setLoading] = useState(true)
  const [editKey, setEditKey] = useState<string | null>(null)
  const [editValue, setEditValue] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(d => {
        const arr = Object.entries(d).map(([key, value]) => ({ key, value: value as string }))
        setSettings(arr)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  async function handleSave(key: string) {
    setSaving(true)
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value: editValue }),
    })
    setSettings(prev => prev.map(s => s.key === key ? { ...s, value: editValue } : s))
    setEditKey(null)
    setSaving(false)
  }

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Site Settings</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Setting</TableHeadCell>
              <TableHeadCell>Value</TableHeadCell>
              <TableHeadCell className="text-right">Actions</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {settings.map(s => (
              <TableRow key={s.key}>
                <TableCell className="font-medium">{SETTING_LABELS[s.key] || s.key}</TableCell>
                <TableCell>
                  {editKey === s.key ? (
                    <div className="flex gap-2 items-center">
                      <TextInput
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        className="flex-1"
                        sizing="sm"
                      />
                      <Button size="xs" color="red" onClick={() => handleSave(s.key)} disabled={saving}>Save</Button>
                      <Button size="xs" color="gray" onClick={() => setEditKey(null)}>Cancel</Button>
                    </div>
                  ) : (
                    <span className="text-gray-500 truncate max-w-[300px] block">{s.value}</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {editKey !== s.key && (
                    <button type="button" className="text-red-600 text-xs font-medium hover:underline" onClick={() => { setEditKey(s.key); setEditValue(s.value) }}>Edit</button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
