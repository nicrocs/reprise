'use client'

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import type { ChecklistItem, ChecklistAnswers } from '@/lib/types'

type Props = {
  items: ChecklistItem[]
  values: ChecklistAnswers
  onChange: (answers: ChecklistAnswers) => void
  title?: string
}

export function ChecklistForm({ items, values, onChange, title = 'Session checklist' }: Props) {
  if (items.length === 0) return null

  function setAnswer(question: string, value: string) {
    onChange({ ...values, [question]: value })
  }

  return (
    <div className="space-y-5">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">
        {title}
      </p>
      {items.map((item, i) => (
        <div key={`${item.question}-${i}`} className="space-y-2">
          <Label className="text-sm font-medium leading-snug">
            {item.question}
          </Label>
          {item.type === 'select' ? (
            <RadioGroup
              value={values[item.question] ?? ''}
              onValueChange={(v) => setAnswer(item.question, v)}
              className="gap-2"
            >
              {item.options.map((option) => (
                <div key={option} className="flex items-center gap-2">
                  <RadioGroupItem
                    value={option}
                    id={`checklist-${i}-${option}`}
                  />
                  <Label
                    htmlFor={`checklist-${i}-${option}`}
                    className="text-sm font-normal cursor-pointer leading-snug"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <Textarea
              value={values[item.question] ?? ''}
              onChange={(e) => setAnswer(item.question, e.target.value)}
              rows={2}
              placeholder="Type your answer…"
            />
          )}
        </div>
      ))}
    </div>
  )
}
