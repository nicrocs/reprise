'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { SongTypeahead } from '@/components/song-typeahead'
import { SongDetails } from '@/components/song-details'
import { saveActiveSession } from '@/lib/active-session'
import { getSongById } from '@/app/actions/songs'
import { TUNING_LABELS, KEY_LABELS } from '@/lib/constants'

type SongInfo = {
  id: string
  title: string
  tuning: string
  key: string | null
}

export default function NewSessionPage() {
  const router = useRouter()
  const [intention, setIntention] = useState('')
  const [song, setSong] = useState<SongInfo | null>(null)
  const [editing, setEditing] = useState(false)

  async function handleSongSelect(id: string, title: string) {
    const result = await getSongById(id)
    if (result) {
      setSong({
        id,
        title,
        tuning: result.tuning,
        key: result.key ?? null,
      })
    } else {
      // New song not yet in db — no tuning/key yet
      setSong({ id: '', title, tuning: 'STANDARD', key: null })
    }
    setEditing(false)
  }

  function handleStart(destination: '/prepare' | '/sessions/active') {
    if (!intention.trim()) return
    saveActiveSession({
      intention: intention.trim(),
      songId: song?.id,
      songTitle: song?.title,
      tuning: song?.tuning,
      key: song?.key ?? undefined,
    })
    router.push(destination)
  }

  return (
    <main className="max-w-xl mx-auto p-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">New Session</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Set your intention before you play.
        </p>
      </div>

      {/* Song */}
      <div className="space-y-2">
        <Label className="text-base font-semibold">Song</Label>
        <SongTypeahead onSelect={handleSongSelect} />

        {/* Tuning + key — read only with edit toggle */}
        {song && !editing && (
          <div className="flex items-center gap-3 pt-1">
            <span className="text-sm text-muted-foreground">
              {TUNING_LABELS[song.tuning]}
              {song.key && ` · ${KEY_LABELS[song.key]}`}
            </span>
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="text-xs text-primary hover:underline"
            >
              edit
            </button>
          </div>
        )}

        {/* Inline edit form */}
        {song && editing && (
          <SongDetails
            song={song}
            onSave={(updated) => {
              setSong(updated)
              setEditing(false)
            }}
            onCancel={() => setEditing(false)}
          />
        )}
      </div>

      {/* Intention */}
      <div className="space-y-2">
        <Label htmlFor="intention" className="text-base font-semibold">
          What do you want to work on?
        </Label>
        <p className="text-sm text-muted-foreground">
          {'Be specific. "nail the bridge at 80bpm" beats "practice song."'}
        </p>
        <Textarea
          id="intention"
          value={intention}
          onChange={e => setIntention(e.target.value)}
          placeholder="e.g. Work through the chord transitions in the chorus slowly, hands separate"
          className="min-h-[100px] text-base"
          rows={3}
          autoFocus
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button
          onClick={() => handleStart('/prepare')}
          disabled={!intention.trim()}
          size="lg"
          className="w-full"
        >
          Prepare then start
        </Button>
        <Button
          onClick={() => handleStart('/sessions/active')}
          disabled={!intention.trim()}
          variant="outline"
          size="lg"
          className="w-full"
        >
          Skip preparation
        </Button>
      </div>
    </main>
  )
}