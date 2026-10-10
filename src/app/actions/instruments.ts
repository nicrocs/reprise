'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'

const DEFAULT_INSTRUMENTS = ['Guitar', 'Bass']

async function requireUserId() {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  return userId
}

async function ensureDefaultInstruments(userId: string) {
  for (const name of DEFAULT_INSTRUMENTS) {
    const existing = await prisma.instrument.findFirst({
      where: { userId, name: { equals: name, mode: 'insensitive' } },
    })
    if (!existing) {
      await prisma.instrument.create({ data: { userId, name } })
    }
  }
}

export async function getInstruments() {
  const userId = await requireUserId()
  await ensureDefaultInstruments(userId)
  return prisma.instrument.findMany({
    where: { userId },
    orderBy: [{ isArchived: 'asc' }, { name: 'asc' }],
  })
}

export async function createInstrument(rawName: string) {
  const userId = await requireUserId()
  const name = rawName.trim()
  if (!name) throw new Error('Instrument name is required')

  const existing = await prisma.instrument.findFirst({
    where: { userId, name: { equals: name, mode: 'insensitive' } },
  })
  if (existing) throw new Error(`An instrument named "${existing.name}" already exists`)

  return prisma.instrument.create({ data: { userId, name } })
}

export async function renameInstrument(id: string, rawName: string) {
  const userId = await requireUserId()
  const name = rawName.trim()
  if (!name) throw new Error('Instrument name is required')

  const existing = await prisma.instrument.findUnique({ where: { id, userId } })
  if (!existing) throw new Error('Instrument not found')

  const duplicate = await prisma.instrument.findFirst({
    where: { userId, id: { not: id }, name: { equals: name, mode: 'insensitive' } },
  })
  if (duplicate) throw new Error(`An instrument named "${duplicate.name}" already exists`)

  return prisma.instrument.update({ where: { id, userId }, data: { name } })
}

export async function archiveInstrument(id: string) {
  const userId = await requireUserId()
  const instrument = await prisma.instrument.findUnique({ where: { id, userId } })
  if (!instrument) throw new Error('Instrument not found')
  if (instrument.isArchived) return instrument

  const availableCount = await prisma.instrument.count({ where: { userId, isArchived: false } })
  if (availableCount <= 1) throw new Error('Keep at least one available instrument')

  return prisma.instrument.update({ where: { id, userId }, data: { isArchived: true } })
}

export async function restoreInstrument(id: string) {
  const userId = await requireUserId()
  const instrument = await prisma.instrument.findUnique({ where: { id, userId } })
  if (!instrument) throw new Error('Instrument not found')
  return prisma.instrument.update({ where: { id, userId }, data: { isArchived: false } })
}
