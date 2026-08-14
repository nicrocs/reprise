# Metronome Enhancement Plan

This document outlines proposed enhancements to the programmable metronome used during active practice sessions. The metronome is currently split into:

- `src/lib/metronome/use-metronome.ts` — timing logic / Web Audio scheduler
- `src/components/metronome/metronome-panel.tsx` — UI panel
- `src/app/(app)/sessions/active/page.tsx` — active session page where the panel is mounted

The scheduler already uses the standard Web Audio "lookahead" pattern, so all features below should be implemented as config state and refs consumed by the scheduler rather than by interrupting the audio clock.

---

## Phase 1 — Sound configuration

Goal: let the user dial in a click that cuts through an acoustic guitar without being annoying.

### Features

1. **Waveform / tone selector**
   - Options: `sine`, `triangle`, `square`, `sawtooth`.
   - For acoustic fingerstyle, `triangle` or short `square` clicks usually cut better than `sine`.
   - Implementation: set `osc.type` from config in `scheduleClick`.

2. **Independent pitch controls**
   - Accent beat pitch (default 1400 Hz).
   - Normal beat pitch (default 900 Hz).
   - Optional sub-beat pitch if subdivisions are added later.

3. **Volume / velocity**
   - Master volume.
   - Separate accent vs. normal beat volume.
   - A "dim normal beats" mode so only the backbeat (2 & 4) really pops.

4. **Sound presets**
   - Save named combinations: "Acoustic Click," "Woodblock," "Cutting Beep," etc.
   - Stored alongside other metronome settings.

---

## Phase 2 — "Tempo check" mute feature

Goal: train internal time by removing the click for stretches and verifying that you land back on the beat when it returns.

### Features

1. **Play N bars / mute M bars**
   - Defaults: play 1 bar, mute 1 bar.
   - User sets `barsOn` and `barsOff`.
   - During mute bars the scheduler keeps running but skips audio output; the visual beat indicator should pause or dim so the user isn't cueing off it.

2. **Gradual muting (progressive mode)**
   - Start with 4 bars on / 0 off.
   - Every cycle or every N cycles, increase `barsOff` by 1 until a target is reached.
   - Useful for building confidence without jumping straight into silence.

3. **Bar counter in the scheduler**
   - Track bars, not just beats, inside the scheduler loop.
   - Increment a bar counter each time `currentBeatRef` wraps to 0.
   - Decide whether the current bar is in an "on" or "off" block before scheduling each beat.

---

## Phase 3 — Blues & fingerstyle-specific tools

Goal: support the grooves and practice routines used by a fingerstyle blues guitarist.

### Features

1. **Subdivisions**
   - Quarter notes, eighth notes, swung eighths, triplets, sixteenths.
   - Swung eighths are essential for blues.

2. **Swing / shuffle control**
   - Slider from 0% (straight) to 100% (full triplet shuffle).
   - Implementation: off-beats are placed later than the straight grid using a shuffle offset formula.

3. **Accent patterns for alternating bass**
   - Presets:
     - Backbeat only: `[2, 4]`
     - Alternating bass feel: `[1, 3]`
     - All four with beat 1 strongest: `[1, 2, 3, 4]`
     - Shuffle pattern: `[1, 2.5, 4]` or similar
   - Save custom patterns per song.

4. **Count-in**
   - Play 1–4 bars before the real pattern starts.
   - Optional different pitch during count-in so it's clearly distinguishable.

5. **Tap tempo**
   - Tap a button or the spacebar 3–4 times to set BPM.

6. **Speed trainer (accelerando)**
   - Start at a BPM, increase by X BPM every Y bars or Z seconds.
   - Cap at a target BPM.

7. **Timer-based auto-stop**
   - Practice for a set duration (e.g., 5 minutes), then stop automatically.

---

## Phase 4 — Persistence, per-song BPM, and polish

### Per-song BPM autofill

When a session is tied to a song, the metronome should remember the last BPM used for that song and autofill it the next time a session with the same song starts.

#### Proposed implementation

- Add a small module, e.g. `src/lib/metronome/song-bpm.ts`, following the same pattern as `src/lib/active-session.ts`:

```ts
const STORAGE_KEY = 'reprise_song_bpm'

export function saveSongBpm(songId: string, bpm: number): void {
  const all = getAllSongBpms()
  all[songId] = bpm
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
}

export function getSongBpm(songId: string): number | null {
  return getAllSongBpms()[songId] ?? null
}

function getAllSongBpms(): Record<string, number> {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return {}
  try {
    return JSON.parse(raw) as Record<string, number>
  } catch {
    return {}
  }
}
```

- On the active session page, if `session.songId` is present and a saved BPM exists, pass it as `initialBpm` to `MetronomePanel`.
- When the user changes BPM during the session, save it for that song.
- This can also be extended later to save full per-song presets (accent pattern, sound config, swing, etc.).

### Other persistence

- Save last-used BPM, beats per measure, accent pattern, sound config, and mute settings to `localStorage`.
- Load these as defaults when no per-song BPM is available.

### Polish

1. **Keyboard shortcuts**
   - `Space` = start/stop.
   - `↑ / ↓` = nudge BPM by 1.
   - `Shift + ↑ / ↓` = nudge by 5.
   - `M` = toggle mute mode on/off.

2. **Visual feedback**
   - Larger beat pads (44 px touch targets).
   - Visual flash on accented beats for silent practice.
   - Use the brand `--warm` color for accents instead of the gray `--accent`.

3. **Named practice presets**
   - Quick-start presets like:
     - "Slow blues shuffle in A, 72 BPM"
     - "Alternating bass, 100 BPM"
     - "Thumb-control drill, 80 BPM, 2-on/2-off mute"

---

## Suggested implementation order

1. **Sound config panel** — small UI-only change, big payoff.
2. **Per-song BPM persistence** — requested explicitly; fits the existing `active-session.ts` pattern.
3. **Mute bars** — the core tempo-check feature; requires scheduler bar tracking.
4. **Swing / subdivisions** — unlocks blues feel.
5. **Tap tempo + keyboard shortcuts** — makes the UI fast mid-practice.
6. **Full presets + named routines** — ties everything together.

---

## Architectural notes

- All scheduler-related config (BPM, swing, volumes, waveform, mute state) should be stored in refs that mirror state, so the scheduler can read live values without restarting.
- The mute feature should schedule silence rather than stopping the scheduler, keeping the audio clock as the reference so the click returns exactly on beat 1.
- For swung subdivisions, schedule off-beats using a shuffle offset formula rather than a straight grid.
- Avoid `ssr: false` wrappers; keep components as `'use client'` and fail fast if `window` or Web Audio are unavailable.
