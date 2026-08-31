'use client'

import { useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { createSongVideo, deleteSongVideo, updateSongVideo } from '@/app/actions/songs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export type SongVideoInfo = {
  id: string
  label: string
  url: string
}

type Props = {
  songId: string
  initialVideos: SongVideoInfo[]
}

export function SongVideos({ songId, initialVideos }: Props) {
  const [videos, setVideos] = useState(initialVideos)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [label, setLabel] = useState('')
  const [url, setUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  function startAdd() {
    setEditingId(null)
    setLabel('')
    setUrl('')
    setError(null)
    setShowForm(true)
  }

  function startEdit(video: SongVideoInfo) {
    setEditingId(video.id)
    setLabel(video.label)
    setUrl(video.url)
    setError(null)
    setShowForm(true)
  }

  function cancel() {
    setShowForm(false)
    setEditingId(null)
    setError(null)
  }

  async function save() {
    setSaving(true)
    setError(null)
    try {
      const video = editingId
        ? await updateSongVideo(editingId, label, url)
        : await createSongVideo(songId, label, url)
      setVideos((current) => editingId
        ? current.map((item) => item.id === video.id ? video : item)
        : [...current, video])
      cancel()
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Could not save video')
    } finally {
      setSaving(false)
    }
  }

  async function remove(video: SongVideoInfo) {
    if (!window.confirm(`Delete "${video.label}"?`)) return
    try {
      await deleteSongVideo(video.id)
      setVideos((current) => current.filter((item) => item.id !== video.id))
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Could not delete video')
    }
  }

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Tutorial videos</p>
        {!showForm && <Button type="button" size="xs" variant="outline" onClick={startAdd}><Plus /> Add video</Button>}
      </div>

      {videos.length === 0 && !showForm && (
        <p className="text-sm text-muted-foreground">No tutorial videos saved yet.</p>
      )}
      <ul className="divide-y">
        {videos.map((video) => (
          <li key={video.id} className="flex items-center gap-2 py-3">
            <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-sm text-foreground hover:underline truncate flex-1">
              {video.label}
            </a>
            <Button type="button" size="icon-xs" variant="ghost" onClick={() => startEdit(video)} aria-label={`Edit ${video.label}`}><Pencil /></Button>
            <Button type="button" size="icon-xs" variant="ghost" onClick={() => remove(video)} aria-label={`Delete ${video.label}`}><Trash2 /></Button>
          </li>
        ))}
      </ul>

      {showForm && (
        <div className="rounded-lg border p-4 space-y-3">
          <div className="space-y-1"><Label htmlFor="video-label">Label</Label><Input id="video-label" value={label} onChange={(event) => setLabel(event.target.value)} placeholder="e.g. Fingerstyle tutorial" /></div>
          <div className="space-y-1"><Label htmlFor="video-url">Video URL</Label><Input id="video-url" type="url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://..." /></div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <div className="flex gap-2"><Button type="button" size="sm" onClick={save} disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button><Button type="button" size="sm" variant="ghost" onClick={cancel}>Cancel</Button></div>
        </div>
      )}
      {!showForm && error && <p className="text-sm text-destructive mt-2">{error}</p>}
    </section>
  )
}
