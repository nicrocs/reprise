'use client'
import { savePrefill } from '@/lib/active-session'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

type Props = {
  songId: string
  songTitle: string
}

export function StartSessionButton({ songId, songTitle }: Props) {
  const router = useRouter()

  function handleClick() {
    savePrefill({ songId, songTitle })
    router.push('/sessions/new')
  }

  return (
    <Button variant="outline" size="sm" className="shrink-0 border-[#B85C2A] text-[#B85C2A] hover:bg-[#FBF0EB] hover:text-[#7A3A1A]" onClick={handleClick}>
      Start
    </Button>
  )
}