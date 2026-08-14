# Plan: Voice-Triggered Session Recording + Transcript Capture

This plan implements the functionality described in `reprise-voice-session-capture-spec.md` for the Reprise codebase and the Shortcuts / Siri setup on your Apple devices.

## 1. How the spec maps to the current codebase

| Spec expectation | Current state | Gap |
|---|---|---|
| Existing AI SDK parsing / draft-confirm pipeline | **Not present.** Sessions are created directly via `createSession`. | Need to build the extraction service **and** the draft/confirm state. |
| Session schema supports duration + draft/confirm | `Session.duration` exists (minutes, `Int`), but there is no `isDraft` / status or transcript field. | Need a schema migration. |
| `POST /api/sessions/voice-capture` API route | No `app/api/` routes exist. | Need a new Next.js Route Handler. |
| Clerk auth from Shortcuts | Clerk cookie auth works in the browser, but Shortcuts cannot send a session cookie. | Need an API-token auth mechanism for Shortcuts. |
| On-device transcription via Shortcuts | Not present. | Build two Shortcuts; transcription is handled on-device by iOS/macOS. |

## 2. Data model changes

Add to `prisma/schema.prisma`:

```prisma
model VoiceShortcutToken {
  id        String   @id @default(cuid())
  userId    String
  hashedToken String
  label     String?
  createdAt DateTime @default(now())
  lastUsedAt DateTime?

  @@index([userId])
}

model Session {
  // ... existing fields ...

  isDraft         Boolean  @default(false)
  voiceTranscript String?
  extractedData   Json?    // proposed song, status, blocker, tags, bpm, intention, etc.
}
```

Notes:
- `duration` stays in **minutes** (`Int`). The API receives `durationSeconds` and converts it.
- `extractedData` stores the AI's proposed values so the confirm page can show them without mutating the real song/topic/etc. until the user confirms.
- `VoiceShortcutToken` lets Shortcuts authenticate independently of Clerk cookies.

## 3. AI extraction service

Create `src/lib/voice/extract-session.ts` using the Vercel AI SDK.

Input: `transcript: string`
Output: structured object, e.g.:

```ts
{
  songTitle?: string
  songStatus?: SongStatus
  currentBlocker?: string
  topic?: string
  intention?: string
  tags?: string[]
  bpm?: number
}
```

Implementation:
- Add `ai` and an LLM provider package (e.g. `@ai-sdk/openai`).
- Import `prisma` from `@/lib/prisma` if the service needs to look up existing songs during extraction; otherwise keep the service pure.
- Use `generateObject` with a Zod schema.
- For `songStatus`, reuse the Prisma `SongStatus` enum values (`LEARNING`, `MAINTENANCE`, `WRITING`, `RECORDING`, `MIXING`, `STALLED`, `RELEASED`) so the AI can only propose statuses that exist in the schema.
- Default to a cheap/fast model such as `gpt-4o-mini` (configurable via `VOICE_AI_MODEL`).
- Keep the system prompt focused on guitar-practice log extraction.

## 4. API route: `POST /api/sessions/voice-capture`

Path: `src/app/api/sessions/voice-capture/route.ts`

- Import `prisma` from `@/lib/prisma`, matching the existing server-action pattern.

### Auth
- Read `Authorization: Bearer <token>` header.
- Hash the provided token and look it up in `VoiceShortcutToken`.
- Reject with `401` if missing or invalid.

### Body validation (Zod)
```ts
{
  startedAt: string       // ISO 8601
  endedAt: string         // ISO 8601
  durationSeconds: number // integer > 0
  transcript: string
}
```

### Behavior
1. Validate `endedAt > startedAt`.
2. Guard that `durationSeconds` roughly matches the `startedAt` → `endedAt` delta (±30 s is a reasonable tolerance).
3. Reject (or flag) sessions shorter than a minimum floor, e.g. 60 seconds, to avoid junk drafts from accidental start/end pairs.
4. Convert `durationSeconds` to minutes: `Math.round(durationSeconds / 60)`.
5. Call the extraction service on `transcript`.
6. Create a **draft** session:
   - `userId` from the token.
   - `date` = `startedAt`.
   - `duration` = minutes from step 4.
   - `voiceTranscript` = `transcript`.
   - `extractedData` = AI result.
   - `isDraft` = `true`.
   - Do **not** link a song yet; store only the proposed title in `extractedData` so the confirm page can let the user pick/upsert the correct song.
7. Return `{ sessionId }`.

Note: do not copy the transcript into `notes`. `notes` should remain user-editable; the confirm page reads from `voiceTranscript` directly.

### Empty / low-confidence transcript
Still create the draft with duration and a blank/empty transcript. The confirm page will let the user fill in the rest.

## 5. Draft confirm flow

Add a page: `/sessions/voice/[id]/confirm`

- Load the draft session for the current Clerk user.
- Display:
  - Date + duration
  - Raw transcript
  - AI-extracted suggestions (song, status, blocker, tags, BPM, intention/topic)
- Let the user edit the suggestions and then:
  - **Confirm** → apply the values to the session, upsert the song if needed, connect tags, set `isDraft = false`.
  - **Delete** → remove the draft if it was a mistake.

Update `/sessions`:
- Show draft sessions at the top with a "Review" link to the confirm page, or add a dedicated `/sessions/drafts` page.
- Ensure analytics/stats pages only count confirmed sessions.

## 6. Shortcut design

Two Shortcuts. They sync via iCloud, so you can build them on your Mac or iPhone; the same Siri phrases work on both.

### Shortcut 1: "Start Practice Session"

1. **Get Current Date** → format as ISO 8601 (`startedAt`).
2. **Save to File** (or use Data Jar / iCloud Drive at `Shortcuts/Reprise/session-in-progress.json`) with content `{ "startedAt": "<iso>" }`.
3. **Start Recording Audio**
   - Quality: voice memo / balanced.
   - This is the action Shortcuts uses to begin a background-capable recording.
4. **Show Notification**: "Practice session started."

### Shortcut 2: "End Practice Session"

1. **Stop Recording Audio** → returns the audio file.
2. **Get Current Date** → `endedAt`.
3. **Get File** from `Shortcuts/Reprise/session-in-progress.json` and parse `startedAt`.
4. **Transcribe Audio** (on-device) on the file from step 1.
5. **Calculate** `durationSeconds` as the difference between `endedAt` and `startedAt`.
6. **Get Contents of URL**:
   - URL: `https://reprise.nicguestjelley.com/api/sessions/voice-capture`
   - Method: `POST`
   - Headers: `Authorization: Bearer <your-shortcut-token>`, `Content-Type: application/json`
   - Body:
     ```json
     {
       "startedAt": "<startedAt>",
       "endedAt": "<endedAt>",
       "durationSeconds": <seconds>,
       "transcript": "<transcribed text>"
     }
     ```
7. On success: show notification "Draft session saved. Open Reprise to review."
8. On failure (network error or non-2xx):
   - Save `startedAt`, `endedAt`, `durationSeconds`, and `transcript` to a local note or file.
   - Show notification "Couldn't send session — saved locally."

### Auth token in the Shortcut
- Add a `Text` action at the top of each shortcut containing the API token.
- Reference that text in the `Authorization` header.
- Token is generated in Reprise settings (see step 7).

### Background recording note
The spec assumes "Start Recording Audio" can record while the phone is locked and then be stopped by a second Shortcut. On iOS this is not guaranteed; Shortcuts may stop the recording when the app is suspended. **This is the first thing to validate** (see Step 1 in Implementation order):
- If it works, keep the two-shortcut flow.
- If not, fall back to a single Shortcut that records until you stop it manually, or have the "End" shortcut prompt you to dictate a summary instead of relying on a long recording.

## 7. Settings UI for the Shortcut token

Add a page or section, e.g. `/settings/voice`:

- "Generate Shortcut Token" button.
- Generate a random token (e.g. 32 bytes), show it **once**, and store a hash (SHA-256) in `VoiceShortcutToken`.
- List existing tokens with label, created date, and a revoke button.
- Copy-to-clipboard button for the token so you can paste it into the Shortcuts.

## 8. Environment variables

Add to `.env.example` and Vercel:

```env
# Existing
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=

# New
OPENAI_API_KEY=
VOICE_AI_MODEL=gpt-4o-mini
```

## 9. Implementation order

1. **Validate the Shortcuts background-recording assumption first.** Build the two Shortcuts without any API call — just start recording, wait, and stop recording — and test whether "Start Recording Audio" survives a locked iPhone and can be stopped by a second Shortcut. If it fails, decide the fallback Shortcut design before writing any backend code.
2. **Schema migration** for `Session.isDraft`, `voiceTranscript`, `extractedData`, and `VoiceShortcutToken`. Run `prisma migrate dev` and `prisma generate`.
3. **Install dependencies**: `ai`, `@ai-sdk/openai`, and Zod if not already present.
4. **Build `extractSessionFromTranscript`** with a Zod output schema.
5. **Build token settings UI** so you can create a token for Shortcuts.
6. **Implement `POST /api/sessions/voice-capture`** with token auth, validation, extraction, and draft creation.
7. **Build draft confirm page** and update `/sessions` to surface drafts.
8. **Wire the Shortcuts to the real endpoint** (insert the API token and POST action).
9. **Test end-to-end** on both Mac and iPhone, including the failure fallback.
10. **Decide on raw audio retention**; for v1, discard the audio file after transcription.

## 10. Open questions to resolve during implementation

1. How long should an unmatched "Start" without an "End" persist? (Probably leave the local `session-in-progress.json` until an "End" runs or the user manually deletes it.)
2. Should a draft with no transcript still try AI extraction? (No — skip extraction if transcript is empty.)
3. Which LLM provider/key do you want to use for extraction? (OpenAI is the simplest default.)
