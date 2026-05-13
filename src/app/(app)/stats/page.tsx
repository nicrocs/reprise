import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MoodFocusChart } from '@/components/mood-focus-chart'
import { addDays, createActiveDaySet, getCurrentStreak, getDateKey, startOfDay } from '@/lib/practice-streak'

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const ACTIVITY_WINDOW_DAYS = 90

type SessionWithRelations = {
  date: Date
  duration: number
  mood: number | null
  focus: number | null
  song: { id: string; title: string } | null
  goal: { id: string; name: string } | null
}

type TopItem = {
  id: string
  label: string
  sessions: number
  minutes: number
}

function formatShortDate(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatMonthLabel(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short' })
}

function formatFullDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatMinutes(totalMinutes: number) {
  if (totalMinutes < 60) return `${totalMinutes}m`

  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (minutes === 0) return `${hours}h`

  return `${hours}h ${minutes}m`
}

function buildTopItems(
  sessions: SessionWithRelations[],
  key: 'song' | 'goal'
) {
  const items = new Map<string, TopItem>()

  for (const session of sessions) {
    const relation = session[key]
    if (!relation) continue

    const existing = items.get(relation.id)
    if (existing) {
      existing.sessions += 1
      existing.minutes += session.duration
      continue
    }

    items.set(relation.id, {
      id: relation.id,
      label: 'title' in relation ? relation.title : relation.name,
      sessions: 1,
      minutes: session.duration,
    })
  }

  return Array.from(items.values())
    .sort((a, b) => {
      if (b.minutes !== a.minutes) return b.minutes - a.minutes
      return b.sessions - a.sessions
    })
    .slice(0, 5)
}

function buildMoodFocusTrend(sessions: SessionWithRelations[]) {
  const byDay = new Map<
    string,
    {
      date: Date
      moodTotal: number
      moodCount: number
      focusTotal: number
      focusCount: number
    }
  >()

  for (const session of sessions) {
    const key = getDateKey(session.date)
    const current = byDay.get(key) ?? {
      date: startOfDay(session.date),
      moodTotal: 0,
      moodCount: 0,
      focusTotal: 0,
      focusCount: 0,
    }

    if (session.mood !== null) {
      current.moodTotal += session.mood
      current.moodCount += 1
    }

    if (session.focus !== null) {
      current.focusTotal += session.focus
      current.focusCount += 1
    }

    byDay.set(key, current)
  }

  const sorted = Array.from(byDay.values())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .filter((entry) => entry.moodCount > 0 || entry.focusCount > 0)

  const moodValues = sorted.filter((entry) => entry.moodCount > 0)
  const focusValues = sorted.filter((entry) => entry.focusCount > 0)

  return {
    chartData: sorted.map((entry) => ({
      date: formatShortDate(entry.date),
      mood: entry.moodCount > 0 ? entry.moodTotal / entry.moodCount : null,
      focus: entry.focusCount > 0 ? entry.focusTotal / entry.focusCount : null,
    })),
    averageMood:
      moodValues.length > 0
        ? moodValues.reduce((sum, entry) => sum + entry.moodTotal / entry.moodCount, 0) / moodValues.length
        : null,
    averageFocus:
      focusValues.length > 0
        ? focusValues.reduce((sum, entry) => sum + entry.focusTotal / entry.focusCount, 0) / focusValues.length
        : null,
    ratedDays: sorted.length,
  }
}

function buildCalendar(activeDays: Set<string>, today: Date) {
  const end = startOfDay(today)
  const windowStart = addDays(end, -(ACTIVITY_WINDOW_DAYS - 1))
  const gridStart = addDays(windowStart, -windowStart.getDay())
  const gridEnd = addDays(end, 6 - end.getDay())

  const days = []
  for (let cursor = new Date(gridStart); cursor <= gridEnd; cursor = addDays(cursor, 1)) {
    const key = getDateKey(cursor)
    const inRange = cursor >= windowStart && cursor <= end
    days.push({
      key,
      date: new Date(cursor),
      isActive: inRange && activeDays.has(key),
      inRange,
      isToday: key === getDateKey(end),
      label: formatFullDate(cursor),
    })
  }

  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    const weekDays = days.slice(i, i + 7)
    const firstInRangeDay = weekDays.find((day) => day.inRange)
    const monthAnchor =
      i === 0
        ? firstInRangeDay
        : weekDays.find((day) => day.inRange && day.date.getDate() === 1) ?? null

    weeks.push({
      monthLabel: monthAnchor ? formatMonthLabel(monthAnchor.date) : '',
      days: weekDays,
    })
  }

  return weeks
}

function SummaryCard({
  label,
  value,
  detail,
}: {
  label: string
  value: string
  detail: string
}) {
  return (
    <div className="rounded-[1.1rem] border border-[#edd7c4] bg-[#fffaf5] px-4 py-4 shadow-[0_10px_30px_rgba(184,92,42,0.06)]">
      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9d724f]">{label}</p>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-[#2b170c]">{value}</p>
      <p className="mt-1 text-sm text-[#72553e]">{detail}</p>
    </div>
  )
}

function TopList({
  title,
  emptyText,
  items,
}: {
  title: string
  emptyText: string
  items: TopItem[]
}) {
  return (
    <Card className="border-[#ecd7c4] bg-white/95 shadow-[0_14px_40px_rgba(43,23,12,0.06)]">
      <CardHeader className="gap-1 pb-0">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9d724f]">This period</p>
        <CardTitle className="text-lg text-[#2b170c]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-1">
        {items.length === 0 ? (
          <p className="text-sm text-[#8b6a53]">{emptyText}</p>
        ) : (
          <ul className="divide-y divide-[#f1e3d6]">
            {items.map((item, index) => (
              <li key={item.id} className="flex items-center justify-between gap-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className={`h-10 w-[3px] rounded-full ${index === 0 ? 'bg-[#b85c2a]' : 'bg-[#e7d4c5]'}`} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#2b170c]">{item.label}</p>
                    <p className="text-xs text-[#8b6a53]">
                      {item.sessions} {item.sessions === 1 ? 'session' : 'sessions'}
                    </p>
                  </div>
                </div>
                <p className="shrink-0 text-sm text-[#6f4d36]">{formatMinutes(item.minutes)}</p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}

export default async function StatsPage() {
  const { userId } = await auth()
  if (!userId) return null

  const today = startOfDay(new Date())
  const windowStart = addDays(today, -(ACTIVITY_WINDOW_DAYS - 1))

  const sessions = await prisma.session.findMany({
    where: {
      userId,
      date: { gte: windowStart },
    },
    orderBy: { date: 'asc' },
    select: {
      date: true,
      duration: true,
      mood: true,
      focus: true,
      song: { select: { id: true, title: true } },
      goal: { select: { id: true, name: true } },
    },
  })

  const activeDays = createActiveDaySet(sessions.map((session) => session.date))
  const practiceDays = activeDays.size
  const totalSessions = sessions.length
  const totalMinutes = sessions.reduce((sum, session) => sum + session.duration, 0)
  const averageSessionLength = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0
  const currentStreak = getCurrentStreak(activeDays)
  const topSongs = buildTopItems(sessions, 'song')
  const topGoals = buildTopItems(sessions, 'goal')
  const { chartData, averageMood, averageFocus, ratedDays } = buildMoodFocusTrend(sessions)
  const calendar = buildCalendar(activeDays, today)

  return (
    <main className="space-y-8 p-2">
      <section className="rounded-[1.5rem] border border-[#ecd7c4] bg-[linear-gradient(135deg,rgba(255,250,245,0.98),rgba(251,240,235,0.9))] p-6 shadow-[0_18px_45px_rgba(43,23,12,0.07)]">
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#9d724f]">Progress</p>
        <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-[#2b170c]">Stats</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#72553e]">
              Your last 90 days of practice, centered on consistency, momentum, and how sessions are feeling.
            </p>
          </div>
          <div className="rounded-full border border-[#e8ccb7] bg-white/80 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-[#8a4a23]">
            Last 90 days
          </div>
        </div>
      </section>

      <Card className="overflow-hidden border-[#ecd7c4] bg-white/95 shadow-[0_14px_40px_rgba(43,23,12,0.06)]">
        <CardHeader className="gap-1 border-b border-[#f3e7db] pb-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9d724f]">Habit</p>
          <CardTitle className="text-lg text-[#2b170c]">Practice calendar</CardTitle>
          <p className="text-sm text-[#8b6a53]">A filled square means you logged at least one session that day.</p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-[640px]">
              <div className="mb-2 ml-11 flex gap-1.5 text-[11px] font-medium text-[#9d724f]">
                {calendar.map((week, index) => (
                  <div key={`${week.monthLabel}-${index}`} className="relative h-4 w-4">
                    {week.monthLabel ? <span className="absolute left-0 top-0 whitespace-nowrap">{week.monthLabel}</span> : null}
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <div className="grid grid-rows-7 gap-1.5 pt-0.5 text-[11px] text-[#9d724f]">
                  {DAY_LABELS.map((label) => (
                    <div key={label} className="flex h-4 items-center">
                      {label}
                    </div>
                  ))}
                </div>
                <div className="flex gap-1.5">
                  {calendar.map((week, weekIndex) => (
                    <div key={weekIndex} className="grid w-4 grid-rows-7 gap-1.5">
                      {week.days.map((day) => (
                        <div
                          key={day.key}
                          title={`${day.label}: ${day.isActive ? 'Practiced' : 'No session logged'}`}
                          aria-label={`${day.label}: ${day.isActive ? 'Practiced' : 'No session logged'}`}
                          className={[
                            'h-4 w-4 rounded-[4px] border transition-colors',
                            day.inRange
                              ? day.isActive
                                ? 'border-[#b85c2a] bg-[#b85c2a]'
                                : 'border-[#ead7c8] bg-[#fcf5ee]'
                              : 'border-transparent bg-transparent',
                            day.isToday ? 'ring-2 ring-[#f4d7c3] ring-offset-2 ring-offset-white' : '',
                          ].join(' ')}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex items-center justify-end gap-3 text-xs text-[#8b6a53]">
                <span>No session</span>
                <div className="h-3.5 w-3.5 rounded-[4px] border border-[#ead7c8] bg-[#fcf5ee]" />
                <span>Practiced</span>
                <div className="h-3.5 w-3.5 rounded-[4px] border border-[#b85c2a] bg-[#b85c2a]" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Practice days"
          value={`${practiceDays}`}
          detail={`${practiceDays === 1 ? 'Day' : 'Days'} active in this window`}
        />
        <SummaryCard
          label="Sessions"
          value={`${totalSessions}`}
          detail={`${averageSessionLength} minute average length`}
        />
        <SummaryCard
          label="Minutes"
          value={formatMinutes(totalMinutes)}
          detail="Total time logged"
        />
        <SummaryCard
          label="Current streak"
          value={`${currentStreak}`}
          detail={`${currentStreak === 1 ? 'Day' : 'Days'} in a row`}
        />
      </section>

      <Card className="border-[#ecd7c4] bg-white/95 shadow-[0_14px_40px_rgba(43,23,12,0.06)]">
        <CardHeader className="gap-1 border-b border-[#f3e7db] pb-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#9d724f]">Reflection</p>
          <CardTitle className="text-lg text-[#2b170c]">Mood & focus</CardTitle>
          <p className="text-sm text-[#8b6a53]">
            Daily averages will appear here automatically once you start rating sessions.
          </p>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-[1rem] border border-[#f1dfd1] bg-[#fff9f4] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9d724f]">Average mood</p>
              <p className="mt-3 text-2xl font-semibold text-[#2b170c]">
                {averageMood === null ? '—' : averageMood.toFixed(1)}
              </p>
            </div>
            <div className="rounded-[1rem] border border-[#f1dfd1] bg-[#fff9f4] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9d724f]">Average focus</p>
              <p className="mt-3 text-2xl font-semibold text-[#2b170c]">
                {averageFocus === null ? '—' : averageFocus.toFixed(1)}
              </p>
            </div>
            <div className="rounded-[1rem] border border-[#f1dfd1] bg-[#fff9f4] p-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9d724f]">Rated days</p>
              <p className="mt-3 text-2xl font-semibold text-[#2b170c]">{ratedDays}</p>
            </div>
          </div>

          {chartData.length === 0 ? (
            <div className="mt-6 rounded-[1.25rem] border border-dashed border-[#e8d3c1] bg-[#fffaf6] px-5 py-8 text-sm text-[#8b6a53]">
              Mood trends will appear once you start rating sessions for mood or focus.
            </div>
          ) : (
            <div className="mt-6 rounded-[1.25rem] border border-[#f1dfd1] bg-[#fffaf6] p-4">
              <div className="mb-4 flex flex-wrap items-center gap-4 text-xs font-medium text-[#8b6a53]">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#b85c2a]" />
                  Mood
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#5f7a65]" />
                  Focus
                </div>
              </div>
              <MoodFocusChart data={chartData} />
            </div>
          )}
        </CardContent>
      </Card>

      <section className="grid gap-4 lg:grid-cols-2">
        <TopList
          title="Top songs"
          emptyText="Songs will show up here once you log sessions with a song attached."
          items={topSongs}
        />
        <TopList
          title="Top goals"
          emptyText="Goals will show up here once your sessions are tied to goals."
          items={topGoals}
        />
      </section>
    </main>
  )
}
