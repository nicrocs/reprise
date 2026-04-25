import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

export default async function GoalsPage() {
  const { userId } = await auth()
  if (!userId) return null

  const goals = await prisma.goal.findMany({
    where: { userId },
    include: {
      sessions: {
        orderBy: { date: 'desc' },
      },
    },
  })

  const sorted = goals.sort((a, b) => {
    const aDate = a.sessions[0]?.date ?? new Date(0)
    const bDate = b.sessions[0]?.date ?? new Date(0)
    return bDate.getTime() - aDate.getTime()
  })


  return (
    <main className="p-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Goals</h1> 
        <Button asChild>
          <Link href="/goals/new">
            Add Goals
          </Link>
        </Button>
      </div>
      {sorted.length === 0 ? (
        <p className="text-gray-500">No goals yet. Log a session with a goal to get started.</p>
      ) : (
        <ul className="grid grid-cols-1 divide-y divide-zinc-200 divide-solid">
          {sorted.map((goal, index) => {
            const lastSession = goal.sessions[0]
              const isStale = lastSession &&
                lastSession.date < thirtyDaysAgo
            return (
              <li key={goal.id}>
                <Link href={`/goals/${goal.id}`} className="flex items-center justify-between py-4 hover:bg-zinc-50 transition-colors gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className={`w-0.75 place-self-stretch rounded-full shrink-0 ${index === 0 ? 'bg-warm' : 'bg-border'}`} />
                        <div className="min-w-0">
                          <p className="font-semibold text-lg">{goal.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {goal.sessions.length} sessions
                              {lastSession && (
                                <span className={isStale ? 'text-amber-600' : ''}>
                                  {' · last practiced '}
                                  {new Date(lastSession.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                </span>
                              )}
                            </p>
                        </div>

                    </div>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </main>
  )
}
