'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { TUNING_LABELS } from '@/lib/constants'
import { Tuning } from '../../prisma/generated/prisma'

export function TuningSelect({ defaultValue, onChange }: { defaultValue: Tuning | null, onChange: (t: Tuning) => void }) {
  return (
    <>
      <Select value={defaultValue ?? undefined} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Tuning (optional)" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(TUNING_LABELS).map((t) => (
            <SelectItem key={t} value={t}>
              {TUNING_LABELS[t]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}