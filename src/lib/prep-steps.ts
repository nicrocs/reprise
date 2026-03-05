import { type PrepStep } from '@/components/guided-prep'

// A sequence drawing on Kenny Werner (Effortless Mastery),
// Philip Toshio Sudo (Zen Guitar), and Madeleine Bruser (The Art of Practicing)

export const WERNER_PREP_STEPS: PrepStep[] = [
  // Enter the space — Sudo
  {
    text: 'You are entering the dojo.\nLeave everything else outside.',
    durationMs: 5000,
  },
  // Ground the body — Bruser
  {
    text: 'Stand or sit with your feet rooted\nthrough the balls of your feet.\nFeel the ground supporting you.',
    durationMs: 6000,
  },
  // Breathe — Werner / Bruser
  {
    text: 'Take a slow, deep breath.\nImagine someone else is breathing for you.\nYou are not in control of this.',
    durationMs: 7000,
  },
  // Release the body — Bruser
  {
    text: 'Soften your jaw.\nDrop your shoulders.\nLet your arms hang heavy.',
    durationMs: 6000,
  },
  // Scan from head to feet — Werner
  {
    text: 'Slowly relax every muscle.\nFrom the top of your head\nto the soles of your feet.',
    durationMs: 7000,
  },
  // Let go of the outcome — Werner
  {
    text: 'Let go of the need to play well.\nLet go of where you are\nin relation to where you want to be.',
    durationMs: 7000,
  },
  // Fear as energy — Bruser
  {
    text: 'If you feel nervous or resistant,\nthat is energy.\nIt does not need to be pushed away.',
    durationMs: 6000,
  },
  // Beginner's mind — Sudo
  {
    text: 'You have never played this before.\nNot like this.\nNot in this moment.',
    durationMs: 6000,
  },
  // The voice / instrument — Werner
  {
    text: 'Rest your fingers on the strings.\nNo grip. No effort.\nJust the weight of your hands.',
    durationMs: 6000,
  },
  // The silence before the note — Sudo
  {
    text: 'The silence before you play\nis part of the music.\nLet it be.',
    durationMs: 6000,
  },
  // Ready — open
  {
    text: 'You are ready.\nNot because you are good enough.\nBecause you are here.',
    durationMs: 5000,
  },
]

// A shorter version for days when you just need a moment
export const SHORT_PREP_STEPS: PrepStep[] = [
  {
    text: 'Leave everything outside.\nYou are here now.',
    durationMs: 5000,
  },
  {
    text: 'Take one slow breath.\nLet your shoulders drop.',
    durationMs: 5000,
  },
  {
    text: 'Rest your hands on the instrument.\nNo effort. Just presence.',
    durationMs: 5000,
  },
  {
    text: 'You are ready.',
    durationMs: 3000,
  },
]