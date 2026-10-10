'use client'

import { useEffect, useRef, useState } from 'react'
import { Expand, Pause, Play, Repeat2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export type SongScoreInfo = {
  id: string
  label: string
  alphaTex: string
}

type LoopSelection = { kind: 'whole-section' } | null

type Props = {
  scores: SongScoreInfo[]
}

const ALPHATAB_VERSION = '1.8.4'
const ALPHATAB_ASSET_BASE = `https://cdn.jsdelivr.net/npm/@coderline/alphatab@${ALPHATAB_VERSION}/dist`
const ALPHATAB_WORKER_PATH = '/alphatab-assets/alphaTab.js'
const SPEED_OPTIONS = [70, 80, 90, 100]

function applyLoopSelection(
  api: { isLooping: boolean; playbackRange: { startTick: number; endTick: number } | null },
  selection: LoopSelection,
) {
  api.isLooping = selection?.kind === 'whole-section'
  api.playbackRange = null
}

export function SongScorePlayer({ scores }: Props) {
  const [selectedId, setSelectedId] = useState(scores[0]?.id ?? '')
  const [playbackSpeed, setPlaybackSpeed] = useState(100)
  const [loopSelection, setLoopSelection] = useState<LoopSelection>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRendered, setIsRendered] = useState(false)
  const [isPlayerReady, setIsPlayerReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [scoreElement, setScoreElement] = useState<HTMLDivElement | null>(null)
  const apiRef = useRef<import('@coderline/alphatab').AlphaTabApi | null>(null)
  const playerSettingsRef = useRef({ playbackSpeed, loopSelection })
  playerSettingsRef.current = { playbackSpeed, loopSelection }

  const selectedScore = scores.find((score) => score.id === selectedId) ?? scores[0]

  useEffect(() => {
    if (!selectedScore || !scoreElement) return

    const element = scoreElement
    let cancelled = false
    let api: import('@coderline/alphatab').AlphaTabApi | null = null
    const unsubscribe: Array<() => void> = []

    setIsRendered(false)
    setIsPlayerReady(false)
    setIsPlaying(false)
    setError(null)

    async function initializePlayer() {
      try {
        const alphaTab = await import('@coderline/alphatab')
        if (cancelled) return

        api = new alphaTab.AlphaTabApi(element, {
          core: {
            tex: true,
            useWorkers: true,
            scriptFile: new URL(ALPHATAB_WORKER_PATH, window.location.href).href,
            fontDirectory: `${ALPHATAB_ASSET_BASE}/font/`,
          },
          player: {
            playerMode: alphaTab.PlayerMode.EnabledAutomatic,
            enableUserInteraction: false,
            soundFont: `${ALPHATAB_ASSET_BASE}/soundfont/sonivox.sf2`,
            scrollElement: element,
          },
        })
        apiRef.current = api
        api.playbackSpeed = playerSettingsRef.current.playbackSpeed / 100
        applyLoopSelection(api, playerSettingsRef.current.loopSelection)

        unsubscribe.push(
          api.renderFinished.on(() => setIsRendered(true)),
          api.playerReady.on(() => setIsPlayerReady(true)),
          api.playerStateChanged.on((state) => {
            setIsPlaying(state.state === alphaTab.synth.PlayerState.Playing)
          }),
          api.error.on((reason) => {
            setError(`Could not load this score or its audio: ${reason.message}`)
          }),
        )

        const soundFontLoadFailed = api.player?.soundFontLoadFailed
        if (soundFontLoadFailed) {
          unsubscribe.push(
            soundFontLoadFailed.on((reason) => {
              setError(`Could not load the player soundfont: ${reason.message}`)
            }),
          )
        }

        api.tex(selectedScore.alphaTex)
      } catch (reason) {
        if (cancelled) return
        setError(
          reason instanceof Error
            ? `Could not initialize the score player: ${reason.message}`
            : 'Could not initialize the score player.',
        )
      }
    }

    void initializePlayer()

    return () => {
      cancelled = true
      unsubscribe.forEach((unsubscribeEvent) => unsubscribeEvent())
      if (api) {
        api.stop()
        api.destroy()
      }
      if (apiRef.current === api) apiRef.current = null
    }
  }, [isExpanded, scoreElement, selectedScore])

  function selectScore(id: string) {
    apiRef.current?.stop()
    setSelectedId(id)
    setPlaybackSpeed(100)
    setLoopSelection(null)
    setIsPlaying(false)
    setIsRendered(false)
    setIsPlayerReady(false)
    setError(null)
  }

  function changePlaybackSpeed(value: number) {
    setPlaybackSpeed(value)
    if (apiRef.current) apiRef.current.playbackSpeed = value / 100
  }

  function changeLoopSelection(selection: LoopSelection) {
    setLoopSelection(selection)
    if (apiRef.current) applyLoopSelection(apiRef.current, selection)
  }

  if (!selectedScore) {
    return (
      <section className="mb-8 rounded-lg border border-border p-4">
        <h2 className="text-xs uppercase tracking-widest text-muted-foreground">Score player</h2>
        <p className="mt-2 text-sm text-muted-foreground">No score sections have been imported yet.</p>
      </section>
    )
  }

  const loading = !error && (!isRendered || !isPlayerReady)

  const playerContent = (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Score player</p>
          <h2 className="mt-1 text-base font-medium">{selectedScore.label}</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {scores.length > 1 && (
            <div className="flex items-center gap-2">
              <label htmlFor="song-score-section" className="text-sm text-muted-foreground">Section</label>
              <select
                id="song-score-section"
                value={selectedScore.id}
                onChange={(event) => selectScore(event.target.value)}
                className="h-9 max-w-56 rounded-md border border-border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {scores.map((score) => (
                  <option key={score.id} value={score.id}>{score.label}</option>
                ))}
              </select>
            </div>
          )}
          {isExpanded ? (
            <DialogClose asChild>
              <Button type="button" variant="outline" size="icon" aria-label="Close expanded player">
                <X />
              </Button>
            </DialogClose>
          ) : (
            <DialogTrigger asChild>
              <Button type="button" variant="outline" size="sm">
                <Expand />
                Expand
              </Button>
            </DialogTrigger>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-muted/30 px-4 py-3">
        <Button
          type="button"
          size="sm"
          variant="warm"
          onClick={() => apiRef.current?.playPause()}
          disabled={!isPlayerReady || Boolean(error)}
          aria-label={isPlaying ? 'Pause playback' : 'Start playback'}
        >
          {isPlaying ? <Pause /> : <Play />}
          {isPlaying ? 'Pause' : 'Play'}
        </Button>

        <label htmlFor="song-score-speed" className="ml-2 text-sm text-muted-foreground">Speed</label>
        <select
          id="song-score-speed"
          value={playbackSpeed}
          onChange={(event) => changePlaybackSpeed(Number(event.target.value))}
          disabled={!isPlayerReady || Boolean(error)}
          className="h-8 rounded-md border border-border bg-background px-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {SPEED_OPTIONS.map((speed) => (
            <option key={speed} value={speed}>{speed}%</option>
          ))}
        </select>

        <Button
          type="button"
          size="sm"
          variant={loopSelection?.kind === 'whole-section' ? 'secondary' : 'outline'}
          onClick={() => changeLoopSelection(loopSelection ? null : { kind: 'whole-section' })}
          disabled={!isPlayerReady || Boolean(error)}
          aria-pressed={loopSelection?.kind === 'whole-section'}
        >
          <Repeat2 />
          Repeat section
        </Button>

        <p className="ml-auto min-w-32 text-right text-xs text-muted-foreground" role="status" aria-live="polite">
          {loading ? 'Preparing notation and audio…' : error ? 'Player unavailable' : 'Ready to play'}
        </p>
      </div>

      {error && (
        <p role="alert" className="border-b border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div
        ref={setScoreElement}
        className={isExpanded
          ? 'box-border min-h-0 w-full min-w-0 max-w-full flex-1 overflow-auto bg-background px-3 py-5 sm:px-5'
          : 'box-border max-h-[70vh] min-h-48 w-full min-w-0 max-w-full overflow-auto bg-background px-3 py-5 sm:px-5'}
        aria-label={`${selectedScore.label} notation`}
      />
    </>
  )

  return (
    <Dialog open={isExpanded} onOpenChange={setIsExpanded}>
      {isExpanded ? (
        <DialogContent
          showCloseButton={false}
          className="inset-2 left-2 right-2 top-2 bottom-2 flex h-auto min-h-0 w-auto min-w-0 max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-lg border p-0 sm:max-w-none"
        >
          <DialogTitle className="sr-only">Expanded score player: {selectedScore.label}</DialogTitle>
          <DialogDescription className="sr-only">
            Full-screen notation with section, speed, repeat, and playback controls.
          </DialogDescription>
          <section className="flex h-full min-h-0 w-full min-w-0 flex-col bg-card">
            {playerContent}
          </section>
        </DialogContent>
      ) : (
        <section className="mb-8 flex w-full min-w-0 max-w-full flex-col overflow-hidden rounded-lg border border-border bg-card">
          {playerContent}
        </section>
      )}
    </Dialog>
  )
}
