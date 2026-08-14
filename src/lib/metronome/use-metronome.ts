'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

// Scheduler constants based on the standard "lookahead" pattern for
// sample-accurate Web Audio timing (setInterval/setTimeout alone drift).
const LOOKAHEAD_MS = 25;
const SCHEDULE_AHEAD_S = 0.1;

interface UseMetronomeOptions {
  initialBpm?: number;
  initialBeatsPerMeasure?: number;
  /** 1-indexed beat numbers that should be accented, e.g. [2, 4] for backbeat */
  initialAccentBeats?: number[];
}

export function useMetronome({
  initialBpm = 120,
  initialBeatsPerMeasure = 4,
  initialAccentBeats = [2, 4],
}: UseMetronomeOptions = {}) {
  const [bpm, setBpm] = useState(initialBpm);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(initialBeatsPerMeasure);
  const [accentBeats, setAccentBeats] = useState<number[]>(initialAccentBeats);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState<number | null>(null);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const nextNoteTimeRef = useRef(0);
  const currentBeatRef = useRef(0);
  const timerIdRef = useRef<number | null>(null);
  const isStartingRef = useRef(false);
  const pendingUITimeoutsRef = useRef<number[]>([]);

  // Scheduler runs in its own timeout loop, so it reads these refs rather
  // than closed-over state to pick up live changes (bpm, accents) mid-play.
  const bpmRef = useRef(bpm);
  const beatsPerMeasureRef = useRef(beatsPerMeasure);
  const accentBeatsRef = useRef(accentBeats);

  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  useEffect(() => {
    beatsPerMeasureRef.current = beatsPerMeasure;
    currentBeatRef.current = 0;
    // drop accents that no longer exist if the measure shrinks
    setAccentBeats((prev) => prev.filter((b) => b <= beatsPerMeasure));
  }, [beatsPerMeasure]);

  useEffect(() => {
    accentBeatsRef.current = accentBeats;
  }, [accentBeats]);

  const scheduleClick = useCallback((beatIndex: number, time: number) => {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const beatNumber = beatIndex + 1;
    const isAccent = accentBeatsRef.current.includes(beatNumber);

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = isAccent ? 1400 : 900;
    osc.connect(gain);
    gain.connect(ctx.destination);

    const peakGain = isAccent ? 0.35 : 0.18;
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(peakGain, time + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    osc.start(time);
    osc.stop(time + 0.05);

    const delayMs = Math.max(0, (time - ctx.currentTime) * 1000);
    const uiTimeout = window.setTimeout(() => {
      setCurrentBeat(beatNumber);
      pendingUITimeoutsRef.current = pendingUITimeoutsRef.current.filter((id) => id !== uiTimeout);
    }, delayMs);
    pendingUITimeoutsRef.current.push(uiTimeout);
  }, []);

  const scheduler = useCallback(function scheduler() {
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    while (nextNoteTimeRef.current < ctx.currentTime + SCHEDULE_AHEAD_S) {
      scheduleClick(currentBeatRef.current, nextNoteTimeRef.current);
      const secondsPerBeat = 60 / bpmRef.current;
      nextNoteTimeRef.current += secondsPerBeat;
      currentBeatRef.current = (currentBeatRef.current + 1) % beatsPerMeasureRef.current;
    }

    timerIdRef.current = window.setTimeout(scheduler, LOOKAHEAD_MS);
  }, [scheduleClick]);

  const start = useCallback(async () => {
    if (isPlaying || isStartingRef.current) return;
    isStartingRef.current = true;
    try {
      const AudioCtx =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;
      currentBeatRef.current = 0;
      nextNoteTimeRef.current = ctx.currentTime + 0.05;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }
      setIsPlaying(true);
      scheduler();
    } finally {
      isStartingRef.current = false;
    }
  }, [isPlaying, scheduler]);

  const stop = useCallback(() => {
    if (timerIdRef.current !== null) window.clearTimeout(timerIdRef.current);
    pendingUITimeoutsRef.current.forEach((id) => window.clearTimeout(id));
    pendingUITimeoutsRef.current = [];
    audioCtxRef.current?.close();
    audioCtxRef.current = null;
    setIsPlaying(false);
    setCurrentBeat(null);
  }, []);

  const toggleAccent = useCallback((beat: number) => {
    setAccentBeats((prev) =>
      prev.includes(beat) ? prev.filter((b) => b !== beat) : [...prev, beat].sort((a, b) => a - b)
    );
  }, []);

  // stop cleanly if the component unmounts mid-play
  useEffect(() => stop, [stop]);

  return {
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
  };
}
