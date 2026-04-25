'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SongTypeahead } from '@/components/song-typeahead'
import { GoalTypeahead } from '@/components/goal-typeahead'
import { SongDetails } from '@/components/song-details'
import { saveActiveSession } from '@/lib/active-session'
import { getSongById } from '@/app/actions/songs'
import { getGoalById, createGoal } from '@/app/actions/goals'
import { TUNING_LABELS, KEY_LABELS } from '@/lib/constants'
import { SongInfo } from '@/components/song-details'
import { ActiveSession, clearPrefill } from '@/lib/active-session'

export default function NewSessionPage() {
  const router = useRouter()
const [song, setSong] = useState<SongInfo | null>(() => {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem('reprise_active_session:prefill')
  console.log({ raw })
  if (!raw) return null
  const prefill = JSON.parse(raw) as Partial<ActiveSession>
  console.log({prefill})
  if (!prefill.songId || !prefill.songTitle) return null
  return {
    id: prefill.songId,
    title: prefill.songTitle,
    tuning: prefill.tuning ?? 'STANDARD',
    key: prefill.key ?? null,
  }
})

console.log({ song })

const [intention, setIntention] = useState(() => {
  if (typeof window === 'undefined') return ''
  const raw = localStorage.getItem('reprise_active_session:prefill')
  if (!raw) return ''
  const prefill = JSON.parse(raw) as Partial<ActiveSession>
  return prefill.intention ?? ''
})

const [goal, setGoal] = useState<{ id: string, name: string } | null>(() => {
  if (typeof window === 'undefined') return null
  const raw = localStorage.getItem('reprise_active_session:prefill')
  if (!raw) return null
  const prefill = JSON.parse(raw) as Partial<ActiveSession>
  if (!prefill.goalId || !prefill.goalName) return null
  return { id: prefill.goalId, name: prefill.goalName }
})

  const [editing, setEditing] = useState(false)
  const [isCreatingGoal, setIsCreatingGoal] = useState(false)
  const [newGoalName, setNewGoalName] = useState('')

  async function handleSongSelect(id: string, title: string) {
    const result = id ? await getSongById(id) : null
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

  async function handleGoalSelect(id: string, name: string) {
    const result = id ? await getGoalById(id) : null
    if (result) {
      setGoal({
        id,
        name,
      })
    } else {
      // New goal not yet in db — no tuning/key yet
      setGoal({ id: '', name })
    }
  }

  function handleStart(destination: '/prepare' | '/sessions/active') {
    if (!intention.trim()) return
    saveActiveSession({
      intention: intention.trim(),
      songId: song?.id,
      songTitle: song?.title,
      goalId: goal?.id,
      goalName: goal?.name,
      tuning: song?.tuning ?? undefined,
      key: song?.key ?? undefined,
    })
    router.push(destination)
  }

  async function handleCreateGoal() {
    const created = await createGoal(newGoalName)
    setGoal({ id: created.id, name: created.name })
    setIsCreatingGoal(false)
    setNewGoalName('')
  }

  function handleCancelCreate() {
    setIsCreatingGoal(false)
    setNewGoalName('')
  }

  useEffect(() => {
    clearPrefill()
  }, [])

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
        <SongTypeahead onSelect={handleSongSelect} defaultValue={song?.title} />

        {/* Tuning + key — read only with edit toggle */}
        {song && !editing && song.tuning && (
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

{/* Goal section */}
<div className="space-y-2">
  <Label className="text-base font-semibold">Goal</Label>
  
  {!isCreatingGoal ? (
    <>
      <GoalTypeahead 
        initialGoal={goal ?? undefined}
        onSelect={handleGoalSelect}
      />
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setIsCreatingGoal(true)}
      >
        New Goal
      </Button>
    </>
  ) : (
    <div className="space-y-2">
      <Input
        value={newGoalName}
        onChange={e => setNewGoalName(e.target.value)}
        placeholder="e.g. Improvisation"
      />
      <div className="flex gap-2">
        <Button 
          size="sm" 
          onClick={handleCreateGoal}
          disabled={!newGoalName.trim()}
        >
          Save
        </Button>
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={handleCancelCreate}
        >
          Cancel
        </Button>
      </div>
    </div>
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