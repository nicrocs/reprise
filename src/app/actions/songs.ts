'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { Tuning, Key } from '../../../prisma/generated/prisma'

export async function getSongs(query: string) {
  const { userId } = await auth()
  if (!userId) return []

  return prisma.song.findMany({
    where: {
      userId,
      title: {
        contains: query,
        mode: 'insensitive',
      },
    },
    take: 5,
    orderBy: { title: 'asc' },
  })
}

export async function getSongsWithRecentSession() {
  const { userId } = await auth()
  if (!userId) return []

  const songs = await prisma.song.findMany({
    where: { userId },
    include: {
      sessions: {
        orderBy: { date: 'desc' },
        take: 1,
      },
    },
  })

  // sort by most recently practiced
  return songs.sort((a, b) => {
    const aDate = a.sessions[0]?.date ?? new Date(0)
    const bDate = b.sessions[0]?.date ?? new Date(0)
    return bDate.getTime() - aDate.getTime()
  })
}

export async function getSongById(id: string) {
  'use server'
  const { userId } = await auth()
  if (!userId) return null
  return prisma.song.findUnique({
    where: { id, userId },
    select: { tuning: true, key: true }
  })
}

export async function updateSong(id: string, { tuning, key }: { tuning: string, key: string | null}) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  await prisma.song.update({
    where: { id, userId },
    data: {
        tuning: tuning as Tuning,
        key: key as Key,
    },
  })
}