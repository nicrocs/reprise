import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { TUNING_LABELS } from '@/lib/constants'
import { Card, CardContent } from '@/components/ui/card'
import { BpmChart } from '@/components/bpm-chart'
import { BackButton } from '@/components/back-button'

export default async function SongDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { userId } = await auth()
  if (!userId) return null

  const song = await prisma.song.findUnique({
    where: { id, userId },
    include: {
      sessions: {
        orderBy: { date: 'desc' },
      },
    },
  })

  if (!song) notFound()

    const totalMinutes = song.sessions.reduce((sum, s) => sum + s.duration, 0)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

  const sessionsWithBpm = song.sessions.filter((s) => s.bpm !== null)

  return (
    <main className="max-w-xl mx-auto p-8">

      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold">{song.title}</h1>
          <BackButton />
        </div>
        <div className="flex gap-2 mt-2 flex-wrap">
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
            {TUNING_LABELS[song.tuning]}
          </span>
          {song.key && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              {song.key.replace(/_/g, ' ')}
            </span>
          )}
          {song.capo && (
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
              Capo {song.capo}
            </span>
          )}
        </div>
        <div className="flex gap-2 mt-4">
            <p>
                {song.sessions.length} {song.sessions.length === 1 ? 'session' : 'sessions'}
            </p>
            {totalMinutes > 0 && (
                <>
                <span>·</span>
                <p>
                    {hours > 0 && `${hours}h `}{minutes > 0 && `${minutes}m`} total practice time
                </p>
                </>
            )}
            {song.sessions.length > 0 && (
                <>
                <span>·</span>
                <p>Last practiced {new Date(song.sessions[0].date).toLocaleDateString()}</p>
                </>
            )}
        </div>
      </div>

      {/* BPM Chart */}
      {sessionsWithBpm.length > 1 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-3">BPM Over Time</h2>
          <BpmChart
            data={sessionsWithBpm
              .slice()
              .reverse()
              .map((s) => ({
                date: new Date(s.date).toLocaleDateString(),
                bpm: s.bpm!,
              }))}
          />
        </div>
      )}

      {/* Sessions */}
      <h2 className="text-lg font-semibold mb-3">Sessions</h2>
      {song.sessions.length === 0 ? (
        <p className="text-gray-500">No sessions logged for this song yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {song.sessions.map((session) => (
            <li key={session.id}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm text-gray-500">
                      {session.topic}
                    </p>
                    <p className="text-sm text-gray-400">
                      {new Date(session.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <span>
                      <span className="text-gray-400">Duration</span>{' '}
                      {session.duration}m
                    </span>
                    {session.bpm && (
                      <span>
                        <span className="text-gray-400">BPM</span>{' '}
                        {session.bpm}
                      </span>
                    )}
                  </div>
                  {session.notes && (
                    <p className="text-sm text-gray-500 mt-3 border-t pt-3">
                      {session.notes}
                    </p>
                  )}
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}