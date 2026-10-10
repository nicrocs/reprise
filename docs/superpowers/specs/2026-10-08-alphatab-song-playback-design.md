# Design: alphaTab Song Sections and Playback

## Goal

Let a Reprise user import local Guitar Pro files as named sections of an existing song and play those sections during an active Reprise practice session with alphaTab. The first version supports selecting and playing one section at a time, playback-speed percentages, and repeating the whole selected section. Imports remain script-managed; section editing and measure-range looping are future extensions.

## Data Model

Add a `SongScore` model related to `Song`:

- `id`
- `songId`
- `label` — derived from the GP filename without its extension
- `sortOrder` — import order, starting with the first section at the beginning
- `alphaTex` — converted score text stored as database text
- `createdAt` and `updatedAt`

A song has many scores. Deleting a song cascades to its scores. Enforce unique `[songId, label]` so a filename-derived label identifies one section within a song; index by `[songId, sortOrder]` for ordered retrieval.

The original GP file remains on the user's machine. Reprise stores alphaTex, not the source file. Because GP-to-alphaTex conversion may not preserve every notation detail, users should compare rendered/imported results against their original files.

## Local Import Script

Add a Node-based script, for example `scripts/import-gp.ts`, that accepts an existing song ID and one GP file path. It uses `@coderline/alphatab` to load the file bytes with `ScoreLoader.loadScoreFromBytes`, then converts the score using `AlphaTexExporter.exportToString`.

Import behavior:

1. Read and validate the input file and resolve the target song.
2. Derive the section label from the filename stem.
3. Parse and convert the GP file before making any database changes.
4. If the song already has a score with that label, replace its alphaTex and update timestamp while preserving `sortOrder`.
5. Otherwise, create a score at the end of that song's section order.

Conversion failure must not create or overwrite a score. The script reports a useful error for a missing song, unreadable/unsupported file, or conversion failure. Running it again with the same song and filename is safe and replaces the section content rather than creating a duplicate.

The alphaTab package version must be 1.7.0 or later to use the alphaTex exporter. The script is run locally against the configured Reprise database; imports are one file per invocation.

## Playback Experience

Add an alphaTab player to the active-session page. The active session is currently held in client-side local storage and may contain a `songId`; treat that value as untrusted. When it exists, the client requests ordered scores through an authenticated server action. The action verifies that the song belongs to the signed-in user before returning `{ id, label, alphaTex }` score data. Do not expose another user's alphaTex through an unscoped ID-only lookup.

Place the player after the session timer and metronome, before any checklist, so it is available during practice while the timer remains prominent. Only request scores when the active session has a song ID. Only initialize/mount alphaTab when at least one authorized score is returned.

When the active session has a song and scores exist:

- Select one section at a time; default to the first section.
- Render the selected section's alphaTex with alphaTab.
- Provide play/pause controls.
- Provide a playback-speed dropdown expressed as a percentage of the score's written tempo (for example, 70%). A value of 100% is normal speed; the score's tempo is not rewritten.
- Provide a repeat toggle that repeats the whole selected section.
- When the selected section changes, load its score and reset playback state.

When a song is selected but has no scores, show concise guidance that GP sections are imported with the local script; do not initialize alphaTab. When there is no selected song, omit the player and score guidance. Keep score playback off the song detail page in this increment. Do not add in-app rename, reorder, or delete controls in this version.

Keep playback-range state behind the player boundary rather than tying the UI directly to an entire-score-only loop. This leaves a clear extension point for selecting measure ranges later. alphaTab exposes playback speed, looping, and playback-range controls; the first release uses whole-section looping only.

The client player must initialize alphaTab only in the browser, dispose/clean up its API when changing or unmounting scores, and make required rendering/player assets and SoundFont available in the deployed app. Show loading and actionable failure states if score rendering or audio assets cannot load.

## Validation and Error Handling

- A missing or inaccessible song ID returns no score content.
- An unreadable or unsupported GP file and a conversion error fail without creating or replacing a score.
- Re-importing the same filename-derived label replaces score text and preserves ordering.
- The server action enforces song ownership before score text is sent to the client, including when the client supplies a forged local-storage song ID.
- No score query or alphaTab initialization occurs for a songless active session; alphaTab is not initialized when the selected song has no scores.
- Stale score-fetch responses cannot replace scores for a different active session, and navigating away disposes the player.
- Player loading, rendering, and SoundFont failures are represented in the UI rather than leaving inert controls.
- Treat alphaTex output as a conversion, not a lossless copy; manually check notation and audio for representative files, especially bends, slides, ties, and tuplets.

## Future Extensions

This design intentionally leaves these capabilities out of the first release while supporting them without changing the basic score model:

- In-app section rename, reorder, and delete controls.
- Selecting a measure range and repeating only that range via alphaTab's playback-range API.
- Playing multiple sections sequentially as one song.
- Preserving the original GP source file in Reprise if later workflows require it.

## Verification

- Verify script conversion and insert behavior with a known-good GP file.
- Verify repeat import updates the matching score, leaves its order unchanged, and does not create duplicates.
- Verify new sections append in import order.
- Verify failed conversion and missing-song cases do not alter stored score data.
- Verify a user cannot load another user's song scores through the active-session server action.
- In the browser, verify the songless state, selected song without scores, and selected songs with one and multiple ordered scores. Verify score rendering, section selection, play/pause, 70% and 100% speed, whole-section repeat, coexistence with the active timer/checklist, and player cleanup when changing sections or navigating away.
- Compare rendered notation and playback against representative original GP files.
- Run Prisma migration/client generation, lint, TypeScript/build checks supported by the repository.
