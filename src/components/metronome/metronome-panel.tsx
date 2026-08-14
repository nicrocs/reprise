'use client';

import { useCallback } from 'react';
import { useMetronome } from '@/lib/metronome/use-metronome';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const TIME_SIGNATURES = [2, 3, 4, 5, 6];

interface MetronomePanelProps {
  initialBpm?: number;
  onBpmChange?: (bpm: number) => void;
  onBpmCommit?: (bpm: number) => void;
}

export function MetronomePanel({ initialBpm, onBpmChange, onBpmCommit }: MetronomePanelProps) {
  const {
    bpm,
    setBpm,
    beatsPerMeasure,
    setBeatsPerMeasure,
    accentBeats,
    toggleAccent,
    isPlaying,
    currentBeat,
    start,
    stop,
  } = useMetronome({
    initialBpm,
    initialBeatsPerMeasure: 4,
    initialAccentBeats: [2, 4], // backbeat by default
  });

  const handleBpmChange = useCallback(
    (value: number) => {
      setBpm(value);
      onBpmChange?.(value);
    },
    [setBpm, onBpmChange]
  );

  const handleBpmCommit = useCallback(
    (value: number) => {
      onBpmCommit?.(value);
    },
    [onBpmCommit]
  );

  return (
    <div className="rounded-lg border border-black/10 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium">Metronome</span>
        <Button size="sm" onClick={isPlaying ? stop : start}>
          {isPlaying ? 'Stop' : 'Start'}
        </Button>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <span className="w-14 shrink-0 text-xs text-muted-foreground">{bpm} bpm</span>
        <Slider
          min={40}
          max={240}
          step={1}
          value={[bpm]}
          onValueChange={([v]) => handleBpmChange(v)}
          onValueCommit={([v]) => handleBpmCommit(v)}
        />
      </div>

      <div className="mb-4 flex items-center gap-3">
        <span className="text-xs text-muted-foreground">Beats per measure</span>
        <Select
          value={String(beatsPerMeasure)}
          onValueChange={(v) => setBeatsPerMeasure(Number(v))}
        >
          <SelectTrigger className="h-7 w-16 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TIME_SIGNATURES.map((n) => (
              <SelectItem key={n} value={String(n)}>
                {n}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        {Array.from({ length: beatsPerMeasure }, (_, i) => i + 1).map((beat) => (
          <button
            key={beat}
            type="button"
            onClick={() => toggleAccent(beat)}
            className={[
              'h-8 w-8 rounded-full border text-xs font-medium transition-colors',
              accentBeats.includes(beat)
                ? 'border-transparent bg-[var(--accent)] text-white'
                : 'border-black/10 bg-transparent text-muted-foreground',
              currentBeat === beat ? 'ring-2 ring-[var(--accent)] ring-offset-1' : '',
            ].join(' ')}
          >
            {beat}
          </button>
        ))}
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground">
        Tap a beat to toggle its accent. Beats 2 and 4 are accented by default.
      </p>
    </div>
  );
}
