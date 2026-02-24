'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'
import { getSongs } from '@/app/actions/sessions'
import { TuningSelect } from '@/components/tuning-select'

const TUNING_LABELS: Record<string, string> = {
  STANDARD: 'Standard',
  DROP_D: 'Drop D',
  DROP_C: 'Drop C',
  OPEN_G: 'Open G',
  OPEN_D: 'Open D',
  DADGAD: 'DADGAD',
}

type Song = { id: string; title: string; tuning: string }

export function SongTypeahead({ defaultValue }: { defaultValue?: string }) {
  const [query, setQuery] = useState(defaultValue ?? '')
    const [suggestions, setSuggestions] = useState<Song[]>([])
    const [selectedSong, setSelectedSong] = useState<Song | null>(null)
    const containerRef = useRef(null)

    // derived from query and suggestions directly — no state needed
    const open = suggestions.length > 0 && query.length > 0
    const isNewSong = query.length > 0 && !suggestions.find(
    (s) => s.title.toLowerCase() === query.toLowerCase()
    ) && selectedSong === null

    useEffect(() => {
        if (query.length < 1) return

        const timeout = setTimeout(() => {
            getSongs(query).then((results) => {
            setSuggestions(results)
            const exactMatch = results.find(
                (s) => s.title.toLowerCase() === query.toLowerCase()
            )
            if (exactMatch) setSelectedSong(exactMatch)
            })
        }, 200)

        return () => clearTimeout(timeout)
    }, [query])

    function handleSelect(song: Song) {
        setQuery(song.title)
        setSelectedSong(song)
        setSuggestions([])
    }

    function handleClear() {
        setQuery('')
        setSelectedSong(null)
        setSuggestions([])
    }

  return (
    <div ref={containerRef} className="flex flex-col gap-2">
      <div className="relative">
        <Input
          type="text"
          name="songTitle"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setSelectedSong(null)
          }}
          placeholder="Song title (optional)"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
          >
            ✕
          </button>
        )}
        {open && suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border rounded shadow mt-1">
            {suggestions.map((song) => (
              <li
                key={song.id}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm flex justify-between items-center"
                onMouseDown={() => handleSelect(song)}
              >
                <span>{song.title}</span>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {TUNING_LABELS[song.tuning]}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Show tuning tag for selected existing song */}
      {selectedSong && (
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Tuning</span>
          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
            {TUNING_LABELS[selectedSong.tuning]}
          </span>
        </div>
      )}

      {/* Show tuning select only for new songs */}
      {isNewSong && (
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500">
            New song — set tuning:
          </span>
          <TuningSelect name="songTuning" />
        </div>
      )}
    </div>
  )
}