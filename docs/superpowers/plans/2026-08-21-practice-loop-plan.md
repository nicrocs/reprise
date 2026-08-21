# Implementation Plan: Practice Loop

**Spec:** `docs/superpowers/specs/2026-08-21-practice-loop-design.md`

This plan covers **Phase 1 only**: a working browser extension with A/B looping and speed control for Wistia and YouTube, backed by local extension storage. Phase 2 (Reprise sync) is out of scope for this plan.

## Phase 1 goal

A Chromium extension you can load unpacked that:

1. Detects Wistia legacy embeds on `fretboardconfidential.com` and YouTube videos on `youtube.com`.
2. Injects a floating control panel with speed, Set A, Set B, loop toggle, and clip save/load.
3. Loops smoothly with no stutter using `requestAnimationFrame` polling.
4. Persists clips in `chrome.storage.local` keyed by video source + ID.

## 1. Monorepo workspace setup

The repo is currently a single Next.js app. We need a shared package for the loop core and a separate build target for the extension.

### Tasks

1. Add `workspaces` to root `package.json`:
   ```json
   "workspaces": ["packages/*", "apps/*"]
   ```
2. Create `packages/practice-loop/` with:
   - `package.json` (name: `@reprise/practice-loop`, version `0.1.0`, main `./dist/index.js`, types `./dist/index.d.ts`)
   - `tsconfig.json`
   - `src/index.ts`
3. Create `apps/practice-loop-extension/` with:
   - `package.json` (name: `practice-loop-extension`, private)
   - `vite.config.ts` with `@crxjs/vite-plugin`
   - `manifest.json` (Manifest V3)
   - `src/content/index.ts`
   - `src/content/panel.ts`
   - `src/storage/local-clips.ts`
   - `src/types.ts`
4. Run `npm install` so the workspace packages are linked.

### Verification

- `npm ls @reprise/practice-loop` from `apps/practice-loop-extension` resolves to the local package.
- `npm run build` in `packages/practice-loop` produces `dist/index.js` and `dist/index.d.ts`.

## 2. Build `packages/practice-loop`

### Tasks

1. Define `MediaAdapter` interface in `src/adapter.ts`.
2. Implement `LoopController` in `src/loop-controller.ts`:
   - Accept an adapter in the constructor.
   - `setLoop({ start, end })` stores the loop and starts a `requestAnimationFrame` poll.
   - In each frame, if `adapter.getCurrentTime() >= end`, call `adapter.setCurrentTime(start)`.
   - Stop polling on pause or when loop is cleared.
   - Call `onTimeUpdate`, `onLoopEnter`, `onLoopExit` callbacks.
3. Implement adapters:
   - `createVideoElementAdapter(video: HTMLVideoElement)` in `src/adapters/video-element.ts`. Set `video.preservesPitch = true` when changing rate.
   - `createWistiaLegacyAdapter(video: WistiaVideo)` in `src/adapters/wistia-legacy.ts`. Wrap `video.time()`, `video.playbackRate()`, `video.play()`, `video.pause()`.
   - `createWistiaModernAdapter(player: WistiaPlayerElement)` in `src/adapters/wistia-modern.ts`. Wrap `player.currentTime`, `player.playbackRate`, `player.play()`, `player.pause()`.
4. Export everything from `src/index.ts`.

### Verification

- Build the package with no TypeScript errors.
- Write a small test harness (Node or browser) that creates a fake adapter and asserts the loop seek behavior. This can live in `packages/practice-loop/src/__tests__/loop-controller.test.ts` using a lightweight assertion helper or no test runner at all for now.

## 3. Build the extension skeleton

### Tasks

1. Configure `vite.config.ts` with `@crxjs/vite-plugin` pointing at `manifest.json`.
2. Write `manifest.json`:
   - `manifest_version: 3`
   - `name: "Practice Loop"`
   - `permissions: ["storage"]`
   - `host_permissions: ["https://www.fretboardconfidential.com/*", "https://www.youtube.com/*", "https://*.wistia.com/*"]`
   - `content_scripts` entry for `matches: ["https://www.fretboardconfidential.com/*", "https://www.youtube.com/*"]` with `js: ["src/content/index.ts"]`.
3. Add a dev script: `"dev": "vite"` and a build script: `"build": "tsc && vite build"`.

### Verification

- `npm run build` in `apps/practice-loop-extension` produces a `dist/` folder.
- Load `dist/` as an unpacked extension in Chrome and confirm it appears with no manifest errors.

## 4. Implement player detection

### Tasks

1. In `src/content/detector.ts`, write `detectPlayer(): PlayerInfo | null`:
   - Look for `.wistia_embed[class*="wistia_async_"]` → extract ID → try `window._wq`.
   - Look for `<wistia-player>` → use element directly.
   - Look for `document.querySelector("video")` → use as fallback.
2. Retry detection every 500ms for up to 10 seconds if no player is found.
3. Return a normalized object:
   ```typescript
   interface PlayerInfo {
     type: "wistia-legacy" | "wistia-modern" | "video";
     mediaId?: string;
     element?: HTMLElement;
     adapter: MediaAdapter;
   }
   ```

### Verification

- On `fretboardconfidential.com`, the detector finds the Wistia player and extracts the media ID.
- On `youtube.com`, the detector finds the `<video>` element.
- Log the detected type and ID to the console.

## 5. Build the floating UI

### Tasks

1. In `src/content/panel.ts`, write `mountPanel(controller: LoopController, onSave: (clip: LocalClip) => void, clips: LocalClip[]): HTMLElement`.
2. Create a shadow-DOM panel positioned near the top-right of the player to avoid CSS conflicts.
3. Panel controls:
   - Speed slider or buttons (0.5×, 0.75×, 1×, 1.25×, 1.5×).
   - **Set A** and **Set B** buttons.
   - Loop on/off toggle.
   - Label input + **Save Clip** button.
   - Saved clips dropdown/list + **Load** and **Delete** buttons.
   - Optional: nudge A/B by ±0.1s.
4. Update the panel state on `controller.onTimeUpdate`.

### Verification

- The panel appears on both Wistia and YouTube pages.
- Buttons are clickable and update the controller state.
- The panel does not break the underlying player's controls.

## 6. Implement local clip storage

### Tasks

1. In `src/storage/local-clips.ts`, write:
   - `getClips(source: string, externalId: string): Promise<LocalClip[]>`
   - `saveClip(clip: LocalClip): Promise<void>`
   - `deleteClip(clipId: string): Promise<void>`
2. Key clips by `clips:<source>:<externalId>` in `chrome.storage.local`.
3. Generate clip IDs with `crypto.randomUUID()`.

### Verification

- Save a clip, reload the page, and confirm it loads back.
- Delete a clip and confirm it is removed.

## 7. Wire everything together

### Tasks

1. In `src/content/index.ts`:
   - Call `detectPlayer()`.
   - Create a `LoopController` with the returned adapter.
   - Load saved clips for the detected `source:externalId`.
   - Mount the panel.
   - On save, write to storage and refresh the panel clip list.
2. Ensure the controller is cleaned up on page navigation (YouTube SPA navigation).

### Verification

- End-to-end on `fretboardconfidential.com`:
  - Set A/B points, slow to 0.75×, loop plays cleanly.
  - Save the clip, reload, load it, loop resumes.
- End-to-end on `youtube.com`:
  - Same test passes.

## 8. Polish and edge cases

### Tasks

1. Handle YouTube SPA navigation: re-run detection when the URL changes.
2. Add keyboard shortcuts (e.g., `A` and `B` keys when panel is focused or globally with a modifier).
3. Make the panel draggable or at least position it consistently.
4. Ensure the panel is hidden in fullscreen or adapts to it.
5. Add a small console log or badge to indicate the extension is active.

### Verification

- Navigate between YouTube videos without refreshing; the panel re-detects and works.
- Keyboard shortcuts set loop points.
- Fullscreen video still allows loop playback (panel may be hidden, but loop logic keeps running).

## Build order summary

| Order | Task | Output |
|-------|------|--------|
| 1 | Workspace setup | `packages/practice-loop`, `apps/practice-loop-extension` |
| 2 | Core package | `LoopController` + adapters |
| 3 | Extension skeleton | Buildable extension with manifest |
| 4 | Detection | Finds Wistia and YouTube players |
| 5 | Floating UI | Interactive panel |
| 6 | Local storage | Save/load clips |
| 7 | Integration | Working end-to-end loop tool |
| 8 | Polish | SPA nav, shortcuts, fullscreen |

## Definition of done for Phase 1

- [ ] `packages/practice-loop` builds with no TypeScript errors.
- [ ] Extension loads unpacked in Chrome.
- [ ] Wistia lesson on `fretboardconfidential.com` can be A/B looped and slowed down.
- [ ] YouTube video can be A/B looped and slowed down.
- [ ] Clips persist across page reloads via `chrome.storage.local`.
- [ ] No audible stutter at loop boundaries.
