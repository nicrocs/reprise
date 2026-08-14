import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { updateSession } from '@/app/actions/sessions'
import { SessionForm } from '@/components/session-form'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import type { ChecklistItem, ChecklistAnswers } from '@/lib/types'

export default async function EditSessionPage({ params } : { params: Promise<{ id: string }> 
}) {
  const { id } = await params
  const { userId } = await auth()
  if (!userId) return null

  const session = await prisma.session.findUnique({
    where: { id, userId },
    include: { song: true, tags: true, template: true },
  })

  if (!session) notFound()

  const updateWithId = updateSession.bind(null, session.id)

  return (
    <main className="max-w-xl mx-auto p-8">
      <div className="mb-6">
        <Link href="/sessions" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Sessions
        </Link>
        <h1 className="text-xl font-semibold mt-1">{session.song?.title ?? 'Session'}</h1>
        <p className="text-sm text-muted-foreground">{formatDate(session.date)}</p>
      </div>
      <SessionForm
        action={updateWithId}
        submitLabel="Update Session"
        defaultValues={{
          id: session.id,
          date: session.date.toISOString(),
          duration: session.duration,
          topic: session.topic ?? undefined,
          songTitle: session.song?.title,
          bpm: session.bpm,
          notes: session.notes,
          intention: session.intention,
          intentionMet: session.intentionMet,
          tags: session.tags,
          templateName: session.template?.name,
          checklistItems: (session.template?.checklistItems as ChecklistItem[] | undefined) ?? undefined,
          checklistAnswers: (session.checklistAnswers as ChecklistAnswers | undefined) ?? undefined,
        }}
      />
    </main>
  )
}
