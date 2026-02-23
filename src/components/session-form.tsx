'use client'

import { createSession } from '@/app/actions/sessions'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { SubmitButton } from '@/components/submit-button'
import { SongTypeahead } from '@/components/song-typeahead'

export function SessionForm() {
  return (
    <form action={createSession} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          type="date"
          id="date"
          name="date"
          required
          defaultValue={new Date().toLocaleDateString('en-CA')}
        />
      </div>
      <div>
        <Label htmlFor="duration">Duration (minutes)</Label>
        <Input type="number" id="duration" name="duration" required min="1" />
      </div>
      <div>
        <Label htmlFor="topic">What did you practice?</Label>
        <Input type="text" id="topic" name="topic" required />
      </div>
      <div>
        <Label>Song</Label>
        <SongTypeahead />
      </div>
      <div>
        <Label htmlFor="bpm">BPM (optional)</Label>
        <Input type="number" id="bpm" name="bpm" min="1" />
      </div>
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea id="notes" name="notes" rows={4} />
      </div>
      <SubmitButton />
    </form>
  )
}