'use client'

import { useState, useTransition } from 'react'
import { SONG_STATUS_LABELS, SONG_STATUS_ORDER } from '@/lib/constants'
import type { SongStatus } from '../../prisma/generated/prisma'
import { updateSongStatus } from '@/app/actions/songs'

type Props = {
  songId: string
  initialStatus: SongStatus
}

export function SongStatusEditor({ songId, initialStatus }: Props) {
  const [status, setStatus] = useState<SongStatus>(initialStatus)
  const [pending, startTransition] = useTransition()

  function handleChange(value: string) {
    const next = value as SongStatus
    setStatus(next)
    startTransition(() => {
      updateSongStatus(songId, next)
    })
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">
        Status
      </span>
      <select
        value={status}
        onChange={(e) => handleChange(e.target.value)}
        disabled={pending}
        className="text-sm border border-border rounded px-2 py-1 bg-background"
      >
        {SONG_STATUS_ORDER.map((s) => (
          <option key={s} value={s}>
            {SONG_STATUS_LABELS[s]}
          </option>
        ))}
      </select>
    </div>
  )
}
