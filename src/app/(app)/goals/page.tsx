import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'

export default async function GoalsPage() {
  const { userId } = await auth()
  if (!userId) return null

  const goals = await prisma.goal.findMany({
    where: { userId },
    include: {
      sessions: {
        orderBy: { date: 'desc' },
        take: 1,
      },
    },
  })

  const sorted = goals.sort((a, b) => {
    const aDate = a.sessions[0]?.date ?? new Date(0)
    const bDate = b.sessions[0]?.date ?? new Date(0)
    return bDate.getTime() - aDate.getTime()
  })

  return (
    <main className="max-w-xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Goals</h1>
      </div>
      {sorted.length === 0 ? (
        <p className="text-gray-500">No goals yet. Log a session with a goal to get started.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {sorted.map((goal) => {
            const lastSession = goal.sessions[0]
            return (
              <li key={goal.id}>
                <Link href={`/goals/${goal.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-lg">{goal.name}</p>
                        </div>
                        <div className="text-right">
                          {lastSession ? (
                            <>
                              <p className="text-sm text-gray-400">Last practiced</p>
                              <p className="text-sm text-gray-600">
                                {new Date(lastSession.date).toLocaleDateString()}
                              </p>
                            </>
                          ) : (
                            <p className="text-sm text-gray-400">No sessions yet</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </main>
  )
}