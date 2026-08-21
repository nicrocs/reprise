# Design: Practice Loop — A/B looping and speed control for Wistia and YouTube

## Context

I take fingerstyle guitar lessons from a teacher who hosts lesson videos on Wistia behind a login wall (`https://www.fretboardconfidential.com/...`, Kajabi-backed). I cannot download the videos, so any loop tool must work on the authenticated site where the videos live. I also want the same A/B looping and speed control for YouTube videos.

Existing browser extensions for YouTube looping have not worked reliably for me. The goal is a small, self-controlled tool that:

- Sets A/B loop points on any video.
- Slows down playback with pitch preservation.
- Remembers loops so I don't have to re-scrub every session.
- Works on authenticated Wistia embeds and YouTube.

## Goal

Build a reusable practice-loop system:

1. A framework-agnostic `packages/practice-loop` core that handles looping and speed logic.
2. A browser extension that injects loop controls onto Wistia and YouTube pages.
3. A planned Reprise backend (`PracticeClip` model + API) to persist loops and optionally attach them to songs.

## Non-goals

- No in-app Reprise video player in phase 1 (videos are not downloadable/embeddable without authentication).
- No notation editing, transcription, or tab rendering — that is `packages/tab-player`'s job.
- No mobile support; MacBook-only usage.
- No cross-browser support beyond Chromium in phase 1.

## Architecture

```
┌─────────────────┐     adapter     ┌──────────────────┐
│  practice-loop  │◄────────────────┤  WistiaAdapter   │
│   (core loop    │                 │  (legacy/modern) │
│    engine)      │◄────────────────┤  VideoAdapter    │
└─────────────────┘                 │  (YouTube/etc)   │
                                    └──────────────────┘
                                            ▲
                                            │ uses
                                    ┌───────┴────────┐
                                    │   extension    │
                                    │ (content script│
                                    │  + floating UI)│
                                    └───────┬────────┘
                                            │
                              later:  ┌─────┴──────┐
                                      │   Reprise   │
                                      │  (Practice- │
                                      │   Clip API) │
                                      └─────────────┘
```

### Build order

1. **Phase 1:** `packages/practice-loop` + browser extension + local extension storage.
2. **Phase 2:** Reprise `PracticeClip` model, API routes, and extension sync.

## `packages/practice-loop`

A thin, framework-agnostic package that owns only the loop/speed logic. It has no DOM, React, or extension dependencies.

### `MediaAdapter` interface

```typescript
interface MediaAdapter {
  getCurrentTime(): number;
  setCurrentTime(t: number): void;
  getPlaybackRate(): number;
  setPlaybackRate(r: number): void;
  play(): void;
  pause(): void;
}
```

### `LoopController`

```typescript
interface Loop {
  start: number;
  end: number;
}

class LoopController {
  constructor(adapter: MediaAdapter);

  setLoop(loop: Loop | null): void;
  getLoop(): Loop | null;

  setPlaybackRate(rate: number): void;
  getPlaybackRate(): number;

  play(): void;
  pause(): void;

  // callbacks
  onLoopEnter?: () => void;
  onLoopExit?: () => void;
  onTimeUpdate?: (t: number) => void;
}
```

### Behavior

- `setLoop` starts a `requestAnimationFrame` polling loop.
- When `currentTime >= loop.end`, seek to `loop.start`.
- Polling stops when paused or the loop is cleared.
- `setPlaybackRate` updates the adapter and, for native `<video>` adapters, sets `preservesPitch = true`.

### Adapters

- `createWistiaLegacyAdapter(video: WistiaVideo): MediaAdapter`
- `createWistiaModernAdapter(player: WistiaPlayerElement): MediaAdapter`
- `createVideoElementAdapter(video: HTMLVideoElement): MediaAdapter`

## Browser extension

A Manifest V3 Chromium extension built with **Vite + CRXJS** and **plain TypeScript**.

### Detection

The content script waits for a supported player on the page:

1. **Wistia legacy:** `.wistia_embed[class*="wistia_async_"]`. Extract the media ID from the `wistia_async_<id>` class and grab the API handle via `window._wq`.
2. **Wistia modern:** `<wistia-player>` custom element.
3. **YouTube / fallback:** `document.querySelector("video")`.

If the Wistia API is unavailable for a legacy embed, fall back to driving the inner `<video class="wistia_simple_video_*">` element directly.

### Host permissions

```json
["https://www.fretboardconfidential.com/*", "https://www.youtube.com/*", "https://*.wistia.com/*"]
```

### Floating UI

Injected near the detected player:

- Speed control (0.5×–1.5×, fine steps).
- **Set A** / **Set B** buttons to capture current time as loop boundaries.
- Loop on/off toggle.
- Save / load clip list for the current video.
- Optional nudge buttons for precise boundary adjustment.

### Storage (phase 1)

`chrome.storage.local`, keyed by `wistia:<mediaId>` or `youtube:<videoId>`. Each key holds an array of clips:

```typescript
interface LocalClip {
  id: string;
  source: "wistia" | "youtube";
  externalId: string;
  label: string;
  loopStart: number;
  loopEnd: number;
  playbackRate: number;
  createdAt: number;
  updatedAt: number;
}
```

## Reprise backend (phase 2)

### Prisma model

```prisma
model PracticeClip {
  id           String  @id @default(cuid())
  userId       String
  songId       String?
  song         Song?   @relation(fields: [songId], references: [id])

  source       String  // "wistia" | "youtube"
  externalId   String  // Wistia mediaId or YouTube video ID

  label        String
  loopStart    Float
  loopEnd      Float
  playbackRate Float   @default(1)

  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@unique([userId, source, externalId, label])
  @@index([songId])
}
```

A `Song` can have many `PracticeClip`s from any source.

### API routes

- `GET /api/practice-clips?songId=...`
- `POST /api/practice-clips`
- `PATCH /api/practice-clips/:id`
- `DELETE /api/practice-clips/:id`

### Reprise UI

Minimal management page per song:

- List attached clips.
- Edit labels, loop points, speed.
- Delete clips.
- No in-app player (videos remain on their authenticated hosts).

### Extension sync

- The extension fetches the user's clips from Reprise and merges them with local clips.
- New clips saved from the extension are posted to Reprise when signed in.
- Auth details (Clerk session cookie/token) are left for phase 2 implementation planning.

## Dependencies and stack

- `packages/practice-loop`: TypeScript only, no runtime dependencies.
- Extension: Vite, CRXJS, plain TypeScript, `chrome.storage.local`.
- Reprise phase 2: Next.js API routes, Prisma, Clerk auth.

## Risks and mitigations

| Risk | Mitigation |
|------|------------|
| Wistia API not loaded before content script runs | Retry detection for a few seconds; fallback to native `<video>` adapter. |
| Wistia custom UI resets playbackRate | Prefer Wistia API for rate changes; if fighting occurs, use native video adapter. |
| YouTube uses DRM or non-standard video element | Generic `<video>` adapter won't work; scope is standard HTML5 video only. |
| Extension auth to Reprise is awkward | Defer to phase 2; start with local-only storage. |
| Kajabi changes page structure | Detection uses stable Wistia classes; keep fallback to `<video>` element. |

## Success criteria

1. Open a lesson on `fretboardconfidential.com`, set A/B points, slow playback, and loop cleanly without stutter.
2. Do the same on a YouTube video.
3. Saved clips reload when revisiting the same video.
4. (Phase 2) Clips sync to Reprise and can be attached to songs.
