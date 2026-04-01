'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

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

  return await prisma.goal.update({
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

export async function createGoals(names: string[]) {
  // 1. Auth
const { userId } = await auth()
if (!userId) throw new Error('Unauthorized')

// 2. Filter empty
const nonEmpty = names.filter(n => n.trim() !== '')

// 3. Dedupe input
const uniqueNames = nonEmpty.reduce((acc, name) => {
      const lower = name.trim().toLowerCase()
      if (!acc.seen.has(lower)) {
        acc.seen.add(lower)
        acc.unique.push(name)
      }
      return acc
    }, { seen: new Set<string>(), unique: [] as string[] }).unique

  // 4. Fetch existing
  const existing = await prisma.goal.findMany({
    where: { userId },
    select: { name: true }
  })

  const existingLower = new Set(existing.map(g => g.name.toLowerCase()))

  // 5. Filter out existing
  const namesToCreate = uniqueNames.filter(
    name => !existingLower.has(name.toLowerCase())
  )

  // 6. Upsert
  for (const name of namesToCreate) {
    await prisma.goal.upsert({
      where: { userId_name: { userId, name } },
      update: {},
      create: { userId, name }
    })
  }

  redirect('/goals')
}