import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DeleteTemplateButton } from '@/components/delete-template-button'

export default async function TemplatesPage() {
  const { userId } = await auth()
  if (!userId) return null

  const templates = await prisma.sessionTemplate.findMany({
    where: { userId },
    orderBy: { name: 'asc' },
    include: { _count: { select: { sessions: true } } },
  })

  return (
    <main className="p-2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Templates</h1>
        <Button asChild>
          <Link href="/templates/new">Add template</Link>
        </Button>
      </div>

      {templates.length === 0 ? (
        <div className="space-y-3">
          <p className="text-muted-foreground text-sm">
            No templates yet. Create one to define your own practice mode and pre-session checklist.
          </p>
          <Button asChild>
            <Link href="/templates/new">Add template</Link>
          </Button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 divide-y divide-zinc-200 divide-solid">
          {templates.map((template, index) => (
            <li key={template.id}>
              <div className="flex items-start justify-between py-4 gap-4">
                <div className="flex items-stretch gap-3 min-w-0">
                  <div
                    className={`w-0.75 rounded-full place-self-stretch shrink-0 ${
                      index === 0 ? 'bg-warm' : 'bg-border'
                    }`}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{template.name}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {template.showSongPicker && (
                        <span className="text-xs border border-border rounded px-1.5 py-0.5 text-muted-foreground">
                          Song
                        </span>
                      )}
                      {template.showGoalPicker && (
                        <span className="text-xs border border-border rounded px-1.5 py-0.5 text-muted-foreground">
                          Goal
                        </span>
                      )}
                      {template.showMetronome && (
                        <span className="text-xs border border-border rounded px-1.5 py-0.5 text-muted-foreground">
                          Metronome
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {template.checklistItems && Array.isArray(template.checklistItems)
                        ? `${template.checklistItems.length} checklist item${
                            template.checklistItems.length === 1 ? '' : 's'
                          }`
                        : 'No checklist items'}
                      {' · '}
                      {template._count.sessions} session{template._count.sessions === 1 ? '' : 's'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/templates/${template.id}/edit`}>Edit</Link>
                  </Button>
                  <DeleteTemplateButton id={template.id} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
