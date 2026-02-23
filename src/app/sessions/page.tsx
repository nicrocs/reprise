import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Card, CardAction, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card'
import { DeleteButton } from '@/components/delete-button'

export default async function SessionsPage() {
  const { userId } = await auth()

  if (!userId) return null

    const sessions = await prisma.session.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
    include: { song: true },
    })

  return (
    <main className="max-w-xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Practice Sessions</h1>
        <Link
          href="/sessions/new"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Log Session
        </Link>
      </div>
      {sessions.length === 0 ? (
        <p className="text-gray-500">No sessions yet. Log your first one!</p>
      ) : (
        <div className="flex flex-col gap-4">
          {sessions.map((session) => (
            <Card key={session.id}>
                <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                        <div>
                        {session.song && (
                            <CardTitle>{session.song.title}</CardTitle>
                        )}
                        <CardDescription className="text-sm text-gray-500">{session.topic}</CardDescription>
                        </div>
                        <p className="text-sm text-gray-400">
                        {new Date(session.date).toLocaleDateString()}
                        </p>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-4 text-sm mt-3">
                        <span><span className="text-gray-400">Duration</span> {session.duration}m</span>
                        {session.bpm && <span><span className="text-gray-400">BPM</span> {session.bpm}</span>}
                        {session.song?.tuning && (
                            <span>
                                <span className="text-gray-400">Tuning</span>{' '}
                                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                                {session.song.tuning.replace('_', ' ')}
                                </span>
                            </span>
                        )}
                    </div>
                    {session.notes && (
                        <p className="text-sm text-gray-500 mt-2 border-t pt-3">{session.notes}</p>
                    )}
                </CardContent>
                <CardFooter>
                    <DeleteButton id={session.id} />
                </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}