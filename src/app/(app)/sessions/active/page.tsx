'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { getActiveSession, type ActiveSession } from '@/lib/active-session'

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export default function ActiveSessionPage() {
  const router = useRouter()
  const startedAtRef = useRef<number>(0)

  const [session] = useState<ActiveSession | null>(() => {
    if (typeof window === 'undefined') return null
    return getActiveSession()
  })

  const [secondsElapsed, setSecondsElapsed] = useState(0)

useEffect(() => {
  if (!session) {
    router.replace('/sessions/new')
    return
  }

  if (session.startedAt) {
    startedAtRef.current = session.startedAt
  } else {
    const now = Date.now()
    startedAtRef.current = now
    const updated = { ...session, startedAt: now }
    localStorage.setItem('reprise_active_session', JSON.stringify(updated))
  }

  const interval = setInterval(() => {
    setSecondsElapsed(
      Math.floor((Date.now() - startedAtRef.current) / 1000)
    )
  }, 1000)

  return () => clearInterval(interval)
}, [session, router])

  if (!session) return null

  return (
    <main className="max-w-lg mx-auto p-8 flex flex-col items-center gap-8 pt-16">
      {session.songTitle && (
        <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
          {session.songTitle}
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

      <Button
        variant="outline"
        onClick={() => router.push('/sessions/finish')}
      >
        Finish Session
      </Button>
    </main>
  )
}