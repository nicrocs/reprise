import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { DeleteButton } from '@/components/delete-button'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BpmChart } from '@/components/bpm-chart'
import { BackButton } from '@/components/back-button'

export default async function GoalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { userId } = await auth()
  if (!userId) return null

  const goal = await prisma.goal.findUnique({
    where: { id, userId },
    include: {
      sessions: {
        orderBy: { date: 'desc' },
        include: { 
            song: true
        }
      },
    },
  })

  if (!goal) notFound()

    const totalMinutes = goal.sessions.reduce((sum, s) => sum + s.duration, 0)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

  return (
    <main className="max-w-xl mx-auto p-8">

      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold">{goal.name}</h1>
          <BackButton />
        </div>
        <div className="flex gap-2 mt-4">
            <p>
                {goal.sessions.length} {goal.sessions.length === 1 ? 'session' : 'sessions'}
            </p>
            {totalMinutes > 0 && (
                <>
                <span>·</span>
                <p>
                    {hours > 0 && `${hours}h `}{minutes > 0 && `${minutes}m`} total practice time
                </p>
                </>
            )}
            {goal.sessions.length > 0 && (
                <>
                <span>·</span>
                <p>Last practiced {new Date(goal.sessions[0].date).toLocaleDateString()}</p>
                </>
            )}
        </div>
      </div>

      {/* Sessions */}
      <h2 className="text-lg font-semibold mb-3">Sessions</h2>
      {goal.sessions.length === 0 ? (
        <p className="text-gray-500">No sessions logged for this goal yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {goal.sessions.map((session) => (
            <li key={session.id}>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm text-gray-500">
                      {session.song?.title}
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
                  <div className="mt-4 flex gap-2">
                    <Link
                      href={`/sessions/${session.id}/edit`}
                      className={buttonVariants({ variant: 'outline', size: 'sm' })}
                    >
                      Edit
                    </Link>
                    <DeleteButton id={session.id} />
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}