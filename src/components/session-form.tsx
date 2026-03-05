import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { SubmitButton } from '@/components/submit-button'
import { Separator } from '@/components/ui/separator'
import { SongTypeahead } from '@/components/song-typeahead'
// import { IntentionMetRadioGroup } from './intention-met-radio-group'
import { toLocalDateTimeString } from '@/lib/utils'

type SessionFormProps = {
  action: (formData: FormData) => Promise<void>
  defaultValues?: {
    date?: string
    duration?: number
    topic?: string
    songTitle?: string
    bpm?: number | null
    notes?: string | null
    intention?: string | null
    intentionMet?: boolean | null
  }
  submitLabel?: string
}

export function SessionForm({ action, defaultValues, submitLabel }: SessionFormProps) {
    
  return (
    <form action={action} className="flex flex-col gap-4">
        {defaultValues?.intention && (
        <div className="rounded-lg border p-4 space-y-3">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
            Your intention
            </p>
            <p
            className="text-base font-medium text-foreground leading-snug"
            style={{ borderLeft: '2px solid var(--primary)', paddingLeft: '0.75rem' }}
            >
            {defaultValues.intention}
            </p>
            <Separator />
            {/* <IntentionMetRadioGroup defaultValue={defaultValues.intentionMet} /> */}
        </div>
        )}
        <div className="space-y-2">
        <Label htmlFor="intention" className="text-base font-semibold">
            What do you want to accomplish in this session?
        </Label>
        <p className="text-sm text-muted-foreground">
            {'Be specific. "nail the bridge transition at 120bpm" beats "practice song."'}
        </p>
        <Textarea
            id="intention"
            name="intention"
            defaultValue={defaultValues?.intention ?? ""}
            placeholder="e.g. Work through the first 8 bars of the solo slowly, hands separately"
            className="min-h-[100px] text-base"
            rows={3}
        />
        </div>

        <Separator />

{/* rest of the form fields below */}
      <div>
        <Label htmlFor="date">Date</Label>
        <Input
          type="datetime-local"
          id="date"
          name="date"
          required
          defaultValue={defaultValues?.date
    ? toLocalDateTimeString(new Date(defaultValues.date))
    : toLocalDateTimeString(new Date())}
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