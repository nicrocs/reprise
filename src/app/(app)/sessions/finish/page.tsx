'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getActiveSession, clearActiveSession, type ActiveSession } from '@/lib/active-session'
import { IntentionMetRadioGroup } from '@/components/intention-met-radio-group'
import { createSession } from '@/app/actions/sessions'
import { TagsTypeahead } from '@/components/tags-typeahead'

export default function FinishSessionPage() {
  const router = useRouter()
  const [session] = useState<ActiveSession | null>(() => {
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
  const [saving, setSaving] = useState(false)
  const [tags, setTags] = useState<{ id: string; name: string }[]>([])

  const [goal] = useState<{ id: string | null; name: string } | null>(() => {
    if (!session?.goalId || !session?.goalName) return null
    return { id: session.goalId, name: session.goalName }
  })

  useEffect(() => {
    if (!session) router.replace('/sessions/new')
  }, [session, router])

  async function handleSave() {
    if (!session) return
    setSaving(true)

    const formData = new FormData()

    formData.set('intention', session.intention)
    formData.set('pickup', pickup)
    formData.set('intentionMet', intentionMet === null ? '' : String(intentionMet))
    formData.set('duration', String(duration))
    formData.set('date', session.startedAt 
        ? new Date(session.startedAt).toISOString() 
        : new Date().toISOString()
    )
    formData.set('bpm', String(bpm))
    formData.set('notes', notes)


    if (session.songId) formData.set('songId', session.songId)
    if (session.songTitle) formData.set('songTitle', session.songTitle)
    if (goal?.id) formData.set('goalId', goal.id)
    formData.set('tags', JSON.stringify(tags.map((tag) => tag.name)))

    await createSession(formData)
    clearActiveSession()
    router.push('/sessions')
  }

  if (!session) return null

  return (
    <main className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold">Session Complete</h1>
        {session.songTitle && (
          <p className="text-sm text-muted-foreground mt-1">{session.songTitle}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <Label className="text-xs uppercase tracking-widest text-muted-foreground">Goal</Label>
        <p className="text-sm">{goal?.name ?? 'No goal set'}</p>
      </div>

<div className="bg-[#FBF0EB]/40 rounded-lg p-5 flex flex-col gap-5">
        <div className="space-y-3">
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
          Intention
        </p>
        <p
          className="text-base font-medium text-foreground leading-snug"
          style={{ borderLeft: '2px solid var(--warm)', paddingLeft: '0.75rem' }}
        >
          {session.intention}
        </p>
        <Separator />
        <div className="space-y-2 mb-2">
          <Label className="text-xs uppercase tracking-widest text-muted-foreground">Did this happen?</Label>
          <IntentionMetRadioGroup
            value={intentionMet}
            onChange={setIntentionMet}
          />    
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="pickup" className="text-xs uppercase tracking-widest text-muted-foreground">
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
        />
      </div>
</div>

      <div className="space-y-2">
        <Label htmlFor="duration" className="text-xs uppercase tracking-widest text-muted-foreground">Duration (minutes)</Label>
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
        <Label className="text-xs uppercase tracking-widest text-muted-foreground">Tags</Label>
        <TagsTypeahead onChange={setTags} />
      </div>
        <div className="space-y-2">
        <Label htmlFor="bpm" className="text-xs uppercase tracking-widest text-muted-foreground">BPM</Label>
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
        <Label htmlFor="notes" className="text-xs uppercase tracking-widest text-muted-foreground">Notes</Label>
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
            

      <Button onClick={handleSave} disabled={saving} size="lg" variant="warm" className="w-fit">
        {saving ? 'Saving...' : 'Save Session'}
      </Button>
    </main>
  )
}
