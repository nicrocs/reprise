'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { createSessionTemplate, updateSessionTemplate } from '@/app/actions/session-templates'
import type { ChecklistItem } from '@/lib/types'

type Props = {
  initial?: {
    id: string
    name: string
    showMetronome: boolean
    showSongPicker: boolean
    showGoalPicker: boolean
    checklistItems: ChecklistItem[] | null
  } | null
}

function newTextItem(): ChecklistItem {
  return { type: 'text', question: '' }
}

function newSelectItem(): ChecklistItem {
  return { type: 'select', question: '', options: [''] }
}

export function TemplateForm({ initial }: Props) {
  const router = useRouter()
  const [name, setName] = useState(initial?.name ?? '')
  const [showMetronome, setShowMetronome] = useState(initial?.showMetronome ?? false)
  const [showSongPicker, setShowSongPicker] = useState(initial?.showSongPicker ?? true)
  const [showGoalPicker, setShowGoalPicker] = useState(initial?.showGoalPicker ?? false)
  const [items, setItems] = useState<ChecklistItem[]>(initial?.checklistItems ?? [])
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  function updateItem(index: number, patch: Partial<ChecklistItem>) {
    setItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } as ChecklistItem : item))
    )
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  function moveItem(index: number, direction: -1 | 1) {
    const nextIndex = index + direction
    if (nextIndex < 0 || nextIndex >= items.length) return
    setItems((prev) => {
      const next = [...prev]
      const temp = next[index]
      next[index] = next[nextIndex]
      next[nextIndex] = temp
      return next
    })
  }

  function addTextItem() {
    setItems((prev) => [...prev, newTextItem()])
  }

  function addSelectItem() {
    setItems((prev) => [...prev, newSelectItem()])
  }

  function addOption(itemIndex: number) {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== itemIndex || item.type !== 'select') return item
        return { ...item, options: [...item.options, ''] }
      })
    )
  }

  function updateOption(itemIndex: number, optionIndex: number, value: string) {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== itemIndex || item.type !== 'select') return item
        return {
          ...item,
          options: item.options.map((opt, j) => (j === optionIndex ? value : opt)),
        }
      })
    )
  }

  function removeOption(itemIndex: number, optionIndex: number) {
    setItems((prev) =>
      prev.map((item, i) => {
        if (i !== itemIndex || item.type !== 'select') return item
        return { ...item, options: item.options.filter((_, j) => j !== optionIndex) }
      })
    )
  }

  function validate(): string | null {
    const trimmedName = name.trim()
    if (!trimmedName) return 'Template name is required'

    const questions = new Set<string>()
    for (const item of items) {
      const question = item.question.trim()
      if (!question) return 'Every checklist item needs a question'
      const key = question.toLowerCase()
      if (questions.has(key)) return `Duplicate question: "${question}"`
      questions.add(key)

      if (item.type === 'select') {
        if (item.options.length === 0) return `Select question "${question}" needs at least one option`
        for (const option of item.options) {
          if (!option.trim()) return `Empty option in "${question}"`
        }
      }
    }

    return null
  }

  async function handleSubmit() {
    setError(null)
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    setSaving(true)
    try {
      const input = {
        name: name.trim(),
        showMetronome,
        showSongPicker,
        showGoalPicker,
        checklistItems: items,
      }

      if (initial?.id) {
        await updateSessionTemplate(initial.id, input)
      } else {
        await createSessionTemplate(input)
      }
      router.push('/templates')
    } catch (err) {
      setSaving(false)
      setError(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {error && (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name" className="text-sm font-medium">
          Name
        </Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Old Song Rescue"
        />
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-medium">Show sections</Label>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showSongPicker}
              onChange={(e) => setShowSongPicker(e.target.checked)}
              className="h-4 w-4 rounded border-border text-warm focus:ring-warm"
            />
            Song picker
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showGoalPicker}
              onChange={(e) => setShowGoalPicker(e.target.checked)}
              className="h-4 w-4 rounded border-border text-warm focus:ring-warm"
            />
            Goal picker
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showMetronome}
              onChange={(e) => setShowMetronome(e.target.checked)}
              className="h-4 w-4 rounded border-border text-warm focus:ring-warm"
            />
            Metronome
          </label>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-medium">Checklist items</Label>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={addTextItem}>
              Add text
            </Button>
            <Button type="button" variant="outline" size="sm" onClick={addSelectItem}>
              Add select
            </Button>
          </div>
        </div>

        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No checklist items yet. Add one if this practice mode needs a pre-session prompt.
          </p>
        )}

        <div className="flex flex-col gap-3">
          {items.map((item, index) => (
            <Card key={index}>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor={`question-${index}`} className="text-xs uppercase tracking-widest text-muted-foreground">
                      Question
                    </Label>
                    <Input
                      id={`question-${index}`}
                      value={item.question}
                      onChange={(e) => updateItem(index, { question: e.target.value })}
                      placeholder="e.g. What's actually wrong at that moment?"
                    />
                  </div>
                  <span className="mt-6 inline-flex items-center rounded-full border border-border px-2 py-1 text-xs text-muted-foreground">
                    {item.type}
                  </span>
                </div>

                {item.type === 'select' && (
                  <div className="space-y-2">
                    <Label className="text-xs uppercase tracking-widest text-muted-foreground">Options</Label>
                    <div className="flex flex-col gap-2">
                      {item.options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center gap-2">
                          <Input
                            value={option}
                            onChange={(e) => updateOption(index, optionIndex, e.target.value)}
                            placeholder={`Option ${optionIndex + 1}`}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeOption(index, optionIndex)}
                            disabled={item.options.length <= 1}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" size="sm" onClick={() => addOption(index)}>
                        Add option
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveItem(index, -1)}
                    disabled={index === 0}
                  >
                    Move up
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveItem(index, 1)}
                    disabled={index === items.length - 1}
                  >
                    Move down
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4">
        <Button onClick={handleSubmit} disabled={saving} size="lg" variant="warm">
          {saving ? 'Saving…' : initial?.id ? 'Update Template' : 'Create Template'}
        </Button>
      </div>
    </div>
  )
}
