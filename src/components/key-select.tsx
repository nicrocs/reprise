'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { KEY_LABELS } from '@/lib/constants'
import { Key } from '../../prisma/generated/prisma'


export function KeySelect({ defaultValue, onChange }: { defaultValue: Key | null, onChange: (k: Key | null) => void }) {

  return (
    <>
      <Select value={defaultValue ?? '__NONE__'} onValueChange={(value) => onChange(value === '__NONE__' ? null : value as Key)}>
        <SelectTrigger>
          <SelectValue placeholder="Key (optional)" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__NONE__">None</SelectItem>
          {Object.keys(KEY_LABELS).map((k) => (
            <SelectItem key={k} value={k}>
              {KEY_LABELS[k]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}