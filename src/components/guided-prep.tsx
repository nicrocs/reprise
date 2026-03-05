'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'

export type PrepStep = {
  text: string
  durationMs?: number
}

type Props = {
  steps: PrepStep[]
  onComplete: () => void
}

const DEFAULT_DURATION = 4000
const FADE_DURATION = 600

export function GuidedPrep({ steps, onComplete }: Props) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  const advance = useCallback(() => {
    if (index >= steps.length - 1) {
      setVisible(false)
      setTimeout(onComplete, FADE_DURATION)
      return
    }

    setVisible(false)
    setTimeout(() => {
      setIndex(i => i + 1)
      setVisible(true)
    }, FADE_DURATION)
  }, [index, steps.length, onComplete])

  // Auto-advance after step duration
  useEffect(() => {
    const duration = steps[index]?.durationMs ?? DEFAULT_DURATION
    const timer = setTimeout(advance, duration)
    return () => clearTimeout(timer)
  }, [index, advance, steps])

  const step = steps[index]
  if (!step) return null

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative">

      {/* Skip — unobtrusive, top right */}
      <button
        onClick={onComplete}
        className="absolute top-6 right-6 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        skip
      </button>

      {/* Step counter */}
      <p className="absolute top-6 left-6 text-xs text-muted-foreground">
        {index + 1} / {steps.length}
      </p>

      {/* Content */}
      <div
        className="max-w-sm text-center space-y-6 transition-opacity"
        style={{
          opacity: visible ? 1 : 0,
          transitionDuration: `${FADE_DURATION}ms`,
        }}
      >
        {step.text.split('\n').map((line, i) => (
          <p
            key={i}
            className={
              line.trim() === ''
                ? 'h-4'
                : 'text-xl font-light leading-relaxed text-foreground'
            }
          >
            {line}
          </p>
        ))}
      </div>

      {/* Tap to advance — subtle, below content */}
      <Button
        onClick={advance}
        className="absolute bottom-10 text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        tap to continue
      </Button>

    </div>
  )
}