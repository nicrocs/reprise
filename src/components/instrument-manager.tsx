'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  archiveInstrument,
  createInstrument,
  getInstruments,
  renameInstrument,
  restoreInstrument,
} from '@/app/actions/instruments'

type Instrument = {
  id: string
  name: string
  isArchived: boolean
}

export function InstrumentManager() {
  const [instruments, setInstruments] = useState<Instrument[]>([])
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  async function refresh() {
    setInstruments(await getInstruments())
    setLoading(false)
  }

  useEffect(() => {
    getInstruments()
      .then((rows) => {
        setInstruments(rows)
        setLoading(false)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unable to load instruments')
        setLoading(false)
      })
  }, [])

  async function handleCreate() {
    setError(null)
    try {
      await createInstrument(newName)
      setNewName('')
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to add instrument')
    }
  }

  async function handleRename(id: string) {
    setError(null)
    try {
      await renameInstrument(id, editingName)
      setEditingId(null)
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to rename instrument')
    }
  }

  async function handleArchive(id: string) {
    setError(null)
    try {
      await archiveInstrument(id)
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to archive instrument')
    }
  }

  async function handleRestore(id: string) {
    setError(null)
    try {
      await restoreInstrument(id)
      await refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to restore instrument')
    }
  }

  if (loading) return <p className="text-sm text-muted-foreground">Loading instruments…</p>

  return (
    <div className="space-y-6">
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <Input
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
          placeholder="e.g. Jazz Bass"
          onKeyDown={(event) => {
            if (event.key === 'Enter') void handleCreate()
          }}
        />
        <Button onClick={() => void handleCreate()} disabled={!newName.trim()}>
          Add
        </Button>
      </div>

      <ul className="divide-y divide-border rounded-lg border border-border">
        {instruments.map((instrument) => (
          <li key={instrument.id} className="flex items-center justify-between gap-3 p-4">
            {editingId === instrument.id ? (
              <div className="flex min-w-0 flex-1 gap-2">
                <Input
                  value={editingName}
                  onChange={(event) => setEditingName(event.target.value)}
                  autoFocus
                />
                <Button size="sm" onClick={() => void handleRename(instrument.id)}>
                  Save
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="min-w-0">
                <p className={instrument.isArchived ? 'text-muted-foreground line-through' : 'font-medium'}>
                  {instrument.name}
                </p>
                {instrument.isArchived && (
                  <p className="text-xs text-muted-foreground">Archived</p>
                )}
              </div>
            )}

            {editingId !== instrument.id && (
              <div className="flex shrink-0 gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setEditingId(instrument.id)
                    setEditingName(instrument.name)
                  }}
                >
                  Rename
                </Button>
                {instrument.isArchived ? (
                  <Button size="sm" variant="outline" onClick={() => void handleRestore(instrument.id)}>
                    Restore
                  </Button>
                ) : (
                  <Button size="sm" variant="ghost" onClick={() => void handleArchive(instrument.id)}>
                    Archive
                  </Button>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
