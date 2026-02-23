'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const TUNINGS = [
  { value: 'STANDARD', label: 'Standard' },
  { value: 'DROP_D', label: 'Drop D' },
  { value: 'DROP_C', label: 'Drop C' },
  { value: 'OPEN_G', label: 'Open G' },
  { value: 'OPEN_D', label: 'Open D' },
  { value: 'DADGAD', label: 'DADGAD' },
]

export function TuningSelect() {
  return (
    <Select name="tuning">
      <SelectTrigger>
        <SelectValue placeholder="Tuning (optional)" />
      </SelectTrigger>
      <SelectContent>
        {TUNINGS.map((t) => (
          <SelectItem key={t.value} value={t.value}>
            {t.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}