# Vimeo and Embedly Support

## Goal

Allow the Practice Loop extension to detect Vimeo videos embedded directly or through Embedly, control their playback, and save/load A/B loop points under a stable Vimeo video identity.

## Scope

- Support direct `player.vimeo.com/video/<id>` iframes.
- Support Embedly `cdn.embedly.com/widgets/media.html` wrappers containing an encoded Vimeo URL.
- Use the Vimeo Player SDK rather than reaching into Vimeo's cross-origin document.
- Preserve existing YouTube and Wistia behavior.

## Architecture

Add a Vimeo adapter in `packages/practice-loop` implementing `MediaAdapter`. Vimeo's Promise-based API is adapted to the core's synchronous reads through cached current time and playback-rate values; writes and actions are delegated as fire-and-forget calls.

Extend the extension detector to identify direct Vimeo iframe URLs and to unwrap Embedly's `src` query parameter, falling back to its `url` parameter. The content script must run in Embedly frames (`all_frames`) so it can find the nested Vimeo iframe and initialize `Vimeo.Player` against it.

Add `vimeo` to `VideoSource`. Saved clips use `clips:vimeo:<numeric-id>`, allowing the existing panel and storage flow to work without Vimeo-specific UI changes.

## Behavior

- Extract the numeric Vimeo ID from the decoded player URL.
- Use the Vimeo ID as `externalId`.
- Wait for the nested iframe and SDK initialization with a bounded timeout.
- If initialization fails, return no player rather than mounting unusable controls.
- Catch adapter API failures so a Vimeo API error cannot crash the content script.

## Manifest

Add `https://cdn.embedly.com/*` to content-script matches and set `all_frames: true`. Keep the existing parent-site and YouTube matches. Add the Vimeo Player SDK dependency and bundle it with the extension.

## Testing

- Test direct Vimeo URL extraction.
- Test the supplied Embedly URL shape, including protocol-relative URLs and decoding.
- Test Vimeo source inference and player metadata.
- Test adapter delegation and cached reads with a fake Vimeo player.
- Run package and extension tests, typechecks, and production builds.
