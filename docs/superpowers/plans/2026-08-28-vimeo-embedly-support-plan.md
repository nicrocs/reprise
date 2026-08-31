# Implementation Plan: Vimeo and Embedly Support

**Spec:** `docs/superpowers/specs/2026-08-28-vimeo-embedly-support-design.md`

## Goal

Support direct Vimeo iframes and the supplied Embedly Vimeo wrapper, including A/B loop control and local clip save/load.

## 1. Add the Vimeo core adapter

### Files

- `packages/practice-loop/src/adapters/vimeo.ts`
- `packages/practice-loop/src/index.ts`
- `packages/practice-loop/src/adapters/vimeo.test.ts`

### Tasks

1. Define the minimal Vimeo player interface needed by `MediaAdapter` so the core package does not depend on the Vimeo SDK.
2. Implement `createVimeoAdapter(player)` with cached `currentTime` and `playbackRate` values.
3. Initialize the cache from the player, subscribe to `timeupdate` and `playbackratechange`, and delegate seek, rate, play, and pause operations.
4. Catch rejected Vimeo promises at the adapter boundary.
5. Export the adapter and its player type from the package entry point.

### Verification

- Fake-player tests verify initial values, event-driven cache updates, delegated operations, and rejected promise handling.
- `npm test` and `npm run build` pass in `packages/practice-loop`.

## 2. Add Vimeo URL and Embedly detection

### Files

- `apps/practice-loop-extension/src/content/detector.ts`
- `apps/practice-loop-extension/src/content/detector.test.ts`
- `apps/practice-loop-extension/src/types.ts`

### Tasks

1. Add `vimeo` to `VideoSource` and `vimeo` player metadata to `PlayerInfo`.
2. Add a helper that extracts a numeric ID from direct `player.vimeo.com/video/<id>` URLs.
3. Add a helper that reads an Embedly widget URL, decodes its `src` parameter, and falls back to its `url` parameter.
4. Find direct Vimeo iframes and Embedly widgets in the current document.
5. Instantiate `Vimeo.Player` for the matching Vimeo iframe and return a `PlayerInfo` with `source: "vimeo"`, the extracted ID, and the Vimeo adapter.
6. Preserve the existing Wistia-first and native-video fallback ordering.
7. Use a bounded polling/initialization timeout so missing or blocked SDK/player frames do not leave a permanently pending bootstrap.

### Verification

- Test the supplied protocol-relative Embedly markup and assert ID `424186332`.
- Test direct Vimeo URLs, invalid URLs, missing IDs, and URL-encoded query parameters.
- Test that non-Vimeo Embedly widgets are ignored.

## 3. Configure frame injection and SDK bundling

### Files

- `apps/practice-loop-extension/manifest.json`
- `apps/practice-loop-extension/package.json`
- `package-lock.json`

### Tasks

1. Add `@vimeo/player` as an extension dependency.
2. Add `https://cdn.embedly.com/*` to content-script matches.
3. Set `all_frames: true` so the content script runs inside Embedly’s frame and can see its nested Vimeo iframe.
4. Add required Vimeo/Embedly host permissions while retaining current site, YouTube, and Wistia permissions.
5. Update the extension description to include Vimeo.

### Verification

- `npm install` updates the workspace lockfile without replacing local package links.
- Extension typecheck and production build succeed.

## 4. Verify storage and end-to-end behavior

### Files

- `apps/practice-loop-extension/src/storage/local-clips.test.ts` (only if coverage needs a Vimeo-specific assertion)

### Tasks

1. Confirm `storageKey("vimeo", "424186332")` produces `clips:vimeo:424186332`.
2. Confirm the existing panel receives Vimeo metadata without UI changes.
3. Confirm setting A and B creates a loop and saving it uses the Vimeo source and ID.
4. Confirm loading a saved Vimeo clip restores its loop and playback rate.

### Verification

- Run all package and extension tests.
- Run both package and extension typechecks/builds.
- If available, manually load the unpacked extension on the Embedly page and verify Set A, Set B, Save Clip, and Load.
