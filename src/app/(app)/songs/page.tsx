import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { TUNING_LABELS } from '@/lib/constants'

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

  const sorted = songs.sort((a, b) => {
    const aDate = a.sessions[0]?.date ?? new Date(0)
    const bDate = b.sessions[0]?.date ?? new Date(0)
    return bDate.getTime() - aDate.getTime()
  })

return (
  <main className="p-2">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-xl font-semibold">Songs</h1>
    </div>
    {sorted.length === 0 ? (
      <p className="text-muted-foreground">No songs yet. Log a session with a song to get started.</p>
    ) : (
      <ul className="divide-y">
        {sorted.map((song, index) => {
          const lastSession = song.sessions[0]
          const isStale = lastSession && lastSession.date < thirtyDaysAgo
          return (
            <li key={song.id}>
              <Link href={`/songs/${song.id}`} className="flex items-center justify-between py-4 hover:bg-zinc-50 transition-colors gap-4">
                <div className="flex items-stretch gap-3 min-w-0">
                  <div className={`w-0.75 self-stretch rounded-full shrink-0 ${index === 0 ? 'bg-[#B85C2A]' : 'bg-border'}`} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{song.title}</p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="text-xs border border-border rounded px-1.5 py-0.5 text-muted-foreground">
                        {TUNING_LABELS[song.tuning]}
                      </span>
                      {song.key && <span className="text-sm text-muted-foreground">{song.key.replace('_', ' ')}</span>}
                      {song.capo && <span className="text-sm text-muted-foreground">capo {song.capo}</span>}
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  {lastSession ? (
                    <p className={`text-sm ${isStale ? 'text-amber-600' : 'text-muted-foreground'}`}>
                      {lastSession.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  ) : (
                    <p className="text-sm text-muted-foreground">No sessions yet</p>
                  )}
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
