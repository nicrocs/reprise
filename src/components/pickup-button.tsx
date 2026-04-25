'use client'
import { savePrefill } from '@/lib/active-session'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

type Props = {
  pickup: string
  songId?: string | null
  songTitle?: string | null
  goalId?: string | null
  goalName?: string | null
}

export function PickupButton({ pickup, songId, songTitle, goalId, goalName }: Props) {
  const router = useRouter()

  function handleClick() {
    savePrefill({
      intention: pickup,
      ...(songId && songTitle && { songId, songTitle }),
      ...(goalId && goalName && { goalId, goalName }),
    })
    router.push('/sessions/new')
  }

  return (
    <Button variant="warm" size="sm" onClick={handleClick}>
      Pick up where you left off
    </Button>
  )
}