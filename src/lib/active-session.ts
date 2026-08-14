// Client-side only — do not import in server components or actions
import { Tuning, Key, ThumbStyle } from "../../prisma/generated/prisma"
import type { ChecklistItem, ChecklistAnswers } from "./types"

const STORAGE_KEY = 'reprise_active_session'

export type ActiveSession = {
  startedAt?: number
  intention: string
  songId?: string
  songTitle?: string
  tuning?: Tuning
  key?: Key
  thumbStyle?: ThumbStyle
  goalId?: string
  goalName?: string
  templateId?: string
  templateName?: string
  templateChecklistItems?: ChecklistItem[]
  templateShowMetronome?: boolean
  templateShowSongPicker?: boolean
  templateShowGoalPicker?: boolean
  checklistAnswers?: ChecklistAnswers
  bpm?: number
  /** When true, the prefill should be applied immediately without showing a choice banner. */
  autoApply?: boolean
}

export function saveActiveSession(session: ActiveSession): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

export function getActiveSession(): ActiveSession | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as ActiveSession
  } catch {
    return null
  }
}

export function clearActiveSession(): void {
  localStorage.removeItem(STORAGE_KEY)
}

export function hasActiveSession(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null
}

export function savePrefill(data: Partial<ActiveSession>) {
  localStorage.setItem(`${STORAGE_KEY}:prefill`, JSON.stringify(data))
}

export function getPrefill(): Partial<ActiveSession> | null {
  const raw = localStorage.getItem(`${STORAGE_KEY}:prefill`)
  return raw ? JSON.parse(raw) : null
}

export function clearPrefill() {
  localStorage.removeItem(`${STORAGE_KEY}:prefill`)
}