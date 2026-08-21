import type { LocalClip, VideoSource } from "../types.js";

export interface ChromeStorageArea {
  get(
    keys: string | string[] | Record<string, unknown> | null,
    callback: (result: Record<string, unknown>) => void,
  ): void;
  set(items: Record<string, unknown>, callback?: () => void): void;
  remove(keys: string | string[], callback?: () => void): void;
}

function getLastError(): chrome.runtime.LastError | undefined {
  return typeof chrome !== "undefined" ? chrome.runtime?.lastError : undefined;
}

export function storageKey(source: VideoSource, externalId: string): string {
  return `clips:${source}:${externalId}`;
}

export function getClips(
  source: VideoSource,
  externalId: string,
  storage: ChromeStorageArea = chrome.storage.local,
): Promise<LocalClip[]> {
  return new Promise((resolve, reject) => {
    storage.get(storageKey(source, externalId), (result) => {
      const lastError = getLastError();
      if (lastError) {
        reject(new Error(lastError.message));
        return;
      }
      const clips = result[storageKey(source, externalId)] as unknown;
      resolve(Array.isArray(clips) ? (clips as LocalClip[]) : []);
    });
  });
}

export function saveClip(
  clip: LocalClip,
  storage: ChromeStorageArea = chrome.storage.local,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const key = storageKey(clip.source, clip.externalId);
    storage.get(key, (result) => {
      const getError = getLastError();
      if (getError) {
        reject(new Error(getError.message));
        return;
      }
      const existing: LocalClip[] = Array.isArray(result[key]) ? (result[key] as LocalClip[]) : [];
      const index = existing.findIndex((c) => c.id === clip.id);
      const updated =
        index >= 0
          ? [
              ...existing.slice(0, index),
              { ...clip, updatedAt: Date.now() },
              ...existing.slice(index + 1),
            ]
          : [{ ...clip, updatedAt: Date.now() }, ...existing];

      storage.set({ [key]: updated }, () => {
        const setError = getLastError();
        if (setError) {
          reject(new Error(setError.message));
          return;
        }
        resolve();
      });
    });
  });
}

export function deleteClip(
  clip: LocalClip,
  storage: ChromeStorageArea = chrome.storage.local,
): Promise<void> {
  return new Promise((resolve, reject) => {
    const key = storageKey(clip.source, clip.externalId);
    storage.get(key, (result) => {
      const getError = getLastError();
      if (getError) {
        reject(new Error(getError.message));
        return;
      }
      const existing: LocalClip[] = Array.isArray(result[key]) ? (result[key] as LocalClip[]) : [];
      const filtered = existing.filter((c) => c.id !== clip.id);

      if (filtered.length === existing.length) {
        resolve();
        return;
      }

      if (filtered.length === 0) {
        storage.remove(key, () => {
          const removeError = getLastError();
          if (removeError) {
            reject(new Error(removeError.message));
            return;
          }
          resolve();
        });
        return;
      }

      storage.set({ [key]: filtered }, () => {
        const setError = getLastError();
        if (setError) {
          reject(new Error(setError.message));
          return;
        }
        resolve();
      });
    });
  });
}
