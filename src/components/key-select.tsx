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


export function KeySelect({ defaultValue, onChange }: { defaultValue?: Key, onChange: (k: string) => void }) {

  return (
    <>
      <Select value={defaultValue} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Key (optional)" />
        </SelectTrigger>
        <SelectContent>
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