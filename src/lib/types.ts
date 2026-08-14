export type ChecklistItem =
  | { type: 'select'; question: string; options: string[] }
  | { type: 'text'; question: string }

// checklistAnswers is keyed by question text — same key the user saw on the form
export type ChecklistAnswers = Record<string, string>

export type TemplateFormData = {
  name: string
  showMetronome: boolean
  showSongPicker: boolean
  showGoalPicker: boolean
  checklistItems: ChecklistItem[]
}
