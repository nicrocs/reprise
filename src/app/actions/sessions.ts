'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Tuning, Key, ThumbStyle, Prisma } from '../../../prisma/generated/prisma'

async function upsertTags(userId: string, tagsRaw: string | null) {
  if (!tagsRaw) return []

  const tagNames = Array.from(
    new Set(
      (JSON.parse(tagsRaw) as string[])
        .map((tagName) => tagName.trim())
        .filter(Boolean)
    )
  )

  if (tagNames.length === 0) return []

  const tags = await Promise.all(
    tagNames.map((tagName) =>
      prisma.tag.upsert({
        where: { userId_name: { userId, name: tagName } },
        update: {},
        create: { userId, name: tagName },
      })
    )
  )

  return tags.map((tag) => tag.id)
}

export async function createSession(formData: FormData) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const topic = formData.get('topic') as string
  const duration = parseInt(formData.get('duration') as string)
  const notes = formData.get('notes') as string
  const dateStr = formData.get('date') as string
  const date = new Date(dateStr)
  const bpm = formData.get('bpm') ? parseInt(formData.get('bpm') as string) : null
  const songTitle = formData.get('songTitle') as string
  const songTuning = formData.get('songTuning') as string || 'STANDARD'
  const songKey = (formData.get('songKey') as string) || null
  const songThumbStyle = (formData.get('songThumbStyle') as string) || null
  const intention = formData.get('intention') as string
  const tagsRaw = formData.get('tags') as string
  const pickup = formData.get('pickup') as string
  const goalId = formData.get('goalId') as string
  const templateId = (formData.get('templateId') as string) || null
  const checklistAnswersRaw = formData.get('checklistAnswers') as string | null
  const checklistAnswers = checklistAnswersRaw ? JSON.parse(checklistAnswersRaw) : undefined
  const tagIds = await upsertTags(userId, tagsRaw)

  let songId = null

  if (songTitle) {
  const song = await prisma.song.upsert({
    where: { userId_title: { userId, title: songTitle } },
    update: {},
    create: {
      userId,
      title: songTitle,
      tuning: songTuning as Tuning,
      key: songKey as Key | null,
      thumbStyle: songThumbStyle as ThumbStyle | null,
    },
  })
  songId = song.id
}

  await prisma.$transaction(async (tx) => {
    await tx.session.create({
      data: {
        userId,
        topic,
        duration,
        notes,
        date,
        bpm: bpm ?? undefined,
        songId,
        intention,
        tags: {
          connect: tagIds.map(id => ({ id }))
        },
        goalId: goalId || undefined,
        pickup,
        templateId: templateId ?? undefined,
        checklistAnswers: checklistAnswers as Prisma.InputJsonValue | undefined,
      },
    })

    if (songId && pickup) {
      await tx.song.update({
        where: { id: songId },
        data: { currentBlocker: pickup },
      })
    }
  })

  redirect('/sessions')
}

export async function updateSession(id: string, formData: FormData) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const topic = formData.get('topic') as string
  const duration = parseInt(formData.get('duration') as string)
  const notes = formData.get('notes') as string
  const date = new Date(formData.get('date') as string)
  const bpm = formData.get('bpm') ? parseInt(formData.get('bpm') as string) : null
  const songTitle = formData.get('songTitle') as string
  const songTuning = formData.get('songTuning') as string || 'STANDARD'
  const intention = formData.get('intention') as string
  const intentionMetRaw = formData.get('intentionMet')
  const intentionMet = intentionMetRaw === 'true' ? true : intentionMetRaw === 'false' ? false : null
  const tagsRaw = formData.get('tags') as string
  const pickup = formData.get('pickup') as string
  const goalId = formData.get('goalId') as string
  const tagIds = await upsertTags(userId, tagsRaw)

  let songId = null
  if (songTitle) {
    const song = await prisma.song.upsert({
      where: { userId_title: { userId, title: songTitle } },
      update: {},
      create: { userId, title: songTitle, tuning: songTuning as Tuning },
    })
    songId = song.id
  }

  await prisma.$transaction(async (tx) => {
    await tx.session.update({
      where: { id, userId },
      data: {
        topic,
        duration,
        notes,
        date,
        bpm: bpm ?? undefined,
        songId,
        intention,
        intentionMet,
        tags: {
          set: tagIds.map(id => ({ id }))
        },
        goalId: goalId || null,
        pickup
      },
    })

    if (songId && pickup) {
      await tx.song.update({
        where: { id: songId },
        data: { currentBlocker: pickup },
      })
    }
  })

  redirect('/sessions')
}

export async function deleteSession(id: string) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  await prisma.session.delete({
    where: { id, userId },
  })

  redirect('/sessions')
}

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

export async function getLastSessionForPickup() {
  const { userId } = await auth()
  if (!userId) return null

  return prisma.session.findFirst({
    where: { userId },
    orderBy: { date: 'desc' },
    include: { song: true, goal: true, template: true },
  })
}
