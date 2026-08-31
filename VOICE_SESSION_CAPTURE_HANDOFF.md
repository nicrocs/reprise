# Handoff: Voice Session Capture — Device Testing Results & Plan Updates

This documents what changed after testing the Shortcuts design from `VOICE_SESSION_CAPTURE_PLAN.md` on an actual iPhone. The core Reprise-side architecture (schema, API route, extraction service, draft/confirm flow) is **unaffected** — everything below is scoped to Section 6 (Shortcut design) and the API payload shape.

## What we learned

### 1. Siri voice triggers don't work for this
Any Shortcut containing an audio-recording action freezes or fails almost immediately when triggered by "Hey Siri" — this is a known, long-standing, unresolved Apple bug (reported since iOS 16.4, still present), not a config issue. No combination of actions fixes it.

**Resolution:** Dropped Siri entirely. Trigger is now **Back Tap**:
- Double Tap → "Start Practice Session"
- Triple Tap → "End Practice Session"

Set via Settings → Accessibility → Touch → Back Tap.

### 2. Back Tap still requires an unlock if the Shortcut opens an app
Any Shortcut action that opens an app (which "Create Recording" does, since it hands off to Voice Memos) requires the phone to be unlocked — Face ID unlocks automatically if it recognizes you, otherwise Touch ID/passcode is needed. This is expected OS behavior, not a bug, and it also means a **Lock Screen widget would hit the identical wall** (not worth testing separately).

**Resolution:** Accepted this as minor, expected friction. In practice, pulling the phone out and Back-Tapping tends to double as the Face ID glance, so it's close to a single motion rather than two deliberate steps.

### 3. Voice Memos recording survives being locked/backgrounded — but its files aren't reachable from Shortcuts
`Create Recording` / `Stop Recording` (the Voice Memos-backed actions) reliably keep recording through a locked screen — this is the one part of the original design that worked as hoped.

However: **there is no Shortcuts action to retrieve a Voice Memos recording file.** Voice Memos stores recordings in a hidden system location, not exposed via Files, iCloud Drive, or any "get latest recording" action. This ruled out running `Transcribe Audio` on a Voice Memos recording — there's nothing to feed it.

### 4. The native "Record Audio" action doesn't fit the two-Shortcut design either
`Record Audio` (the non-Voice-Memos action) *does* return a file Shortcuts can transcribe directly — but its Start and Finish are both configured **inside one atomic action**. It can't be split across a separate Start shortcut and End shortcut the way Back Tap's double/triple-tap design requires. It also carries the original lock-screen cutoff risk on longer recordings.

### 5. Resolution: decouple the archive recording from the data Reprise actually needs
Instead of trying to get a full-session transcript at all:
- **Voice Memos keeps doing the actual recording** (via `Create Recording`/`Stop Recording`) — reliable, hands-off, and stays in the Voice Memos app purely as Nic's personal archive. Reprise never touches this file.
- **The End shortcut captures a short spoken summary via `Dictate Text`** ("What did you work on?") instead of transcribing the full session. This becomes the `transcript` field sent to Reprise.

This is arguably a better input for the AI extraction step than a raw transcript would have been — a few deliberate sentences about what was practiced parses more cleanly than 10+ minutes of guitar audio with sparse, scattered narration.

### 6. "Get Contents of URL" is correct and current — initial confusion was a search/platform issue
This is the right action for making the POST request; nothing changed here. Two likely causes of not finding it: searching "POST" instead of "URL" (POST is a setting *inside* the action, not its name), or browsing on the Web category instead of search. Also flagged: "Run Shell Script" showing up as an option is a Mac-only Shortcuts action (or added by an SSH app) — confirmed not relevant since this is being built on iPhone.

### 7. Duration should be calculated server-side, not in the Shortcut
Originally planned to calculate `durationSeconds` client-side via "Get Time Between Dates" and send it alongside the timestamps. Simpler and more robust to just send both raw timestamps and let the API compute the difference — removes a class of bugs (timezone handling, unit mismatches) and the route already needs both timestamps for validation regardless.

## Updated Shortcut design (replaces Plan Section 6)

**"Start Practice Session"** (Back Tap: Double Tap)
1. Get Current Date → store as `startedAt`
2. Create Recording (Voice Memos)

**"End Practice Session"** (Back Tap: Triple Tap)
1. Stop Recording (Voice Memos)
2. Get Current Date → `endedAt`
3. Dictate Text ("What did you work on?") → `transcript`
4. Get Contents of URL → POST to `/api/sessions/voice-capture`
   - Body: `{ startedAt, endedAt, transcript }` — **no `durationSeconds`**
   - Headers: `Authorization: Bearer <token>`, `Content-Type: application/json`
5. On failure: save `startedAt`, `endedAt`, `transcript` to a local note; notify

## Updated API payload (replaces Plan Section 4 body shape)

```ts
{
  startedAt: string;   // ISO 8601
  endedAt: string;     // ISO 8601
  transcript: string;  // short dictated summary, not a full transcript
}
```

- Drop the `durationSeconds` tolerance-check logic (±30s) from Plan Section 4 step 2 — there's no client-calculated value to validate against anymore.
- Compute `duration` server-side: `Math.round((new Date(endedAt) - new Date(startedAt)) / 60000)` for minutes.
- Everything else in Section 4 (validation of `endedAt > startedAt`, extraction call, draft creation) is unchanged.

## Still open / worth testing further

- **Minimum-duration guard**: still not implemented — worth rejecting or flagging anything under ~30–60 seconds as likely accidental.
- **Auto-lock interval**: no longer load-bearing now that Voice Memos (not native Record Audio) handles the recording — can leave Auto-Lock at a normal setting.
- **Real-world reliability across multiple sessions**: only tested a handful of times so far; worth running it for a week of normal practice before fully trusting the pipeline.
- **Dictate Text quality check**: worth confirming the dictation prompt reliably captures usable content even when said quickly right after finishing playing (breathless/distracted speech), not just in a clean test environment.
