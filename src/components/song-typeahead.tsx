'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { getSongs } from '@/app/actions/sessions'

export function SongTypeahead() {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState<{ id: string; title: string }[]>([])
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (query.length < 1) {
      setSuggestions([])
      return
    }

    const timeout = setTimeout(async () => {
      const results = await getSongs(query)
      setSuggestions(results)
      setOpen(results.length > 0)
    }, 200)

    return () => clearTimeout(timeout)
  }, [query])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <Input
        type="text"
        name="songTitle"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Song title (optional)"
        autoComplete="off"
      />
      {open && (
        <ul className="absolute z-10 w-full bg-white border rounded shadow mt-1">
          {suggestions.map((song) => (
            <li
              key={song.id}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              onMouseDown={() => {
                setQuery(song.title)
                setOpen(false)
              }}
            >
              {song.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}