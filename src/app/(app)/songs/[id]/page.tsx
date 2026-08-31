import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { BpmChart } from '@/components/bpm-chart'
import { BackButton } from '@/components/back-button'
import { formatDate } from '@/lib/utils'
import { SongStatusEditor } from '@/components/song-status-editor'
import { SongMetadataEditor } from '@/components/song-metadata-editor'
import { SongVideos } from '@/components/song-videos'

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
        include: {
          goal: true,
        },
      },
      videos: {
        orderBy: { createdAt: 'asc' },
      },
    },
  })

  if (!song) notFound()

    const totalMinutes = song.sessions.reduce((sum, s) => sum + s.duration, 0)
    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

  const sessionsWithBpm = song.sessions.filter((s) => s.bpm !== null)

  return (
    <main className="p-2">
      <div className="mb-6">
        <BackButton />
        <h1 className="text-xl font-semibold">{song.title}</h1>
        <div className="flex flex-wrap items-center gap-2 mt-2">
          <SongMetadataEditor
            song={{
              id: song.id,
              title: song.title,
              tuning: song.tuning,
              key: song.key,
              thumbStyle: song.thumbStyle,
            }}
          />
          {song.capo !== null && song.capo !== undefined && (
            <span className="text-xs border border-border rounded px-1.5 py-0.5 text-muted-foreground">
              Capo {song.capo}
            </span>
          )}
        </div>
        <div className="mt-3">
          <SongStatusEditor songId={song.id} initialStatus={song.status} />
        </div>
        {song.currentBlocker && (
          <div
            className="mt-4 bg-[#FBF0EB]/40 rounded-lg p-4"
            style={{ borderLeft: '2px solid var(--warm)' }}
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
              Where I left off
            </p>
            <p className="text-sm leading-snug">{song.currentBlocker}</p>
          </div>
        )}
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
                <p>Last practiced {formatDate(song.sessions[0].date)}</p>
                </>
            )}
        </div>
      </div>
      <SongVideos
        songId={song.id}
        initialVideos={song.videos}
      />
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

      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Sessions</p>
      {song.sessions.length === 0 ? (
        <p className="text-muted-foreground text-sm">No sessions logged for this song yet.</p>
      ) : (
        <ul className="divide-y">
          {song.sessions.map((session, index) => (
            <li key={session.id}>
              <div className="flex items-start gap-3 py-4">
                <div className={`w-0.75 self-stretch rounded-full shrink-0 ${index === 0 ? 'bg-[#B85C2A]' : 'bg-border'}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium">{session.goal?.name ?? 'No goal'}</p>
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
