'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function createSession(formData: FormData) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  const topic = formData.get('topic') as string
  const duration = parseInt(formData.get('duration') as string)
  const notes = formData.get('notes') as string
  const date = new Date(formData.get('date') as string)

  await prisma.session.create({
    data: {
      userId,
      topic,
      duration,
      notes,
      date,
    },
  })

  redirect('/sessions')
}