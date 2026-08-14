import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { PickupButton } from '@/components/pickup-button'
import { StartSessionButton } from '@/components/start-session-button'
import Link from 'next/link'
import type { ChecklistItem } from '@/lib/types'

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) return null

  const lastSession = await prisma.session.findFirst({
    where: { userId },
    orderBy: { date: 'desc' },
    include: { song: true, goal: true, template: true },
  })

    const allSongs = await prisma.song.findMany({
    where: { userId },
    include: {
        sessions: {
        orderBy: { date: 'desc' },
        take: 1,
        },
    },
    })

    const recentSongs = allSongs
  .filter(s => s.sessions.length > 0)
  .sort((a, b) => {
    const aDate = a.sessions[0]?.date ?? new Date(0)
    const bDate = b.sessions[0]?.date ?? new Date(0)
    return bDate.getTime() - aDate.getTime()
  })
  .slice(0, 5)

  const fiveDaysAgo = new Date()
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 4)
  fiveDaysAgo.setHours(0, 0, 0, 0)

  const recentSessions = await prisma.session.findMany({
    where: { userId, date: { gte: fiveDaysAgo } },
    orderBy: { date: 'desc' },
    select: { date: true },
  })

  // Build 5-day calendar
  const days = Array.from({ length: 5 }, (_, i) => {
    const day = new Date()
    day.setDate(day.getDate() - (4 - i))
    day.setHours(0, 0, 0, 0)
    const practiced = recentSessions.some(s => {
      const d = new Date(s.date)
      d.setHours(0, 0, 0, 0)
      return d.getTime() === day.getTime()
    })
    return { day, practiced, isToday: i === 4 }
  })

  return (
    <div className="flex flex-col gap-8 sm:gap-10">
      {/* Pickup */}
      {lastSession?.pickup && (
        <section className="rounded-lg bg-[#FBF0EB]/40 p-4 sm:p-5">
          <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
            Pick up where you left off
          </p>
          <div
            className="mb-4 text-sm leading-snug font-medium sm:text-base"
            style={{ borderLeft: '2px solid #B85C2A', paddingLeft: '0.75rem' }}
          >
            {lastSession.pickup}
          </div>
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="w-full sm:w-auto">
              <PickupButton
                pickup={lastSession.pickup}
                songId={lastSession.songId}
                songTitle={lastSession.song?.title}
                goalId={lastSession.goalId}
                goalName={lastSession.goal?.name}
                templateId={lastSession.templateId}
                templateName={lastSession.template?.name}
                templateChecklistItems={lastSession.template?.checklistItems as ChecklistItem[] | null | undefined}
                templateShowMetronome={lastSession.template?.showMetronome ?? undefined}
                templateShowSongPicker={lastSession.template?.showSongPicker ?? undefined}
                templateShowGoalPicker={lastSession.template?.showGoalPicker ?? undefined}
              />
            </div>
            <span className="max-w-full text-xs leading-relaxed text-muted-foreground sm:text-right">
              {lastSession.song?.title && `${lastSession.song.title} · `}
              {formatDate(lastSession.date)}
            </span>
          </div>
        </section>
      )}

      {/* 5-day calendar */}
      <div>
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
          This week
        </p>
        <div className="flex gap-2">
          {days.map(({ day, practiced, isToday }) => (
            <div
              key={day.toISOString()}
              className="flex flex-col items-center gap-1.5"
            >
              <span className="text-xs text-muted-foreground">
                {day.toLocaleDateString('en-US', { weekday: 'short' })}
              </span>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium
                ${practiced
                  ? 'bg-[#B85C2A] text-white'
                  : isToday
                  ? 'border border-[#B85C2A] text-[#B85C2A]'
                  : 'bg-zinc-100 text-muted-foreground'
                }`}
              >
                {day.getDate()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent songs */}
      {recentSongs.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Recent songs
          </p>
          <ul className="divide-y">
            {recentSongs.map((song, index) => {
              const lastPracticed = song.sessions[0]?.date
              return (
                
                <li key={song.id} className="flex items-center justify-between py-3 gap-4">
                  <Link href={`/songs/${song.id}`} className="min-w-0 flex-1">
  <div className="flex items-center gap-3 min-w-0">
    <div className={`w-[3px] self-stretch rounded-full shrink-0 ${
      index === 0 ? 'bg-[#B85C2A]' : 'bg-border'
    }`} />
    <div className="min-w-0">
      <p className="text-sm font-medium hover:text-[#B85C2A] transition-colors">{song.title}</p>
      {lastPracticed && (
        <p className="text-xs text-muted-foreground">{formatDate(lastPracticed)}</p>
      )}
    </div>
  </div>
</Link>
                  <StartSessionButton
                    songId={song.id}
                    songTitle={song.title}
                  />
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
