'use client'

import { useRouter } from 'next/navigation'
import { GuidedPrep } from '@/components/guided-prep'
import { WERNER_PREP_STEPS, SHORT_PREP_STEPS } from '@/lib/prep-steps'
import { useSearchParams } from 'next/navigation'

export default function PreparePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')

  const steps = mode === 'short' ? SHORT_PREP_STEPS : WERNER_PREP_STEPS

    function handleComplete() {
        router.push('/sessions/active')
    }

  return <GuidedPrep steps={steps} onComplete={handleComplete} />
}