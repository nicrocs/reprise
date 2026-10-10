'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Prisma } from '../../../prisma/generated/prisma'
import type { TemplateFormData } from '@/lib/types'

export async function getSessionTemplates() {
  const { userId } = await auth()
  if (!userId) return []
  return prisma.sessionTemplate.findMany({
    where: { userId },
    orderBy: { name: 'asc' },
    include: { defaultInstrument: true },
  })
}

export async function getSessionTemplateById(id: string) {
  const { userId } = await auth()
  if (!userId) return null
  return prisma.sessionTemplate.findUnique({ where: { id, userId } })
}

export async function createSessionTemplate(input: TemplateFormData) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const name = input.name.trim()
  if (!name) throw new Error('Template name is required')

  if (input.defaultInstrumentId) {
    const instrument = await prisma.instrument.findFirst({
      where: { id: input.defaultInstrumentId, userId },
    })
    if (!instrument) throw new Error('Default instrument not found')
  }

  const existing = await prisma.sessionTemplate.findFirst({
    where: { userId, name: { equals: name, mode: 'insensitive' } },
  })
  if (existing) throw new Error(`A template named "${name}" already exists`)

  return prisma.sessionTemplate.create({
    data: {
      userId,
      name,
      showMetronome: input.showMetronome,
      showSongPicker: input.showSongPicker,
      showGoalPicker: input.showGoalPicker,
      checklistItems: (input.checklistItems ?? Prisma.JsonNull) as Prisma.InputJsonValue,
      defaultInstrumentId: input.defaultInstrumentId || null,
    },
  })
}

export async function updateSessionTemplate(id: string, input: TemplateFormData) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const existing = await prisma.sessionTemplate.findUnique({
    where: { id, userId },
  })
  if (!existing) throw new Error('Template not found')

  const name = input.name.trim()
  if (!name) throw new Error('Template name is required')

  if (input.defaultInstrumentId) {
    const instrument = await prisma.instrument.findFirst({
      where: { id: input.defaultInstrumentId, userId },
    })
    if (!instrument) throw new Error('Default instrument not found')
  }

  if (name.toLowerCase() !== existing.name.toLowerCase()) {
    const duplicate = await prisma.sessionTemplate.findFirst({
      where: {
        userId,
        id: { not: id },
        name: { equals: name, mode: 'insensitive' },
      },
    })
    if (duplicate) throw new Error(`A template named "${name}" already exists`)
  }

  return prisma.sessionTemplate.update({
    where: { id, userId },
    data: {
      name,
      showMetronome: input.showMetronome,
      showSongPicker: input.showSongPicker,
      showGoalPicker: input.showGoalPicker,
      checklistItems: (input.checklistItems ?? Prisma.JsonNull) as Prisma.InputJsonValue,
      defaultInstrumentId: input.defaultInstrumentId || null,
    },
  })
}

export async function deleteSessionTemplate(id: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  await prisma.sessionTemplate.delete({ where: { id, userId } })
  redirect('/templates')
}
