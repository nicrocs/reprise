import { TemplateForm } from '@/components/template-form'

export default function NewTemplatePage() {
  return (
    <main className="max-w-xl mx-auto p-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">New Template</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Define a practice mode: which fields to show and what to ask before starting.
        </p>
      </div>
      <TemplateForm />
    </main>
  )
}
