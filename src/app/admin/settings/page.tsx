'use client'

import { useEffect, useState } from 'react'

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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Site Settings</h1>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-medium text-gray-600">Setting</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Value</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {settings.map(s => (
              <tr key={s.key}>
                <td className="px-4 py-3 font-medium text-gray-900">{SETTING_LABELS[s.key] || s.key}</td>
                <td className="px-4 py-3">
                  {editKey === s.key ? (
                    <div className="flex gap-2">
                      <input
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        className="flex-1 px-2 py-1.5 border border-gray-300 rounded text-sm"
                        autoFocus
                      />
                      <button onClick={() => handleSave(s.key)} disabled={saving} className="text-xs bg-red text-white px-3 py-1.5 rounded font-medium">Save</button>
                      <button onClick={() => setEditKey(null)} className="text-xs text-gray-500 px-2">Cancel</button>
                    </div>
                  ) : (
                    <span className="text-gray-500 truncate max-w-[300px] block">{s.value}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {editKey !== s.key && (
                    <button onClick={() => { setEditKey(s.key); setEditValue(s.value) }} className="text-red text-xs font-medium hover:underline">Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
