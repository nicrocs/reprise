'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import { Tuning } from '../../../prisma/generated/prisma'

export async function createSession(formData: FormData) {
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

  let songId = null

  if (songTitle) {
  const song = await prisma.song.upsert({
    where: { userId_title: { userId, title: songTitle } },
    update: {},
    create: { 
      userId, 
      title: songTitle,
      tuning: songTuning as Tuning,
    },
  })
  songId = song.id
}

  await prisma.session.create({
    data: {
      userId,
      topic,
      duration,
      notes,
      date,
      bpm: bpm ?? undefined,
      songId,
      intention
    },
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

  let songId = null
  if (songTitle) {
    const song = await prisma.song.upsert({
      where: { userId_title: { userId, title: songTitle } },
      update: {},
      create: { userId, title: songTitle, tuning: songTuning as Tuning },
    })
    songId = song.id
  }

  await prisma.session.update({
    where: { id, userId },
    data: {
      topic,
      duration,
      notes,
      date,
      bpm: bpm ?? undefined,
      songId,
      intention,
      intentionMet
    },
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