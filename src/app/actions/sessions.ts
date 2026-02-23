'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function createSession(formData: FormData) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const topic = formData.get('topic') as string
  const duration = parseInt(formData.get('duration') as string)
  const notes = formData.get('notes') as string
  const date = new Date(formData.get('date') as string)
  const bpm = formData.get('bpm') ? parseInt(formData.get('bpm') as string) : null
  const tuning = formData.get('tuning') as string || null
  const songTitle = formData.get('songTitle') as string

  let songId = null

  if (songTitle) {
    const song = await prisma.song.upsert({
      where: { userId_title: { userId, title: songTitle } },
      update: {},
      create: { userId, title: songTitle },
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
      tuning: tuning as Tuning ?? undefined,
      songId,
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