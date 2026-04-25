
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { GoalDetails } from '@/components/goal-detail'
import { formatDate } from '@/lib/utils'

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
<main className="p-8">
  {/* header rendered by GoalDetails */}
  <div className="mb-6">
    <GoalDetails goal={goal} />
    <p className="text-sm text-muted-foreground mt-2 flex gap-2">
      <span>{goal.sessions.length} {goal.sessions.length === 1 ? 'session' : 'sessions'}</span>
      {totalMinutes > 0 && (
        <>
          <span>·</span>
          <span>{hours > 0 && `${hours}h `}{minutes > 0 && `${minutes}m`} total</span>
        </>
      )}
      {goal.sessions.length > 0 && (
        <>
          <span>·</span>
          <span>Last practiced {formatDate(goal.sessions[0].date)}</span>
        </>
      )}
    </p>
  </div>

  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Sessions</p>
  {goal.sessions.length === 0 ? (
    <p className="text-muted-foreground text-sm">No sessions logged for this goal yet.</p>
  ) : (
    <ul className="divide-y">
      {goal.sessions.map((session, index) => (
        <li key={session.id}>
          <div className="flex items-start gap-3 py-4">
            <div className={`w-[3px] self-stretch rounded-full shrink-0 ${index === 0 ? 'bg-[#B85C2A]' : 'bg-border'}`} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium">{session.song?.title ?? 'No song'}</p>
                <p className="text-sm text-muted-foreground shrink-0">{formatDate(session.date)}</p>
              </div>
              <div className="flex gap-4 text-sm mt-0.5">
                <span><span className="text-muted-foreground">Duration</span> {session.duration}m</span>
                {session.bpm && <span><span className="text-muted-foreground">BPM</span> {session.bpm}</span>}
              </div>
              {session.notes && (
                <p className="text-sm text-muted-foreground mt-2">{session.notes}</p>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  )}
</main>
  )
}