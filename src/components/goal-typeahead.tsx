'use client'

import { useState, useEffect, } from 'react'
import { getGoals } from '@/app/actions/goals'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type Goal = { id: string; name: string; }

type Props = {
  initialGoal?: {id: string | null; name: string}
  onSelect?: (id: string, title: string) => void
}

export function GoalTypeahead({ initialGoal, onSelect }: Props) {
  // const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(initialGoal?.name ?? '')
  const [suggestions, setSuggestions] = useState<Goal[]>([])
  const [selected, setSelected] = useState<Goal | null>(initialGoal?.id ? { id: initialGoal.id, name: initialGoal.name } : null)

useEffect(() => {
  if (query.length < 1) return  // just return, don't setState
  // Don't fetch if the query matches the selected goal — this happens after
  // selection when we've just set the query to the goal name. We don't want
  // to re-show the dropdown in that case.
  if (selected && query === selected.name) return

  const timeout = setTimeout(() => {
    getGoals(query).then(setSuggestions)
  }, 100)

  return () => clearTimeout(timeout)
}, [query, selected])

  function handleSelect(goal: Goal) {
    setSelected(goal)
    setQuery(goal.name)
    setSuggestions([])
    onSelect?.(goal.id, goal.name)
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
      <input type="hidden" name="goalName" value={query} />

<div className="relative">
  <Input
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
    placeholder="Goal (optional)"
  />
  {suggestions.length > 0 && (
    <div className="absolute z-10 w-full border rounded-md bg-background mt-1 shadow-md">
      {suggestions.map((goal) => (
        <Button
          key={goal.id}
          type="button"
          variant="outline"
          size="sm"
          onMouseDown={(e) => {
            e.preventDefault() // prevent input blur before select fires
            handleSelect(goal)
          }}
        >
          <span>{goal.name}</span>
        </Button>
      ))}
    </div>
  )}
</div>
    </>
  )
}
