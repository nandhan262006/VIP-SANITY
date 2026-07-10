'use client'

import { useEffect, useState } from 'react'

export default function PopupVideoPage() {
  const [form, setForm] = useState({ videoUrl: '', enabled: true, delay: 10 })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetch('/api/admin/popup-video')
      .then(r => r.json())
      .then(d => {
        if (d) setForm({ videoUrl: d.videoUrl || '', enabled: d.enabled ?? true, delay: d.delay ?? 10 })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setUploading(true)
    const fd = new FormData()
    fd.append('file', f)
    const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
    const data = await res.json()
    setForm(p => ({ ...p, videoUrl: data.url }))
    setUploading(false)
  }

  async function handleSave() {
    setSaving(true)
    await fetch('/api/admin/popup-video', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  if (loading) return <div className="text-gray-400 text-sm p-8">Loading...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Popup Video</h1>

      <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-lg">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-600">Enabled</label>
            <button
              onClick={() => setForm(p => ({ ...p, enabled: !p.enabled }))}
              className={`relative w-10 h-5 rounded-full transition ${form.enabled ? 'bg-red' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition ${form.enabled ? 'translate-x-5' : ''}`} />
            </button>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Delay (seconds)</label>
            <input
              type="number"
              value={form.delay}
              onChange={e => setForm(p => ({ ...p, delay: Number(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Upload Video</label>
            <input type="file" accept="video/*" onChange={handleUpload} className="w-full text-sm" />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Or Video URL</label>
            <input
              value={form.videoUrl}
              onChange={e => setForm(p => ({ ...p, videoUrl: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="/POPUP.mp4"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving || uploading || !form.videoUrl}
            className="bg-red text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-red-dark transition disabled:opacity-50"
          >
            {uploading ? 'Uploading...' : saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  )
}
