'use client'

import { useEffect, useState } from 'react'
import { Button, Card, Label, TextInput, ToggleSwitch } from 'flowbite-react'
import FileUpload from '@/components/admin/FileUpload'

export default function PopupVideoPage() {
  const [form, setForm] = useState({ videoUrl: '', enabled: true, delay: 10 })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/popup-video')
      .then(r => r.json())
      .then(d => {
        if (d) setForm({ videoUrl: d.videoUrl || '', enabled: d.enabled ?? true, delay: d.delay ?? 10 })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

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
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Popup Video</h1>

      <Card className="max-w-lg">
        <div className="space-y-5">
          <ToggleSwitch
            label="Enabled"
            checked={form.enabled}
            onChange={val => setForm(p => ({ ...p, enabled: val }))}
          />

          <div>
            <Label className="mb-2 block">Delay (seconds)</Label>
            <TextInput
              type="number"
              value={form.delay}
              onChange={e => setForm(p => ({ ...p, delay: Number(e.target.value) }))}
            />
          </div>

          <FileUpload
            accept="video/*"
            currentUrl={form.videoUrl}
            onUpload={url => setForm(p => ({ ...p, videoUrl: url }))}
            label="Upload Video"
          />

          <div>
            <Label className="mb-2 block">Or Video URL</Label>
            <TextInput
              value={form.videoUrl}
              onChange={e => setForm(p => ({ ...p, videoUrl: e.target.value }))}
              placeholder="/POPUP.mp4"
            />
          </div>

          <Button
            color="red"
            onClick={handleSave}
            disabled={saving || !form.videoUrl}
          >
            {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </Button>
        </div>
      </Card>
    </div>
  )
}
