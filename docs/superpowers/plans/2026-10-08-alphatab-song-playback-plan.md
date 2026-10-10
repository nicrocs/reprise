# Implementation Plan: alphaTab Song Sections and Playback

**Design:** [`docs/superpowers/specs/2026-10-08-alphatab-song-playback-design.md`](../specs/2026-10-08-alphatab-song-playback-design.md)

## Goal

Deliver local Guitar Pro import for ordered song sections and an alphaTab player available during active practice sessions, with section selection, playback speed, and whole-section repeat.

## Implementation Steps

### 1. Add the score model and alphaTab dependency

- Add a compatible `@coderline/alphatab` dependency (version 1.7.0 or later) for both the import script and browser player.
- Add `SongScore` to `prisma/schema.prisma` with `songId`, `label`, `sortOrder`, `alphaTex String @db.Text`, timestamps, and a cascading relation to `Song`.
- Add the reverse `scores` relation to `Song`.
- Add unique `[songId, label]` and index `[songId, sortOrder]`.
- Generate and review the Prisma migration; regenerate the Prisma client using the repository's Prisma 7 setup. Do not hand-edit generated client files.
- Preserve any existing working-tree Prisma/schema changes when composing the migration.

**Verify:** Prisma schema validation, migration application, and client generation complete successfully.

### 2. Implement the local GP import command

- Add `scripts/import-gp.ts`, invoked with a song ID and one GP file path.
- Read the GP bytes and use alphaTab's `ScoreLoader.loadScoreFromBytes` and `AlphaTexExporter.exportToString` APIs.
- Derive `label` from the filename stem.
- Validate the target song and convert the score before writing anything.
- Look up the existing row by `[songId, label]`. Update only `alphaTex` for an existing row so its `sortOrder` is preserved; otherwise append at `max(sortOrder) + 1` (or zero for the first section).
- Disconnect Prisma in a `finally` path and print the imported label and a concise success message. Errors should identify missing song, file read, parse, or conversion failures.
- Document the command and an example invocation near the script or in the relevant project documentation.

**Verify:** Import a known-good GP file, import a second filename for the same song, re-import the first filename, and verify the two rows' content and order. Confirm an invalid file and unknown song leave existing data unchanged.

### 3. Build the client-side alphaTab player

- Add a focused client component, e.g. `src/components/song-score-player.tsx`, receiving ordered `{ id, label, alphaTex }` score data.
- Initialize alphaTab only in the browser with alphaTex rendering and playback enabled; configure the required worker/rendering assets and a stable SoundFont source for deployment.
- Manage API setup and cleanup with the component lifecycle so switching scores or unmounting does not leave playback active or duplicate event handlers.
- Add a section selector defaulting to the first score, play/pause, playback-speed percentage selector including 70% and 100%, and a whole-section repeat toggle.
- On section changes, stop/reset the old score, load the new alphaTex, and reset player UI state.
- Show score/audio loading state and recoverable error state if initialization, rendering, or SoundFont loading fails.
- Keep the player's loop selection model separate from alphaTab wiring so a later change can map selected measures to playback ranges.

**Verify:** In the browser, render a score, switch between two sections, play/pause, select 70% and 100%, enable/disable whole-section repeat, and confirm cleanup when navigating away.

### 4. Integrate score playback into active sessions

- Add an authenticated server action that accepts a song ID and returns only that user's ordered scores (`id`, `label`, `alphaTex`), scoped by both song ID and the signed-in `userId`.
- In `src/app/(app)/sessions/active/page.tsx`, request scores only when the active session has a `songId`; treat the local-storage session data as untrusted and rely on the server action's ownership check.
- Place the player in the active-session workspace after the timer/metronome area and before any session checklist, so it is available while practicing without displacing the session timer.
- Mount the player only when the selected song has scores. If a song is selected but has no scores, show concise guidance that score sections are added through the local import command. If no song is selected, omit the player and score guidance.
- Handle score-fetch loading/failure states and ignore stale results if the active session changes or the page unmounts.
- Keep score playback off the song detail page in this increment.
- Keep rename, reorder, delete, and multi-section sequencing controls out of this increment.

**Verify:** Check a songless active session, a selected song with no scores, and songs with one and multiple ordered scores. Confirm the player mounts only for a selected song with scores, playback controls work during the session, and unauthenticated/cross-user requests do not expose score content. Confirm stale fetches do not replace the current session's scores and navigating away cleans up playback.

### 5. End-to-end verification and polish

- Compare rendered notation and playback with representative original GP files; inspect bends, slides, ties, and tuplets for conversion differences.
- Confirm repeat import replaces only matching section content and preserves its order; confirm new imports append.
- Run Prisma validation/generation, `npm run lint`, and `npm run build` (plus any available type/test checks).
- Fix issues found in supported GP samples and record any remaining alphaTex conversion limitations in the user-facing import guidance.

## Not in This Increment

- Uploading GP files through the web UI.
- In-app section rename, reorder, or delete.
- Selecting and looping a measure range.
- Playing sections sequentially as one arrangement.
- Storing the original GP binary in Reprise.
