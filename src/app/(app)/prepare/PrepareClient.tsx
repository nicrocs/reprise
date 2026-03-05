'use client'

import { use } from 'react'
import { useRouter } from 'next/navigation'
import { GuidedPrep } from '@/components/guided-prep'
import { WERNER_PREP_STEPS, SHORT_PREP_STEPS } from '@/lib/prep-steps'

export default function PrepareClient({ searchParams }: { searchParams: Promise<{ mode?: string }>}) {
  const router = useRouter()
  const params = use(searchParams)
  const mode = params.mode

  const steps = mode === 'short' ? SHORT_PREP_STEPS : WERNER_PREP_STEPS

    function handleComplete() {
        router.push('/sessions/active')
    }

  return <GuidedPrep steps={steps} onComplete={handleComplete} />
}