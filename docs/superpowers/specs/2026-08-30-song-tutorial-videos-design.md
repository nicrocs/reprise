# Song Tutorial Videos Design

## Goal

Store multiple labeled tutorial/reference video links on each song so they can be opened from Reprise. This first version stores only the video URL and label; practice-loop association is deferred.

## Data model

Add a `SongVideo` model with `id`, `songId`, required `label`, required `url`, and `createdAt`. A song has many videos, and deleting a song cascades to its videos.

## Server actions

Provide authenticated create, update, and delete actions. Every mutation verifies that the target song or video belongs to the current Clerk user. Labels must be non-empty and URLs must use `http` or `https`.

## UI

The song detail page gets a Tutorial videos section. It shows an empty state when no videos exist, supports adding and editing through a compact label/URL form, displays each label as an external link opening in a new tab, and provides edit and delete controls. Deletion requires confirmation.

## Verification

Cover validation, ownership boundaries, and multiple-video CRUD behavior with tests where the existing test setup supports it. Run Prisma generation, lint, type checks, and the production build.
