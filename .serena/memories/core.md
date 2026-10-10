# Reprise core

- Reprise is a song-centered practice-session tracker. Authenticated routes live under `src/app/(app)`; song detail is `src/app/(app)/songs/[id]/page.tsx`.
- `prisma/schema.prisma` is the source of truth. Prisma Client output is `prisma/generated/prisma` (generated; do not hand-edit). Song-owned related data generally cascades on Song deletion.
- Auth is Clerk. Server pages/actions must scope records to `auth().userId`; see song detail and `src/app/actions/songs.ts`.
- App UI is Next.js App Router; client interactions live in focused `'use client'` components under `src/components`.
- Stack and exact common commands: `mem:tech_stack`, `mem:suggested_commands`, `mem:task_completion`. Code patterns: `mem:conventions`.