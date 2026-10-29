import { useSyncExternalStore } from 'react'

/**
 * Consent store (§ 25 TDDDG / Art. 7 GDPR). Only the visitor's own choice is persisted
 * (version, categories, timestamp) — it is the proof that a choice was made and is needed
 * to respect it on later visits. "Necessary" is always on and is not stored as a choice.
 */
const KEY = 'consent_preferences'
const VERSION = 1

export interface Consent { v: number; analytics: boolean; ts: number }

const listeners = new Set<() => void>()
let preferencesOpen = false
const emit = () => listeners.forEach(l => l())

function read(): Consent | null {
  try {
    // Legacy key of the previous banner ("continuing = accepted") was never valid consent for anything optional.
    localStorage.removeItem('cookie_consent')
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const c = JSON.parse(raw) as Consent
    return c.v === VERSION && typeof c.analytics === 'boolean' ? c : null
  } catch {
    return null
  }
}

let cache: Consent | null = read()

export function setConsent(analytics: boolean) {
  cache = { v: VERSION, analytics, ts: Date.now() }
  try { localStorage.setItem(KEY, JSON.stringify(cache)) } catch { /* storage blocked: choice only lasts for this visit */ }
  preferencesOpen = false
  emit()
}

export function openPreferences() { preferencesOpen = true; emit() }
export function closePreferences() { preferencesOpen = false; emit() }

const subscribe = (cb: () => void) => { listeners.add(cb); return () => { listeners.delete(cb) } }
export const getConsent = () => cache
export const useConsent = () => useSyncExternalStore(subscribe, () => cache)
export const usePreferencesOpen = () => useSyncExternalStore(subscribe, () => preferencesOpen)
