'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getInstruments } from '@/app/actions/instruments'

export type InstrumentOption = {
  id: string
  name: string
}

type Props = {
  selectedId?: string | null
  initialName?: string | null
  onSelect?: (instrument: InstrumentOption | null, isInitialSelection?: boolean) => void
}

export function InstrumentPicker({ selectedId, initialName, onSelect }: Props) {
  const [instruments, setInstruments] = useState<InstrumentOption[]>([])
  const [loading, setLoading] = useState(true)
  const [loadFailed, setLoadFailed] = useState(false)

  useEffect(() => {
    let cancelled = false

    getInstruments()
      .then((rows) => {
        if (cancelled) return
        const available = rows
          .filter((instrument) => !instrument.isArchived || instrument.id === selectedId)
          .map(({ id, name }) => ({ id, name }))
        setInstruments(available)

        if (!selectedId && initialName) {
          const match = available.find(
            (instrument) => instrument.name.toLowerCase() === initialName.toLowerCase()
          )
          if (match) onSelect?.(match, true)
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
  }, [initialName, onSelect, selectedId])

  if (loading) {
    return <div className="text-sm text-muted-foreground">Loading instruments…</div>
  }

  if (loadFailed) {
    return <p className="text-sm text-destructive" role="alert">Could not load instruments.</p>
  }

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {instruments.map((instrument) => {
          const isSelected = instrument.id === selectedId
          return (
            <button
              key={instrument.id}
              type="button"
              onClick={() => onSelect?.(isSelected ? null : instrument)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors ${
                isSelected
                  ? 'border-[#B85C2A] bg-[#B85C2A] text-white'
                  : 'border-border bg-background hover:border-foreground/40'
              }`}
            >
              {instrument.name}
            </button>
          )
        })}
      </div>
      <Link href="/instruments" className="text-xs text-warm hover:underline">
        Manage instruments
      </Link>
    </div>
  )
}
