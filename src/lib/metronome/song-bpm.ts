// Client-side only — do not import in server components or actions
const STORAGE_KEY = 'reprise_song_bpm';

export function saveSongBpm(songId: string, bpm: number): void {
  const all = getAllSongBpms();
  all[songId] = Math.round(bpm);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

export function getSongBpm(songId: string): number | null {
  const bpm = getAllSongBpms()[songId];
  return typeof bpm === 'number' ? bpm : null;
}

export function deleteSongBpm(songId: string): void {
  const all = getAllSongBpms();
  delete all[songId];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

function getAllSongBpms(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, number>;
  } catch {
    return {};
  }
}
