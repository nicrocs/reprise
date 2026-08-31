'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { Tuning, Key, ThumbStyle, SongStatus } from '../../../prisma/generated/prisma'

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

export async function getNeglectedRepertoire() {
  const { userId } = await auth()
  if (!userId) return []

  const songs = await prisma.song.findMany({
    where: { userId, status: 'MAINTENANCE' },
    include: { sessions: { orderBy: { date: 'desc' }, take: 1 } },
  })

  return songs.sort((a, b) => {
    const aDate = a.sessions[0]?.date ?? new Date(0)
    const bDate = b.sessions[0]?.date ?? new Date(0)
    return aDate.getTime() - bDate.getTime() // oldest first
  })
}

export async function getSongById(id: string) {
  'use server'
  const { userId } = await auth()
  if (!userId) return null
  return prisma.song.findUnique({
    where: { id, userId },
    select: { tuning: true, key: true, thumbStyle: true }
  })
}

export async function updateSong(
  id: string,
  {
    tuning,
    key,
    thumbStyle,
  }: {
    tuning: Tuning | null
    key: Key | null
    thumbStyle: ThumbStyle | null
  }
) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  await prisma.song.update({
    where: { id, userId },
    data: {
      tuning: tuning as Tuning,
      key: key as Key,
      thumbStyle: thumbStyle as ThumbStyle,
    },
  })
}

export async function updateSongStatus(id: string, status: SongStatus) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  await prisma.song.update({
    where: { id, userId },
    data: { status },
  })
}

function validateVideo(label: string, url: string) {
  if (!label.trim()) throw new Error('A video label is required')

  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') throw new Error()
  } catch {
    throw new Error('Enter a valid http or https URL')
  }
}

export async function createSongVideo(songId: string, label: string, url: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  validateVideo(label, url)

  const song = await prisma.song.findFirst({ where: { id: songId, userId }, select: { id: true } })
  if (!song) throw new Error('Song not found')

  const video = await prisma.songVideo.create({
    data: { songId, label: label.trim(), url: url.trim() },
  })
  revalidatePath(`/songs/${songId}`)
  return video
}

export async function updateSongVideo(id: string, label: string, url: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  validateVideo(label, url)

  const video = await prisma.songVideo.findFirst({
    where: { id, song: { userId } },
    select: { songId: true },
  })
  if (!video) throw new Error('Video not found')

  const updated = await prisma.songVideo.update({
    where: { id },
    data: { label: label.trim(), url: url.trim() },
  })
  revalidatePath(`/songs/${video.songId}`)
  return updated
}

export async function deleteSongVideo(id: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const video = await prisma.songVideo.findFirst({
    where: { id, song: { userId } },
    select: { songId: true },
  })
  if (!video) throw new Error('Video not found')

  await prisma.songVideo.delete({ where: { id } })
  revalidatePath(`/songs/${video.songId}`)
}
