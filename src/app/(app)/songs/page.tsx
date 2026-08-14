import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { SongsFilter } from '@/components/songs-filter'

const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

export default async function SongsPage() {
  const { userId } = await auth()
  if (!userId) return null

  const songs = await prisma.song.findMany({
    where: { userId },
    include: {
      sessions: {
        orderBy: { date: 'desc' },
        take: 1,
      },
    },
  })

  const neglected = songs
    .filter((s) => s.status === 'MAINTENANCE' && s.sessions[0] && s.sessions[0].date < thirtyDaysAgo)
    .sort((a, b) => {
      const aDate = a.sessions[0]?.date ?? new Date(0)
      const bDate = b.sessions[0]?.date ?? new Date(0)
      return aDate.getTime() - bDate.getTime() // oldest first
    })

  return (
    <main className="p-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Songs</h1>
      </div>

      {neglected.length > 0 && (
        <div className="mb-6 p-4 rounded-lg border border-amber-300 bg-amber-50/50">
          <p className="text-xs uppercase tracking-widest text-amber-700 mb-2">
            Neglected repertoire
          </p>
          <ul className="space-y-1">
            {neglected.map((song) => {
              const lastDate = song.sessions[0]?.date
              return (
                <li key={song.id} className="flex items-center justify-between gap-3 text-sm">
                  <Link
                    href={`/songs/${song.id}`}
                    className="text-foreground hover:underline truncate"
                  >
                    {song.title}
                  </Link>
                  {lastDate && (
                    <span className="text-xs text-amber-700 shrink-0">
                      last played {lastDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}

      {songs.length === 0 ? (
        <p className="text-muted-foreground">No songs yet. Log a session with a song to get started.</p>
      ) : (
        <SongsFilter songs={songs} />
      )}
    </main>
  )
}
