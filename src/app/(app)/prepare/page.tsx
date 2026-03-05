
import { Suspense } from 'react'
import PrepareClient from './PrepareClient'

export default function PreparePage({
  searchParams
}: { searchParams: Promise<{ mode?: string }>}) {

  return (
  <Suspense fallback={<>Loading...</>}>
    <PrepareClient searchParams={searchParams} />
  </Suspense>
)}