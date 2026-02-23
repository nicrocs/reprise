'use client'

import { useState } from 'react'
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

export function TuningSelect({ name = 'tuning' }: { name?: string }) {
  const [value, setValue] = useState('STANDARD')

  return (
    <>
      <input type="hidden" name={name} value={value} />
      <Select value={value} onValueChange={setValue}>
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
    </>
  )
}