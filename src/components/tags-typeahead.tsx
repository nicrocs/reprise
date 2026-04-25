'use client'

import { useEffect, useState } from 'react'
import { getTags } from '@/app/actions/tags'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Tag = { id: string; name: string }

type Props = {
  initialTags?: Tag[]
  onChange?: (tags: Tag[]) => void
}

export function TagsTypeahead({ initialTags = [], onChange }: Props) {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Tag[]>([])
  const [selectedTags, setSelectedTags] = useState<Tag[]>(initialTags)

  useEffect(() => {
    const trimmedQuery = query.trim()
    if (!trimmedQuery) return

    const timeout = setTimeout(async () => {
      const results = await getTags(trimmedQuery)
      const selectedNames = new Set(selectedTags.map((tag) => tag.name.toLowerCase()))

      setSuggestions(
        results.filter((tag) => !selectedNames.has(tag.name.toLowerCase()))
      )
    }, 100)

    return () => clearTimeout(timeout)
  }, [query, selectedTags])

  function addTag(name: string) {
    const trimmedName = name.trim()
    if (!trimmedName) return

    const exists = selectedTags.some(
      (tag) => tag.name.toLowerCase() === trimmedName.toLowerCase()
    )
    if (exists) {
      setQuery('')
      setSuggestions([])
      return
    }

    const nextTags = [
      ...selectedTags,
      { id: `new:${trimmedName.toLowerCase()}`, name: trimmedName },
    ]

    setSelectedTags(nextTags)
    onChange?.(nextTags)
    setQuery('')
    setSuggestions([])
  }

  function removeTag(name: string) {
    const nextTags = selectedTags.filter(
      (tag) => tag.name.toLowerCase() !== name.toLowerCase()
    )

    setSelectedTags(nextTags)
    onChange?.(nextTags)
  }

  return (
    <>
      <input
        type="hidden"
        name="tags"
        value={JSON.stringify(selectedTags.map((tag) => tag.name))}
      />

      <div className="space-y-3">
        {selectedTags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center gap-2 rounded-full bg-[#FBF0EB] px-3 py-1 text-sm text-foreground"
              >
                {tag.name}
                <button
                  type="button"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  onClick={() => removeTag(tag.name)}
                  aria-label={`Remove ${tag.name}`}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        <div className="relative">
          <Input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              if (!e.target.value.trim()) setSuggestions([])
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ',') {
                e.preventDefault()
                addTag(query)
              }

              if (e.key === 'Backspace' && !query && selectedTags.length > 0) {
                removeTag(selectedTags[selectedTags.length - 1].name)
              }
            }}
            onBlur={() => {
              if (query.trim()) addTag(query)
              setSuggestions([])
            }}
            placeholder="Add tags (optional)"
          />

          {suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full rounded-md border bg-background shadow-md">
              {suggestions.map((tag) => (
                <Button
                  key={tag.id}
                  type="button"
                  variant="ghost"
                  className={cn(
                    'h-auto w-full justify-start rounded-none px-3 py-2 text-sm',
                    'first:rounded-t-md last:rounded-b-md'
                  )}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    addTag(tag.name)
                  }}
                >
                  {tag.name}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
