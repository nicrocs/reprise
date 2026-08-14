'use client'

import { useState } from 'react'
import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SongDetails, SongInfo } from '@/components/song-details'
import { TUNING_LABELS, KEY_LABELS, THUMB_STYLE_LABELS } from '@/lib/constants'

export function SongMetadataEditor({ song }: { song: SongInfo }) {
  const [editing, setEditing] = useState(false)
  const [info, setInfo] = useState(song)

  if (editing) {
    return (
      <SongDetails
        song={info}
        onSave={(updated) => {
          setInfo(updated)
          setEditing(false)
        }}
        onCancel={() => setEditing(false)}
      />
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs border border-border rounded px-1.5 py-0.5 text-muted-foreground">
        {TUNING_LABELS[info.tuning ?? ''] ?? 'Standard'}
      </span>
      {info.key && (
        <span className="text-xs border border-border rounded px-1.5 py-0.5 text-muted-foreground">
          {KEY_LABELS[info.key]}
        </span>
      )}
      {info.thumbStyle && (
        <span className="text-xs border border-border rounded px-1.5 py-0.5 text-muted-foreground">
          {THUMB_STYLE_LABELS[info.thumbStyle]}
        </span>
      )}
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6"
        onClick={() => setEditing(true)}
        aria-label="Edit song metadata"
      >
        <Pencil className="h-3 w-3" />
      </Button>
    </div>
  )
}
