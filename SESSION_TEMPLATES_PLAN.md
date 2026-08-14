# Session Templates + Song Status — Implementation Plan

## Overview
Add a user-owned `SessionTemplate` model so different practice modes (fingerstyle practice, song mixing review, songwriting, etc.) can each show a different session UI and a different pre-session checklist, without hardcoding those modes into the schema. Also add a `SongStatus` enum to `Song` for repertoire tracking, and sync `Session.pickup` forward onto a new `Song.currentBlocker` field so "where I left off on this song" is visible on the song itself, not buried in session history.

This is a planning doc — not a log of work done. The original handoff is reproduced in this repo for traceability, and the plan below records the specific decisions and divergences that came out of mapping the handoff onto the existing codebase.

---

## Original handoff (reproduced)

The full handoff document was provided in chat. The pitch: **user-defined structured practice templates with custom pre-session checklists and post-session reflection.** A drummer, vocalist, or piano student could create entirely different templates — the feature is the configurability itself, not any specific set of categories.

The handoff specified:
1. Schema additions (`SessionTemplate`, `SongStatus`, edits to `Song` and `Session`)
2. Shared types (`ChecklistItem` and `ChecklistAnswers`)
3. A seed script with five personal templates
4. A `closeSession` server action that syncs `pickup` to `Song.currentBlocker`
5. A `getNeglectedRepertoire` query for resurfacing
6. UI notes for the prep/session-start screen
7. Product framing for portfolio/demo

The implementation plan below adopts the schema, types, seed, resurfacing query, and UI approach from the handoff, with the divergences called out explicitly in the "Divergences from the handoff" section.

---

## Divergences from the handoff

These are the places where mapping the handoff onto the actual codebase forced a change. Each is reasoned, not accidental.

### 1. No separate `closeSession` step in this app
The handoff describes a `closeSession(sessionId, data)` server action that takes typed args including `pickup`, `intentionMet`, and `checklistAnswers`. In this app, sessions are **created at finish time**, not pre-created and then closed — see `src/app/(app)/sessions/finish/page.tsx:43-69` building a `FormData` and calling `createSession` (which creates the row). So the `pickup → currentBlocker` sync lives **inside the existing `createSession` in `src/app/actions/sessions.ts`**, not as a new action. The spec's typed-args helper is unnecessary because the existing `FormData` parse already reads `pickup`.

### 2. `Session.pickup` already exists
`prisma/schema.prisma:118` already has `pickup String?`. The handoff's implied "add `pickup` to Session" change is already done. Only `templateId`, `template` relation, and `checklistAnswers` are new on `Session`.

### 3. `getNeglectedRepertoire` takes no `userId` argument
The handoff's signature was `getNeglectedRepertoire(userId)`. Every other action in `src/app/actions/songs.ts` calls `auth()` directly inside the function (see `getSongsWithRecentSession` on line 25), so the parameter would be inconsistent. Resolved to no-arg form.

### 4. No auto-bootstrap on first login
The handoff says "call `seedTemplatesForUser(userId)` once, e.g. ... on first login — whichever matches how you currently bootstrap default Goal/Tag rows for new users." This codebase does not bootstrap `Goal` or `Tag` rows on first login — users create them via the UI (see `createGoal` in `src/app/actions/goals.ts:67-78`). Resolved to: seed script is run once manually with a real `clerkUserId` argument, not on login. Matches existing convention. (Caveat: long-term, the in-app template creation UI from the follow-up section supersedes the seed for any non-Nic user.)

### 5. New `src/lib/types.ts` file
The handoff said "put in `lib/types.ts` or similar." No `lib/types.ts` exists yet (`src/lib/` currently holds `active-session.ts`, `constants.ts`, `guitar-badges.ts`, `practice-streak.ts`, `prep-steps.ts`, `prisma.ts`, `utils.ts`). Resolved to: create `src/lib/types.ts` as a new file.

---

## Phase 0 — Verify current state
- `npx prisma migrate dev --create-only --name add_session_templates_and_song_status` to inspect the generated SQL before applying.
- `npx prisma generate` after schema is finalized (auto-wired as `postinstall`).

## Phase 1 — Schema (`prisma/schema.prisma`)

Add after the existing enums, before `model Song`:

```prisma
enum SongStatus {
  LEARNING
  MAINTENANCE
  WRITING
  RECORDING
  MIXING
  STALLED
  RELEASED
}
```

Edit `model Song` to add `status` and `currentBlocker`:

```prisma
model Song {
  id             String     @id @default(cuid())
  userId         String
  title          String
  key            Key?
  capo           Int?
  tuning         Tuning     @default(STANDARD)
  status         SongStatus @default(LEARNING)
  currentBlocker String?
  createdAt      DateTime   @default(now())
  sessions       Session[]

  @@unique([userId, title])
}
```

Add new model after `model Goal`:

```prisma
model SessionTemplate {
  id             String    @id @default(cuid())
  userId         String
  name           String
  showMetronome  Boolean   @default(false)
  showSongPicker Boolean   @default(true)
  showGoalPicker Boolean   @default(false)
  checklistItems Json?
  createdAt      DateTime  @default(now())
  sessions       Session[]

  @@unique([userId, name])
}
```

Edit `model Session` to add template relation + checklist answers:

```prisma
model Session {
  // ...existing fields unchanged through goalId/goal
  pickup            String?
  templateId        String?
  template          SessionTemplate? @relation(fields: [templateId], references: [id], onDelete: SetNull)
  checklistAnswers  Json?
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}
```

`status @default(LEARNING)` means the migration needs no backfill — existing rows land in LEARNING.

## Phase 2 — Shared types (new file: `src/lib/types.ts`)

```typescript
export type ChecklistItem =
  | { type: 'select'; question: string; options: string[] }
  | { type: 'text'; question: string }

// checklistAnswers is keyed by question text — same key the user saw on the form
export type ChecklistAnswers = Record<string, string>
```

`SongStatus` and `SessionTemplate` are imported from the generated prisma client where used, matching how the existing code already does `import { Tuning, Key } from '../../../prisma/generated/prisma'` (see `src/app/actions/sessions.ts:6`).

## Phase 3 — Sync `pickup → currentBlocker` inside `createSession`

**File:** `src/app/actions/sessions.ts`

Currently `createSession` (lines 34-86) creates a `Session` and, when `songTitle` is set, upserts a `Song` and captures its id, but does not update that song again afterward. The pickup sync and the session create are coupled (the mirror only makes sense if the session landed), so wrap both writes in `prisma.$transaction` to avoid silent desync:

```typescript
await prisma.$transaction(async (tx) => {
  await tx.session.create({ data: { ... } })

  if (songId && pickup) {
    await tx.song.update({
      where: { id: songId },
      data: { currentBlocker: pickup },
    })
  }
})
```

The song upsert stays outside the transaction (it happens before the session create to resolve `songId`). The transaction is just the two coupled writes: session create + song mirror update.

Place the transaction before `redirect('/sessions')`. Keeps the existing `FormData` contract intact — no call-site changes required in `finish/page.tsx`.

**Do the same in `updateSession`** (lines 88-137) so editing a session's `pickup` keeps the song-side mirror in sync. Same transaction wrapping: session update + song mirror update atomically.

Behavior on clear: per the resolved questions, empty `pickup` overwrites `currentBlocker` with empty string. Same sync path, no special case.

## Phase 4 — New server action file: `src/app/actions/session-templates.ts`

Follows the shape of `src/app/actions/goals.ts`:

```typescript
'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export async function getSessionTemplates() {
  const { userId } = await auth()
  if (!userId) return []
  return prisma.sessionTemplate.findMany({
    where: { userId },
    orderBy: { name: 'asc' },
  })
}

export async function getSessionTemplateById(id: string) {
  const { userId } = await auth()
  if (!userId) return null
  return prisma.sessionTemplate.findUnique({ where: { id, userId } })
}

export async function createSessionTemplate(input: {
  name: string
  showMetronome?: boolean
  showSongPicker?: boolean
  showGoalPicker?: boolean
  checklistItems?: unknown
}) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  const name = input.name.trim()
  if (!name) throw new Error('Template name is required')
  return prisma.sessionTemplate.upsert({
    where: { userId_name: { userId, name } },
    update: {
      showMetronome: input.showMetronome ?? false,
      showSongPicker: input.showSongPicker ?? true,
      showGoalPicker: input.showGoalPicker ?? false,
      checklistItems: input.checklistItems ?? null,
    },
    create: {
      userId,
      name,
      showMetronome: input.showMetronome ?? false,
      showSongPicker: input.showSongPicker ?? true,
      showGoalPicker: input.showGoalPicker ?? false,
      checklistItems: input.checklistItems ?? null,
    },
  })
}

export async function deleteSessionTemplate(id: string) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')
  await prisma.sessionTemplate.delete({ where: { id, userId } })
}
```

Conventions: file name plural, named export per verb, `userId` in the `where` for safety (like `updateGoal` in `src/app/actions/goals.ts:55-65`), `'use server'` at top, `auth()` first, `upsert` for user-owned named entities.

## Phase 5 — Resurfacing query

Add to `src/app/actions/songs.ts` (next to `getSongsWithRecentSession`, lines 24-44). Different name, different filter, different sort — kept distinct on purpose:

```typescript
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
```

## Phase 6 — Seed script (one-off, run manually)

**File:** `scripts/seed-templates.ts`

Pattern after the existing `scripts/convert-topics-to-goals.ts:1-13` (PrismaClient + adapter + dotenv setup).

```typescript
import { PrismaClient } from '../prisma/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import * as dotenv from 'dotenv'
import { ChecklistItem } from '../src/lib/types'

dotenv.config({ path: '.env' })

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
})

// Nic's five templates — user data, not fixtures
const TEMPLATES: Array<{
  name: string
  showMetronome: boolean
  showSongPicker: boolean
  showGoalPicker: boolean
  checklistItems: ChecklistItem[]
}> = [
  {
    name: 'Fingerstyle Blues',
    showMetronome: true,
    showSongPicker: true, // can be working on a specific arrangement
    showGoalPicker: true,
    checklistItems: [],
  },
  {
    name: 'Old Song Rescue',
    showMetronome: false,
    showSongPicker: true,
    showGoalPicker: false,
    checklistItems: [
      {
        type: 'select',
        question: "What's actually wrong at that moment?",
        options: [
          'Vocals buried under reverb/effects, or too thin/tentative',
          'Energy is flat — no dynamic lift at the chorus',
          'A specific frequency clash (guitar and vocal fighting for space)',
          'Something else',
        ],
      },
      { type: 'text', question: "Today's fix (one specific thing, not a full remix)" },
    ],
  },
  {
    name: 'New Song Direction',
    showMetronome: false,
    showSongPicker: true,
    showGoalPicker: false,
    checklistItems: [
      { type: 'text', question: 'Mood of the lyric, honestly' },
      { type: 'text', question: 'What did you unconsciously model it after?' },
      { type: 'text', question: 'Does that reference match the mood? If not, what does?' },
      { type: 'text', question: 'Rhythm/groove to borrow' },
      { type: 'text', question: 'Instrumentation/texture to borrow' },
      { type: 'text', question: 'Vocal approach to borrow' },
    ],
  },
  {
    name: 'Song in Progress',
    showMetronome: false,
    showSongPicker: true,
    showGoalPicker: false,
    checklistItems: [
      { type: 'text', question: 'The one line/moment where you started forcing it' },
      {
        type: 'select',
        question: 'What kind of stuck is it?',
        options: [
          'First-draft cliché — push to 2nd/3rd association',
          'Forced rhyme — word serves rhyme, not meaning',
          'Mismatch — music mood vs lyric mood pulling apart',
          "Not sure what the song is about yet",
          'Something else',
        ],
      },
    ],
  },
  {
    name: 'Free Play',
    showMetronome: true,
    showSongPicker: true, // backwards-compatible: don't hide the song picker unless user opts in
    showGoalPicker: false,
    checklistItems: [],
  },
]

async function main() {
  const userId = process.argv[2]
  if (!userId) {
    console.error('Usage: tsx scripts/seed-templates.ts <clerkUserId>')
    process.exit(1)
  }

  for (const t of TEMPLATES) {
    await prisma.sessionTemplate.upsert({
      where: { userId_name: { userId, name: t.name } },
      update: {
        showMetronome: t.showMetronome,
        showSongPicker: t.showSongPicker,
        showGoalPicker: t.showGoalPicker,
        checklistItems: t.checklistItems,
      },
      create: { userId, ...t },
    })
    console.log(`Seeded: ${t.name}`)
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Run: `npx tsx scripts/seed-templates.ts <your-clerk-user-id>`.

## Phase 7 — UI work

None of these are blockers for the schema migration landing. They're sequenced to keep the data layer usable first, UI second.

### 7a. Prep screen (`src/app/(app)/prepare/PrepareClient.tsx`)
- Add a `template` field to `ActiveSession` in `src/lib/active-session.ts:6-15` (`templateId`, `templateName` — same shape as `goalId`/`goalName`).
- In `src/app/(app)/sessions/new/page.tsx`, add a template typeahead above the Song block, calling `getSessionTemplates` and letting the user pick one.
- The selected template's `showMetronome` / `showSongPicker` / `showGoalPicker` drive conditional rendering of those sections on the new-session page.
- `checklistItems` renders inline as a small form (`RadioGroup` from `src/components/ui/radio-group.tsx` is already there; `Textarea` from `src/components/ui/textarea.tsx` is there too), answers collected into `ChecklistAnswers`, then stashed on the active session and forwarded to `createSession` in a new `checklistAnswers` form field.

### 7b. Finish page (`src/app/(app)/sessions/finish/page.tsx`)
- Add a `checklistAnswers` state, render the template's `checklistItems` (read from active session), serialize to JSON, append to the `FormData` already being built.
- `createSession` reads it from the form and persists to `Session.checklistAnswers`. No changes needed to `createSession`'s call signature.

### 7c. `createSession` FormData additions
Add these reads inside `createSession` in `src/app/actions/sessions.ts:34-86`:

```typescript
const templateId = (formData.get('templateId') as string) || null
const checklistAnswersRaw = formData.get('checklistAnswers') as string | null
const checklistAnswers = checklistAnswersRaw ? JSON.parse(checklistAnswersRaw) : undefined
```

Include them in the `prisma.session.create({ data: { ... } })` call as `templateId ?? undefined` and `checklistAnswers`. The `pickup → currentBlocker` sync is the third change from Phase 3.

### 7d. Songs list (`src/app/(app)/songs/page.tsx`)
- Add a small status badge per row (read `song.status`).
- Show `song.currentBlocker` (truncated) on each row and in full on the song detail page.
- Optionally a "neglected" section at the top sourced from `getNeglectedRepertoire()`.

### 7e. Song detail (`src/app/(app)/songs/[id]/page.tsx`)
- Show `currentBlocker` as a "where I left off" callout near the top (line 70-75 area, next to "Last practiced").
- A `status` editor (small `<select>` or button group) that calls a new `updateSongStatus(id, status)` action — single-field update, follows the pattern of `updateGoal` in `src/app/actions/goals.ts:55-65`.

## Phase 8 — Verification

1. `npx prisma migrate dev --name add_session_templates_and_song_status` — confirm clean apply.
2. `npx prisma generate` — confirm types regenerate (auto via `postinstall`).
3. `npm run lint` — confirms new server actions pass eslint.
4. `npm run build` — confirms the new prisma model is reachable from the generated client.
5. Smoke test manually:
   - Visit `/sessions/new`, pick a template, start a session, finish it, confirm `Session.pickup` and `Song.currentBlocker` are both set.
   - Visit `/songs`, confirm `currentBlocker` text shows on the song row.
   - Run the seed script with a real `clerkUserId`, then visit the new-session page and confirm the five templates appear in the picker.

## Out of scope for this plan
- Checklist answer analytics / history view per template.
- A "templates" admin/settings page (templates get created via the seed script for now and via a future UI when needed).
- Auto-classifying songs into `MAINTENANCE` based on inactivity (the songs list already shows stale dates; promoting that to a status change is a separate decision).
- **Adding a `pickup` field to the session edit form.** `src/components/session-form.tsx` (used by `src/app/(app)/sessions/[id]/edit/page.tsx`) doesn't surface `pickup`, so the `updateSession` action has no UI path to receive a new value. The transactional sync in Phase 3 is correct on the action side, but the edit-side flow is untestable until the form has a pickup input. Tracked as a follow-up so it's not lost.

## Resolved questions
1. **Should `pickup` clear `currentBlocker` when emptied on edit?** → **Yes, keep them in sync.** Empty `pickup` overwrites `currentBlocker` with empty string. Same as the default-sync behavior; no special case.
2. **Where does the template picker live?** → **Top of `/sessions/new`.** Above the Song block, before the Goal block.
3. **Default behavior when no template is chosen?** → **Feature is opt-in and backwards-compatible.** No template = current behavior (everything visible).
4. **Override to "Fingerstyle Blues" defaults:** the seed sets `showSongPicker: true` (not `false` as the handoff had it). Fingerstyle practice can be on a specific song arrangement, so the song picker should stay visible. `showMetronome: true` and `showGoalPicker: true` unchanged.
5. **Pre-flight checks (verified before implementation):**
   - **Prisma `Json` type works on Postgres with this client.** Confirmed in `prisma/generated/prisma/index.d.ts:344-347` and `prisma/generated/prisma/runtime/client.d.ts:1419-1642`. Maps to `JSONB`. First use in this schema.
   - **`tsx` was not installed.** Added `tsx ^4.19.0` to `devDependencies` and ran `npm install`. The seed script (and the existing `scripts/convert-topics-to-goals.ts`) now run via `npx tsx <path> <args>` without needing an ad-hoc npx download.
   - **Pickup → currentBlocker sync is now wrapped in `prisma.$transaction`** (see Phase 3) so the session and its song-side mirror land atomically. No silent desync on partial failure.
   - **Historical `templateId` is `null`.** No backfill of past sessions — templates didn't exist when they happened, so leaving them template-less is the correct historical state.
   - **`status` defaults to `LEARNING`.** Existing songs land in LEARNING post-migration and stay there until manually reclassified from the UI. Acceptable for a portfolio demo; the songs list will surface a reclassify control in Phase 7d.

## Follow-up: template creation UI (not in this plan yet)

The schema and the `createSessionTemplate` action in Phase 4 already support per-template booleans (`showMetronome`, `showSongPicker`, `showGoalPicker`) and the user controls them — they're fields on the model. But Phase 6 is a one-off seed script, and **there is no in-app "create template" form** in the current plan. So:

- **Today (after this plan):** templates are created by editing the seed file or running a one-off script with explicit values. Editable in the sense that re-running the seed updates them, but no UI.
- **Needed for "user-defined structured practice templates" to actually be user-defined:** an in-app form to create and edit templates. This is the difference between "Nic's five personal templates" (current plan) and the portfolio pitch from the handoff ("a drummer, vocalist, or piano student could create entirely different templates").

Suggested scope for the follow-up:
- New page at `/templates` (list, create, edit, delete) — mirrors the goals CRUD pattern from `src/app/(app)/goals/page.tsx` and `src/app/actions/goals.ts`.
- Form fields: name, three show-* checkboxes, checklist items (add/remove, each a question + type-specific sub-form — select needs options list, text needs no extras).
- An "edit existing template" flow that reuses the create form in edit mode — `createSessionTemplate` is already an `upsert`, so the action doesn't need a separate `updateSessionTemplate`.
- Where this fits in MVP sequencing: after Phase 7 lands, so the data model is exercised end-to-end before building the authoring UI.

---

## Notes

### Conventions confirmed from the codebase
- Prisma v7 with generated client at `prisma/generated/prisma`. Always import enums and models from there in server actions, not from `@prisma/client`.
- Server actions: `'use server'` at top of file, `auth()` first thing in each function, `if (!userId) throw new Error('Unauthorized')` for mutators, `if (!userId) return null` (or `[]`) for readers.
- User-owned named entities: `upsert` with `where: { userId_name: { userId, name } }` — see `createGoal` in `src/app/actions/sessions.ts:73-77`.
- Migrations live in `prisma/migrations/` with timestamp prefixes. Most recent: `20260413225800_add_session_pickup`.
- One-off scripts live in `scripts/` and use the same PrismaClient + PrismaPg adapter + `dotenv` pattern as the existing `scripts/convert-topics-to-goals.ts`.

### Files this plan will create
- `prisma/migrations/<timestamp>_add_session_templates_and_song_status/` (auto-generated)
- `src/lib/types.ts`
- `src/app/actions/session-templates.ts`
- `scripts/seed-templates.ts`

### Files this plan will edit
- `prisma/schema.prisma`
- `src/app/actions/sessions.ts` (pickup sync + templateId/checklistAnswers reads)
- `src/app/actions/songs.ts` (add `getNeglectedRepertoire`)
- `src/app/(app)/sessions/finish/page.tsx` (checklist form)
- `src/app/(app)/sessions/new/page.tsx` (template picker + conditional fields)
- `src/app/(app)/prepare/PrepareClient.tsx` (template-aware prep)
- `src/app/(app)/songs/page.tsx` (status badge + currentBlocker)
- `src/app/(app)/songs/[id]/page.tsx` (currentBlocker callout + status editor)
- `src/lib/active-session.ts` (add template fields to `ActiveSession`)

---

## Next actions

1. Review this plan, resolve the three open questions.
2. Apply the schema migration (Phase 1) and verify `npx prisma generate` produces the new model.
3. Land Phases 2-6 (data layer + seed) before any UI work, so the migration is reviewable on its own.
4. UI work (Phase 7) sequenced as: 7a + 7c together (template picker on new-session page wired through to `createSession`), then 7b (finish-page checklist form), then 7d + 7e (songs list and detail).
