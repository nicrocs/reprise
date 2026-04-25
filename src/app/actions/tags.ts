'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function getTags(query: string) {
  const { userId } = await auth()
  if (!userId) return []

  return prisma.tag.findMany({
    where: {
      userId,
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
    take: 8,
    orderBy: { name: 'asc' },
  })
}
