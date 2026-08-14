"use client"

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { SubmitButton } from '@/components/submit-button'
import { SongTypeahead } from '@/components/song-typeahead'
import { TagsTypeahead } from '@/components/tags-typeahead'
// import { IntentionMetRadioGroup } from './intention-met-radio-group'
import { toLocalDateTimeString } from '@/lib/utils'
import { DeleteSessionButton } from './delete-session-button'
import type { ChecklistItem, ChecklistAnswers } from '@/lib/types'

type SessionFormProps = {
  action: (formData: FormData) => Promise<void>
  defaultValues?: {
    id?: string
    date?: string
    duration?: number
    topic?: string
    songTitle?: string
    bpm?: number | null
    notes?: string | null
    intention?: string | null
    intentionMet?: boolean | null
    tags?: { id: string; name: string }[]
    templateName?: string | null
    checklistItems?: ChecklistItem[]
    checklistAnswers?: ChecklistAnswers
  }
  submitLabel?: string
}

function ChecklistSummary({
  templateName,
  items,
  answers,
}: {
  templateName?: string | null
  items: ChecklistItem[]
  answers?: ChecklistAnswers
}) {
  const answerCount = items.filter((item) => answers?.[item.question]?.trim()).length

  return (
    <div className="bg-[#FBF0EB]/40 rounded-lg p-5 space-y-4">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">
        {templateName ? `${templateName} · ${answerCount} answer${answerCount === 1 ? '' : 's'}` : 'Checklist answers'}
      </p>
      <dl className="space-y-3">
        {items.map((item) => (
          <div key={item.question}>
            <dt className="text-sm font-medium">{item.question}</dt>
            <dd className="text-sm text-muted-foreground">
              {answers?.[item.question]?.trim() ?? '—'}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export function SessionForm({ action, defaultValues, submitLabel }: SessionFormProps) {
  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="bg-[#FBF0EB]/40 rounded-lg p-5 flex flex-col gap-5">
        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-widest text-muted-foreground">
            Intention
          </Label>
          <Textarea
            id="intention"
            name="intention"
            defaultValue={defaultValues?.intention ?? ""}
            rows={3}
          />
        </div>
        {/* intentionMet and pickup would go here if the form supports them */}
      </div>

      {defaultValues?.checklistItems && defaultValues.checklistItems.length > 0 && (
        <ChecklistSummary
          templateName={defaultValues.templateName}
          items={defaultValues.checklistItems}
          answers={defaultValues.checklistAnswers}
        />
      )}

      <div>
        <Label htmlFor="date" className='text-xs uppercase tracking-widest text-muted-foreground mb-2'>Date</Label>
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
        <Label htmlFor="duration" className='text-xs uppercase tracking-widest text-muted-foreground mb-2'>Duration (minutes)</Label>
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
        <Label className='text-xs uppercase tracking-widest text-muted-foreground mb-2'>Song</Label>
        <SongTypeahead defaultValue={defaultValues?.songTitle} />
      </div>
      <div>
        <Label htmlFor="bpm" className='text-xs uppercase tracking-widest text-muted-foreground mb-2'>BPM (optional)</Label>
        <Input
          type="number"
          id="bpm"
          name="bpm"
          min="1"
          defaultValue={defaultValues?.bpm ?? undefined}
        />
      </div>
      <div>
        <Label htmlFor="notes" className='text-xs uppercase tracking-widest text-muted-foreground mb-2'>Notes</Label>
        <Textarea
          id="notes"
          name="notes"
          rows={4}
          defaultValue={defaultValues?.notes ?? undefined}
        />
      </div>
      <div>
        <Label className='text-xs uppercase tracking-widest text-muted-foreground mb-2'>Tags</Label>
        <TagsTypeahead initialTags={defaultValues?.tags} />
      </div>
      <div className="flex items-center gap-3 mt-6">
        <SubmitButton label={submitLabel} />
        {defaultValues?.id && <DeleteSessionButton id={defaultValues?.id} />}
      </div>
    </form>
  )
}
