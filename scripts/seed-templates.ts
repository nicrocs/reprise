import { PrismaClient } from '../prisma/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import * as dotenv from 'dotenv'
import { ChecklistItem } from '../src/lib/types'

dotenv.config({ path: '.env' })

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
})

// Nic's five templates — user data, not fixtures
const TEMPLATES: Array<{
  name: string
  showMetronome: boolean
  showSongPicker: boolean
  showGoalPicker: boolean
  checklistItems: ChecklistItem[]
}> = [
  {
    name: 'Fingerstyle Blues',
    showMetronome: true,
    showSongPicker: true,
    showGoalPicker: true,
    checklistItems: [],
  },
  {
    name: 'Old Song Rescue',
    showMetronome: false,
    showSongPicker: true,
    showGoalPicker: false,
    checklistItems: [
      {
        type: 'select',
        question: "What's actually wrong at that moment?",
        options: [
          'Vocals buried under reverb/effects, or too thin/tentative',
          'Energy is flat — no dynamic lift at the chorus',
          'A specific frequency clash (guitar and vocal fighting for space)',
          'Something else',
        ],
      },
      { type: 'text', question: "Today's fix (one specific thing, not a full remix)" },
    ],
  },
  {
    name: 'New Song Direction',
    showMetronome: false,
    showSongPicker: true,
    showGoalPicker: false,
    checklistItems: [
      { type: 'text', question: 'Mood of the lyric, honestly' },
      { type: 'text', question: 'What did you unconsciously model it after?' },
      { type: 'text', question: 'Does that reference match the mood? If not, what does?' },
      { type: 'text', question: 'Rhythm/groove to borrow' },
      { type: 'text', question: 'Instrumentation/texture to borrow' },
      { type: 'text', question: 'Vocal approach to borrow' },
    ],
  },
  {
    name: 'Song in Progress',
    showMetronome: false,
    showSongPicker: true,
    showGoalPicker: false,
    checklistItems: [
      { type: 'text', question: 'The one line/moment where you started forcing it' },
      {
        type: 'select',
        question: 'What kind of stuck is it?',
        options: [
          'First-draft cliché — push to 2nd/3rd association',
          'Forced rhyme — word serves rhyme, not meaning',
          'Mismatch — music mood vs lyric mood pulling apart',
          "Not sure what the song is about yet",
          'Something else',
        ],
      },
    ],
  },
  {
    name: 'Free Play',
    showMetronome: true,
    showSongPicker: true,
    showGoalPicker: false,
    checklistItems: [],
  },
]

async function main() {
  const userId = process.argv[2]
  if (!userId) {
    console.error('Usage: tsx scripts/seed-templates.ts <clerkUserId>')
    process.exit(1)
  }

  for (const t of TEMPLATES) {
    await prisma.sessionTemplate.upsert({
      where: { userId_name: { userId, name: t.name } },
      update: {
        showMetronome: t.showMetronome,
        showSongPicker: t.showSongPicker,
        showGoalPicker: t.showGoalPicker,
        checklistItems: t.checklistItems,
      },
      create: { userId, ...t },
    })
    console.log(`Seeded: ${t.name}`)
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
