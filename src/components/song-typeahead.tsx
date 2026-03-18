'use client'

import { useState, useEffect, } from 'react'
import { getSongs } from '@/app/actions/songs'
import { TUNING_LABELS } from '@/lib/constants'

type Song = { id: string; title: string; tuning: string }

type Props = {
  defaultValue?: string
  onSelect?: (id: string, title: string) => void
}

export function SongTypeahead({ defaultValue, onSelect }: Props) {
  // const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(defaultValue ?? '')
  const [suggestions, setSuggestions] = useState<Song[]>([])
  const [selected, setSelected] = useState<Song | null>(null)

useEffect(() => {
  if (query.length < 1) return  // just return, don't setState
  // Don't fetch if the query matches the selected goal — this happens after
  // selection when we've just set the query to the goal name. We don't want
  // to re-show the dropdown in that case.
  if (selected && query === selected.title) return

  const timeout = setTimeout(() => {
    getSongs(query).then(setSuggestions)
  }, 200)

  return () => clearTimeout(timeout)
}, [query, selected])

  function handleSelect(song: Song) {
    setSelected(song)
    setQuery(song.title)
    setSuggestions([])
    onSelect?.(song.id, song.title)
  }

  function handleClear() {
    setSelected(null)
    setQuery('')
    setSuggestions([])
    onSelect?.('', '')
  }

  return (
    <>
      {/* Hidden input for FormData compatibility */}
      <input type="hidden" name="songTitle" value={query} />

<div className="relative">
  <input
    type="text"
    value={query}
    onChange={(e) => {
      setQuery(e.target.value)
      setSelected(null)
    }}
    onBlur={() => {
      if (query && !selected) onSelect?.('', query)
      setSuggestions([])
    }}
    placeholder="Song title (optional)"
    className="w-full border rounded-md px-3 py-2 text-sm"
  />
  {suggestions.length > 0 && (
    <div className="absolute z-10 w-full border rounded-md bg-background mt-1 shadow-md">
      {suggestions.map((song) => (
        <button
          key={song.id}
          type="button"
          onMouseDown={(e) => {
            e.preventDefault() // prevent input blur before select fires
            handleSelect(song)
          }}
          className="w-full text-left px-3 py-2 text-sm hover:bg-muted flex justify-between"
        >
          <span>{song.title}</span>
          <span className="text-xs text-muted-foreground">{TUNING_LABELS[song.tuning]}</span>
        </button>
      ))}
    </div>
  )}
</div>
    </>
  )
}