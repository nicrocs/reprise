'use client'

import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { TuningSelect } from '@/components/tuning-select'
import { KeySelect } from '@/components/key-select'
import { ThumbStyleSelect } from '@/components/thumb-style-select'
import { updateSong } from '@/app/actions/songs'
import { Tuning, Key, ThumbStyle } from '../../prisma/generated/prisma'

export type SongInfo = {
  id: string
  title: string
  tuning: Tuning | null
  key: Key | null
  thumbStyle: ThumbStyle | null
}

type Props = {
  song: SongInfo
  onSave: (updated: SongInfo) => void
  onCancel: () => void
}

export function SongDetails({ song, onSave, onCancel }: Props) {
  const [tuning, setTuning] = useState(song.tuning)
  const [key, setKey] = useState(song.key)
  const [thumbStyle, setThumbStyle] = useState(song.thumbStyle)

  async function handleSave() {
    if (song.id) await updateSong(song.id, { tuning, key, thumbStyle })
    onSave({ ...song, tuning, key, thumbStyle })
  }

  return (
    <div className="rounded-lg border p-4 space-y-4">
      <div className="space-y-2">
        <Label>Tuning</Label>
        <TuningSelect
          defaultValue={tuning}
          onChange={setTuning}
        />
      </div>
      <div className="space-y-2">
        <Label>Key</Label>
        <KeySelect
          defaultValue={key}
          onChange={setKey}
        />
      </div>
      <div className="space-y-2">
        <Label>Thumb style</Label>
        <ThumbStyleSelect
          defaultValue={thumbStyle}
          onChange={setThumbStyle}
        />
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={handleSave}>Save</Button>
        <Button size="sm" variant="ghost" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  )
}