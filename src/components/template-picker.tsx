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
  defaultInstrument: { id: string; name: string } | null
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
  const [loadFailed, setLoadFailed] = useState(false)

  useEffect(() => {
    let cancelled = false

    getSessionTemplates()
      .then((rows) => {
        if (cancelled) return
        const mapped = rows.map((r) => ({
          id: r.id,
          name: r.name,
          showMetronome: r.showMetronome,
          showSongPicker: r.showSongPicker,
          showGoalPicker: r.showGoalPicker,
          checklistItems: (r.checklistItems as ChecklistItem[] | null) ?? null,
          defaultInstrument: r.defaultInstrument && !r.defaultInstrument.isArchived
            ? { id: r.defaultInstrument.id, name: r.defaultInstrument.name }
            : null,
        }))
        setTemplates(mapped)
        if (initialTemplate?.id) {
          const match = mapped.find((t) => t.id === initialTemplate.id)
          if (match) onSelect?.(match)
        }
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
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

  if (loadFailed) {
    return <p className="text-sm text-destructive" role="alert">Could not load practice modes.</p>
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
