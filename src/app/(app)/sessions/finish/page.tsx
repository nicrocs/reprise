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

const PRACTICE_DURATION_MS = 25 * 60 * 1000

export default function FinishSessionPage() {
  const router = useRouter()
  const [session, setSession] = useState<ActiveSession | null>(() => {
    if (typeof window === 'undefined') return null
    return getActiveSession()
  })
  const [topic, setTopic] = useState('')
  const [pickup, setPickup] = useState('')
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

  useEffect(() => {
    if (!session) router.replace('/sessions/new')
  }, [session, router])

  console.log({ session })

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
        <Label htmlFor="" className="text-base font-semibold">
          What did you work on?
        </Label>
        <Textarea
          id="accomplished"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          placeholder="e.g. Full song, Tune, Songwriting, etc"
          rows={3}
        />
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