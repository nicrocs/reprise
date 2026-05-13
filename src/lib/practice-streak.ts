export function startOfDay(date: Date) {
  const next = new Date(date)
  next.setHours(0, 0, 0, 0)
  return next
}

export function addDays(date: Date, days: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}

export function getDateKey(date: Date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function createActiveDaySet(dates: Date[]) {
  return new Set(dates.map((date) => getDateKey(date)))
}

export function getCurrentStreak(activeDays: Set<string>, now = new Date()) {
  const today = startOfDay(now)
  const yesterday = addDays(today, -1)

  let cursor = activeDays.has(getDateKey(today)) ? today : yesterday
  if (!activeDays.has(getDateKey(cursor))) return 0

  let streak = 0
  while (activeDays.has(getDateKey(cursor))) {
    streak += 1
    cursor = addDays(cursor, -1)
  }

  return streak
}
