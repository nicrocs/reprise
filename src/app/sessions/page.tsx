import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Card, CardAction, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from '@/components/ui/card'

export default async function SessionsPage() {
  const { userId } = await auth()

  if (!userId) return null

  const sessions = await prisma.session.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
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
                    <CardTitle>{session.topic}</CardTitle>
                    <CardDescription className="text-sm text-gray-500">
                        {session.duration} minutes
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-gray-500">
                        {new Date(session.date).toLocaleDateString()}
                    </p>
                    {session.notes && (
                        <p className="text-sm text-gray-600 mt-2">{session.notes}</p>
                    )}
                </CardContent>  
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}