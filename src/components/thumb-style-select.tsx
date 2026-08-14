'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { THUMB_STYLE_LABELS } from '@/lib/constants'
import { ThumbStyle } from '../../prisma/generated/prisma'

export function ThumbStyleSelect({
  defaultValue,
  onChange,
}: {
  defaultValue: ThumbStyle | null
  onChange: (t: ThumbStyle | null) => void
}) {
  return (
    <Select value={defaultValue ?? '__NONE__'} onValueChange={(value) => onChange(value === '__NONE__' ? null : value as ThumbStyle)}>
      <SelectTrigger>
        <SelectValue placeholder="Thumb style (optional)" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="__NONE__">None</SelectItem>
        {Object.keys(THUMB_STYLE_LABELS).map((t) => (
          <SelectItem key={t} value={t}>
            {THUMB_STYLE_LABELS[t]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
