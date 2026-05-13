import { createActiveDaySet, getCurrentStreak } from '@/lib/practice-streak'

export type GuitarBadge = {
  slug: string
  name: string
  tierLabel: string
  unlockStreakDays: number
  description: string
  image: string | null
  priceBand: string
  accent: string
}

export const GUITAR_BADGES: GuitarBadge[] = [
  {
    slug: 'epiphone-dr-100',
    name: 'Epiphone DR-100',
    tierLabel: 'Starter Guitar',
    unlockStreakDays: 0,
    description: 'Natural-finish beginner dreadnought. The dependable first guitar on the wall.',
    image: '/epiphone.webp',
    priceBand: 'Entry-level classic',
    accent: 'from-[#f8d39b] via-[#f3be7c] to-[#7f4a28]',
  },
  {
    slug: 'yamaha-f335',
    name: 'Yamaha F335',
    tierLabel: 'Three-day streak',
    unlockStreakDays: 3,
    description: 'A common first real upgrade: steady, affordable, and ready for daily reps.',
    image: null,
    priceBand: 'Popular budget upgrade',
    accent: 'from-[#efe7db] via-[#dfd2c0] to-[#bda68e]',
  },
  {
    slug: 'yamaha-fg800',
    name: 'Yamaha FG800',
    tierLabel: 'Seven-day streak',
    unlockStreakDays: 7,
    description: 'A widely loved solid-top acoustic that rewards your first full week of consistency.',
    image: null,
    priceBand: 'Beloved mid-budget workhorse',
    accent: 'from-[#eedfc8] via-[#d9c0a0] to-[#a06b3e]',
  },
  {
    slug: 'seagull-s6-original',
    name: 'Seagull S6 Original',
    tierLabel: 'Fourteen-day streak',
    unlockStreakDays: 14,
    description: 'A serious player’s instrument with a distinctive voice and a clear step up in character.',
    image: null,
    priceBand: 'Respected player favorite',
    accent: 'from-[#f0e2d4] via-[#d9c4b0] to-[#98704e]',
  },
  {
    slug: 'taylor-academy-10e',
    name: 'Taylor Academy 10e',
    tierLabel: 'Thirty-day streak',
    unlockStreakDays: 30,
    description: 'A full-month unlock that feels polished, modern, and built for sustained momentum.',
    image: null,
    priceBand: 'Premium learner step-up',
    accent: 'from-[#f2e7da] via-[#d8cab6] to-[#8a6548]',
  },
  {
    slug: 'martin-d-18',
    name: 'Martin D-18',
    tierLabel: 'Sixty-day streak',
    unlockStreakDays: 60,
    description: 'The wall starts getting legendary here: unmistakable Martin territory and real prestige.',
    image: null,
    priceBand: 'Professional heirloom tier',
    accent: 'from-[#ece7df] via-[#ddd1c0] to-[#8d6f56]',
  },
  {
    slug: 'gibson-j-45-standard',
    name: 'Gibson J-45 Standard',
    tierLabel: 'One-hundred-day streak',
    unlockStreakDays: 100,
    description: 'An iconic songwriter guitar unlocked only after real long-haul consistency.',
    image: null,
    priceBand: 'Iconic studio legend',
    accent: 'from-[#e7dfd7] via-[#cdb9aa] to-[#6f4d36]',
  },
  {
    slug: 'martin-d-45',
    name: 'Martin D-45',
    tierLabel: 'One-hundred-eighty-day streak',
    unlockStreakDays: 180,
    description: 'The crown piece of the collection: rarefied, ornate, and earned through true devotion.',
    image: null,
    priceBand: 'Elite collector summit',
    accent: 'from-[#f5e8c7] via-[#d6b678] to-[#7a4b21]',
  },
]

export function getBadgeProgress(sessionDates: Date[]) {
  const activeDays = createActiveDaySet(sessionDates)
  const streak = getCurrentStreak(activeDays)
  const currentBadge =
    GUITAR_BADGES.filter((badge) => badge.unlockStreakDays <= streak).at(-1) ?? GUITAR_BADGES[0]
  const currentIndex = GUITAR_BADGES.findIndex((badge) => badge.slug === currentBadge.slug)
  const nextBadge = GUITAR_BADGES[currentIndex + 1] ?? null

  return {
    streak,
    currentBadge,
    nextBadge,
    remainingDays: nextBadge ? Math.max(0, nextBadge.unlockStreakDays - streak) : 0,
    badges: GUITAR_BADGES.map((badge, index) => ({
      ...badge,
      unlocked: badge.unlockStreakDays <= streak,
      isCurrent: badge.slug === currentBadge.slug,
      collectionNumber: index + 1,
    })),
  }
}
