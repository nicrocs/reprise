# Scheduled Sessions Plan

## Overview

Add the ability to schedule practice sessions in advance so you can sit down and see what you planned to work on instead of deciding in the moment. This replaces the earlier idea of a separate `WeeklyPlan` model by reusing the existing `Session` model with a `status` field.

This plan comes from wanting to use the weekly practice planner PDF (technique, fretboard, repertoire) inside Reprise. Instead of building a separate weekly-plan artifact, we schedule individual sessions. Each scheduled session carries a goal, optional song, intention, and planned date.

---

## Decisions confirmed

- **Date only:** scheduled sessions use a date, not a time.
- **Free-form categories:** the PDF’s three buckets (technique, fretboard, repertoire) are handled by the existing goals. No `category` enum or `PlanCategory` field is added.
- **Dashboard discovery:** scheduled sessions are surfaced on the dashboard only. No new sidebar link or separate schedule page.
- **Prominence:** today’s scheduled sessions are the most prominent thing on the dashboard when they exist.
- **Skipped sessions:** kept in the database with `status = SKIPPED` but hidden from the main sessions list. They are not surfaced as a list; they are retained for future completion-rate analytics if needed.
- **Date behavior:** `Session.date` is the planned date for `SCHEDULED` sessions and becomes the actual completion date when the session is finished. The log always reflects reality.

---

## Schema changes

Add a `SessionStatus` enum and a `status` field to `Session`:

```prisma
enum SessionStatus {
  SCHEDULED
  COMPLETED
  SKIPPED
}

model Session {
  // ... existing fields unchanged
  status SessionStatus @default(COMPLETED)
}
```

Existing sessions are defaulted to `COMPLETED`.

---

## Server actions

### `src/app/actions/sessions.ts`

- **`createScheduledSession(formData)`**
  - Auth guard.
  - Reads `date`, `intention`, `goalId`, `songTitle`, `songTuning`, `templateId`, etc. from `FormData`.
  - Upserts the song if a new title is provided (reuses existing `createSession` song logic).
  - Creates a `Session` with:
    - `status: SCHEDULED`
    - `date: chosenDate` (midnight/UTC-safe date)
    - `duration: 0`
    - `intention`, `goalId`, `songId`, `templateId`
  - Redirects to `/dashboard`.

- **Update existing queries to exclude `SCHEDULED`**
  - `getLastSessionForPickup`
  - `getSongsWithRecentSession` / `getNeglectedRepertoire` (in `src/app/actions/songs.ts`)
  - `getGoalsWithRecentSession` (in `src/app/actions/goals.ts`)
  - Any other `prisma.session.findMany` used for history, stats, or charts.
  - Default filter: `status: { in: ['COMPLETED', 'SKIPPED'] }` or `status: COMPLETED` where skipped is irrelevant.

### `src/app/actions/scheduled-sessions.ts` (new file)

- **`getTodaysScheduledSessions()`**
  - Returns `SCHEDULED` sessions where `date` is today.
  - Includes `goal` and `song`.

- **`getUpcomingScheduledSessions(limit?)`**
  - Returns future `SCHEDULED` sessions.
  - Used as a fallback when today has no scheduled sessions.

- **`startScheduledSession(id)`**
  - Loads the session by `id` and `userId`.
  - Returns the data needed to populate `ActiveSession` (including `sessionId`).
  - Does not change status.

- **`skipScheduledSession(id)`**
  - Sets `status: SKIPPED`.
  - The session stays on the same date.

---

## UI changes

### `src/app/(app)/sessions/new/page.tsx`

Add a **“Schedule for later”** toggle above the action buttons.

- **Off (default):**
  - Buttons read “Prepare then start” and “Skip preparation.”
  - Behavior unchanged.

- **On:**
  - A `<input type="date">` appears, defaulting to tomorrow.
  - Buttons collapse to a single **“Schedule session”** button.
  - On submit, call `createScheduledSession`.
  - Do not save an active session or navigate to `/prepare`.

### `src/app/(app)/dashboard/page.tsx`

Add a **“Today’s plan”** section at the very top of the page.

- Query `getTodaysScheduledSessions()`.
- If sessions exist, render cards:
  - Goal name
  - Song title (if any)
  - Intention
  - Target BPM (if present on the session; optional)
  - **Start** button → loads into active session and navigates to `/sessions/active`
  - **Skip** button → marks skipped
- If today has no scheduled sessions:
  - Show a compact **“Up next”** list with the next 3 future scheduled sessions.
  - Or a **“Schedule a session”** CTA linking to `/sessions/new`.

### `src/lib/active-session.ts`

Add `sessionId?: string` to `ActiveSession` so the finish flow knows it is completing an existing session.

### `src/app/(app)/sessions/finish/page.tsx`

After building the `FormData`, check `session?.sessionId`:

- If `sessionId` exists → call `updateSession(sessionId, formData)` (existing action). The action will update `date` to the actual completion time and set `status: COMPLETED`.
- If no `sessionId` → call `createSession(formData)` (existing behavior).

### `src/app/(app)/sessions/page.tsx`

Filter the sessions list to exclude `SCHEDULED`. Show only `COMPLETED` and `SKIPPED`.

---

## Flows

### Creating a scheduled session

1. User visits `/sessions/new`.
2. Fills goal, song, intention, template as usual.
3. Toggles **“Schedule for later.”**
4. Picks a date.
5. Clicks **“Schedule session.”**
6. Server creates a `Session` with `status: SCHEDULED` and redirects to `/dashboard`.

### Starting a scheduled session

1. User opens dashboard and sees today’s scheduled sessions.
2. Clicks **Start** on a card.
3. Client loads the session data into `ActiveSession`, including `sessionId`.
4. Navigates to `/sessions/active`.
5. Timer and metronome work as usual.
6. User clicks **Finish session**.
7. Finish page calls `updateSession(sessionId, formData)`.
8. Server sets `status: COMPLETED`, updates `date` to the actual completion date/time, and fills in duration, notes, BPM, etc.

### Skipping a scheduled session

1. User clicks **Skip** on a scheduled session card.
2. Server sets `status: SKIPPED`.
3. Session disappears from the dashboard and is hidden from the main sessions list.

### MWF planned, TWF completed

- Monday’s scheduled session appears on Monday.
- User does not practice Monday.
- Tuesday the user makes it up by clicking **Start** on Monday’s card.
- The session completes with Tuesday’s actual date.
- The Monday row is now `COMPLETED` and no longer appears on the dashboard.
- Wednesday and Friday sessions remain as planned.

---

## Files to create / edit

### Create
- `src/app/actions/scheduled-sessions.ts`

### Edit
- `prisma/schema.prisma`
- `prisma/migrations/<timestamp>_add_session_status/` (auto-generated)
- `src/app/actions/sessions.ts`
- `src/app/actions/songs.ts` (filter `SCHEDULED` from `getNeglectedRepertoire`)
- `src/app/actions/goals.ts` (filter `SCHEDULED` from `getGoalsWithRecentSession`)
- `src/app/(app)/sessions/new/page.tsx`
- `src/app/(app)/dashboard/page.tsx`
- `src/lib/active-session.ts`
- `src/app/(app)/sessions/finish/page.tsx`
- `src/app/(app)/sessions/page.tsx`

---

## Implementation order

1. Schema migration: add `SessionStatus` enum and `status` field.
2. Audit and update all existing session queries to exclude `SCHEDULED`.
3. Add `createScheduledSession` to `src/app/actions/sessions.ts`.
4. Add `src/app/actions/scheduled-sessions.ts` with today/upcoming/start/skip actions.
5. Add the schedule toggle and date picker to `/sessions/new`.
6. Add “Today’s plan” widget to `/dashboard`.
7. Add `sessionId` to `ActiveSession` and wire the start flow.
8. Update `/sessions/finish` to call `updateSession` when completing a scheduled session.
9. Verify `/sessions` list excludes `SCHEDULED`.
10. Run `npx prisma migrate dev`, `npx prisma generate`, `npm run lint`, `npm run build`.

---

## Risks

- **Status leakage:** The biggest risk is a `SCHEDULED` session appearing in practice history, stats, goals, or song “last practiced” calculations. Every `prisma.session` query must be audited.
- **Date semantics:** For `SCHEDULED` rows, `date` is the planned date. For `COMPLETED` rows, it is the actual completion date. This is the intended behavior, but it must be clear in code.
- **Skipped session visibility:** `SKIPPED` sessions are retained but not listed. If a future feature wants to show them, the queries must be written to include them explicitly.
- **BPM on scheduled sessions:** The new session form does not currently have a BPM field. Scheduled sessions will not have a target BPM unless one is added later. This is acceptable for the MVP; the user sets BPM on the metronome panel during the active session.

---

## Out of scope

- Batch weekly scheduling (MWF in one form).
- Weekly plan view or category balance dashboard.
- Completion-rate analytics using `SKIPPED` sessions.
- Calendar view.
- Recurring sessions.
- Notifications or reminders.

These can be added later if the simple single-session scheduler proves useful.

---

## Status

- Plan finalized.
- Implementation not started.
