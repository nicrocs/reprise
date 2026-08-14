# Session Templates CRUD — Implementation Plan

## Goal
Add a full in-app create / read / update / delete UI for session templates, so users can define their own practice modes (name, visible fields, and pre-session checklist) without editing the seed script.

The data model (`SessionTemplate`) and the picker used on `/sessions/new` are already in place. This plan covers the authoring UI and the small server-action changes needed to support safe create/update.

---

## Current state

- `prisma/schema.prisma` already has `SessionTemplate` with:
  - `name`, `showMetronome`, `showSongPicker`, `showGoalPicker`, `checklistItems` (JSON)
  - `@@unique([userId, name])`
- `src/app/actions/session-templates.ts` exists with `getSessionTemplates`, `getSessionTemplateById`, `createSessionTemplate`, `deleteSessionTemplate`.
- `src/components/template-picker.tsx` lets users pick a template on the new-session page, but there is no create/edit UI.
- `src/lib/types.ts` already exports `ChecklistItem` and `ChecklistAnswers`.

---

## Divergences from the existing `createSessionTemplate`

The current `createSessionTemplate` does an `upsert` keyed by `userId + name`. That is convenient for the seed script but wrong for a user-facing create form — submitting a duplicate name would silently overwrite an existing template.

**Resolution in this plan:**
- Change `createSessionTemplate` to an explicit create with a duplicate-name guard.
- Add `updateSessionTemplate(id, input)` for edits. It updates by `id` and validates that the new name does not collide with a different template.
- Update `scripts/seed-templates.ts` to call `prisma.sessionTemplate.upsert` directly instead of reusing the UI create action.

---

## Server actions (`src/app/actions/session-templates.ts`)

### 1. `createSessionTemplate(input)`

```ts
export async function createSessionTemplate(input: {
  name: string
  showMetronome?: boolean
  showSongPicker?: boolean
  showGoalPicker?: boolean
  checklistItems?: ChecklistItem[]
})
```

- Auth guard.
- Trim `name`; throw if empty.
- Case-insensitive duplicate-name check for the current user. Throw if taken.
- Create the row; cast `checklistItems` to `Prisma.InputJsonValue` (or `Prisma.JsonNull` when empty).
- Return the created template.

### 2. `updateSessionTemplate(id, input)`

```ts
export async function updateSessionTemplate(
  id: string,
  input: {
    name: string
    showMetronome?: boolean
    showSongPicker?: boolean
    showGoalPicker?: boolean
    checklistItems?: ChecklistItem[]
  }
)
```

- Auth guard.
- Fetch existing template by `{ id, userId }`; throw / return `null` if not found.
- If the trimmed name differs from the current name, check case-insensitively that no *other* template with that name exists.
- Update all fields.
- Return the updated template.

### 3. `deleteSessionTemplate(id)`

- Keep existing auth + `where: { id, userId }` delete.
- Add `redirect('/templates')` after delete so it matches `deleteGoal`.
- Past sessions that referenced the template stay in place; their `templateId` becomes `null` because the relation uses `onDelete: SetNull`.

### 4. Shared type helper

Add a serializable form type to `src/lib/types.ts`:

```ts
export type TemplateFormData = {
  name: string
  showMetronome: boolean
  showSongPicker: boolean
  showGoalPicker: boolean
  checklistItems: ChecklistItem[]
}
```

---

## UI components

### `src/components/template-form.tsx`

A client-side reusable form used by both `/templates/new` and `/templates/[id]/edit`.

**Props**

```ts
type Props = {
  initial?: {
    id: string
    name: string
    showMetronome: boolean
    showSongPicker: boolean
    showGoalPicker: boolean
    checklistItems: ChecklistItem[] | null
  } | null
}
```

**Fields**

1. **Name** — text input, required.
2. **Show sections** — three checkboxes:
   - Metronome
   - Song picker
   - Goal picker
3. **Checklist items** — dynamic list:
   - Each item is a card with a question input, a type badge (`text` / `select`), and move up / move down / delete controls.
   - For `select` items, render an editable list of options with add/remove per option.
   - Buttons to add a text item or a select item.

**Defaults for a new template**

- `name = ''`
- `showMetronome = false`
- `showSongPicker = true` (matches the schema default)
- `showGoalPicker = false`
- `checklistItems = []`

**Validation (client-side, before submit)**

- Name is non-empty after trimming.
- No two checklist items share the same question text.
- Every select item has at least one non-empty option.
- Every option string is non-empty after trimming.

**Submission**

- If `initial?.id` exists → call `updateSessionTemplate`.
- Otherwise → call `createSessionTemplate`.
- On success, `router.push('/templates')`.
- On error, surface the message (toast or inline banner; keep it simple).

### `src/components/delete-template-button.tsx`

Reuses `ConfirmDeleteDialog` and calls `deleteSessionTemplate(id)`. Same pattern as `DeleteGoalButton`.

---

## Session edit page — surface template + checklist answers

Since there is no separate session detail page, the edit page is the right place to show the saved checklist answers.

### `src/app/(app)/sessions/[id]/edit/page.tsx`

When loading the session, also include the related template:

```ts
include: {
  song: true,
  tags: true,
  template: true,
}
```

Pass these new fields into `SessionForm`:

- `templateName: session.template?.name`
- `checklistAnswers: session.checklistAnswers as ChecklistAnswers | undefined`
- `checklistItems: session.template?.checklistItems as ChecklistItem[] | undefined`

### `src/components/session-form.tsx`

Update the `defaultValues` type and render a read-only checklist summary when both `checklistItems` and `checklistAnswers` are present:

- Show each question from `checklistItems`.
- Display the matching answer from `checklistAnswers` (keyed by question text).
- If a question has no answer, show "—".
- Also render the template name as a small label above the checklist block, e.g.:
  - "Old Song Rescue · 2 answers"

Keep this block read-only on the edit form; the checklist is authored during the session flow, not retroactively edited here. The existing edit fields (intention, notes, tags, etc.) stay editable.

### Why not a separate detail page?

The sessions list already links to edit, and the edit page already surfaces the core session metadata. Adding a read-only checklist block there is the smallest change that makes the saved answers visible, without introducing a new route.

---

## Routes

### `src/app/(app)/templates/page.tsx`

Server component listing all templates for the current user.

- Query:
  ```ts
  prisma.sessionTemplate.findMany({
    where: { userId },
    orderBy: { name: 'asc' },
    include: { _count: { select: { sessions: true } } },
  })
  ```
- Header with `Templates` title and an `Add template` button linking to `/templates/new`.
- Each row/card shows:
  - Template name
  - Visible sections as small labels (e.g., "Song", "Goal", "Metronome")
  - Checklist item count
  - Session count (so users know if deleting will detach sessions)
  - Edit and Delete actions
- Empty state: short message + `Add template` CTA.

### `src/app/(app)/templates/new/page.tsx`

Server component that renders `<TemplateForm />` for creation.

### `src/app/(app)/templates/[id]/edit/page.tsx`

Server component that:

- Awaits `params` (`Promise<{ id: string }>`).
- Loads the template via `getSessionTemplateById(id)`.
- Calls `notFound()` if it does not exist or does not belong to the user.
- Renders `<TemplateForm initial={template} />`.

---

## Navigation

Add a **Templates** link to the Practice section in `src/components/sidebar.tsx`:

```ts
{ href: '/templates', label: 'Templates' }
```

Place it under `Goals` so the order becomes: Dashboard, Goals, Templates, Sessions, Songs.

Optionally update `src/components/template-picker.tsx` empty-state message to include a link to `/templates` so users can create templates from the session picker.

---

## Seed script update

`scripts/seed-templates.ts` currently calls `createSessionTemplate`. After the action is changed to a strict create, the seed script should use Prisma directly:

```ts
await prisma.sessionTemplate.upsert({
  where: { userId_name: { userId, name: t.name } },
  update: { ... },
  create: { userId, ...t },
})
```

This keeps seeding idempotent without affecting the UI create behavior.

---

## Implementation order

1. **Server actions** — refactor `createSessionTemplate`, add `updateSessionTemplate`, add redirect to `deleteSessionTemplate`, add `TemplateFormData` to `src/lib/types.ts`.
2. **Seed script** — switch to direct Prisma upsert.
3. **Form component** — build `TemplateForm`.
4. **Delete button** — build `DeleteTemplateButton`.
5. **Pages** — create list, new, and edit routes.
6. **Session edit page** — pass template + checklist answers into `SessionForm` and render a read-only checklist summary.
7. **Navigation** — add Templates to sidebar and optionally to `TemplatePicker` empty state.
8. **Verify** — lint, build, smoke test.

---

## Verification checklist

- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.
- [ ] Create a new template with a name, toggles, and a mix of text/select checklist items.
- [ ] Edit the template: change name, toggle fields, reorder/delete items, add options.
- [ ] Attempt to create a second template with the same name → error shown.
- [ ] Delete a template and confirm past sessions still exist but no longer show the template badge.
- [ ] Confirm `/sessions/new` still lists all templates and selecting one works.
- [ ] Re-run `npx tsx scripts/seed-templates.ts <userId>` and confirm it remains idempotent.
- [ ] Edit a session that used a template with checklist items and confirm the questions + answers appear read-only on the edit form.
- [ ] Edit a session with no template and confirm the checklist block is hidden.

---

## Out of scope

- Changing how templates are consumed in `/sessions/new`, `/prepare`, or `/sessions/finish` — that flow already works.
- Analytics on checklist answers.
- Auto-bootstraping default templates for new users.
- Bulk import/export of templates.
