import { createSession } from '@/app/actions/sessions'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

export default function NewSessionPage() {
  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Log a Practice Session</h1>
      <form action={createSession} className="flex flex-col gap-4">
        <div>
          <Label htmlFor="date">
            Date
          </Label>
          <Input
            type="date"
            id="date"
            name="date"
            required
          />
        </div>
        <div>
          <Label htmlFor="duration">
            Duration (minutes)
          </Label>
          <Input
            type="number"
            id="duration"
            name="duration"
            required
            min="1"
          />
        </div>
        <div>
          <Label htmlFor="topic">
            What did you practice?
          </Label>
          <Input
            type="text"
            id="topic"
            name="topic"
            required
          />
        </div>
        <div>
          <Label htmlFor="notes">
            Notes
          </Label>
          <Textarea
            id="notes"
            name="notes"
            rows={4}
          />
        </div>
        <Button
          type="submit"
        >
          Save Session
        </Button>
      </form>
    </main>
  )
}