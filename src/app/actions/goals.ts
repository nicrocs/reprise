'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

export async function getGoals(query: string) {
  const { userId } = await auth()
  if (!userId) return []

  return prisma.goal.findMany({
    where: {
      userId,
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
    take: 5,
    orderBy: { name: 'asc' },
  })
}

export async function getGoalsWithRecentSession() {
  const { userId } = await auth()
  if (!userId) return []

  const goals = await prisma.goal.findMany({
    where: { userId },
    include: {
      sessions: {
        orderBy: { date: 'desc' },
        take: 1,
      },
    },
  })

  // sort by most recently practiced
  return goals.sort((a, b) => {
    const aDate = a.sessions[0]?.date ?? new Date(0)
    const bDate = b.sessions[0]?.date ?? new Date(0)
    return bDate.getTime() - aDate.getTime()
  })
}

export async function getGoalById(id: string) {
  'use server'
  const { userId } = await auth()
  if (!userId) return null
  return prisma.goal.findUnique({
    where: { id, userId },
  })
}

export async function updateGoal(id: string, name: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  await prisma.goal.update({
    where: { id, userId },
    data: {
        name,
    },
  })
}

export async function createGoal(name: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  const trimmedName = name.trim()
  if (!trimmedName) throw new Error('Goal name is required')
  
  return prisma.goal.upsert({
    where: { userId_name: { userId, name: trimmedName }},
    update: {},
    create: { userId, name: trimmedName },
  })
}