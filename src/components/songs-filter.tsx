'use client'

import { useMemo, useState } from 'react'
import { Song, Session } from '../../prisma/generated/prisma'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  KEY_LABELS,
  TUNING_LABELS,
  THUMB_STYLE_LABELS,
  SONG_STATUS_LABELS,
  SONG_STATUS_ORDER,
} from '@/lib/constants'
import Link from 'next/link'

type SongWithSession = Song & { sessions: Session[] }

type SortBy = 'recent' | 'title' | 'status' | 'key' | 'tuning' | 'thumbStyle'

const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

export function SongsFilter({ songs }: { songs: SongWithSession[] }) {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [keyFilter, setKeyFilter] = useState<string>('ALL')
  const [tuningFilter, setTuningFilter] = useState<string>('ALL')
  const [thumbFilter, setThumbFilter] = useState<string>('ALL')
  const [sortBy, setSortBy] = useState<SortBy>('recent')

  const filtered = useMemo(() => {
    let result = songs.filter((song) => {
      const matchesQuery = song.title.toLowerCase().includes(query.toLowerCase())
      const matchesStatus = statusFilter === 'ALL' || song.status === statusFilter
      const matchesKey = keyFilter === 'ALL' || song.key === keyFilter
      const matchesTuning = tuningFilter === 'ALL' || song.tuning === tuningFilter
      const matchesThumb = thumbFilter === 'ALL' || song.thumbStyle === thumbFilter
      return matchesQuery && matchesStatus && matchesKey && matchesTuning && matchesThumb
    })

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'status':
          return a.status.localeCompare(b.status)
        case 'key':
          return (a.key ?? '').localeCompare(b.key ?? '')
        case 'tuning':
          return a.tuning.localeCompare(b.tuning)
        case 'thumbStyle':
          return (a.thumbStyle ?? '').localeCompare(b.thumbStyle ?? '')
        case 'recent':
        default: {
          const aDate = a.sessions[0]?.date ?? new Date(0)
          const bDate = b.sessions[0]?.date ?? new Date(0)
          return bDate.getTime() - aDate.getTime()
        }
      }
    })

    return result
  }, [songs, query, statusFilter, keyFilter, tuningFilter, thumbFilter, sortBy])

  const hasFilters =
    query ||
    statusFilter !== 'ALL' ||
    keyFilter !== 'ALL' ||
    tuningFilter !== 'ALL' ||
    thumbFilter !== 'ALL'

  function clearFilters() {
    setQuery('')
    setStatusFilter('ALL')
    setKeyFilter('ALL')
    setTuningFilter('ALL')
    setThumbFilter('ALL')
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="col-span-2 md:col-span-1">
          <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">
            Search
          </Label>
          <Input
            placeholder="Filter by title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div>
          <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">
            Status
          </Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All statuses</SelectItem>
              {SONG_STATUS_ORDER.map((s) => (
                <SelectItem key={s} value={s}>
                  {SONG_STATUS_LABELS[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">
            Key
          </Label>
          <Select value={keyFilter} onValueChange={setKeyFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All keys" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All keys</SelectItem>
              {Object.keys(KEY_LABELS).map((k) => (
                <SelectItem key={k} value={k}>
                  {KEY_LABELS[k]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">
            Tuning
          </Label>
          <Select value={tuningFilter} onValueChange={setTuningFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All tunings" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All tunings</SelectItem>
              {Object.keys(TUNING_LABELS).map((t) => (
                <SelectItem key={t} value={t}>
                  {TUNING_LABELS[t]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">
            Thumb style
          </Label>
          <Select value={thumbFilter} onValueChange={setThumbFilter}>
            <SelectTrigger>
              <SelectValue placeholder="All styles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All styles</SelectItem>
              {Object.keys(THUMB_STYLE_LABELS).map((t) => (
                <SelectItem key={t} value={t}>
                  {THUMB_STYLE_LABELS[t]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        {hasFilters ? (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Active filters
            </span>
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs inline-flex items-center gap-1 rounded-full border px-2 py-0.5 hover:bg-muted"
              >
                {query} <X className="h-3 w-3" />
              </button>
            )}
            {statusFilter !== 'ALL' && (
              <button
                onClick={() => setStatusFilter('ALL')}
                className="text-xs inline-flex items-center gap-1 rounded-full border px-2 py-0.5 hover:bg-muted"
              >
                {SONG_STATUS_LABELS[statusFilter]} <X className="h-3 w-3" />
              </button>
            )}
            {keyFilter !== 'ALL' && (
              <button
                onClick={() => setKeyFilter('ALL')}
                className="text-xs inline-flex items-center gap-1 rounded-full border px-2 py-0.5 hover:bg-muted"
              >
                {KEY_LABELS[keyFilter]} <X className="h-3 w-3" />
              </button>
            )}
            {tuningFilter !== 'ALL' && (
              <button
                onClick={() => setTuningFilter('ALL')}
                className="text-xs inline-flex items-center gap-1 rounded-full border px-2 py-0.5 hover:bg-muted"
              >
                {TUNING_LABELS[tuningFilter]} <X className="h-3 w-3" />
              </button>
            )}
            {thumbFilter !== 'ALL' && (
              <button
                onClick={() => setThumbFilter('ALL')}
                className="text-xs inline-flex items-center gap-1 rounded-full border px-2 py-0.5 hover:bg-muted"
              >
                {THUMB_STYLE_LABELS[thumbFilter]} <X className="h-3 w-3" />
              </button>
            )}
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              Clear all
            </Button>
          </div>
        ) : (
          <div />
        )}
        <div className="flex items-center gap-2">
          <Label className="text-xs uppercase tracking-widest text-muted-foreground">
            Sort by
          </Label>
          <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortBy)}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recently practiced</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="status">Status</SelectItem>
              <SelectItem value="key">Key</SelectItem>
              <SelectItem value="tuning">Tuning</SelectItem>
              <SelectItem value="thumbStyle">Thumb style</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">No songs match the filters.</p>
      ) : (
        <ul className="divide-y">
          {filtered.map((song, index) => {
            const lastSession = song.sessions[0]
            const isStale = lastSession && lastSession.date < thirtyDaysAgo
            const statusLabel = SONG_STATUS_LABELS[song.status] ?? song.status
            return (
              <li key={song.id}>
                <Link
                  href={`/songs/${song.id}`}
                  className="flex items-center justify-between py-4 hover:bg-zinc-50 transition-colors gap-4"
                >
                  <div className="flex items-stretch gap-3 min-w-0">
                    <div
                      className={`w-0.75 self-stretch rounded-full shrink-0 ${index === 0 ? 'bg-[#B85C2A]' : 'bg-border'}`}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium">{song.title}</p>
                        <span className="text-xs border border-border rounded px-1.5 py-0.5 text-muted-foreground">
                          {statusLabel}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-xs text-muted-foreground">
                          {TUNING_LABELS[song.tuning]}
                        </span>
                        {song.key && (
                          <span className="text-xs text-muted-foreground">
                            {KEY_LABELS[song.key]}
                          </span>
                        )}
                        {song.thumbStyle && (
                          <span className="text-xs text-muted-foreground">
                            {THUMB_STYLE_LABELS[song.thumbStyle]}
                          </span>
                        )}
                        {song.capo !== null && song.capo !== undefined && (
                          <span className="text-xs text-muted-foreground">
                            capo {song.capo}
                          </span>
                        )}
                      </div>
                      {song.currentBlocker && (
                        <p className="text-xs text-muted-foreground mt-1 truncate max-w-md">
                          ↳ {song.currentBlocker}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    {lastSession ? (
                      <p
                        className={`text-sm ${isStale ? 'text-amber-600' : 'text-muted-foreground'}`}
                      >
                        {lastSession.date.toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">No sessions yet</p>
                    )}
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
