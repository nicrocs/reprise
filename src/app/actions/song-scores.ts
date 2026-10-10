'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function getSongScores(songId: string) {
  if (typeof songId !== 'string' || songId.length === 0) return []

  const { userId } = await auth()
  if (!userId) return []

  return prisma.songScore.findMany({
    where: {
      songId,
      song: { userId },
    },
    select: {
      id: true,
      label: true,
      alphaTex: true,
    },
    orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
  })
}
