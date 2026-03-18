// Client-side only — do not import in server components or actions
import { Tuning, Key } from "../../prisma/generated/prisma"

const STORAGE_KEY = 'reprise_active_session'

export type ActiveSession = {
  startedAt?: number
  intention: string
  songId?: string
  songTitle?: string
  tuning?: Tuning
  key?: Key
  goalId?: string
  goalName?: string
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