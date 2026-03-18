'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getActiveSession, clearActiveSession, type ActiveSession } from '@/lib/active-session'
import { createGoal } from '@/app/actions/goals'
import { IntentionMetRadioGroup } from '@/components/intention-met-radio-group'
import { createSession } from '@/app/actions/sessions'
import { GoalTypeahead } from '@/components/goal-typeahead'

const PRACTICE_DURATION_MS = 25 * 60 * 1000

export default function FinishSessionPage() {
  const router = useRouter()
  const [session, setSession] = useState<ActiveSession | null>(() => {
    if (typeof window === 'undefined') return null
    return getActiveSession()
  })
  const [pickup, setPickup] = useState('')
  const [notes, setNotes] = useState('')
  const [intentionMet, setIntentionMet] = useState<boolean | null>(null)
  const [duration, setDuration] = useState<number>(() => {
    if (typeof window === 'undefined') return 25
    const active = getActiveSession()
    if (!active || !active.startedAt) return 25
    return Math.max(1, Math.round((Date.now() - active.startedAt) / 60000))
  })
  const [bpm, setBpm] = useState<number>(80)
//   const [type, setType] = useState(SESSION_TYPES[0].value)
  const [saving, setSaving] = useState(false)

  const [goal, setGoal] = useState<{ id: string | null; name: string } | null>(() => {
    // initialize from session.goalId / session.goalName
    if (!session?.goalId || !session?.goalName) return null
    return { id: session.goalId, name: session.goalName }
  })
  const [isEditingGoal, setIsEditingGoal] = useState(false)
  const [isCreatingGoal, setIsCreatingGoal] = useState(false)
  const [editSelection, setEditSelection] = useState<{ id: string; name: string } | null>(null)
  const [newGoalName, setNewGoalName] = useState('')

  useEffect(() => {
    if (!session) router.replace('/sessions/new')
  }, [session, router])

  function handleSaveEdit() {
  if (!editSelection) return
  setGoal(editSelection)
  setIsEditingGoal(false)
  setEditSelection(null)
}

function handleCancelEdit() {
  setIsEditingGoal(false)
  setEditSelection(null)
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

  async function handleSave() {
    if (!session) return
    setSaving(true)

    const formData = new FormData()
    formData.set('intention', session.intention)
    formData.set('topic', topic)
    formData.set('pickup', pickup)
    formData.set('intentionMet', intentionMet === null ? '' : String(intentionMet))
    formData.set('duration', String(duration))
    formData.set('date', session.startedAt 
        ? new Date(session.startedAt).toISOString() 
        : new Date().toISOString()
    )
    formData.set('bpm', String(bpm))
    formData.set('notes', notes)

    // formData.set('type', type)
    if (session.songId) formData.set('songId', session.songId)
    if (session.songTitle) formData.set('songTitle', session.songTitle)

    await createSession(formData)
    clearActiveSession()
    router.push('/sessions')
  }

  if (!session) return null

  return (
    <main className="max-w-xl mx-auto p-8 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Session Complete</h1>
        {session.songTitle && (
          <p className="text-sm text-muted-foreground mt-1">{session.songTitle}</p>
        )}
      </div>

      {!isEditingGoal && !isCreatingGoal && (
  <div className="space-y-2">
    <Label className="text-base font-semibold">Goal</Label>
    <div className="flex items-center justify-between">
      <p className="text-sm">
        {goal?.name ?? 'No goal set'}
      </p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => setIsEditingGoal(true)}>
          Edit
        </Button>
        <Button variant="outline" size="sm" onClick={() => setIsCreatingGoal(true)}>
          New Goal
        </Button>
      </div>
    </div>
  </div>
)}

{isEditingGoal && (
  <div className="space-y-2">
    <Label className="text-base font-semibold">Goal</Label>
    <GoalTypeahead
      initialGoal={goal ?? undefined}
      onSelect={(id, name) => {
        // update local state
        setEditSelection({ id, name })
      }}
    />
    <div className="flex gap-2">
      <Button size="sm" onClick={handleSaveEdit}>Save</Button>
      <Button size="sm" variant="ghost" onClick={handleCancelEdit}>Cancel</Button>
    </div>
  </div>
)}

{isCreatingGoal && (
  <div className="space-y-2">
    <Label className="text-base font-semibold">New Goal</Label>
    <Input
      value={newGoalName}
      onChange={e => setNewGoalName(e.target.value)}
      placeholder="e.g. Improvisation"
    />
    <div className="flex gap-2">
      <Button size="sm" onClick={handleCreateGoal} disabled={!newGoalName.trim()}>
        Save
      </Button>
      <Button size="sm" variant="ghost" onClick={() => setIsCreatingGoal(false)}>
        Cancel
      </Button>
    </div>
  </div>
)}

      <div className="rounded-lg border p-4 space-y-3">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
          Your intention
        </p>
        <p
          className="text-base font-medium text-foreground leading-snug"
          style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '0.75rem' }}
        >
          {session.intention}
        </p>
        <Separator />
        <div className="space-y-2">
          <Label className="text-sm">Did this happen?</Label>
          <IntentionMetRadioGroup
            value={intentionMet}
            onChange={setIntentionMet}
          />    
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pickup" className="text-base font-semibold">
          Where to pick up next time
        </Label>
        <p className="text-sm text-muted-foreground">
          {`Write this while it's fresh. Your future self will thank you.`}
        </p>
        <Textarea
          id="pickup"
          value={pickup}
          onChange={e => setPickup(e.target.value)}
          placeholder="e.g. Start with the measure I had the most trouble with"
          rows={3}
          className="border-primary"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="duration">Duration (minutes)</Label>
        <Input
          id="duration"
          type="number"
          min="1"
          value={duration}
          onChange={e => setDuration(Number(e.target.value))}
          className="w-24"
        />
      </div>
        <div className="space-y-2">
        <Label htmlFor="duration">BPM</Label>
        <Input
          id="bpm"
          type="number"
          min="40"
          value={bpm}
          onChange={e => setBpm(Number(e.target.value))}
          className="w-24"
        />
      </div>
      {/* add notes */}
    <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          rows={4}
          onChange={e => setNotes(e.target.value)}
          value={notes}
        />
      </div>
      {/* add mood */}
      {/* add focus */}
        {/* <div className='space-y-2'>
            <span className="text-sm text-gray-500">
              What type of work did you do?
            </span>
            <TypeSelect onChange={setType} />
        </div> */}
            

      <Button onClick={handleSave} disabled={saving} size="lg" className="w-full">
        {saving ? 'Saving...' : 'Save Session'}
      </Button>
    </main>
  )
}