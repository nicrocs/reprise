'use client'
import { savePrefill } from '@/lib/active-session'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import type { ChecklistItem } from '@/lib/types'

type Props = {
  pickup: string
  songId?: string | null
  songTitle?: string | null
  goalId?: string | null
  goalName?: string | null
  templateId?: string | null
  templateName?: string | null
  templateChecklistItems?: ChecklistItem[] | null
  templateShowMetronome?: boolean
  templateShowSongPicker?: boolean
  templateShowGoalPicker?: boolean
}

export function PickupButton({
  pickup,
  songId,
  songTitle,
  goalId,
  goalName,
  templateId,
  templateName,
  templateChecklistItems,
  templateShowMetronome,
  templateShowSongPicker,
  templateShowGoalPicker,
}: Props) {
  const router = useRouter()

  function handleClick() {
    savePrefill({
      intention: pickup,
      autoApply: true,
      ...(songId && songTitle && { songId, songTitle }),
      ...(goalId && goalName && { goalId, goalName }),
      ...(templateId && templateName && {
        templateId,
        templateName,
        templateChecklistItems: templateChecklistItems ?? undefined,
        templateShowMetronome,
        templateShowSongPicker,
        templateShowGoalPicker,
      }),
    })
    router.push('/sessions/new')
  }

  return (
    <Button
      variant="warm"
      size="sm"
      className="w-full sm:w-auto"
      onClick={handleClick}
    >
      Pick up where you left off
    </Button>
  )
}
