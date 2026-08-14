'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SongTypeahead } from '@/components/song-typeahead'
import { GoalTypeahead } from '@/components/goal-typeahead'
import { SongDetails } from '@/components/song-details'
import {
  saveActiveSession,
  clearPrefill,
  getPrefill,
  type ActiveSession,
} from '@/lib/active-session'
import { getSongById } from '@/app/actions/songs'
import { getGoalById, createGoal } from '@/app/actions/goals'
import { getLastSessionForPickup } from '@/app/actions/sessions'
import { TUNING_LABELS, KEY_LABELS, THUMB_STYLE_LABELS } from '@/lib/constants'
import { SongInfo } from '@/components/song-details'

import { TemplatePicker, type SessionTemplate } from '@/components/template-picker'

function readPrefill(): Partial<ActiveSession> | null {
  if (typeof window === 'undefined') return null
  return getPrefill()
}

type PickupData = {
  intention: string
  songId?: string
  songTitle?: string
  songTuning?: string
  songKey?: string | null
  songThumbStyle?: string | null
  goalId?: string
  goalName?: string
  templateId?: string
  templateName?: string
  templateShowMetronome?: boolean
  templateShowSongPicker?: boolean
  templateShowGoalPicker?: boolean
  templateChecklistItems?: SessionTemplate['checklistItems']
}

function prefillToPickupData(prefill: Partial<ActiveSession>): PickupData {
  return {
    intention: prefill.intention ?? '',
    songId: prefill.songId,
    songTitle: prefill.songTitle,
    songTuning: prefill.tuning,
    songKey: prefill.key ?? null,
    songThumbStyle: prefill.thumbStyle ?? null,
    goalId: prefill.goalId,
    goalName: prefill.goalName,
    templateId: prefill.templateId,
    templateName: prefill.templateName,
    templateShowMetronome: prefill.templateShowMetronome,
    templateShowSongPicker: prefill.templateShowSongPicker,
    templateShowGoalPicker: prefill.templateShowGoalPicker,
    templateChecklistItems: prefill.templateChecklistItems,
  }
}

function sessionToPickupData(
  session: Awaited<ReturnType<typeof getLastSessionForPickup>>
): PickupData | null {
  if (!session) return null
  return {
    intention: session.pickup ?? session.intention ?? '',
    songId: session.songId ?? undefined,
    songTitle: session.song?.title ?? undefined,
    songTuning: session.song?.tuning ?? undefined,
    songKey: session.song?.key ?? null,
    songThumbStyle: session.song?.thumbStyle ?? null,
    goalId: session.goalId ?? undefined,
    goalName: session.goal?.name ?? undefined,
    templateId: session.templateId ?? undefined,
    templateName: session.template?.name ?? undefined,
    templateShowMetronome: session.template?.showMetronome ?? true,
    templateShowSongPicker: session.template?.showSongPicker ?? true,
    templateShowGoalPicker: session.template?.showGoalPicker ?? true,
    templateChecklistItems:
      (session.template?.checklistItems as SessionTemplate['checklistItems']) ?? null,
  }
}

function computeTemplateFromPickupData(data: PickupData): SessionTemplate | null {
  if (!data.templateId || !data.templateName) return null
  return {
    id: data.templateId,
    name: data.templateName,
    showMetronome: data.templateShowMetronome ?? true,
    showSongPicker: data.templateShowSongPicker ?? true,
    showGoalPicker: data.templateShowGoalPicker ?? true,
    checklistItems: data.templateChecklistItems ?? null,
  }
}

function computeSongFromPickupData(data: PickupData | null): SongInfo | null {
  if (!data?.songId || !data.songTitle) return null
  return {
    id: data.songId,
    title: data.songTitle,
    tuning: (data.songTuning as SongInfo['tuning']) ?? 'STANDARD',
    key: (data.songKey as SongInfo['key']) ?? null,
    thumbStyle: (data.songThumbStyle as SongInfo['thumbStyle']) ?? null,
  }
}

function computeGoalFromPickupData(
  data: PickupData | null
): { id: string; name: string } | null {
  if (!data?.goalId || !data.goalName) return null
  return { id: data.goalId, name: data.goalName }
}

export default function NewSessionPage() {
  const router = useRouter()
  const [prefill] = useState<Partial<ActiveSession> | null>(() => readPrefill())

  const autoAppliedData = prefill?.autoApply ? prefillToPickupData(prefill) : null
  const prefillBannerData =
    prefill && !prefill.autoApply ? prefillToPickupData(prefill) : null

  const [template, setTemplate] = useState<SessionTemplate | null>(() =>
    autoAppliedData ? computeTemplateFromPickupData(autoAppliedData) : null
  )
  const [song, setSong] = useState<SongInfo | null>(() =>
    autoAppliedData
      ? computeSongFromPickupData(autoAppliedData)
      : computeSongFromPickupData(prefillBannerData)
  )
  const [intention, setIntention] = useState(() => autoAppliedData?.intention ?? '')
  const [goal, setGoal] = useState<{ id: string; name: string } | null>(() =>
    autoAppliedData
      ? computeGoalFromPickupData(autoAppliedData)
      : computeGoalFromPickupData(prefillBannerData)
  )

  const [pickupData, setPickupData] = useState<PickupData | null>(prefillBannerData)
  const [loadingPickup, setLoadingPickup] = useState(() => !prefill)
  const [showBanner, setShowBanner] = useState(() => {
    if (prefill?.autoApply) return false
    if (prefill) return !!(prefill.intention || prefill.templateId || prefill.goalId)
    return true
  })

  const [editing, setEditing] = useState(false)
  const [isCreatingGoal, setIsCreatingGoal] = useState(false)
  const [newGoalName, setNewGoalName] = useState('')

  const applyPickupData = useCallback((data: PickupData) => {
    setTemplate(computeTemplateFromPickupData(data))
    setSong(computeSongFromPickupData(data))
    setIntention(data.intention)
    setGoal(computeGoalFromPickupData(data))
  }, [])

  function startFresh() {
    clearPrefill()
    setPickupData(null)
    setShowBanner(false)
    setTemplate(null)
    setSong(null)
    setIntention('')
    setGoal(null)
  }

  useEffect(() => {
    if (prefill) return

    // No prefill — fetch the last session so the user can choose to pick up.
    getLastSessionForPickup().then((session) => {
      const data = sessionToPickupData(session)
      if (data?.intention || data?.songTitle || data?.templateName || data?.goalName) {
        setPickupData(data)
        setShowBanner(true)
      } else {
        setShowBanner(false)
      }
      setLoadingPickup(false)
    })
  }, [prefill])

  function handleUseSettings() {
    if (!pickupData) return
    applyPickupData(pickupData)
    setShowBanner(false)
  }

  async function handleSongSelect(id: string, title: string) {
    const result = id ? await getSongById(id) : null
    if (result) {
      setSong({
        id,
        title,
        tuning: result.tuning,
        key: result.key ?? null,
        thumbStyle: result.thumbStyle ?? null,
      })
    } else {
      // New song not yet in db — no tuning/key yet
      setSong({ id: '', title, tuning: 'STANDARD', key: null, thumbStyle: null })
    }
    setEditing(false)
  }

  async function handleGoalSelect(id: string, name: string) {
    const result = id ? await getGoalById(id) : null
    if (result) {
      setGoal({ id, name })
    } else {
      // New goal not yet in db — no tuning/key yet
      setGoal({ id: '', name })
    }
  }

  function handleStart(destination: '/prepare' | '/sessions/active') {
    if (!intention.trim()) return
    saveActiveSession({
      intention: intention.trim(),
      songId: song?.id,
      songTitle: song?.title,
      goalId: goal?.id,
      goalName: goal?.name,
      tuning: song?.tuning ?? undefined,
      key: song?.key ?? undefined,
      thumbStyle: song?.thumbStyle ?? undefined,
      templateId: template?.id,
      templateName: template?.name,
      templateChecklistItems: template?.checklistItems ?? undefined,
      templateShowMetronome: template?.showMetronome,
      templateShowSongPicker: template?.showSongPicker,
      templateShowGoalPicker: template?.showGoalPicker,
    })
    clearPrefill()
    router.push(destination)
  }

  async function handleCreateGoal() {
    const created = await createGoal(newGoalName)
    setGoal({ id: created.id, name: created.name })
    setIsCreatingGoal(false)
    setNewGoalName('')
  }

  function handleCancelCreate() {
    setIsCreatingGoal(false)
    setNewGoalName('')
  }

  const bannerDetails = pickupData
    ? [
        pickupData.songTitle,
        pickupData.templateName,
        pickupData.goalName,
      ].filter(Boolean)
    : []

  return (
    <main className="max-w-xl mx-auto p-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold">New Session</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Set your intention before you play.
        </p>
      </div>

      {loadingPickup && (
        <div className="text-sm text-muted-foreground">Loading previous session…</div>
      )}

      {showBanner && pickupData && (
        <div className="rounded-lg bg-[#FBF0EB]/60 p-5 space-y-3 border border-[#B85C2A]/20">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            Pick up where you left off?
          </p>
          {pickupData.intention && (
            <p
              className="text-sm font-medium leading-snug"
              style={{ borderLeft: '2px solid #B85C2A', paddingLeft: '0.75rem' }}
            >
              {pickupData.intention}
            </p>
          )}
          {bannerDetails.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {bannerDetails.join(' · ')}
            </p>
          )}
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              variant="warm"
              size="sm"
              onClick={handleUseSettings}
              className="w-full sm:w-auto"
            >
              Use these settings
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={startFresh}
              className="w-full sm:w-auto"
            >
              Start fresh
            </Button>
          </div>
        </div>
      )}

      {/* Template */}
      <div className="space-y-2">
        <Label className="text-base font-semibold">Practice mode</Label>
        <p className="text-sm text-muted-foreground">
          Optional. Choose a template to hide fields you don&apos;t need this session.
        </p>
        <TemplatePicker
          onSelect={setTemplate}
          initialTemplate={
            template ? { id: template.id, name: template.name } : null
          }
        />
      </div>

      {/* Song */}
      {(!template || template.showSongPicker) && (
        <div className="space-y-2">
          <Label className="text-base font-semibold">Song</Label>
          <SongTypeahead onSelect={handleSongSelect} defaultValue={song?.title} />

          {/* Tuning + key + thumb style — read only with edit toggle */}
          {song && !editing && song.tuning && (
            <div className="flex items-center gap-3 pt-1 flex-wrap">
              <span className="text-sm text-muted-foreground">
                {TUNING_LABELS[song.tuning]}
                {song.key && ` · ${KEY_LABELS[song.key]}`}
                {song.thumbStyle && ` · ${THUMB_STYLE_LABELS[song.thumbStyle]}`}
              </span>
              <button
                type="button"
                onClick={() => setEditing(true)}
                className="text-xs text-primary hover:underline"
              >
                edit
              </button>
            </div>
          )}

          {/* Inline edit form */}
          {song && editing && (
            <SongDetails
              song={song}
              onSave={(updated) => {
                setSong(updated)
                setEditing(false)
              }}
              onCancel={() => setEditing(false)}
            />
          )}
        </div>
      )}

      {/* Goal section */}
      {(!template || template.showGoalPicker) && (
        <div className="space-y-2">
          <Label className="text-base font-semibold">Goal</Label>

          {!isCreatingGoal ? (
            <>
              <GoalTypeahead
                initialGoal={goal ?? undefined}
                onSelect={handleGoalSelect}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCreatingGoal(true)}
              >
                New Goal
              </Button>
            </>
          ) : (
            <div className="space-y-2">
              <Input
                value={newGoalName}
                onChange={(e) => setNewGoalName(e.target.value)}
                placeholder="e.g. Improvisation"
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={handleCreateGoal}
                  disabled={!newGoalName.trim()}
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCancelCreate}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Intention */}
      <div className="space-y-2">
        <Label htmlFor="intention" className="text-base font-semibold">
          What do you want to work on?
        </Label>
        <p className="text-sm text-muted-foreground">
          {'Be specific. "nail the bridge at 80bpm" beats "practice song."'}
        </p>
        <Textarea
          id="intention"
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
          placeholder="e.g. Work through the chord transitions in the chorus slowly, hands separate"
          className="min-h-[100px] text-base"
          rows={3}
          autoFocus
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button
          onClick={() => handleStart('/prepare')}
          disabled={!intention.trim()}
          size="lg"
          className="w-full"
        >
          Prepare then start
        </Button>
        <Button
          onClick={() => handleStart('/sessions/active')}
          disabled={!intention.trim()}
          variant="outline"
          size="lg"
          className="w-full"
        >
          Skip preparation
        </Button>
      </div>
    </main>
  )
}
