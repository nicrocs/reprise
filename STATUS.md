# Reprise Project Status

Last updated: 2026-07-15

## Current Feature
**Branch:** `main`
**Focus:** Song metadata editing + filtering/sorting by key, tuning, thumb style, and status

### Blockers
None

### In Progress
None

### Completed
- [x] `ThumbStyle` enum (`STEADY`, `ALTERNATING`) + `Song.thumbStyle` migration
- [x] Reconciled pre-existing migration drift (Neon `playing_with_neon` sample table) without resetting the database
- [x] `updateSong` server action supports `thumbStyle`
- [x] `SongDetails` component edits tuning, key, and thumb style (with a “None” option for key/thumb style)
- [x] `SongMetadataEditor` added to `/songs/[id]` detail page
- [x] `SongsFilter` client component on `/songs` with search + filters for status, key, tuning, and thumb style
- [x] Sort songs by recently practiced, title, status, key, tuning, or thumb style
- [x] Song list rows show thumb style and status badges
- [x] Session start/finish flow carries `key` and `thumbStyle` through `ActiveSession`
- [x] New songs created from `createSession` inherit tuning/key/thumb style from the active session
- [x] Type check, lint, and production build pass

---

## Recently Completed
- Added song metadata fields (key, tuning, thumb style) and made them editable.
- Built live filtering/sorting for the song list.
- Wired session flow so new songs pick up metadata set during session start.

## Next Up
1. Window close warning (`beforeunload`)
2. Mood and focus rating UI

## Completed Today
- Implemented `ThumbStyle` enum and Prisma migration
- Added `thumbStyle` to `Song` schema, server actions, and generated client
- Created `ThumbStyleSelect` and updated `SongDetails` for key/tuning/thumb-style editing
- Added `SongMetadataEditor` to the song detail page
- Rebuilt `/songs` list with `SongsFilter` (search, status/key/tuning/thumb-style filters, sort)
- Updated active session and `createSession` to preserve and apply key/thumb style to new songs
- Verified lint, typecheck, and build pass

## Post-MVP Ideas
- Pickup → intention flow
- Stats dashboard
- Voice logging via Whisper
- More advanced song grouping (e.g. by capo, by goal)
- Bulk-edit song metadata
- Favorites / quick-access repertoire lists

## Migration Notes
- Migration `20260712164400_add_thumb_style` has been applied to the database.
- A placeholder migration `20260708220237` exists to keep the local migration history in sync with the database’s `_prisma_migrations` table (it creates the `playing_with_neon` sample table that was present before this work). It does not affect the application schema.
