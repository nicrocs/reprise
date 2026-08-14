'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ChecklistForm } from '@/components/checklist-form'
import { MetronomePanel } from '@/components/metronome/metronome-panel'
import { getSongBpm, saveSongBpm } from '@/lib/metronome/song-bpm'
import { getActiveSession, saveActiveSession, type ActiveSession } from '@/lib/active-session'
import type { ChecklistAnswers } from '@/lib/types'

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export default function ActiveSessionPage() {
  const router = useRouter()
  const startedAtRef = useRef<number>(0)

  const [session, setSession] = useState<ActiveSession | null>(() => {
    if (typeof window === 'undefined') return null
    const s = getActiveSession()
    if (!s) return null
    if (!s.startedAt) {
      const updated = { ...s, startedAt: Date.now() }
      saveActiveSession(updated)
      return updated
    }
    return s
  })

  const [secondsElapsed, setSecondsElapsed] = useState(0)

  useEffect(() => {
    if (!session) {
      router.replace('/sessions/new')
      return
    }

    startedAtRef.current = session.startedAt!

    const interval = setInterval(() => {
      setSecondsElapsed(
        Math.floor((Date.now() - startedAtRef.current) / 1000)
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [session, router])

  const handleChecklistChange = useCallback((answers: ChecklistAnswers) => {
    if (!session) return
    const updated = { ...session, checklistAnswers: answers }
    saveActiveSession(updated)
    setSession(updated)
  }, [session])

  const handleBpmCommit = useCallback(
    (bpm: number) => {
      if (!session) return
      const updated = { ...session, bpm }
      saveActiveSession(updated)
      setSession(updated)
      if (session.songId) {
        saveSongBpm(session.songId, bpm)
      }
    },
    [session]
  )

  if (!session) return null

  const initialBpm = session.songId ? getSongBpm(session.songId) ?? undefined : undefined
  const checklistItems = session.templateChecklistItems ?? []

  return (
    <main className="max-w-lg mx-auto p-8 flex flex-col items-center gap-8 pt-16">
      {session.songTitle && (
        <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
          {session.songTitle}
        </p>
      )}

      {session.templateName && (
        <p className="text-xs text-muted-foreground uppercase tracking-widest">
          {session.templateName}
        </p>
      )}

      <p
        className="text-lg font-medium text-foreground leading-snug max-w-sm"
        style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '0.75rem' }}
      >
        {session.intention}
      </p>

      <p className="text-7xl font-mono font-light tabular-nums">
        {formatTime(secondsElapsed)}
      </p>

      <MetronomePanel initialBpm={initialBpm} onBpmCommit={handleBpmCommit} />

      {checklistItems.length > 0 && (
        <div className="w-full bg-[#FBF0EB]/40 rounded-lg p-5">
          <ChecklistForm
            items={checklistItems}
            values={session.checklistAnswers ?? {}}
            onChange={handleChecklistChange}
          />
        </div>
      )}

      <Button
        variant="outline"
        onClick={() => router.push('/sessions/finish')}
      >
        Finish Session
      </Button>
    </main>
  )
}