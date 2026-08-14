import { PrismaClient } from '../prisma/generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import type { ChecklistItem } from '../src/lib/types'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
})

async function main() {
  const userId = process.argv[2]
  if (!userId) throw new Error('Pass a clerkUserId as arg')

  const templates = await prisma.sessionTemplate.findMany({
    where: { userId },
    orderBy: { name: 'asc' },
  })

  console.log(`Found ${templates.length} template(s):`)
  for (const t of templates) {
    const items = (t.checklistItems as ChecklistItem[] | null) ?? []
    console.log(`  - ${t.name}`)
    console.log(`      metronome=${t.showMetronome} songPicker=${t.showSongPicker} goalPicker=${t.showGoalPicker}`)
    console.log(`      checklistItems: ${items.length} item(s)`)
    for (const item of items) {
      if (item.type === 'select') {
        console.log(`        [select] "${item.question}" — ${item.options.length} option(s)`)
      } else {
        console.log(`        [text]   "${item.question}"`)
      }
    }
  }
}

main().catch(console.error).finally(() => prisma.$disconnect())
