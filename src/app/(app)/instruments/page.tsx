import { InstrumentManager } from '@/components/instrument-manager'

export default function InstrumentsPage() {
  return (
    <main className="max-w-xl p-2">
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Instruments</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Keep the instruments you want available when starting a practice session.
        </p>
      </div>
      <InstrumentManager />
    </main>
  )
}
