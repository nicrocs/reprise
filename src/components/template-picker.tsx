'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getSessionTemplates } from '@/app/actions/session-templates'
import type { ChecklistItem } from '@/lib/types'

export type SessionTemplate = {
  id: string
  name: string
  showMetronome: boolean
  showSongPicker: boolean
  showGoalPicker: boolean
  checklistItems: ChecklistItem[] | null
}

type Props = {
  initialTemplate?: { id: string | null; name: string } | null
  onSelect?: (template: SessionTemplate | null) => void
}

export function TemplatePicker({ initialTemplate, onSelect }: Props) {
  const [templates, setTemplates] = useState<SessionTemplate[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(
    initialTemplate?.id ?? null
  )
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSessionTemplates().then((rows) => {
      const mapped = rows.map((r) => ({
        id: r.id,
        name: r.name,
        showMetronome: r.showMetronome,
        showSongPicker: r.showSongPicker,
        showGoalPicker: r.showGoalPicker,
        checklistItems: (r.checklistItems as ChecklistItem[] | null) ?? null,
      }))
      setTemplates(mapped)
      if (initialTemplate?.id) {
        const match = mapped.find((t) => t.id === initialTemplate.id)
        if (match) onSelect?.(match)
      }
      setLoading(false)
    })
  }, [initialTemplate?.id, onSelect])

  function handleSelect(id: string | null) {
    setSelectedId(id)
    if (id === null) {
      onSelect?.(null)
      return
    }
    const t = templates.find((x) => x.id === id)
    onSelect?.(t ?? null)
  }

  if (loading) {
    return (
      <div className="text-sm text-muted-foreground">Loading templates…</div>
    )
  }

  if (templates.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No templates yet.{' '}
        <Link href="/templates/new" className="text-warm hover:underline">
          Create one
        </Link>{' '}
        to define a practice mode and checklist.
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {templates.map((t) => {
        const isSelected = t.id === selectedId
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => handleSelect(isSelected ? null : t.id)}
            className={`px-3 py-1.5 text-sm rounded-full border transition-colors ${
              isSelected
                ? 'bg-[#B85C2A] text-white border-[#B85C2A]'
                : 'bg-background border-border hover:border-foreground/40'
            }`}
          >
            {t.name}
          </button>
        )
      })}
    </div>
  )
}
