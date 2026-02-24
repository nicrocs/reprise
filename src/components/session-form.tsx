import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { SubmitButton } from '@/components/submit-button'
import { SongTypeahead } from '@/components/song-typeahead'

type SessionFormProps = {
  action: (formData: FormData) => Promise<void>
  defaultValues?: {
    date?: string
    duration?: number
    topic?: string
    songTitle?: string
    bpm?: number | null
    notes?: string | null
  }
  submitLabel?: string
}

export function SessionForm({ action, defaultValues, submitLabel }: SessionFormProps) {
    
  return (
    <form action={action} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          type="date"
          id="date"
          name="date"
          required
          defaultValue={defaultValues?.date ?? new Date().toLocaleDateString('en-CA')}
        />
      </div>
      <div>
        <Label htmlFor="duration">Duration (minutes)</Label>
        <Input
          type="number"
          id="duration"
          name="duration"
          required
          min="1"
          defaultValue={defaultValues?.duration}
        />
      </div>
      <div>
        <Label htmlFor="topic">What did you practice?</Label>
        <Input
          type="text"
          id="topic"
          name="topic"
          required
          defaultValue={defaultValues?.topic}
        />
      </div>
      <div>
        <Label>Song</Label>
        <SongTypeahead defaultValue={defaultValues?.songTitle} />
      </div>
      <div>
        <Label htmlFor="bpm">BPM (optional)</Label>
        <Input
          type="number"
          id="bpm"
          name="bpm"
          min="1"
          defaultValue={defaultValues?.bpm ?? undefined}
        />
      </div>
      <div>
        <Label htmlFor="notes">Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          rows={4}
          defaultValue={defaultValues?.notes ?? undefined}
        />
      </div>
      <SubmitButton label={submitLabel} />
    </form>
  )
}