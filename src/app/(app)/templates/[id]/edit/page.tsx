import { auth } from '@clerk/nextjs/server'
import { getSessionTemplateById } from '@/app/actions/session-templates'
import { TemplateForm } from '@/components/template-form'
import { notFound } from 'next/navigation'
import type { ChecklistItem } from '@/lib/types'

export default async function EditTemplatePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { userId } = await auth()
  if (!userId) return null

  const template = await getSessionTemplateById(id)
  if (!template) notFound()

  return (
    <main className="max-w-xl mx-auto p-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">Edit Template</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Update fields and checklist items for {template.name}.
        </p>
      </div>
      <TemplateForm
        initial={{
          id: template.id,
          name: template.name,
          showMetronome: template.showMetronome,
          showSongPicker: template.showSongPicker,
          showGoalPicker: template.showGoalPicker,
          checklistItems: (template.checklistItems as ChecklistItem[] | null) ?? null,
        }}
      />
    </main>
  )
}
