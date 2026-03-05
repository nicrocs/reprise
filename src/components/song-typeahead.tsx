'use client'

import { useState, useEffect, useRef } from 'react'
import { getSongs } from '@/app/actions/songs'
import { TUNING_LABELS } from '@/lib/constants'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

type Song = { id: string; title: string; tuning: string }

type Props = {
  defaultValue?: string
  onSelect?: (id: string, title: string) => void
}

export function SongTypeahead({ defaultValue, onSelect }: Props) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(defaultValue ?? '')
  const [suggestions, setSuggestions] = useState<Song[]>([])
  const [selected, setSelected] = useState<Song | null>(null)

useEffect(() => {
  if (query.length < 1) return  // just return, don't setState

  const timeout = setTimeout(() => {
    getSongs(query).then(setSuggestions)
  }, 200)

  return () => clearTimeout(timeout)
}, [query])

  function handleSelect(song: Song) {
    setSelected(song)
    setQuery(song.title)
    setSuggestions([])
    setOpen(false)
    onSelect?.(song.id, song.title)
  }

  function handleClear() {
    setSelected(null)
    setQuery('')
    setSuggestions([])
    setOpen(false)
    onSelect?.('', '')
  }

  return (
    <>
      {/* Hidden input for FormData compatibility */}
      <input type="hidden" name="songTitle" value={query} />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal"
            onClick={() => setOpen(true)}
          >
            {selected ? selected.title : query || 'Song title (optional)'}
            {query && (
              <X
                className="ml-2 h-4 w-4 shrink-0 opacity-50 hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation()
                  handleClear()
                }}
              />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Search songs..."
              value={query}
                onValueChange={(val) => {
                    setQuery(val)
                    setSelected(null)
                    if (val.length < 1) setSuggestions([])  // clear here instead
                    setOpen(true)
                }}
            />
            <CommandList>
              {suggestions.length === 0 && query.length > 0 && (
                <CommandEmpty>
                  {query} — will be created as a new song
                </CommandEmpty>
              )}
              <CommandGroup>
                {suggestions.map((song) => (
                  <CommandItem
                    key={song.id}
                    value={song.title}
                    onSelect={() => handleSelect(song)}
                    className="flex justify-between"
                  >
                    <span>{song.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {TUNING_LABELS[song.tuning]}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}